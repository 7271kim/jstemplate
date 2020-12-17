window.onload = ()=>{
    
   const templateData =  window.JTemplate.HTMLWrapperparsing( 'component1' );
   const drawObj = {
       'hasComponent' : true,
       'img' : {
           hasImg : true,
           'imgAttr' : {
               "src" : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fjpop%2Fimages%2F5%2F55%2FAAA_Jan_2020.jpg%2Frevision%2Flatest%3Fcb%3D20200117134320&imgrefurl=https%3A%2F%2Fjpop.fandom.com%2Fwiki%2FAAA&tbnid=3Sdrn4-5gQ-5DM&vet=12ahUKEwj-07XzltDtAhU6xIsBHbvDAogQMygAegUIARCZAQ..i&docid=Hwe9n18mFjnqhM&w=1520&h=900&q=aaa&ved=2ahUKEwj-07XzltDtAhU6xIsBHbvDAogQMygAegUIARCZAQ',
               alt : 'zzzzzzzzzzzz'
           }
       },
        'textUnwrap' : false,
        'text' : '<span>text@@@</span>',
        'reapeatList' : [
            '^^',
            '^^^^^'
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