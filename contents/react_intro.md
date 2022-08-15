---
date: '2022-08-13'
title: 'React_intro'
categories: ['React']
summary: '홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.'
thumbnail: './react.png'
---

### 1. React?

> 리액트는 프론트엔드 개발을 위한 Javascript 오픈소스 라이브러리를 말한다.

리액트에는 프론트엔드 개발을 좀 더 효율적으로 할 수 있게 만들어주는 3가지의 특징이 있다.

#### 1. 선언형(Declarative)

React는 한 페이지에 보여주기 위해서 HTML/CSS/JS로 나눠서 적기 보다는 하나의 파일에 명시적으로 작성할 수 있게 JSX를 활용한 선언형 프로그래밍을 지향한다.
여기서 **명시적**이라는 단어의 뜻은 코드를 자세히 분석하지 않고도 코드의 의도를 분명히 알 수 있게 작성한 것을 말한다.
즉, React를 사용하면 코드를 자세히 분석하지 않아도 그 코드가 어떤 내용인지, 어떤 의도를 가지고 있는지 바로 상상해볼 수 있다.

#### 2. 컴포넌트 기반(Component-Based)

컴포넌트란, 하나의 기능 구현을 위해 여러 종류의 코드를 묶어 놓은 것을 말한다.
즉, React는 하나의 기능 구현을 위해서 여러 종류의 코드를 묶어둔 컴포넌트를 기반으로 개발한다.
컴포넌트로 분리할 경우 컴포넌트 간의 의존성이 없어서 서로 독립적이고 재사용이 가능하기 때문에 기능 자체에 집중하여 개발할 수 있다.
또한 어떠한 기능이 작동하지 않을 때 그 기능을 구현한 컴포넌트의 코드를 먼저 보고 에러를 찾을 수 있어 유지보수가 편하고 유닛 테스트를 하기에도 편하다는 장점이 있다.

#### 3. 범용성(Learn Once, Write Anywhere)

리액트는 JS 라이브러리 이기 때문에 JS 프로젝트 어디에든지 유연하게 적용될 수 있다.
또한 Facebook에서 관리되어 안정적이고 가장 유명하며, 리액트 네이티브로 모바일 개발도 가능하다.

<br>

### 리액트 문법 \_ JSX를 사용하지 않는 방법

리액트에는 리액트를 좀 더 간편하게 사용할 수 있는 React JSX 라는 문법이 존재하지만 이를 좀 더 쉽게 이해하기 위해서는 우선, JSX를 사용하지 않고 리액트 코드를 작성하는 법에 대해서 알아둘 필요가 있다. 다만 이 방법은 이해를 위해 쓰는 것일 뿐, 실전에선 개발자들에게 더 이상 쓰이지 않는 방식이다.

class 이름이 'btn'이고 'click me!' 라는 내용을 담고 있으며 클릭할 때마다 콘솔에 클릭 횟수가 찍히는 버튼을 만든다고 가정해보자.

우선 비교를 위해 기존의 dom을 활용한 방식으로 코드를 작성해보자.

```js
...
<body>
  <button class="btn">click me!</button>
// 1. html 이용해 class 이름이 btn이고 click me! 라는 내용 담고 있는 버튼 만든다.
</body>
<script>
  const button = document.querySelector(".btn");
// 2. querySelector 이용해 html로 만든 버튼을 가져온다.

  function handleClick() {
    console.log("button click");
  }
// 3. 버튼을 클릭했을 때 콘솔에 "button click" 내용과 함께 클릭 수 보여줄 함수 만든다.

  button.addEventListener("click", handleClick);
// 4. 버튼을 클릭했을 때 위의 함수가 실행되는 이벤트를 만든다.
</script>
```

위와 같이 기존의 dom 방식을 사용했을 경우 html 코드를 작성한 후 js 코드를 작성해야 하는 등 복잡하게 느껴진다.

그럼 jsx를 사용하지 않는 방식으로 리액트를 이용해 위의 버튼을 만들어보자.

```js
const Button = React.createElement(
  'button',
  // 리액트 이용해서 만든 요소는 반드시 대문자여야 한다.                                    // 첫 번째 인자에는 유효한 HTML 태그
  {
    onClick: function () {
      console.log('button click')
    },
  },
  // 두 번째 인자에는 위의 태그의 프로퍼티로 두고 싶은 것
  'click me!',
)
// 세 번째 인자에는 태그 안에 넣고 싶은 내용

//ReactDOM 랜더링 과정은 일단 생략
```

확실히 위의 dom 방식보다 더 간편하고 바로 코드가 어떤 의도를 담고 있는지를 상상할 수 있다.
하지만 다소 복잡하게 느껴질 수 있고 이보다 더 간편한 jsx 문법이 존재한다. 그래서 우리는 jsx문법을 사용한다.

<br>

### 리액트 문법 \_ React JSX

```js
function Button() {
  return (
    <button
      onClick={function () {
        console.log('button click')
      }}
    >
      click me!
    </button>
  )
  // html처럼 함수에 넣어주고 리턴해주기!
  // 훨씬 간편하다.
}
```

위의 jsx를 사용하지 않는 방식과 비교해보면 훨씬 더 간편하고 더 명시적이라는 것을 알 수 있다.

jsx 문법의 규칙에 대해서 더 알아보자.

```js
const Tweets = () => {
 // react Component는 꼭 대문자로 시작한다.
 return (
   <ul className="tweets">
     {dummyTweets.map((tweet) => {
   // react에서는 여러 개의 데이터를 랜더링 할 때 map 메서드를 사용한다.
       const isParkHacker = tweet.username === "parkhacker";
       const tweetUserNameClass = isParkHacker
         ? "tweet__username tweet__username--purple"
         : "tweet__username";
   // react에서는 if문 대신 삼항연산자를 사용한다.
       return (
         <li className="tweet" key={tweet.id}>
      // map 메서드 사용 시 map 메서드 내부의 첫 엘리먼트에는 key 속성을넣어주며 보통은 id를 넣어준다.
      // 여러 엘리먼트를 작성할 때는 최 상의에 opening tag, closing tag가 존재한다.
           <div className="tweet__profile">
      // class 지정할 때는 class= 이 아니라 className= 을 사용한다.
             <img src={tweet.picture}></img>
      // react 내에서 js 사용할 때는 꼭 중괄호를 쓴다.
           </div>
           ...
```

```js
.....
  const App = () => {
  return (
    <div className="App">
      <main>
        <Sidebar />
    // 컴포넌트 넣어주는 방법 <... />
        <Features />
      </main>
    </div>
  );
};
```
