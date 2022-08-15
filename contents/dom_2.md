---
date: '2022-08-13'
title: 'DOM_2'
categories: ['JS']
summary: '홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.'
thumbnail: './JS.png'
---

이제 본격적으로 DOM을 사용하는 방법을 알아보자. 이전 게시물과 마찬가지로 <모던 자바스크립트 Deep Dive> 책을 참고하여 천천히 정리해본다.

이번에 공부를 하며 알게 된 사실인데 컴퓨터 언어를 배울 때 가장 빠르게 학습하는 방법은 CRUD (Create, Read, Update, Delete) 를 먼저 이해한 후, 세세한 메서드들을 공부하는 것이라고 한다.
그러므로 CRUD (Create, Read, Update, Delete)를 중점적으로 알아보도록 하자.

### 1) Create

#### 1. Document.prototype.createElement(tagName) 메서드

```javascript
const elDiv = document.createElement('div')
```

createElement 메서드는 요소 노드를 생성하여 반환한다. createElement 메서드의 매개변수인 tagName에는 태그의 이름을 나타내는 문자열을 인수로 전달한다. Document.prototype의 프로퍼티 이므로 반드시 document를 통해서 호출해야 한다.

createElement 메서드로 노드 생성을 했지만 이 노드는 기존 Dom에 연결되지 않고 홀로 존재하고 있는 상태이다. 그래서 생성된 이 노드를 Dom에 추가해주는 처리가 별도로 필요하다.

#### 2. Document.prototype.createTextNode(text) 메서드

```javascript
const elText = document.createTextNode('hello')
```

createTextNode 메서드는 텍스트 노드를 생성하여 반환한다. 이 메서드의 매개변수인 text에는 텍스트 노드의 값으로 사용할 문자열을 인수로 전달한다. createElement 메서드와 마찬가지로 기존 Dom에 연결되지 않기 때문에 별로도 Dom에 추가해주는 처리가 필요하며, Document.prototype의 프로퍼티 이므로 반드시 document를 통해서 호출해야 한다.

### 2) Append

위에서 이야기했다시피 노드가 아직 DOM 트리에 연결이 되어있지 않은 상태이다.이제 생성한 노드를 Dom에 삽입해보자.

#### 1. Element.append() 메서드

```js
const elDiv = document.createElement('div')
const elText = document.createTextNode('hello')
elDiv.append(elText)
console.log(elDiv)
//<div>'hello'</div>
```

변수 elText를 elDiv의 자식 노드로 맨 뒤에 삽입해준다.

```js
const elDiv = document.createElement('div')
elDiv.append('hello')
console.log(elDiv)
//<div>'hello'</div>
```

문자열을 append()로 바로 삽입해주는 것도 가능하다.

```js
const elDiv = document.createElement('div')
const elP = document.createElement('p')
const elText = document.createTextNode('hello')
elDiv.append(elP, elText)
console.log(elDiv)
//<div><p></p>'hello'</div>
```

여러 개의 자식 노드를 삽입해주는 것도 가능하다.

```js
const elDiv = document.createElement('div')
const elText = document.createTextNode('hello')

console.log(elDiv.append(elText))
//undefined
```

append() 메서드는 return 값을 반환하지 않는다.

#### 2. Node.prototype.appendChild(childName) 메서드

```js
const elDiv = document.createElement('div')
const elText = document.createTextNode('hello')
elDiv.append(elText)
console.log(elDiv)
//<div>'hello'</div>
```

appendChild() 메서드도 append() 메서드와 마찬가지로 생성한 노드를 DOM 트리에 자식 노드(맨 뒤에)로 삽입해주는 역할을 한다. 하지만 appendChild() 메서드와 append() 메서드는 몇가지 부분에서 차이점이 존재한다.

1.

```js
const elDiv = document.createElement('div')
const elP = document.createElement('p')
const elText = document.createTextNode('hello')
elDiv.appendChild(elP, elText)
console.log(elDiv)
//<div><p></p></div>
```

appendChild() 메서드는 append() 메서드와는 달리 여러 개의 노드를 한번에 삽입할 수 없다. 여러 개의 노드를 한번에 넣어 삽입하려하면 첫 번째로 입력한 노드만 삽입된다.

2.

```js
const elDiv = document.createElement('div')
elDiv.appendChild('hello')
console.log(elDiv)
//Uncaught TypeError 가 발생한다.
```

appendChild() 메서드는 append() 메서드와 달리 appendChild()로 바로 문자열을 삽입해줄 수 없다. appendChild()로 문자열을 바로 삽입해주면 Uncaught TypeError가 발생한다.

3.

```js
const elDiv = document.createElement('div')
const elText = document.createTextNode('hello')

console.log(elDiv.appendChild(elText))
//"hello"
```

appendChild() 메서드는 append() 메서드와 달리 return 값을 반환한다.

#### 3. Element.prepend() 메서드

```js
const ol = document.createElement('ol')
const li1 = document.createElement('li')
const li2 = document.createElement('li')
ol.append(li1, li2)

const olA = document.createTextNode('a')
const olB = document.createTextNode('b')
li1.append(olA)
li2.append(olB)

const li3 = document.createElement('li')
const olC = document.createTextNode('c')
li3.append(olC)
ol.prepend(li3)
console.log(ol)
/*<ol>
<li>c</li>
<li>a</li>
<li>b</li> 
</ol> */
```

prepend() 메서드는 위의 append(), appendChild() 메서드와 거의 비슷하지만, 삽입하려는 노드가 부모 노드의 맨 앞에 삽입된다는 점에서 차이가 난다.

#### 4. Node.prototype.insertBefore(newNode. childNode) 메서드

insertBefore() 메서드는 위의 삽입 메서드들과 생성한 노드를 지정한 노드의 자식 노드로 삽입해주는 역할을 한다는 점에서 비슷하지만 전달인자가 2개라는 점이 다르다.

```js
<body>
  <ol id = 'rainbow'>
    <li>red</li>
    <li>orange</li>
    <li>green</li>
  </ol>
</body>
<script>
  const olRainbow = document.querySelector('#rainbow');
  const li = document.createElement('li');
  const liYello = document.createTextNode('yello');
  li.append(liYello);
  olRainbow.insertBefore(li, olRainbow.lastElementChild);
</script>
/*1.red
2.orange
3.yello //olRainbow의 마지막 요소인 green 앞에 넣는다.
4.green */
```

insertBeofe()의 첫 번째 전달인자는 삽입하려는 노드, 두 번째 전달인자는 삽입 기준이 되는 노드이며, insertBefore()은 삽입하려는 노드를 두 번째 전달인자 앞에 배치한다.
이 메서드는 삽입하려는 노드의 부모 객체가 될 노드에서 실행되며, 두 번째 전달인자 노드는 이 부모 노드의 자식노드여야 한다.

```js
<body>
  <ol id = 'rainbow'>
    <li>red</li>
    <li>orange</li>
    <li>green</li>
  </ol>
</body>
<script>
  const olRainbow = document.querySelector('#rainbow');
  const li = document.createElement('li');
  const liYello = document.createTextNode('yello');
  li.append(liYello);
  olRainbow.insertBefore(li, null);
</script>
/* 1.red
2.orange
3.green
4.yello
*/
```

두 번째 전달인자로 null을 추가해줄 경우에는 삽입하려는 노드가 해당 부모 노드의 맨 뒤에 추가된다.

### 3) Read

사실 create나 append 보다 먼저 해주어야 하는 것이 있다. 바로 HTML의 요소 노드를 조회하여 취득하는 것이다. 예를 들어 어떠한 부모 노드에 자식 노드를 추가해주고 싶다면 먼저 DOM 트리에 존재하는 그 부모 노드를 조회하여 취득해줄 필요가 있다.

#### 1. Document.prototype.getElementById() 메서드

```js
const divYello = document.getElementById('yello')
```

getElementById() 메서드는 해당 id 값을 갖는 요소 단 한가지를 조회하여 취득한다. (id는 중복 지정이 불가능하므로 단 한가지) getElementById() 메서드의 경우, Document.prototype의 프로퍼티 이므로 반드시 document를 통해서 호출해야 한다. 만일 해당 id값이 존재하지 않는다면 getElementById 메서드는 null을 반환한다.

#### 2. Document / Element.prototype.getElementsByTagName() 메서드

getElementsByTagName() 메서드는 해당 태그 이름을 갖는 요소들을 조회하여 취득한다.

- Document.prototype.getElementByTagName()

```js
const dDiv = document.getElementsByTagName('div')
```

Document.prototype.getElementsByTagName() 메서드는 Document.prototype의 프로퍼티 이므로 반드시 document를 통해서 호출해야 한다.

```js
const all = document.getElementsByTagName('*')
```

HTML 문서의 모든 요소 노드를 조회하여 취득하려면 getElementsByTagName의 인수로 \* 를 주면 된다.

</br>

- Element.prototype.getElementsByTagName()

```js
const eDiv = eRainbow.getElementsByTagName('div')
```

Element.prototype.getElementsByTagName() 메서드의 경우에는 특정 요소 노드를 통해 호출하며 특정 요소 노드의 자손 중에서 요소 노드를 조회하여 취득한다. 만약 인수로 전달된 태그 이름을 갖는 요소가 존재하지 않는 경우 getElementsByTagName() 메서드는 빈 객체를 반환한다.

#### 3. Document / Element.prototype.getElementsByClassName() 메서드

getElementsByClassName() 메서드는 해당 클래스 값을 갖는 모든 요소 노드들을 조회하여 취득한다.

```js
const dName = document.getElementsByClassName('name')
//Document.prototype.getElementsByClassName() 메서드는 전체 요소 노드를 조회한다.
const eClass = student.getElementsByClassName('class')
//Element.prototype.getElementsByClassName() 메서드는 특정 요소 노드의 자손 중에서 요소 노드를 조회한다.
```

만일 인수로 전달된 클래스 값을 갖는 요소가 존재하지 않을 경우 getElementsByClassName() 메서드는 빈 객체를 반환한다.

#### 4. Document / Element.prototype.querySelector() 메서드

querySelector() 메서드는 해당 CSS selector를 만족시키는 하나의 요소 노드를 조회하여 취득한다.

```js
const divYello = document.querySelector('#yello')
// 전체 노드들 중에서 id가 yello인 노드를 조회하여 취득한다.
const eclass = student.querySelector('.class')
//student 노드의 자손 노드들 중에서 class값이 class인 노드들 중 첫 번째 노드를 조회하여 취득한다.
```

만일 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 null을 반환한다.
인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생한다.
개인적으로는 이 메서드 하나만 있으면 id, class, 속성값 등등을 조회할 수 있기 때문에 가장 추천하는 조회 메서드라고 생각한다.

#### 5. Document / Element.prototype.querySelectorAll() 메서드

만일 querySelector 메서드처럼 CSS 선택자를 만족시키는 노드를 조회하고 싶으면서 같은 선택자 값을 공유하는 1개 이상의 노드들을 조회하고 싶을 때는 querySelectorAll 메서드를 사용한다.

```js
const all = document.querySelectorAll('*')
// 전체 노드들을 모두 조회하여 취득한다.
const dgrade = document.querySelectorAll('.grade')
// 전제 노드들 중에서 class값이 grade인 노드들을 모두 조회하여 취득한다.
const eclass = student.querySelectorAll('.class')
//student 노드의 자손 노드들 중에서 class값이 class인 노드들을 모두 조회하여 취득한다.
```

<br>

### 4) Update

앞서 Create, Append, Read 를 통해 노드를 생성하고, 생성한 노드를 기존의 DOM 트리에 자식 노드로 삽입하고, DOM 트리에 존자해는 노드를 조회하여 취득해 보았다.
이번에는 기존에 생성한 태그를 업데이트하여 좀 더 다양한 작업을 해보자.

#### 1. Node.prototype.nodeValue 프로퍼티

nodeValue 프로퍼티는 텍스트 노드의 값을 변경할 수 있는 프로퍼티이다. 텍스트 노드가 아닌 노드 객체의 nodeValue 프로퍼티를 참조하면 null이 반환되므로 의미가 없다. (오직 텍스트 노드에서만 쓸 수 있다)

```js
<body>
  <div id='yello'>yello</div>
/* <div id = 'yello'>  --- 부모노드
    yello  --- 자식노드 (텍스트노드)
</div>*/
</body>
<script>
  const dYello = document.querySelector('#yello').firstChild;
  // id가 yello인 요소 노드의 첫 번째 자식 노드 (텍스트노드 yello)를 조회하여 취득한다.
  dYello.nodeValue = 'green';
  //dYello의 값을 yello에서 green으로 변경한다.
  console.log(dYello.nodeValue); //green
</script>
```

이렇게 dYello의 텍스트 값을 재할당해줘서 값을 변경한다.

#### 2. Node.prototype.textContent 프로퍼티

textContent 프로퍼티는 기본적으로 nodeValue 프로퍼티와 비슷하지만 텍스트 노드 뿐만 아니라 모든 노드들의 텍스트 값을 반환한다.

```js
<body>
  <div id='yello'>yello</div>
/* <div id = 'yello'>  --- 부모노드
    yello  --- 자식노드 (텍스트노드)
</div>*/
</body>
<script>
  const dYello = document.querySelector('#yello');
  // id가 yello인 요소 노드를 조회하여 취득한다.
  dYello.textContent = 'green';
  //dYello의 값을 yello에서 green으로 변경한다.
  console.log(dYello.textContent); //green
  //nodeValue라면 id가 Yello인 노드의 자식 텍스트 노드의 값이 yello인 것이기 때문에 에러가 떴을 것이다.
  console.log(dYello.textContent === dYello.firstChild.textContent); //true
</script>
```

#### 3. Node.prototype.cloneNode([deep: true | false]) 메서드

cloneNode() 메서드는 노드의 복사본을 만들어 반환한다.

```js
const fYello = dYello.cloneNode()
// dYello 요소를 얕은 복사하여 사본을 생성한다. 이 때 자기 자신만을 복사한다.
const tYello = dYello.cloneNode(true)
// dYello 요소를 깊은 복사하여 사본을 생성한다. 이 때 모든 자손 노드까지 포함하여 복사한다.
```

매개변수 deep에 true를 인수로 전달하면 노드를 깊은 복사하여 모든 자손 노드가 포함된 복사본을 생성하고, false를 인수로 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 복사본을 생성한다. 이 때 얕은 복사로 생성된 노드는 자손 노드를 복사하지 않으므로 텍스트 노드 또한 없다.

#### 4. Node.prototype.replaceChild(newChild, oldChild) 메서드

replaceChild() 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다.

```js
const pColors = document.querySelector('#colors')
//기존에 존재하는 노드, 매개변수 oldChild에 전달될 인수의 부모 노드
const lGreen = document.createElement('li')
//기존 노드와 교체할 새로운 요소 노드를 생성한다.
lGreen.textContent = 'green'
// <li>green</li>

pColors.replaceChild(lGreen, pColors.firstElementChild)
//pColors 노드의 첫 번째 자식 노드를 lGreen 노드로 교체한다.
```

첫 번째 매개변수인 newChild에는 교체할 새로운 노드를, 두 번째 매개변수인 oldChild에는 교체할 노드를 인수로 전달한다. 이 때 oldChild 매개변수에 인수로 전달한 노드는 replaceChild 메서드를 호출한 노드의 자식 노드여야 한다.
<br>

### 5) Delete

마지막으로 노드를 삭제하는 방법을 알아보자.

### 1. Node.prototype.removeChild(child) 메서드

removeChild() 메서드는 child 매개변수에 인수로 전달된 노드를 DOM 에서 삭제한다. 인수로 전달한 노드는 removeChild 메서드를 호출한 노드의 자식 노드여야 한다.

```js
<body>
  <ol id='colors'>
    <li>red</li>
    <li>yello</li>
  </ol>
</body>
<script>
  const pColors = document.querySelector('#colors');
  // id가 colors인 요소 노드를 조회하여 취득한다.
  pColors.removeChild(pColors.firstElementChild);
  //pColors 노드의 자식 노드 중 첫 번째 노드를 삭제한다.
</script>
```

<br>
이렇게 crud(+append)에 맞추어 DOM을 사용하는 방법을 알아보았다. 직접 예제를 만들어가며 작성하니 확실히 좀 더 잘 이해가 되는 것 같다.
