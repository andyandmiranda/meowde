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
