# Meowde v4.23 Phase 2 Data Audit

## 판정

현재 실제 실행 기준은 `index.html`의 `DATA`입니다. assets 데이터는 언어별 완성도와 문항 수가 불일치하므로 이번 단계에서 런타임으로 전환하지 않습니다.

## 총계

| 소스 | KO | EN |
|---|---:|---:|
| runtime lessons | 30 | 30 |
| runtime exercises | 170 | 170 |
| assets lessons | 30 | 20 |
| assets exercises | 180 | 120 |

## 한국어

- 동일 레슨: 20
- 차이 레슨: 10
- 런타임 전용 레슨: 없음
- assets 전용 레슨: 없음
- 런타임 전용 문항: 10
- assets 전용 문항: 20
- 같은 ID지만 내용이 다른 문항: 40

### index-tower
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: index-tower-p
- assets only: index-tower-p1, index-tower-p2
- changed: index-tower-c, index-tower-f, index-tower-b, index-tower-w
- lesson fields changed: description

### append-dock
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: append-dock-p
- assets only: append-dock-p1, append-dock-p2
- changed: append-dock-c, append-dock-f, append-dock-b, append-dock-w
- lesson fields changed: description

### loop-hill
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: loop-hill-p
- assets only: loop-hill-p1, loop-hill-p2
- changed: loop-hill-c, loop-hill-f, loop-hill-b, loop-hill-w
- lesson fields changed: focus, description

### range-rail
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: range-rail-p
- assets only: range-rail-p1, range-rail-p2
- changed: range-rail-c, range-rail-f, range-rail-b, range-rail-w
- lesson fields changed: focus, description

### while-cave
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: while-cave-p
- assets only: while-cave-p1, while-cave-p2
- changed: while-cave-c, while-cave-f, while-cave-b, while-cave-w
- lesson fields changed: focus, description

### function-house
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: function-house-p
- assets only: function-house-p1, function-house-p2
- changed: function-house-c, function-house-f, function-house-b, function-house-w
- lesson fields changed: description

### parameter-mail
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: parameter-mail-p
- assets only: parameter-mail-p1, parameter-mail-p2
- changed: parameter-mail-c, parameter-mail-f, parameter-mail-b, parameter-mail-w
- lesson fields changed: description

### return-spring
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: return-spring-p
- assets only: return-spring-p1, return-spring-p2
- changed: return-spring-c, return-spring-f, return-spring-b, return-spring-w
- lesson fields changed: focus, description

### mini-project
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: mini-project-p
- assets only: mini-project-p1, mini-project-p2
- changed: mini-project-c, mini-project-f, mini-project-b, mini-project-w
- lesson fields changed: focus, description, output

### boss-bug
- 상태: different
- 문항 수: runtime 5 / assets 6
- runtime only: boss-bug-p
- assets only: boss-bug-p1, boss-bug-p2
- changed: boss-bug-c, boss-bug-f, boss-bug-b, boss-bug-w
- lesson fields changed: focus, description, output

## 영어

- 동일 레슨: 20
- 차이 레슨: 0
- 런타임 전용 레슨: index-tower, append-dock, loop-hill, range-rail, while-cave, function-house, parameter-mail, return-spring, mini-project, boss-bug
- assets 전용 레슨: 없음
- 런타임 전용 문항: 0
- assets 전용 문항: 0
- 같은 ID지만 내용이 다른 문항: 0

### index-tower
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### append-dock
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### loop-hill
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### range-rail
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### while-cave
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### function-house
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### parameter-mail
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### return-spring
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### mini-project
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

### boss-bug
- 상태: runtime-only
- 문항 수: runtime 5 / assets 0

## 권고

1. v4.23에서는 `index.html DATA`를 canonical로 유지합니다.
2. assets 파일은 즉시 삭제하지 않고 legacy 후보 데이터로 보존합니다.
3. 다음 단계에서 canonical DATA를 새 `assets/lessons-ko.js`, `assets/lessons-en.js`로 자동 생성하고, 해시 동등성 검증 후 로더를 전환합니다.
4. 전환 전후 문항 수, slug 순서, ID, 정답, 저장 데이터 호환성을 모두 검증합니다.
