---
title: Zustand 사용해보기 #2
category: frontend
date: 2025.03.14
readTime: 8분
desc: Zustand의 사용법 알아보기
tags: zustand, React, 파헤쳐보기
---

<img src="https://www.heropy.dev/postAssets/n74Tgc/main.jpg" alt="출처 : heropy.dev 블로그" />

## 시작하기

먼저 zustand를 설치해야한다. 필자는 npm을 통해 설치를 진행하였다.

```bash
npm i zustand
```

## 사용법

설치 후 먼저 zustand의 시작인 **Store**을 생성해야한다.  
zustand에선 **create** 함수를 통해 스토어를 생성할 수 있다.

```jsx
import { create } from "zustand";

export const use이름Store = create((set, get) => {
  return {
    상태: 초깃값,
    액션: 함수,
  };
});
```

create 함수는 다음과 같은 특징을 가진다.

- 콜백으로 **set**, **get** 매개변수를 가짐 => 상태 변경 & 조회 가능.
- 콜백이 반환하는 과정에서 속성은 상태(State), 메소드는 액션(Action)라고 함.
- 함수 호출에서 반환하는 스토어 훅은 **useCountState**와 같이 접두사를 명명하여 컴포넌트로 사용할 수 있음.

## 실습 - 카운트 기능 구현

간단한 숫자 카운트 페이지를 만든다고 가정해보자.

숫자 카운트에 대한 스토어는 다음과 같이 만들 수 있다.

```tsx
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CounterState {
  // 카운터 상태 인터페이스 정의
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  // 카운터 상태 관리 스토어 생성
  count: 0, // 초기값 설정
  increment: () => set((state) => ({ count: state.count + 1 })), // 카운터 증가 함수
  decrement: () => set((state) => ({ count: state.count - 1 })), // 카운터 감소 함수
  reset: () => set({ count: 0 }), // 카운터 초기화 함수
}));
```
