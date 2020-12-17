(()=>{
    class JTemplate {
        static sharedObj = {
        	'COMPONENT_CLASS' : 'jtemplates',
            'COMPONENT_NAME' : 'data-jly-componentName',
            'COMPONENT_TEMPLATE' : 'data-jly-template',
            'COMPONENT_TEST' : 'data-jly-test',
            'COMPONENT_ATTRIBUTE' : 'data-jly-attribute',
            'COMPONENT_TEXT' : 'data-jly-text',
            'COMPONENT_LIST' : 'data-jly-list',
            'COMPONENT_REAPEAT' : 'data-jly-reapeat',
            'COMPONENT_VAR' : 'data-jly-var',
            'COMPONENT_INJECTION' : 'data-jly-injection',
            'component' : {}
        }
        
        constructor( componentName ){
            this.componentName = componentName;
            this.templates = JTemplate.sharedObj.component[componentName];
        }

        injectModel( targetDom, templateName , drawObj ){
            const stringUtils = window.StringUtils;
            const arrayUtils = window.ArrayUtils;
            const childrenDom = parsingChildrenDom( this, templateName , drawObj );
            if(  arrayUtils.hasArray( targetDom )){
                
            } else {
                throw new Error(`injectModel을 하기 위한 targetDom이 없습니다. injectModel 파라메터를 확인하세요`);
            }

        }

        static HTMLWrapperparsing( componentName ){
            const templates = document.getElementsByClassName(JTemplate.sharedObj.COMPONENT_CLASS);
            const sharedObj = JTemplate.sharedObj;
            const stringUtils = window.StringUtils;

            while ( templates.length > 0 ){
                const templateSection  = templates[0];
                const parentNode = templateSection.parentElement;
                let htmlComponentName = stringUtils.defaultIfBlank(templateSection.getAttribute(sharedObj.COMPONENT_NAME), '').trim();
                
                errCheck( htmlComponentName, sharedObj.component, sharedObj.COMPONENT_NAME );
                
                const  targetComponent = sharedObj.component[htmlComponentName] = {};
                const children = templateSection.children;
                
                for( const child of children ){
                    const templatePatternName = stringUtils.defaultIfBlank(child.getAttribute( sharedObj.COMPONENT_TEMPLATE )).trim();
                    const patternData  = getPatternData( templatePatternName );
                    const templateName = patternData[0];

                    errCheck( templateName, targetComponent, sharedObj.COMPONENT_TEMPLATE );

                    targetComponent[templateName] = {
                        'HTML' : child
                    }
                }
                parentNode.removeChild( templateSection )
            }

            return new JTemplate( componentName );
        }
    }
    
    function parsingChildrenDom( classObj, templateName , drawObj ){
        const stringUtils = window.StringUtils;
        const template = classObj.templates[templateName];
        if( templateName && template ){
            const parseDom = template.HTML;
            const parentDom = document.createElement('div');
            parentDom.appendChild( parseDom.cloneNode(true) );
            recursionChild( parentDom, drawObj, {} );

            return parentDom;

        } else {
            throw new Error(`templateName이 잘못됐습니다. ${templateName}을 확인하세요`);
        }
    };

    function recursionChild( currentNode, drawObj, variable ){
        changeCurrentNodeToTemplateData( currentNode, drawObj, variable );
        const childNodes = currentNode.childNodes;
        if( childNodes && childNodes.length > 0  ){
            for( const child of childNodes ){
                const variClone = {...variable};
                recursionChild( child, drawObj, variClone );
            }
        }
        /*
        if( currentNode.nodeName.indexOf("JLY") >-1 ){
            while( currentNode.childNodes.length > 0  ){
                const child = currentNode.childNodes[0];
                parentNode.insertBefore( child, parentNode.getElementsByTagName('jly')[0]);
            }
            parentNode.removeChild(parentNode.getElementsByTagName('jly')[0]);
            console.log(parentNode);
        }
        */
        
    }

    function changeCurrentNodeToTemplateData ( currentNode, drawObj, variable, parentNode ){
        if( !( currentNode.nodeName.indexOf('text') > -1 )){
            const sharedObj = JTemplate.sharedObj;
            const stringUtils = window.StringUtils;
            const arrayUtils = window.ArrayUtils;
            const currentAttrNames = currentNode.getAttributeNames();
            const checkingAttr = [];
            const compNameIndex = {
                [sharedObj.COMPONENT_TEMPLATE] : -1,
                [sharedObj.COMPONENT_VAR] : -1,
                [sharedObj.COMPONENT_TEST] : -1,
                [sharedObj.COMPONENT_ATTRIBUTE] : -1,
                [sharedObj.COMPONENT_TEXT] : -1,
                [sharedObj.COMPONENT_LIST] : -1,
                [sharedObj.COMPONENT_REAPEAT] : -1,
                [sharedObj.COMPONENT_INJECTION] : -1
            }
            
            checkingCurrentAttr ( checkingAttr, compNameIndex, currentAttrNames, currentNode );
            settingTemplate( currentNode, drawObj, variable, compNameIndex[sharedObj.COMPONENT_TEMPLATE], currentAttrNames );

            let goNext = settingTest( currentNode, drawObj, variable, compNameIndex[sharedObj.COMPONENT_TEST], currentAttrNames );

            if( goNext ){
                settingVar( currentNode, drawObj, variable, compNameIndex[sharedObj.COMPONENT_VAR], currentAttrNames );
                settingList( currentNode, drawObj, variable, compNameIndex[sharedObj.COMPONENT_LIST], currentAttrNames );
            }
            settingRest( checkingAttr, currentNode, variable);
        }
    }

    function settingList( currentNode, drawObj, variable, index, currentAttrNames ){
        if( index !== -1 ){
            const attrDotName = currentAttrNames[index];
            const dotSplitName = dotSplit( attrDotName );
            const attrName = dotSplitName[0];
            const attrValue = currentNode.getAttribute(attrDotName);
            if( attrValue ){
                const listData = getPatternData( attrValue, variable )[0];
                const parentDom = document.createElement('div');

                for( const listIndex in listData ){
                    const item = listData[listIndex];
                    const variClone = {...variable};
                    const childNode = currentNode.childNodes;
                    variClone[dotSplitName[1]] = item;
                    variClone[dotSplitName[1]+'List'] = {
                        'index' : parseInt(listIndex),
                        'count' : parseInt(listIndex)+1
                    };
                    console.log(currentNode);
                    for( const child of childNode ){
                        recursionChild( child, drawObj, variClone );
                    }
                    console.log(currentNode);
                }
                /*
                while( currentNode.childNodes.length > 0 ){
                    currentNode.removeChild(currentNode.childNodes[0]);
                }

                while( parentDom.childNodes.length > 0 ){
                    currentNode.appendChild(parentDom.childNodes[0]);
                }
                */
            }

            currentNode.removeAttribute(attrDotName);
        }
    }

    function settingRest( checkingAttr, currentNode,variable ){
        for( const attr of checkingAttr ){
            const chanedValue = getPatternData( currentNode.getAttribute(attr), variable );
            currentNode.setAttribute( attr, chanedValue );
         }
    }

    function checkingCurrentAttr ( checkingAttr, compNameIndex, currentAttrNames, currentNode ){
        const sharedObj = JTemplate.sharedObj;

        for ( const index in currentAttrNames ){
            const attrName = currentAttrNames[index];
            const attrValue = currentNode.getAttribute(attrName);

            if( attrName.indexOf( sharedObj.COMPONENT_TEMPLATE ) > -1 ){
                compNameIndex[sharedObj.COMPONENT_TEMPLATE ] = parseInt(index);
            } else if( attrName.indexOf( sharedObj.COMPONENT_VAR ) > -1 ){
                compNameIndex[sharedObj.COMPONENT_VAR] == -1 ? compNameIndex[sharedObj.COMPONENT_VAR]=[ parseInt(index) ] : compNameIndex[sharedObj.COMPONENT_VAR].push(parseInt(index));
            } else if( attrName.indexOf( sharedObj.COMPONENT_TEST ) > -1) {
                compNameIndex[sharedObj.COMPONENT_TEST] = parseInt(index);
            } else if( attrName.indexOf( sharedObj.COMPONENT_ATTRIBUTE ) > -1 ){
                compNameIndex[sharedObj.COMPONENT_ATTRIBUTE] = parseInt(index);
            } else if( attrName.indexOf(sharedObj.COMPONENT_TEXT) > -1) {
                compNameIndex[sharedObj.COMPONENT_TEXT]= parseInt(index);
            } else if( attrName.indexOf(sharedObj.COMPONENT_LIST) > -1 ){
                compNameIndex[sharedObj.COMPONENT_LIST] = parseInt(index);
            } else if( attrName.indexOf(sharedObj.COMPONENT_REAPEAT) > -1 ){
                compNameIndex[sharedObj.COMPONENT_REAPEAT] = parseInt(index);
            } else if( attrName.indexOf(sharedObj.COMPONENT_INJECTION) > -1 ){
                compNameIndex[sharedObj.COMPONENT_INJECTION] = parseInt(index);
            } else if( attrValue.indexOf('}}') > -1 ){
                checkingAttr.push( attrName );
            }
        }
    }

    function settingTest( currentNode, drawObj, variable, index, currentAttrNames ){
        let result = true;
        if( index !== -1 ){
            const attrDotName = currentAttrNames[index];
            const dotSplitName = dotSplit( attrDotName );
            const attrName = dotSplitName[0];
            const attrValue = currentNode.getAttribute(attrDotName);
            if( attrValue ){
                const patternData = getPatternData( attrValue, variable );
                result = patternData[0];
                if(dotSplitName.length > 1){
                    variable[dotSplitName[1]] = result;
                }

                if( !result && currentNode.parentElement ){
                    currentNode.parentElement.removeChild(currentNode);
                }
            }
            currentNode.removeAttribute(attrDotName);
        }
        return result;
    }
    
    function settingVar( currentNode, drawObj, variable, indexList, currentAttrNames ){
        if( indexList !== -1 ){
            for( const index of indexList ){
                const attrDotName = currentAttrNames[index];
                const dotSplitName = dotSplit( attrDotName );
                const attrName = dotSplitName[0];
                const attrValue = currentNode.getAttribute(attrDotName);
    
                if( attrValue ){
                    const patternData = getPatternData( attrValue, variable );
                    if(!dotSplitName[1]){
                        throw new Error(`${sharedObj.COMPONENT_VAR}.{변수이름} 형태가 되어야 합니다.`)
                    }
                    variable[dotSplitName[1]] = patternData[0];
                }
    
                currentNode.removeAttribute(attrDotName);
            }
        }
    }

    function settingTemplate( currentNode, drawObj, variable, index, currentAttrNames ){
        if( index!== -1 ){
            const attrDotName = currentAttrNames[index];
            const dotSplitName = dotSplit( attrDotName );
            const attrName = dotSplitName[0];
            const attrValue = currentNode.getAttribute(attrDotName);

            if( attrValue ){
                const patternData = getPatternData( attrValue, variable );
                if( patternData.length > 1 ){
                    variable[patternData[1]] = drawObj;
                } else {
                    throw new Error(`${sharedObj.COMPONENT_TEMPLATE} 뒤 @ 를 통해 대표 변수를 설정하세요`)
                }
            }
        currentNode.removeAttribute(attrDotName);
        
        }
    }

    function dotSplit( string ){
        return window.StringUtils.defaultIfBlank(string , '').split('.');
    }

    function getPatternData( inputString, matchObj = {} ){
        const result = [];
        if( inputString ){
            const arrPattern  = inputString.match(/{{([^{{}}]*)}}/);
            
            if( arrPattern && arrPattern.length > 0){
                const replaceText = arrPattern[1].trim();
                const atSplit = replaceText.split('@');
                const leftText = atSplit[0].trim();

                if( leftText.indexOf('\'') > -1 ){
                    result.push( leftText.replace(/\'/g , '') );
                } else {
                    const dotSplitLeft = dotSplit( leftText );
                    let matchText = '';
                    if( dotSplitLeft.length > 1 ){
                        let getData = matchObj;
                        
                        for( const dotText of dotSplitLeft ){
                            if( getData ){
                                getData = getData[dotText];
                            }
                        }

                        if( getData === null || getData === undefined ){
                            throw new Error(`${leftText} 변수에 대한 내용이 없습니다`);
                        } else {
                            matchText = getData;
                        }
                    } else {
                        matchText = matchObj[leftText];
                    }

                    if( matchText !== null && matchText !== undefined){
                        result.push( matchText )
                    } else {
                        result.push( leftText )
                    }
                }

                if( atSplit.length > 1 ){
                    const rightText = atSplit[1].trim();
                    result.push( rightText )
                }
            } else {
                throw new Error(`${inputString}을 확인하세요 {{}} 형식이 아닙니다. `);
            }
        }

        return result;
    }

    function errCheck( componentName, checkObj, debugText ){
        if( !componentName ){
            throw new Error( `${debugText}이 존재하지 않습니다. ${debugText}을 작성하세요` );
        }

        if( checkObj[componentName] ){
            throw new Error( `${debugText}에  ${componentName}이 중복됩니다. 중복된 ${debugText}을 제거하세요` );
        }
    }

    window.JTemplate = JTemplate;
})();