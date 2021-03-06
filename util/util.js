/**
 * 1. StringUtils
 *  - defaultIfBlank( input string값, 디폴트 값 ) : input이 null일 시 원하는 디폴트 값 세팅
 * 
 * 2. ObjectUtils
 * - isEmpty ( object ) : 객체가 빈 객체인지 확인
 * - isNotEmpty ( object ) : 객체가 빈 객체인지 확인
 * 
 * 3. ArrayUtils
 * - isNotEmpty ( 배열 ) : 배열이 빈 배열인지 확인 
 * 
 * 4. NodeUtils
 * - removeOnlyCurrentNode( currentNode ) : DOM 노드 중 현재 자신 노드만 제거. 즉 parent <-> 자기자식 연결.
 * - AtoBMoveChilden( targetNode, removeNode ) : removeNode의 자식들을 targetNode에 추가 
 * - removeAllChilden( currentNode ) : 현재 자기 노드의 모든 자식 노드 제거
 * - getWidth(element, type) : type > width(순수 width), inner( width + padding ), outer( width + padding + boder ), full( width + padding + boder + margin )
 * - getHeight(element, type) : type > height(순수 height), inner( height + padding ), outer( height + padding + boder ), full( height + padding + boder + margin )
 */

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
    
    static getWidth(element, type) {
        if (type === 'inner')  // .innerWidth()
	        return element.clientWidth;
	      else if (type === 'outer')  // .outerWidth()
	        return element.offsetWidth;
	      let s = window.getComputedStyle(element, null);
	      if (type === 'width')  // .width()
	        return element.clientWidth - parseInt(s.getPropertyValue('padding-left')) - parseInt(s.getPropertyValue('padding-right'));
	      else if (type === 'full')  // .outerWidth(includeMargins = true)
	        return element.offsetWidth + parseInt(s.getPropertyValue('margin-left')) + parseInt(s.getPropertyValue('margin-right'));
	      return null;
    }
    
    static getWidth(element, type) {
	    if (type === 'inner')  // .innerWidth()
	        return element.clientWidth;
	      else if (type === 'outer')  // .outerWidth()
	        return element.offsetWidth;
	      let s = window.getComputedStyle(element, null);
	      if (type === 'width')  // .width()
	        return element.clientWidth - parseInt(s.getPropertyValue('padding-left')) - parseInt(s.getPropertyValue('padding-right'));
	      else if (type === 'full')  // .outerWidth(includeMargins = true)
	        return element.offsetWidth + parseInt(s.getPropertyValue('margin-left')) + parseInt(s.getPropertyValue('margin-right'));
	      return null;
    }

}

export { StringUtils, ArrayUtils, NodeUtils, ObjectUtils};

