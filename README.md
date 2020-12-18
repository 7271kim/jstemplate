# Jtemplate
> Json형식의 객체를 HTML DOM 객체로 변환하는 HTML Template 입니다.

[개발자 블로그](https://honbabzone.com/)

## Content
1. [폴더 구조](#project-setting)
2. [사용방법](#how-to-use)
3. [예시](#example)

<h3 id="project-setting">
    1. 프로젝트 구조
</h3>

```bash
├── jtemplate
│   ├── Jtemplate.css # 템플릿 관련 css
│   └── Jtemplate.js # 템플릿 관련 js    
│
├── util
│   ├── DataStructure,js # 추가한 자료구조 관련 
│   └──util.js          # 추가한 관련 유틸들
├── app.js # 실제 사용 js
└── index.html # 관련 html
```

<h3 id="how-to-use">
    2. 사용방법
</h3>

~~~javascript
// 템플릿 변수는 {{}} 으로 사용되어집니다.
jtemplates : 템플릿 영역 명시 클래스    
    ex) class="jtemplates"

data-jly-componentName  : 컴포넌트 명   
    ex) data-jly-componentName="component1"

data-jly-template       : 템플릿 명 및 템플릿 내부 사용 변수 설정 
    ex) data-jly-template="{{ firstTemplate @ obj }}"

data-jly-test : 현재 Node 노출 여부 결정, .{변수명} 을 통해서 내부에서 해당 변수명으로 접근 가능하다.
    ex) data-jly-test.kkk="{{ obj.hasComponent }}"

data-jly-attribute : 현재 노드의 attribute를 설정, 해당 객체의 key가 속성 명으로, value가 값으로 세팅된다.
    ex) <img data-jly-attribute="{{ obj.img.imgAttr }}">

data-jly-text : Node의 text를 결정한다. @ context='html/text'를 통해 HTML구조 혹은 단순 text 구조를 세팅할 수 있다.
    ex) data-jly-text="{{item @ context='HTML' }}"

data-jly-list : Node 내부 자식을 반복 시킨다.
    ex) <ul data-jly-list.item="{{obj.list }}"><li>{{item.text}}</li></ul>

data-jly-reapeat : 현재 노드를 반복 시킨다.
    ex) <p data-jly-reapeat.item="{{ obj.reapeatList }}">{{item.temp}}</p>

data-jly-var : 노드 하위 자식들에서 사용할 변수를 세팅한다.
    ex) <div class="target1 ppp" data-jly-var.ttt4 = "{{'asdasd'}}" >{{tt4}}</div>

data-jly-injection : 다른 템플릿을 주입 시킨다.
    ex) <ul data-jly-list.item="{{obj.list2 }}"><jly data-jly-injection="{{ injectTemplate @ item }}"></jly></ul>
~~~

<h3 id="example">
    3. 예시
</h3>

[index.html](https://github.com/7271kim/jstemplate/blob/main/index.html)


~~~html
<!-- 추후 교체될 영역입니다. -->
<div class="target1" ></div>


<!-- class="jtemplates"를 통해 내부는 html 템플릿이라고 선언합니다. -->
<div class="jtemplates" data-jly-componentName="component1">
    <!-- data-jly-template="{{ firstTemplate @ obj }}"를  통해 {{ 해당 템플릿 명 @ 템플릿 내부에서 사용할 변수}} 형식으로 적습니다. -->
	<div class="target1 ppp" data-jly-template="{{ firstTemplate @ obj }}" >
        <!-- {{obj.text}} 위에서 정한 obj 변수 객체 데이터 중 text 데이터가 매치되어 삽입됩니다. -->
		<p>{{obj.text @ context ='html' }}</p>
</div>
~~~

[app.js](https://github.com/7271kim/jstemplate/blob/main/app.js)

~~~javascript
// HTML에 component1이라는 템플릿 그룹을 Parsing 합니다.
const templateData =  window.JTemplate.HTMLWrapperparsing( 'component1' );

// 템플릿에 주입할 객체를 세팅합니다.
const drawObj = {
	'text' : '<span>text@@@</span>'
}

// 템플릿에 데이터 주입 후 교체할 target Dom을 설정합니다.
const targetDom = document.getElementsByClassName('target1');

// templateData.injectModel( targetDom, 사용할 템플릿, 템플릿에 주입할 객체 ) 를 통해 HTML 주입이 일어납니다.
templateData.injectModel( targetDom, 'firstTemplate', drawObj );
~~~



- 문의 : 7271kim@naver.com


|  license   | version |
|--------------|---------|
| contact developer    |   1.0.0   |