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

    class ObjectUtils {
        static isEmpty( obj ){
            return Object.keys(obj).length === 0;
        }

        static isNotEmpty( obj ){
            return Object.keys(obj).length !== 0;
        }
    }

    class ArrayUtils {
        static isNotEmpty( array ){
            return array && array.length > 0;
        }
    }

    class NodeUtils {
        static removeOnlyCurrentNode( currentNode ){
            const parentNode = currentNode.parentNode;
            
            while( currentNode.childNodes.length > 0  ){
                const child = currentNode.childNodes[0];
                parentNode.insertBefore( child, currentNode);
            }
            parentNode.removeChild( currentNode );
        }

        static AtoBMoveChilden( targetNode, removeNode ){
            if( removeNode ){
                while( removeNode.childNodes.length > 0 ){
                    targetNode.appendChild(removeNode.childNodes[0]);
                }
            }
        }

        static removeAllChilden( currentNode ){
            if( currentNode && currentNode.childNodes.length > 0 ){
                while( currentNode.childNodes.length > 0 ){
                    currentNode.removeChild(currentNode.childNodes[0]);
                }
            }
        }

    }

    window.StringUtils = StringUtils;
    window.ArrayUtils = ArrayUtils;
    window.NodeUtils = NodeUtils;
    window.ObjectUtils = ObjectUtils;
})()


