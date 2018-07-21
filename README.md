# TypeScript BLOG

## TS, React, Node, MongoDB 를 통해서 만든 블로그 웹 사이트

현재 돌아가고 있는 웹 사이트 주소입니다.

[블로그 사이트](https://no-more-violence.herokuapp.com)

### 사용한 기술 스택

> Front-End: React.js, TypeScript.
>
> Back-End: Node.js, MongoDB.

---

### API 소개

#### Auth

```typescript
POST

회원가입: '/api/auth/register'

headers: {
  'Content-Type': 'application/json'
}

params: {

}

body: {
  username: string
  password: string
}

RESPONSE: {
  message: string,
  admin: boolean
}
```

```typescript
POST

로그인: '/api/auth/login'

headers: {
  'Content-Type': 'application/json',
}

params: {

}

body: {
  username: string,
  password: string
}

RESPONSE: {
  success: boolean
  message: string,
  token: string | null
}
```

```typescript
POST

자동 로그인: /api/auto/check

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {

}

body: {

}

RESPONSE: {
  success: boolean | null,
  message: string | null,
  info: string | null
}
```

---

#### Category

```typescript
POST

카테고리 조회: '/api/:category' || '/api/categories'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category
}

body: {

}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
POST

카테고리 추가: '/api/:category'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category
}

body: {

}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
PATCH

카테고리 변경: '/api/:category'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category
}

body: {
  changeCategory
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
DELETE

카테고리 삭제: '/api/:category'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category
}

body: {
  doubleCheck
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

---

#### Post

```typescript
GET

포스트 조회: '/api/:category/:title'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category,
  title
}

query: {
  type: number
}

body: {

}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
POST

포스트 추가: '/api/:category/:title'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category,
  title
}

body: {
  subTitle: string,
  mainText: string
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
PUT

포스트 수정: '/api/:category/:title'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category,
  title
}

body: {
  changeCategory: string
  changeTitle: string,
  changeSubTitle: string,
  changeMainText: string
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
DELETE

포스트  삭제: '/api/:category/:title'

headers: {
  'Content-Type': 'application/json',
  'x-access-token': string
}

params: {
  category,
  title
}

body: {

}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

---

#### Ripple

```typescript
GET

댓글 조회: '/api/:category/:title/:writer/:toporchild?topID=value'

headers: {
  'Content-Type': 'application/json'
}

params: {
  category,
  title,
  toporchild
}

body: {

}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
POST

댓글 추가: '/api/:category/:title/:writer/:toporchild?topID=value'

headers: {
  'Content-Type': 'application/json'
}

params: {
  category,
  title,
  writer,
  toporchild
}

body: {
  ripple: string,
  password: string,
  topID: ObjectID
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
PATCH

댓글 수정: '/api/:category/:title/:writer/:toporchild'

headers: {
  'Content-Type': 'application/json'
}

params: {
  category,
  title,
  writer,
  toporchild
}

body: {
  password: string
  text: string
  topID: string
  rippleID: objectID
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```

```typescript
DELETE

댓글 삭제: '/api/:category/:title/:writer/:toporchild'

headers: {
  'Content-Type': 'application/json'
}

params: {
  category,
  title,
  writer,
  toporchild
}

body: {
  topID: string
  rippleID: ObjectID
  password: string
}

RESPONSE: {
  success: boolean,
  message: string,
  value: Object[]
}
```
