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
        
        compile(){
           const templates = document.getElementsByClassName(JTemplate.sharedObj.COMPONENT_CLASS);
           for ( const templateSection of templates ){
                const parentNode = templateSection.parentNode;
                
                let componentName = templateSection.getAttribute(JTemplate.sharedObj.COMPONENT_NAME);
                if( componentName ){
                    componentName = componentName.trim();
                    if( JTemplate.sharedObj.component[componentName] ){
                        throw new Error(`[JLY] ${index+1}번째의 jtemplates 클래스에 data-jly-componentName이름 ${componentName}이 중복됩니다.`);
                    } else{

                    }
                } else {
                    throw new Error(`[JLY] ${index+1}번째의 jtemplates 클래스에 data-jly-componentName이 존재하지 않습니다. data-jly-componentName를 작성하세요`);
                }

                parentNode.removeChild( templateSection )
           }

        }
    }

    window.JTemplate = new JTemplate();
})();