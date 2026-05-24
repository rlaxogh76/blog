---
title: Zustand 파헤쳐보기 #1
category: frontend
date: 2025.03.14
readTime: 8분
desc: Zustand에 대해 자세히 파헤쳐보기
tags: zustand, react, 파헤쳐보기
---

<img src="https://www.heropy.dev/postAssets/n74Tgc/main.jpg" />

## Zustand란?

> 독일어로 "**상태**"라는 뜻이며, 리액트 **전역 상태를 관리**할 수 있게 해주는 **라이브러리**

## 왜 사용해야 할까?

**부모 컴포넌트**가 가진 데이터를 **전역**에서 사용할려면 **자식 컴포넌트**에게 값을 **전달**해줘야하는데, 너무 많은 컴포넌트가 존재한다면 **props drilling**이 **발생**하게 된다.
이런 경우, Zustand와 같은 상태 관리 라이브러리를 통해 전역으로 상태를 관리하여 유지보수를 쉽게 만들 수 있다.

## 언제 사용할까?

- 단순한 props 전달만 필요한 경우
- 상태 범위가 컴포넌트 하나로 끝나는 경우
- 자주 사용되는 기능 : 사용자 인증 여부 관리, 다크모드 여부 관리 등

## 주요 특징

- **1. 간단한 store 구조**

  > 상태와 상태 변경 로직을 한 곳에서 확인할 수 있어, 코드의 흐름을 읽기 쉽다.

- **2. 선택적 상태 구독 방식**

  > store 전체를 구독하는 방식이 아닌, 컴포넌트가 필요로 하는 상태만 구독하여 상태 간의 결합도를 줄이고,
  > 컴포넌트가 맡은 역할에 집중할 수 있다.

- **3. 불필요한 렌더링 최소화**

  > 실제로 사용되는 컴포넌트만 렌더링하여 불필요한 리렌더링을 줄일 수 있다.

- **4. TypeScript와 확장성을 고려한 구조**
  > 미들웨어를 통해 상태 영속화나 개발 도구 연동 등 기능을 확장할 수 있다.

## 기본 사용법

전역으로 사용할 상태와 상태 변경 함수를 store로 생성

```tsx
import { create } from "zustand";

const useBear = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
```

정의한 store을 훅처럼 사용 가능.

```tsx
function BearCounter() {
  const bears = useBear((state) => state.bears);
  return <h1>{bears} bears around here...</h1>;
}

function Controls() {
  const increasePopulation = useBear((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
```
