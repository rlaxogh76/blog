---
id: 1
title: React 19의 새로운 기능들
category: frontend
date: 2025.04.20
readTime: 8분
desc: React 19에서 도입된 use() 훅, 서버 컴포넌트 안정화, 그리고 새로운 훅들을 실제 예시와 함께 살펴봅니다.
tags: react, frontend, web
---

## 들어가며

React 19는 2024년 말 정식 릴리즈되며 많은 변화를 가져왔습니다. 이번 글에서는 가장 주목할 만한 기능들을 하나씩 살펴봅니다.

## use() 훅

기존의 `useContext`와 `Suspense`를 대체할 수 있는 새로운 `use()` 훅이 등장했습니다.

```jsx
function UserProfile() {
  const user = use(UserContext);
  const data = use(fetchUserData(user.id));
  return <div>{data.name}</div>;
}
```

`use()`는 **Promise와 Context 모두**를 받을 수 있어 훨씬 유연합니다.

### 왜 use()가 중요한가

기존 훅과 달리 `use()`는 조건문 안에서도 호출할 수 있습니다. 이는 React의 기존 규칙을 일부 완화한 것으로, 더 직관적인 코드 작성을 가능하게 합니다.

## 서버 액션

Next.js의 Server Actions가 React 코어로 흡수되었습니다.

```jsx
async function updatePost(formData) {
  'use server';
  await db.post.update({ data: formData });
}
```

## 새로운 훅들

### useActionState

Form 액션의 상태를 관리하는 새로운 훅입니다.

```jsx
const [state, action] = useActionState(submitForm, initialState);
```

### useOptimistic

낙관적 업데이트를 위한 훅으로, UX를 크게 개선할 수 있습니다.

```jsx
const [optimisticPosts, addOptimisticPost] = useOptimistic(posts);
```

## 마치며

React 19는 서버 중심 아키텍처로의 전환을 본격화하는 버전입니다. 특히 풀스택 프레임워크와의 통합이 더욱 긴밀해졌습니다.
