---
title: JSX는 무엇인가
category: frontend
date: 2025.06.11
readTime: 8분
desc: JSX 개념과 등장 배경, 주요 특징까지 한눈에 알아보기
tags: JSX, React, 파헤쳐보기, Core
---

JS의 확장 문법. HTML과 유사한 구문을 가져 React 컴포넌트 UI를 직관적으로 표현하기 위해 사용한다.

JSX는 React가 아니더라도 JSX를 지원하는 라이브러리인 Vue.js, Solid.js 등에서 사용이 가능하다.

React는 JSX가 아니더라도 `React.createElement()` 호출을 통해 컴파일이 가능하다.

```js
class Hello extends React.Component {
  render() {
    return React.createElement("div", null, `Hello ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Hello, { toWhat: "World" }, null));
```

## 주요 특징

- **HTML과 같은 구문을 통해 UI를 직관적으로 표현이 가능하다.**
- **자바스크립트 내에서 로직과 UI를 구분하여 관리할 수 있다.**
- **{}를 사용하여 자바스크립트 표현식을 통해 동적인 UI를 구성할 수 있다.**

## 주의사항

- **JSX는 반드시 속성을 `camelCase`로 작성해야한다.**
  > 대표적인 예시로 React에서는 class가 아닌 className을 쓰는 경우가 있다.  
  > JSX는 결국 브라우저에서 보이기 위해 JS로 변환되는데,  
  > `class` 속성은 이미 JS에서 예약어로 자리 잡고 있다.  
  > BABEL 입장에선 JSX의 `class`라는 것이 HTML의 것인지, JS의 것인지 알 수 없다.  
  > 이를 해결하기 위해 React 팀에서는 class => className을 사용하도록 했다.
- **태그는 항상 닫아야한다.**
  > JSX에선 HTML과 달리 반드시 모든 태그를 닫아야한다.  
  > 간혹 닫는 태그가 없는 빈 태그 `<br>`, `<img>` 같은 경우도 JSX에서는 반드시 태그를 닫도록 해야한다.
- **최상위 요소는 단 하나만 반환**
  > JSX에서는 여러 엘리먼트를 반환할 때 반드시 하나의 부모로 감싸야 한다.  
  > 최상위 부모 요소를 여러개 나란히 작성할 순 없다.
  >
  > ```jsx
  > <>
  >   {/*최상위 부모 요소로 닫아야함.*/}
  >   <div>
  >     <p>안녕하세요!</p>
  >   </div>
  > </>
  > ```
- **컴포넌트는 반드시 대문자로 시작**

  > `<h1>`와 같이 소문자로 작성할 경우, JSX에선 HTML의 태그로 판단한다.  
  > 만약 컴포넌트를 사용하고 싶다면 `<H1>`와 같이 대문자로 시작하도록 하자.

- **조건부 렌더링 시 && 및 삼항 연산자 활용**

  > JSX 내부에서는 if문을 사용할 수 없다.  
  > 삼항 연산자 (condition ? A : B)나 논리 연산자 (condition && A)를 사용해야한다.

- **인라인 스타일은 객체 형태로 작성**

  > CSS 스타일을 직접 적용할 때 문자열이 아닌 카멜케이스 키를 가진 객체 형태로 작성한다.  
  > 예 : `<div style={{ color: 'red', fontSize: '16px' }}>`

- **중괄호 { }를 사용한 자바스크립트 표현식 삽입**
  > JSX에서는 자바스크립트 표현식 삽입 시 중괄호를 사용해야한다.  
  > 예 : `<span>{name}</span>`

## JSX는 JS와 같은가?

다르다. JSX는 어디까지나 자바스크립트의 확장 문법이기 때문에, JS 표준이라 볼 수 없으며,  
이는 브라우저에서 JS 엔진이 파싱할 수 없어 직접 실행 할 수 없다.

## JSX 변환 과정

과정은 크게 3단계로 나뉜다.

1. BABEL, SWC 같은 트랜스파일러가 JSX 코드를 읽고, 추상 구문 트리(AST)로 변환함.
2. 추상 구문 트리(AST)를 순회하며 JSX 노드를 `React.createElement()` 또는 새로운 jsx 함수 형태로 교체함.
3. 마지막으로 추상 구문 트리를(AST) 브라우저가 이해할 수 있는 순수 자바스크립트 문자열 코드로 출력함.

## JSX를 사용하지 않고 React를 사용하기

```jsx
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Hello toWhat="World" />);
```

위와 같이 작성된 JSX 코드는 아래와 같이 `React.createElement()`를 통해 JSX 없이 사용할 수 있다.

```js
class Hello extends React.Component {
  render() {
    return React.createElement("div", null, `Hello ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Hello, { toWhat: "World" }, null));
```
