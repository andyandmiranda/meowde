# MEOWDE 제3자 자산·라이선스 증빙 대장

점검일: 2026-10-15 · 범위: Draft PR #83 Linux 진입 화면 및 공통 index 관련 의존성.

| 자산 | 코드 근거 | 공식 권리·라이선스 근거 | 판단 / 필요한 후속 조치 |
|---|---|---|---|
| Pretendard 웹폰트 | `index.html`, `linux-home.html`, `linux-start.html` 등에서 `orioncactus/pretendard@v1.3.9` CDN 참조 | 제작자 공식 README https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/README.md 는 SIL OFL 1.1 및 상업적 사용 허용을 명시. 공식 라이선스 본문 https://github.com/orioncactus/pretendard/blob/main/packages/pretendard-std/dist/LICENSE.txt | **일반 사용 권한 근거 확보**. CDN 배포 빌드의 상세 라이선스 일치·고지 의무는 릴리스 전에 재확인. 재배포 시 저작권·라이선스 고지 유지. |
| Pyodide | `index.html`은 `pyodide/v0.28.0` CDN JS를 로드 | 공식 README https://github.com/pyodide/pyodide/blob/main/README.md: Mozilla Public License 2.0 | **프로젝트 주 라이선스 식별**. 사용 중인 정확한 버전, 포함 의존 라이선스, 소스 고지 의무는 추가 검토. 실행 격리·보안 점검은 별도. |
| MEOWDE 헤드폰 고양이 | `assets/meowde-approved-headphones.svg`: SVG 안에 base64 WebP 이미지 포함, 승인 이름만 있음 | 파일 자체에서 원저작자·제작 이력·사용 허가/양도 근거 발견되지 않음 | **권리 미확인 · 공개 승인 불가**. 원본 소스, 제작자/생성 방식, 상업 사용·수정·재배포 허가, 원본 파일 및 결정 기록 확보 전 사용 허가를 추정하지 말 것. 기존 디자인은 임의로 교체하지 않음. |
| NVIDIA AI Campus 원문 문제 등 | Production `main/robotics.html`에 브랜드 명칭과 교육 단계 관련 흔적 있음 | 해당 과제 원본과 사용 허가 문서 부재 | **미확인 · 기존 운영 노출 위험**. 퍼블릭 강의 원문 재배포를 하지 말고 별도 대조, 브랜드 제휴 오인 방지. |
| Linux 자체 실습 문항 | `assets/linux-guided-lesson.js`, `linux-crash-course.html`, E9 별도 채점 자산 | 표준 Linux/Bash 문법 사용. 외부 원본 자료와 직접 대조 불가 | **독창성 검증 미완료**. 원본 대조 및 유사한 문제의 별도 교체 후 승인. |

## 리스크 처리

- 확인된 공식 오픈소스 사용 조건과 **개별 자산의 저작권 소유 증빙**을 혼동하지 않는다.
- 가려진/축소된 브랜드 로고라도 사용 허가를 대체하지 않으며, 외부 강의 문항을 단순 치환한 정도로 독창성이 확보되었다고 단정하지 않는다.
- 헤드폰 고양이는 현재 기존 승인 디자인이므로 **교체·삭제가 아닌 증빙 확보**가 우선이다. 공개 사용 자체의 적법성은 현재 확인 불가.
- 모바일 브라우저 확인, 개인정보·기록 보존, 제품 승인과 Production 배포는 별도 게이트다.
