# Meowde v4.23 Canonical Data

## 기준

현재 실제 실행 데이터인 `index.html`의 `DATA`를 canonical source로 사용한다.

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

이번 Phase 3에서는 canonical 파일만 생성한다.

런타임은 아직 `index.html DATA`를 사용하며, `v412.html`과 Service Worker 로드 목록은 변경하지 않는다.

다음 Phase에서 런타임 로더를 canonical 파일로 전환한다.
