# Meowde v4.23 Canonical Data

## 기준

`assets/lessons-ko.js`와 `assets/lessons-en.js`를 canonical source로 사용한다.

## 생성 파일

- `assets/lessons-ko.js`
- `assets/lessons-en.js`

위 파일은 `tools/generate-canonical-lessons.js`가 자동 생성하며 수동 수정하지 않는다.

## 검증 원칙

`tools/validate-canonical-lessons.js`는 다음을 확인한다.

1. `index.html DATA`와 canonical 파일의 구조적 SHA-256이 동일한지
2. 한국어와 영어 레슨 수가 각각 30개인지
3. 한국어와 영어 문항 수가 각각 170개인지
4. JSON 직렬화 과정에서 필드나 값이 손실되지 않았는지

## 현재 상태

v4.23 런타임은 canonical 파일을 우선 사용한다.

`assets/lessons-fallback.js`는 canonical 파일에서 자동 생성되는 외부 fallback이다.

`index.html`에는 더 이상 대용량 lesson DATA가 내장되지 않는다.
