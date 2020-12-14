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
        
        static compile(){
            HTMLparsing();
        }
    }

    function HTMLparsing(){
        const templates = document.getElementsByClassName(JTemplate.sharedObj.COMPONENT_CLASS);
           const sharedObj = JTemplate.sharedObj;
           const stringUtils = window.StringUtils;

           while ( templates.length > 0 ){
                const templateSection  = templates[0];
                const parentNode = templateSection.parentElement;
                let componentName = stringUtils.defaultIfBlank(templateSection.getAttribute(sharedObj.COMPONENT_NAME), '').trim();
                errCheck( componentName, sharedObj.component, sharedObj.COMPONENT_NAME );
                
                const  targetComponent = sharedObj.component[componentName] = {};
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

                if( dotSplit > 1 ){
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