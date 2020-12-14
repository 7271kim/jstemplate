(()=>{
    class StringUtils {
        static defaultIfBlank( string, defaultStr ){
            let result = string;
            
            if( typeof string === 'number' ){
                result = parseInt(string);
            } else if( typeof string === 'undefined' || string === null ){
                result = defaultStr;
            }
    
            return result;
        } 
    }

    window.StringUtils = StringUtils;
})()


