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
            const currentNode = parseDom.cloneNode();
            const childNode = parseDom.childNode;
            const recustionData = recursionChild( currentNode, childNode, drawObj, {}, 0 );
        } else {
            throw new Error(`templateName이 잘못됐습니다. ${templateName}을 확인하세요`);
        }
    };

    function recursionChild( currentNode, childNode, drawObj, variable, depth ){
        changeTemplateData( currentNode, drawObj, variable, depth );
    }

    function changeTemplateData ( currentNode, drawObj, variable, depth ){
        const sharedObj = JTemplate.sharedObj;
        const componentTemplate = currentNode.getAttribute(sharedObj.COMPONENT_TEMPLATE);
        if( componentTemplate ){
            const patternData = getPatternData( componentTemplate, drawObj );
            if( patternData.length > 1 ){
                variable[depth] = {};
                variable[depth][patternData[1]] = drawObj;
            }
            console.log(variable);
            console.log(patternData);
        }
    }

    function getPatternData( inputString, matchObj = {} ){
        const result = [];
        if( inputString ){
            const arrPattern  = inputString.match(/{{([^{{}}]*)}}/);
            
            if( arrPattern && arrPattern.length > 0){
                const replaceText = arrPattern[1].trim();
                const dotSplit = replaceText.split('@');
                const leftText = dotSplit[0].trim();

                if( leftText.indexOf('\'') > -1 ){
                    result.push( leftText.replace(/\'/g , '') );
                } else {
                    const matchText = matchObj[leftText];
                    if( matchText ){
                        result.push( matchText )
                    } else {
                        result.push( leftText )
                    }
                }

                if( dotSplit.length > 1 ){
                    const rightText = dotSplit[1].trim();
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