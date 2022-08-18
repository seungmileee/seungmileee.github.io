---
date: '2022-08-13'
title: '조건문'
categories: ['JS']
summary: '조건문은 주어진 조건식(Boolean 값으로 평가될 수 있는 표현식) 의 평가 결과에 따라 코드 블록의 실행을 결정한다.
자바스크립트는 if ... else문과 switch문으로 두 가지 조건문을 제공한다.'
thumbnail: './JS.png'
---

### 조건문

> 조건문은 주어진 조건식(Boolean 값으로 평가될 수 있는 표현식) 의 평가 결과에 따라 코드 블록의 실행을 결정한다.
> 자바스크립트는 if ... else문과 switch문으로 두 가지 조건문을 제공한다.

### 1) if ... else 문

if ... else문은 주어진 조건식의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정한다.
즉, 조건식의 결과가 true일 경우 if문의 코드 블록이 실행되고, 조건식의 결과가 false일 경우 else문의 코드 블록이 실행된다.

```javascript
const num = 0

if (num > 0) {
  //num > 0 의 결과가 true라면
  console.log('num은 양수입니다.')
} else {
  //num > 0 의 결과가 false라면
  console.log('num은 음수입니다.')
}
```

조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 else if문을 사용한다.
if문과 else문은 2번 이상 사용할 수 없지만 else if문은 여러 번 사용할 수 있다.

```javascript
const num = 3

if (num > 0) {
  //num > 0의 결과가 true라면
  console.log('num은 양수입니다.')
} else if (num === 0) {
  //num === 0의 결과가 true라면
  console.log('num은 0입니다.')
} else {
  //num > 0 && num === 0 의 결과가 false라면
  console.log('num은 음수입니다.')
}
```

만약 코드 블록 내의 문이 하나라면 중괄호를 생략할 수 있다.

```javascript
const num = 3

if (num > 0) console.log('num은 양수입니다.')
else if (num === 0) console.log('num은 0입니다.')
else console.log('num은 음수입니다.')
```

대부분의 if ... else문은 삼항연산자로 바꿔쓸 수 있다.

>

```
[삼항연산자]
<조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일 때 반환할 값>
물음표 앞의 조건식(첫 번째 피연산자) -> Boolean 타입의 값으로 평가될 표현식
두 번째 피연산자 -> 조건식이 true로 평가되면 두 번째 피연산자 반환
세 번째 피연산자 -> 조건식이 false로 평가되면 세 번째 피연산자 반환
```

```javascript
const num = 3

const result = num > 0 ? 'num은 양수입니다.' : 'num은 음수입니다.'
console.log(result)
```

```javascript
const num = 3

const result = num
  ? num > 0
    ? 'num은 양수입니다.'
    : 'num은 음수입니다.'
  : 'num은 0입니다.'
console.log(result)
```

### 2) switch문

```javascript
switch (표현식) {
  case 표현식1:
    swtich 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;  //break문을 만나면 코드의 실행을 멈춘다.
  case 표현식2:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:  //선택사항으로 사용할 수도 있고 사용하지 않을 수도 있다.
    switch 문의 표현식과 일치하는 case문이 없을 때 실행될 문;
}
```

if ... else문의 조건식은 Boolean 값으로 평가되어야 하지만 switch문의 표현식은 Boolean 값보다는 문자열이나 숫자값인 경우가 많다.
다시말해, if ... else문은 논리적 true, false로 실행할 코드 블록을 결정할 때 사용된다.
switch문은 다양한 case에 따라 실행할 코드 블록을 결정할 때 사용된다.

switch문에서 break 문은 코드 실행을 멈추는 역할을 한다. break문이 없다면 case문의 표현식과 일치하는지 여부를 판단하지 않고 다음 이어지는 case문을 연이어 실행한다.

```javascript
const num = 3

switch (num) {
  case 2:
    console.log('num은 2입니다.')
  case 3:
    console.log('num은 3입니다.')
  case 4:
    console.log('num은 4입니다.')
  case 5:
    console.log('num은 5입니다.')
  default:
    console.log('num의 값을 파악할 수 없습니다.')
}
//num은 3입니다.
//num은 4입니다.
//num은 5입니다.
//num의 값을 파악할 수 없습니다.
```

break문을 사용한 올바른 switch문은 다음과 같다.

```javascript
const num = 3

switch (num) {
  case 2:
    console.log('num은 2입니다.')
    break
  case 3:
    console.log('num은 3입니다.')
    break
  case 4:
    console.log('num은 4입니다.')
    break
  case 5:
    console.log('num은 5입니다.')
    break
  default:
    console.log('num의 값을 파악할 수 없습니다.') //switch문이 끝나므로 break문을 사용할 필요가 없다.
}
//num은 3입니다.
```
