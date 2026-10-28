# MEOWDE 1차 통합 출시 게이트 (2026-10-28)

## 범위 고정
- Python 기본 앱의 구현된 1~30 레슨과 심화 실험실 20개 단원
- Linux 첫 폴더 안내 및 E1~E9의 현재 지원 범위(일부 결과 모의, 일부 문법 검사, 일부 개념 퀴즈), 안전한 모바일 시뮬레이터
- ML 첫걸음 4개 주제: Linear/Logistic Regression, KNN, Naive Bayes의 원본 입문 설명·선택형 퀴즈
- 홈 / 학습 / 심화 / 함께 / 마이 5탭 및 기존 학습 기록 보호
- 제외: Python 31~60 기본 앱 직접 실행, ML 실전 sklearn 모델 훈련·다중 작성형 평가, Linux E10 이상, 글로벌 12영역 완성

## 검증 체크리스트 (PASS는 수행한 증거에 한함)
| 게이트 | 상태 | 증거/남은 일 |
| --- | --- | --- |
| Git 개발 HEAD 고정 및 Production 변경 금지 | 확인 | 개발 브랜치만 수정. 릴리스 승인 전 main/Production 불변 유지 |
| Python 기본 1~30 직접 레슨 진입 | 코드 감사 | 개별 Playwright 5개는 새 HEAD에서 NOT RUN |
| Python 홈 저장 손상·권한·quota 회귀 | 코드 감사 | Playwright 6개는 새 HEAD에서 NOT RUN. 이전 분리 저장 로직 Chromium 6/6 결과를 전체 앱 PASS로 간주 금지 |
| Python 심화 20개 진입·Pyodide 직접 채점 | 코드 감사 | 전체 앱 Playwright 및 최신 CI 실제 실행 필요 |
| Linux E1~E9 경로·모바일 시뮬레이터 | 코드 감사 | 가상 명령만 지원; 저장/오답/IME 회귀를 실제 앱에서 검증해야 함 |
| ML 4개 진입·선택형 정오답 판정 | 독립 실행 PASS | 현재 ML 소스에서 정답/오답 및 예제 경로를 별도 검사. 전체 앱 브라우저 NOT RUN |
| ML quota 실패→재시도·읽기 거부·미래 필드 보존 | 독립 실행 4/4 PASS | 저장소 모의 실행. 새 Node 회귀를 CI 워크플로에 추가했으나 실제 CI NOT RUN |
| 정식 ML 회귀 연결 | 코드 감사 | npm validate 및 Validate Meowde의 validate job에 tests/ml-foundations.test.cjs 연결. 실제 실행 NOT RUN |
| 실제 모바일·접근성·브라우저 테스트 | 미통과/미실행 | Chromium, WebKit, 모바일 뷰포트, 키보드 및 새로고침 결과 필요 |
| Production 공개 승인 | 대기 | 사용자 최종 승인 전 배포·main 병합 금지 |

## 출시 승인 전 수행
1. 개발 HEAD 정확한 커밋으로 GitHub Actions Validate Meowde를 배포 없는 수동 실행; Linux/Python/ML 회귀 및 브라우저 결과 로그 수집.
2. 실패하는 저장/채점/직접 진입 테스트 수정. 선행 학습 기록 마이그레이션과 데이터 보존 확인.
3. 출시 후보 해시·배포 대상·기존 Production을 대조하여 사용자의 명시적 승인을 받은 후 별도 배포 절차 시행.

## 경계
- 이 문서의 코드 감사와 독립 모의 검증은 실제 사용자 브라우저 기능 통과를 보증하지 않음.
- 공지에 언급된 수업 진도와 현재 앱의 구현 수준은 다름. ML 입문 4개를 수업 문제를 모두 해결하는 완성형 학습으로 표시하지 않음.

## 2026-10-28 추가 출시 게이트 감사 (개발 HEAD 기반)

### 실행 환경과 최신 CI
- GitHub branch HEAD 확인: 감사 시작 시 `58c03978430151560263aaeb7fb493985dbedb18`와 동일했고, 이후 아래 테스트/문서 커밋만 개발 브랜치에 추가.
- GitHub `fetch_commit_workflow_runs`는 **PR 기반 실행만 조회**하므로 빈 결과는 수동 `workflow_dispatch` 부재의 확정 증거가 아님. 수동 CI의 실제 실행 로그는 이번 환경에서 확인 불가. **최신 HEAD CI = NOT VERIFIED / NOT RUN으로 보류**.
- GitHub combined status에서 `Vercel=failure` 및 `upgradeToPro=build-rate-limit` URL 확인. 이는 **Vercel 빌드 속도 제한**이며 Playwright FAIL이나 Production 배포 실패의 증거가 아님.
- 전체 저장소 Git clone은 컨테이너에서 `Could not resolve host: github.com` DNS 실패. 현 환경에서는 **최신 HEAD 전체 앱 Playwright 실행 불가**. 기존 독립 ML 모의 실행 4/4는 전체 앱 PASS로 전환하지 않음.

### 새 검증 코드 (작성 완료, 실제 Playwright NOT RUN)
- `tests/release-scope-smoke.spec.cjs`: Python 기본 30개 원본 레슨 슬러그/직접 진입(대표 3개), Python 실험실 20개 메뉴/EDA 편집기, Linux E1~E9 직접 진입, ML 4개 오답→정답·새로고침 진도, ML quota 차단→복구, ML 손상 데이터 원본 보존을 다루는 **6개 Playwright 테스트** 추가. 이것들은 **아직 실제 브라우저에서 실행하지 않음**.
- `tests/home-storage-safety.spec.cjs`의 'unknown existing learner fields'와 'future lesson inProgress' 두 테스트는 초기 `localStorage` 재조회만 하던 허점을 보완하여 **`save()===true` 이후 값 보존을 검증**하도록 변경. 이 두 테스트도 **아직 NOT RUN**.
- Python 심화의 Pyodide 채점 전체 통합 및 모바일 WebKit은 별도 실제 브라우저 실행 필요. 기존 `tests/python-lab.browser.cjs`는 독립 실행 프로그램이며 **CI/Playwright 통합 PASS 증거는 없음**.
- CI `pnpm test:browser`가 `tests/*.spec.cjs`를 수집하도록 설정됨. 새 스모크 테스트가 포함될 **예정**일 뿐, 통과 확정은 아님.

### 출시 판단
- **HOLD / 배포 금지**: 최신 개발 HEAD의 자동 테스트 실제 PASS, Python/Linux/ML 통합 브라우저 확인, 저장 데이터 회귀, 배포 제한 해제 및 사용자 최종 승인 전에는 `main` 병합 및 Production 배포하지 않음.
- 본 문서와 새 테스트는 모든 과목을 '완성'으로 바꾸지 않음. 31~60 기본 레슨과 실제 ML 작성형 모델 학습은 현재 출시 범위에 포함되지 않음.

## 개발 HEAD `0ead2505` 이후 검증 갱신 · 2026-10-28

### 실제 실행된 독립 소스 검사
- GitHub에서 읽은 `assets/lessons-ko.js`의 기본 레슨 slug: **30개, 고유값 30개**. Python 기본 앱에서 30개가 직접 열리고 채점되는지는 **브라우저 NOT RUN**.
- `assets/python-lab-content.json` 데이터: **20개 단원, 작성형 평가 기준 91개**, ID/선수 단원 참조/퀴즈 정답 범위/평가 코드의 구조 검사에서 누락 **0개**. Pyodide에서 91개가 실행되는지 **NOT RUN**.
- GitHub에서 읽은 실제 `linux-mobile-simulator.js` + `linux-command-practice.js`를 JS 모듈로 실행하여 E1~E8의 정답형 대표 입력 **8/8 수락**, 지원되지 않는 오답 **8/8 거절**. E4~E8 중 일부는 **문법 검사**이고 실제 Bash 명령 실행 결과가 아님.
- `linux-bash-practice.js` 원본 코드를 실행한 E9 battery·pass 조건문: 정답 코드 각각 **4/4 경계값 통과**, 잘못된 비교 연산자 `-eq`는 각각 거절. 실제 셸 실행 아님.
- `ml-foundations.js` 원본 모듈로 4개 입문 문제 정답 **4/4 수락**, 오답 **4/4 거절**. 실제 브라우저 진도 저장/복원은 **NOT RUN**.

### 새 회귀 테스트와 정적 검사
- `tests/release-scope-smoke.spec.cjs`: 기존 6개 Playwright 시나리오에 **E9 정답 → 수정 → 오답 → 재정답의 다음 버튼 무효화** 시나리오 1개 추가하여 **7개**. 테스트 파일 JavaScript 구문 파싱 성공. **브라우저 실행 NOT RUN**.
- 최신 개발 HEAD에 대한 GitHub Actions의 PR 기반 실행 조회는 **0개**. 이 API는 수동 workflow_dispatch 실행을 포괄하지 않으므로 전체 CI 실행 이력 부재나 CI PASS/FAIL로 단정하지 않음.
- Git clone 실행 시 `Could not resolve host: github.com`으로 전체 리포지토리를 컨테이너에 내려받지 못했음. GitHub 연결 도구로 확인한 개별 소스 기반 JS 실행은 완료했지만 **전체 앱 서버·Playwright·Pyodide 검증은 NOT RUN**.
- 추가 구현 결함을 확인하지 못해 **제품 코드 변경 없음**. 테스트·증거 문서만 개발 브랜치에서 변경.

### 현재 출시 판정
**HOLD**. Python/ML/Linux 대표 소스 검사 통과는 전체 기능 통합 PASS를 대체하지 않음. 최신 HEAD CI, 홈·심화 실브라우저 테스트, 저장·복구, 모바일 검증, Vercel build-rate-limit 해소 및 최종 사용자 승인 전 Production 승격 금지.

## 후속 실행 가능성 점검 (2026-10-28, 개발 HEAD b8aa4ad2)

- 로컬 컨테이너에서 `git ls-remote https://github.com/andyandmiranda/meowde.git HEAD`를 **실제 실행**했으나 `Could not resolve host: github.com`으로 실패. 저장소 전체 소스를 확보하지 못했으므로 로컬 앱 서버 및 최신 전체 앱 Playwright **NOT RUN**. 테스트 자체가 실패한 것은 아님.
- 연결된 GitHub 기능 목록을 조사했으며 `workflow_dispatch`를 신규 트리거하는 동작은 제공되지 않음. GitHub Actions `Validate Meowde`는 `workflow_dispatch`를 지원하지만 실행을 호출할 수 없어 신규 CI **NOT RUN**. PR 연결 실행 조회 결과 0개는 수동 실행 이력을 부정하지 않음.
- `package.json`의 `test:browser`는 `playwright test`, `playwright.config.cjs`는 `tests/`의 `*.spec.cjs`와 `tools/serve-preview.cjs` 로컬 서버를 사용. `tests/release-scope-smoke.spec.cjs` **7개 테스트 문법 검사 PASS**, 실제 Chromium 테스트 **NOT RUN**.
- 브라우저 및 전체 CI용 수동 재현 경로: 개발 브랜치의 **정확한 HEAD**를 checkout한 환경에서 `pnpm install --frozen-lockfile --ignore-scripts` → `pnpm exec playwright install --with-deps chromium` → `pnpm test:browser`; 별도로 `npm run validate` 와 Python 실험실 브라우저 테스트의 실행 조건 확인. 개인 저장 기록을 삭제하거나 Production을 배포하지 않고 검증할 것.
- 이번 점검에서 **신규 재현 가능한 제품 코드 결함 없음**. 출시 판정 **HOLD** 유지. 실제 실행 로그 없이 PASS/FAIL을 추정하지 않음.

## Work UX 결함 채팅 재구현 및 출시 게이트 (2026-10-28)

### 개발 브랜치 수정 (기준 `f9117d528a9c4043f38e3ed88f02c679ac593a89`)
- `v442-map-touch.js`: 레슨 라벨의 가짜 `role=button`, `tabindex=0`, 자체 `aria-label` 제거. 클릭 가능한 텍스트 라벨과 원형 레슨 버튼을 그대로 연결하며 키보드 포커스 대상은 실제 버튼 하나로 제한. 기존 `aria-describedby` 유지.
- `v413-core.js`: 학습 지도 포함 5탭의 '마이' 진입을 루트 화면의 `renderRoom()`으로 통일.
- `tests/issue-101-direct-lesson-entry.spec.cjs`: 루트 접속 후 DATA·S·startLesson 초기화 대기를 추가해 로더 타이밍으로 인한 테스트 경합 최소화.
- `v412-hotfix.js`, `v414-state.js`: 구형 저장 래퍼가 기존 미지 필드와 미래 레슨을 보존하도록 기존 `rawState` 병합, `preserveDeferredLessonState` 반환값 직렬화, 읽기 차단 시 쓰기 금지, 저장 성공·실패 반환값 명시.
- `tests/lesson-resume.test.cjs`: 낡은 직렬화 정규식을 현재 계약에 맞게 갱신하고 양쪽 구형 저장 래퍼의 정상 저장/읽기 거부/quota 6개 경우를 테스트.
- `tests/ui-a11y-guards.test.cjs` 신규; `package.json`의 `npm run validate`에 포함.
- Python 정답 선택의 원본 `v413-lesson.js`는 실제 `button` + `aria-pressed`이며 `role=checkbox`가 없는 것을 **소스 검사로만 확인**. Work가 언급한 스크린리더 역할 불일치는 정확한 DOM/보조기기 재현이 없어 임의 역할 변경하지 않음.

### 이번 대화에서 실제 실행한 검증
- GitHub에서 읽은 구형 저장 래퍼의 **실제 함수 본문**을 JS 격리 환경에서 실행: 2개 래퍼 × 정상/읽기 차단/quota **6/6 PASS**. 정상 시 미지 필드 및 미래 레슨 기록 보존, 읽기 거부 시 0건 쓰기, quota 시 실패 반환 확인. **Node 전체 테스트/브라우저 테스트를 실행한 증거 아님**.
- 현재 개발 브랜치 소스에서 지도 중복 포커스 제거·마이 경로·기본 선택 버튼 시맨틱·두 저장 계약·Issue 101 초기화 대기·검증 명령 연결 6항목 **소스 검사 PASS**. 변경된 JS/테스트 JS 파싱 확인.
- Work 대화에서 사용자가 전달한 기록: 수정 전 Issue101 **1/5**, 수정 후 핵심 Chromium 회귀 **8/8 PASS 보고**, 전체 `validate`는 이전 저장 회귀 **1개 FAIL 보고**. 원본 로그/정확한 SHA를 이 대화에서 확인한 것은 아니므로 **별도 외부 보고로 분류**, 본 브랜치의 새 HEAD 실제 PASS로 계상하지 않음.

### 남은 출시 차단
- 정확한 새 HEAD에서 `npm run validate`, `pnpm test:browser`, Linux/Python/ML 저장 및 키보드·스크린리더 브라우저 검증 **NOT RUN**.
- Python 선택 버튼의 실제 스크린리더 체크박스 불일치 **추가 재현 필요**. 현재 소스와 Work 설명 사이에 불일치가 있어 미확인 상태.
- **HOLD**: 실제 통합 실행 로그·기록 보존·모바일 확인과 사용자 승인 전 `main` 병합/Production 배포 금지. 기존 학습 기록 변경·삭제 없음.

## 사용자가 보고한 과목별 구조·화면 폭 불일치 대응 (2026-10-28)

### 사용자 화면 근거
- 제공된 Preview 스크린샷에서 Python 심화 실습은 큰 데스크톱에서도 약 320px 폭의 한 열로 출력되고, 긴 단원 목록을 펼치면 과제 내용이 아래로 밀림.
- Linux는 별도 학습 지도/첫 레슨/E1~E9/복습 화면으로 나뉘어 상단 과목 선택과 공통 레이아웃 일관성이 떨어짐.
- ML 첫걸음은 입문 4개 개념 퀴즈이며 심화 Python과 다른 시각적 구조. 현재 실제 코딩/모델 구현 완성 과목으로 표시하지 않음.
- 현 시점 직접 운영하는 학습 엔진은 **Python·Linux 2개**. ML은 입문 보충 콘텐츠로서 Python 심화에 연결되고, 다른 과목 추가는 이번 출시 범위에 없음.

### 개발 브랜치에 적용한 UI 구조 수정
- `assets/learning-surface-ui.css`: 900px 이상 화면에 Python 심화 **1080px 최대 너비, 250px 왼쪽 단원 탐색 + 오른쪽 실습** 구조를 다시 적용. 모바일 좁은 화면은 기존 한 열 유지.
- `assets/linux-shared-navigation.js` 및 CSS: `linux-home.html`, `linux-start.html`, `linux-crash-course.html`, `linux-review.html`의 공통 머리글 아래 **Python / Linux 과목 선택**을 추가. Linux 현재 과목 표시, 공통 5탭 유지.
- `assets/linux-learning-ui.css`, `assets/linux-shared-navigation.css`: 900px 이상 Linux 데스크톱 폭을 최대 760px로 늘리고 모바일 레이아웃은 유지. 과목 전환 탭 키보드 포커스 스타일 적용.
- `tests/subject-switch-layout.test.cjs` 3개 정적 회귀를 추가하고 `npm run validate`에 연결.
- **Linux 교육 데이터, 진도 저장 키 및 기존 학습 완료 기록은 수정하지 않음.** 제품 전체 구조를 완전히 통합한 것이 아니라 공통 탐색과 레이아웃 1차 정렬임.

### 검증 수준
- GitHub 최신 소스에서 과목 전환 삽입, 저장 쓰기 부재, Python·Linux 데스크톱 브레이크포인트 및 테스트 JS 구문을 **소스 독립 검사 5/5 PASS**.
- Node `npm run validate`, 데스크톱/모바일 실브라우저, 새 Linux 과목 전환 및 콘텐츠 배치, Python 심화 Pyodide 채점은 이 수정 HEAD에서 **NOT RUN**.
- Vercel Production 신규 배포는 앞선 사용자 요청에서 HTTP 402 `api-deployments-free-per-day` 제한으로 **차단**됐고 기존 Production 유지. 최신 UI는 배포 확인 전 Preview에서 PASS 주장 금지.
- 1차 출시 게이트 **HOLD**. 과목 통합 화면, 학습 엔진 공통화, 추가 과목 콘텐츠는 후속 구조 작업으로 관리.

## 2026-10-28 과목 선택·5탭 화면 구조 재조정

### 사용자 피드백 반영
- Linux 상단에 새로 넣었던 **큰 2열 과목 전환**은 기존 UX에 비해 과도하다는 피드백을 받아 제거하고, 우측 상단 기존 브랜드 영역에 **작은 Python/Linux 선택 메뉴**로 변경. Linux 과목 진도 엔진·저장 키는 변경하지 않음.
- Python 홈·학습·마이와 달리 심화 실습·함께 페이지가 별도 헤더, 좁은 콘텐츠 폭, 다른 하단 탭 스타일을 사용한다는 피드백에 따라, 두 HTML 화면에 `assets/shared-five-tab-shell.css` 공통 헤더·하단 5탭 스타일 및 우측 상단 작은 과목 메뉴를 적용.
- Python 심화의 900px 이상 2열 레이아웃 변경은 유지. 함께 페이지는 데스크톱 최대 760px 콘텐츠, 휴대전화 430px 폭을 사용. 기존 함께 초대 링크 생성·공유 로직과 Python 심화 저장/채점 로직 수정 없음.
- Linux는 하단 5탭·상단 과목 선택을 공유하지만, 레슨 엔진·학습 지도는 여전히 별도 구현이므로 **전체 구조 완전 통합 완료라고 주장하지 않음**.

### 검증
- 개발 브랜치 최신 파일 원본을 다시 조회해 Python 심화·함께에서 공통 스타일 링크/동일 헤더/작은 과목 선택/5탭 라벨 모두 존재, Linux 새 큰 전환 제거 및 작은 우측 메뉴 적용, 과목 선택 코드에 localStorage 쓰기 없음 확인: **소스 계약 검사 PASS**.
- `tests/subject-switch-layout.test.cjs`를 작은 메뉴 기준으로 변경. `tests/shared-shell-consistency.test.cjs` 3개를 추가해 `npm run validate`에 연결. JavaScript 문법 검사 **PASS**, 실제 Node test 및 브라우저에서의 화면 배치 **NOT RUN**.
- Vercel 일일 빌드 제한으로 새 Preview/Production 배포 성공 미확인. 수정 전 Preview 스크린샷으로 이번 변경을 PASS 판정하지 않음. 출시 게이트 **HOLD**.

## 과목 확장 단계 — 기존 콘텐츠 기반 3번째 진입 영역 (2026-10-28)

### 구현 범위
- Python (기본 30레슨/심화 20단원), Linux (첫걸음/E1~E9)과 더불어 기존 ML 입문 4주제(Linear Regression, Logistic Regression, KNN, Naive Bayes)를 **세 번째 탐색 가능한 학습 영역**으로 노출.
- `assets/meowde-subject-hub.js` 기존 '나의 학습'에 ML 기록을 **읽기 전용**으로 집계, `assets/meowde-subject-hub.css`의 3개 카드 반응형 배치.
- `subjects.html` 신규 과목 목록: Python·Linux·ML 입문에는 실제 엔진 링크, 웹 개발·데이터베이스·Git 협업은 **준비 중**으로만 표시. 미구현 과목은 학습 시작 버튼·완료 상태 없음.
- `ml-foundations.html`에 기존 공통 상단 헤더 및 하단 5탭 추가. `python-lab.html`, `together.html`, `assets/linux-shared-navigation.js`의 **작은 우측 과목 선택**에 ML 입문 추가. `learning-path.html`에서 전체 과목 바로가기.
- **ML은 여전히 입문 개념/선택형 퀴즈 4개이며 실제 모델 훈련 과목으로 확장된 것이 아님.** Python·Linux·ML 원본 문제/채점기/기존 사용자 진도 저장 포맷 변경 없음. 웹 개발, SQL, Git 신규 수업 콘텐츠 제작은 별도 단계.
- `tests/subject-catalog.test.cjs` 추가, `npm run validate`에 포함.

### 검증 및 배포 판정
- GitHub 개발 브랜치 파일 기준 ML 집계·Python/Linux 진도 읽기·추가 과목 경로·공통 ML 5탭·작은 과목 선택·준비 중 표기·읽기 전용 검사 **12/12 소스 및 격리 JS 실행 PASS**, 신규 테스트 구문 파싱 PASS.
- 정확한 최신 개발 HEAD에서 `npm run validate` 전체와 브라우저 Playwright, 스크린리더, 과목별 새로고침·복원은 **NOT RUN**. 기존 Work에서 확인한 Chromium 8/8 결과는 현재 HEAD의 증거가 아님.
- 2026-10-28 앞선 Production 배포 요청은 Vercel `402 api-deployments-free-per-day` 한도 초과. Production 현재 실제 배포 SHA `744ceaf306c0241aea1124ccb5e3a91ed55c8d9d` (READY), 최신 개발 변경 미반영. 계정 요금제·설정은 수정하지 않음.
- **출시 상태 HOLD**: 다중 학습 영역 진입 QA와 데이터 보존 회귀·새 SHA 검증 전 Production 승격을 완료로 표시하지 않음.
