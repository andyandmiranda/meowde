# MEOWDE 제3자 자산·라이선스 증빙 대장

점검일: 2026-10-15 · 범위: Draft PR #83 Linux 진입 화면 및 공통 index 관련 의존성.

| 자산 | 코드 근거 | 공식 권리·라이선스 근거 | 판단 / 필요한 후속 조치 |
|---|---|---|---|
| Pretendard 웹폰트 | `index.html`, `linux-home.html`, `linux-start.html` 등에서 `orioncactus/pretendard@v1.3.9` CDN 참조 | 제작자 공식 README https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/README.md 는 SIL OFL 1.1 및 상업적 사용 허용을 명시. 공식 라이선스 본문 https://github.com/orioncactus/pretendard/blob/main/packages/pretendard-std/dist/LICENSE.txt | **일반 사용 권한 근거 확보**. CDN 배포 빌드의 상세 라이선스 일치·고지 의무는 릴리스 전에 재확인. 재배포 시 저작권·라이선스 고지 유지. |
| Pyodide | `index.html`은 `pyodide/v0.28.0` CDN JS를 로드 | 공식 README https://github.com/pyodide/pyodide/blob/main/README.md: Mozilla Public License 2.0 | **프로젝트 주 라이선스 식별**. 사용 중인 정확한 버전, 포함 의존 라이선스, 소스 고지 의무는 추가 검토. 실행 격리·보안 점검은 별도. |
| MEOWDE 헤드폰 고양이 | `assets/meowde-approved-headphones.svg`: SVG 안에 base64 WebP 이미지 포함, 승인 이름만 있음 | 파일 자체에서 원저작자·제작 이력·사용 허가/양도 근거 발견되지 않음 | **PO가 직접 제작했다고 명시적으로 확인(2026-10-15)**. 외부 제3자 요소가 포함되지 않았는지 및 원본 제작 파일 보관 여부는 별도 확인. 기존 디자인은 임의로 교체하지 않음. |
| NVIDIA AI Campus 원문 문제 등 | Production `main/robotics.html`에 브랜드 명칭과 교육 단계 관련 흔적 있음 | 해당 과제 원본과 사용 허가 문서 부재 | **미확인 · 기존 운영 노출 위험**. 퍼블릭 강의 원문 재배포를 하지 말고 별도 대조, 브랜드 제휴 오인 방지. |
| Linux 자체 실습 문항 | `assets/linux-guided-lesson.js`, `linux-crash-course.html`, E9 별도 채점 자산 | 표준 Linux/Bash 문법 사용. 외부 원본 자료와 직접 대조 불가 | **독창성 검증 미완료**. 원본 대조 및 유사한 문제의 별도 교체 후 승인. |

## 리스크 처리

- 확인된 공식 오픈소스 사용 조건과 **개별 자산의 저작권 소유 증빙**을 혼동하지 않는다.
- 가려진/축소된 브랜드 로고라도 사용 허가를 대체하지 않으며, 외부 강의 문항을 단순 치환한 정도로 독창성이 확보되었다고 단정하지 않는다.
- 헤드폰 고양이는 현재 기존 승인 디자인이므로 **교체·삭제가 아닌 증빙 확보**가 우선이다. 공개 사용 자체의 적법성은 현재 확인 불가.
- 모바일 브라우저 확인, 개인정보·기록 보존, 제품 승인과 Production 배포는 별도 게이트다.

## 제작 이력 추가 조사 (2026-10-15)

- GitHub 과거 커밋 [e9e9985](https://github.com/andyandmiranda/meowde/commit/e9e998527b66924504c4ceae4a6fd8cfbcc3e60c)에는 당시 승인된 v4.50 캐릭터 상태 복원 기록이 있으며 `assets/characters/v451/meowde-music.svg` 등 여러 캐릭터 파일의 변경 이력이 있음.
- [5830e7c](https://github.com/andyandmiranda/meowde/commit/5830e7ceff429b3e67eef53d68ee67b1fa256390)은 iPhone Safari 캐릭터 렌더링 오류 수정 이력을 보여줌.
- 이는 **캐릭터 자산이 프로젝트에 오래전부터 존재했다는 구현 이력**일 뿐, 현행 `assets/meowde-approved-headphones.svg`에 내장된 WebP의 원제작자나 상업적 이용 권한 증빙이 아님. 두 파일이 동일 이미지인지도 확인하지 않았음.
- 연결된 Project/대화 파일 검색에서 NVIDIA 강의 원본 E1~E9 자료를 찾지 못함. 검색 결과 없음은 원본 부재의 증거가 아니며, 원본 교재 유사성 직접 비교는 **미실행**.
- **출시 게이트 유지:** 원제작 기록·명시적인 권리 허가 확보 또는 해당 자산을 공개 버전에서 비노출 처리하는 대안을 PO와 검토. 사용자 기록·승인 디자인은 삭제하지 않는다.

## PO 제작자 확인 (2026-10-15)

PO가 대화에서 **MEOWDE 고양이 캐릭터들은 자신이 직접 제작했다**고 명시했다. 이에 따라 ‘제작자 불명’ 추정은 철회하고 **PO 자체 제작 캐릭터**로 분류한다. 이 진술은 소유·제작자 확인의 중요한 1차 근거이지만 제3자 이미지·폰트·소재 혼입 여부나 원본 파일의 보관까지 별도로 검증한 것은 아니다. 현재 승인된 캐릭터를 임의로 삭제·교체하지 않는다. 출시 게이트는 NVIDIA 관련 원본 교재 대조, 기타 제3자 자산 라이선스 의무와 실제 학습/모바일 QA에 집중한다.
