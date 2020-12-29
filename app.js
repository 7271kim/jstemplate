import { JTemplate } from "./jtemplate/JTemplate.js";

window.onload = ()=>{

    const templateData =  JTemplate.HTMLWrapperparsing( 'component1' );
    const drawObj = {
       'hasComponent' : true,
       'temp' : 1,
       'temp2' : 2,
       'img' : {
           hasImg : true,
           'imgAttr' : {
               "src" : 'test',
               alt : 'zzzzzzzzzzzz'
           }
       },
        'textUnwrap' : false,
        'text' : '<span>text@@@</span>',
        'reapeatList' : [
            '^^',
            '^^^^^'
        ],
        'reapeatList2' : [
            {
                'text' : '^^'
            },
            {
                'text' : '^^^^^'
            }
        ],
        'list' :[
            'zzzzzzzzz',
            'ddddddddddd'
        ],
        'list2' :[
        'zzzzzzzzz',
        'ddddddddddd'
        ],
        'list3' :[
            {
                'text' : '<span>zzzzzzzzzzz</span>'
            },
            {
                'text' : '<span>zzzzzzzzzzz22222222</span>'
             }
        ],
        'textVar' : 'hoho'
   }

   const targetDom = document.getElementsByClassName('target1');
   
   templateData.injectModel( targetDom, 'firstTemplate', drawObj );
}