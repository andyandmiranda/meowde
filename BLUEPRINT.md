# MEOWDE Blueprint — curriculum-first vNext (2026-11-05)

Status: curriculum contract / incremental implementation, **not** a claim that the full learning path is shipped.
Design baseline: Git commit `9f953b5f70407a9306f79275da2e7d5a96eaeec4`, especially the ML connected learning-node map. Maintain shared header, five tabs (Home, Learn, Deepen, Together, My), and common Home/Together/My while keeping subject-specific learning engines.

## Product outcome & scope
A novice can progress inside MEOWDE from Python fundamentals to independently implementing, training, debugging, evaluating, saving and reloading a small PyTorch neural network, and explain model limitations. This is an **outcome target**, not a current capability. Browser-only static pages do not yet provide a full PyTorch GPU runtime; real code execution environments need explicit implementation and testing. Do not mislabel multiple-choice completion as model-building proficiency.

## Verified starting inventory
- Python: existing approximately 30-lesson map, Pyodide execution for Python exercises; advanced coding proficiency **not established**.
- Linux: existing 12-unit basics with other E1–E9 materials, simulator (not a real shell); environment setup proficiency **not established**.
- ML: four foundational models (linear, logistic, kNN, naive Bayes) and scoring; no demonstrated end-to-end scikit-learn training.
- DL: **17 introduction units**, exactly **51 check/apply/recall questions**, storage `meowde-deep-foundations-v1`. This is **DL introduction**, not practical model training.
- Keep approved ML map geometry, states, spacing and palette. Apply shared shell without redesigning the approved map.

## Prerequisite graph, learning stages, and evidence
| Stage | Prerequisites | Core capabilities | Realistic exit evidence |
| --- | --- | --- | --- |
| P1 Python | none | values, control flow, functions, collections, errors, files, modules, basic OOP | independently code, run and repair a multi-function program against hidden tests |
| P2 Linux + dev tools | P1 selected units | paths, permissions, command-line, virtual environments, Git, installing dependencies | reproduce a project setup and diagnose a broken environment; simulator tasks explicitly labelled simulation |
| P3 data + maths bridge | P1, selected P2 | NumPy/Pandas, plots, vectors/matrices, derivatives, probability, evaluation splits | calculate shapes and simple gradients, prepare a dataset without leakage |
| P4 applied ML | P3 | preprocessing, training/validation/test, regression/classification, metrics, overfit and reproducibility | train and compare two sklearn models; report baseline, validation and held-out test |
| P5 DL foundation | P3-P4 | current 17 DL units, tensor, forward, loss, backprop, optimizer, loops | complete existing 51 questions **plus** manually work through gradient and verify a train step |
| P6 PyTorch + capstone | P5 | Dataset/DataLoader, nn.Module, autograd, loss/optimizer, CPU/GPU portability, train/eval, debugging, checkpoints, inference; later CNN + transformer/fine-tuning | write and run a repeatable train/validation/test pipeline, improve baseline, explain learning curves, save/load model, perform inference on new data |

Do not add more top-level subject tabs for prerequisite modules; map them as connected units inside learning paths. Scoring and unlocking must depend on real evidence, not attendance or number of clicks.

## Five-step lesson contract
1. **Concept**: explain one learning objective, prerequisite and common misconception in plain Korean.
2. **Worked example**: annotate a trace or runnable example, with input → state → output.
3. **Guided practice**: learner predicts/edits a small component with targeted feedback.
4. **Independent application**: new problem with executable tests or numeric validation; errors explain *why* and how to retry.
5. **Retrieval & spaced review**: answer without hints; resurface previously missed skills after delays. Record attempts only after a tested migration scheme.

Never silently inflate legacy `done` into newly introduced stages. Use separate evidence for skill validation, and design migrations before adding new persistent state.

## DL practical progression (preserve all 17 × 3 introduction questions)
- D0: first controlled in-browser **forward → squared-error → gradient-update** experiment; numeric deterministic feedback, **no storage writes**. Does not claim to execute PyTorch.
- D1: tensors/shapes, broadcasting, train/eval switches and manual gradients.
- D2: PyTorch autograd, `nn.Module`, loss, optimizer, train loop; actual runnable execution must be validated in a suitable environment.
- D3: dataset split/metrics and leakage tests; reproducible seeded model, overfitting diagnosis.
- D4: persistence (`state_dict` save/load), inference and environment troubleshooting.
- D5: CNN/transfer learning, transformer basics, and one small end-to-end independent project with an error-analysis report.

Project acceptance: at least one independently completed, executable PyTorch project, held-out test metrics, documented baseline/comparison, reproducible seed/environment, save/reload inference equivalence, and a deliberate debugging task. No claim of DL mastery without observation.

## Existing educational gaps, ranked
P0: 51 introductory DL choices cannot verify code execution, gradient debugging, real PyTorch training; ML lacks full model fitting/evaluation; learning outcomes not yet demonstrable.
P1: explicit Python → mathematics/data → ML → DL prerequisite bridges, 5-step practice evidence, actionable error feedback and spaced review.
P1: subject-shell consistency and 320px mobile QA, including stable approved ML map.
P2: later deep architectures, benchmarking, accessibility/language polish.

## Implementation boundaries
- Existing branch `chat/common-shell-nav-20261105` only; use existing PASS evidence. No main, Production, CI, expense, or real user-record mutation.
- Keep all existing lesson IDs/content, grading engines, keys and completion semantics intact.
- Add practical exercises beside, not in place of, the existing DL intro. Initial D0 lab is **read-only/nonpersistent** and safely linkable from DL Deepen.
- Test one changed feature at a time via static content checks and, when reachable, single-run real-browser QA at 320px and save/reentry. Separate PASS from NOT RUN.
- No repeated Blueprint versions or speculative progress percentages. This file is the single curriculum contract; amend it only after a verified educational change.

## Per-unit beginner curriculum mapping (source-audited 2026-11-05)

**Audit scope & evidence:** `assets/lessons-ko.js` 30 units, **170 exercises** (30 concept, 50 predict, 30 fill, 30 bughunt, 30 write); `assets/python-lab-content.json` 20 units with prerequisites/examples/quizzes/code tasks; `assets/linux-learning-map.js` 12 units and `linux-crash-course.html` E1–E9 library; `assets/ml-foundations.js` 4 model-intro units; `deep-learning.html` 17 stored units × 3 questions = 51, with `map` retained as orientation and 16 visible main nodes. **Total mapped: 92 identifiers or learning slots** (30+20+12+9+4+17; E-series overlap Linux core concepts, so 92 does not mean 92 independent new topics). These are source-based instructional analyses, **not** learner-testing or full runtime QA. All gap/bridge recommendations below are *proposed*, not currently shipped.

**Learning contract for every row:** C = concept with one familiar example and glossary; E = worked input→state→output trace; G = guided one-change practice with hint; I = independent *new* question and justified feedback; R = no-hint recall later. The final column distinguishes existing components from missing assessment evidence. For cognitive load, present one new construct per micro-step, define English terms on first use, never force learners to know Python/linear algebra before explaining it, and allow a prerequisite mini-lesson and return path. An earned legacy completion must never be equated silently to C/E/G/I/R completion.

### Python foundation — B01–B30 (same IDs and question data retained)
| Unit / stable ID | Existing lesson | Instructional entry | Mandatory micro-bridge / I evidence | Risk | Current coverage / missing gate |
| --- | --- | --- | --- | --- | --- |
| B01 `start-field` | 시작의 들판 | 없음 | 화면 출력 확인 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B02 `print-camp` | 출력 캠프 | B01 기본 개념 | 두 줄 실행 순서 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B03 `string-bridge` | 문자열 다리 | B02 기본 개념 | 따옴표가 숫자를 바꾸는지 비교 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B04 `quote-gate` | 따옴표 문 | B03 기본 개념 | 짝이 틀린 따옴표 수정 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B05 `number-pond` | 숫자 연못 | B04 기본 개념 | 숫자·문자 출력 차이 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B06 `math-stone` | 계산 돌길 | B05 기본 개념 | 괄호를 바꾼 산술 예측 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B07 `variable-pond` | 변수 연못 | B06 기본 개념 | 변수 정의 뒤 사용 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B08 `value-swap` | 값 바꾸기 숲 | B07 기본 개념 | 할당 전후 값 추적 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B09 `name-rules` | 이름표 오솔길 | B08 기본 개념 | 명명 오류와 오타 구분 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B10 `concat-bridge` | 연결 다리 | B09 기본 개념 | 문자열과 숫자 결합 오류 | 용어·값 혼동 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B11 `input-window` | 입력 창가 | B10 기본 개념 | 입력값 문자열→형변환 미니 과제 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B12 `debug-missing-quote` | 따옴표 버그 | B11 기본 개념 | SyntaxError 위치를 읽고 고치기 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B13 `debug-typo` | 오타 탐정길 | B12 기본 개념 | NameError 원인·변수명 확인 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B14 `compare-gate` | 비교의 문 | B13 기본 개념 | True/False 비교 결과 예측 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B15 `if-gate` | if 입구 | B14 기본 개념 | 조건이 참·거짓인 경우 각각 실행 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B16 `else-cabin` | else 오두막 | B15 기본 개념 | 두 갈래 조건 구성 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B17 `elif-mushroom` | elif 버섯 | B16 기본 개념 | 세 갈래 조건 실행 추적 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B18 `logic-lantern` | 논리 랜턴 | B17 기본 개념 | and/or/not 진리표 만들기 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B19 `indent-valley` | 들여쓰기 계곡 | B18 기본 개념 | 들여쓰기를 실제로 바꾸며 실행 | 조건·오류 인지부하 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B20 `list-garden` | 리스트 정원 | B19 기본 개념 | 리스트 생성·값 조회 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B21 `index-tower` | 인덱스 탑 | B20 기본 개념 | 0부터 시작하는 인덱스와 범위 오류 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B22 `append-dock` | append 선착장 | B21 기본 개념 | 리스트 수정·append 결과 확인 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B23 `loop-hill` | 반복 언덕 | B22 기본 개념 | for가 순회할 값 직접 나열 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B24 `range-rail` | range 레일 | B23 기본 개념 | range 경계값 예측 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B25 `while-cave` | while 동굴 | B24 기본 개념 | 종료 조건과 무한루프 위험 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B26 `function-house` | 함수 집 | B25 기본 개념 | 함수 정의·호출 차이 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B27 `parameter-mail` | 파라미터 우체국 | B26 기본 개념 | 인자와 매개변수 연결 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B28 `return-spring` | return 샘 | B27 기본 개념 | print와 return 결과 비교 | 상태·추상화 부담 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B29 `mini-project` | 미니 프로젝트 | B28 기본 개념 | 조건·반복·함수로 독립 산출물 | 독립 작성·통합 검증 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |
| B30 `boss-bug` | 보스 버그 | B29 기본 개념 | 새 오류를 재현·수정·설명 | 독립 작성·통합 검증 | 기초 6종 구성(후반 5종); 독립 과제·지연 회상 별도 검증 |


**Python foundation sequence issues:** B01/B02 and B03/B04 intentionally repeat `print` and string quotes but need a clear *why this repetition matters* distinction (first exposure vs variation/debugging). B12/B13 error finding should connect to prior syntax/variables and later B30. B19 indentation appears after B15–B18 condition branches; add a 30-second indentation bridge *before B15*, without reordering any stored IDs. B20–B25 collections/loops require state tracing. B29/B30 must test a new program and not be treated as proof of full Python fluency. All 30 `write` exercises should receive a distinct assessment rubric (required behavior and test cases) separately from output equivalence before claiming mastery.

### Python advanced — A01–A20 (same IDs and tasks retained)
| Unit / stable ID | Existing lesson | Existing source prerequisite | Mandatory micro-bridge / I evidence | Risk | Current coverage / missing gate |
| --- | --- | --- | --- | --- | --- |
| A01 `values` | 문자에서 계산으로 | 기초 B01–B11 연결 필요 | 기초 1–11단원 출력·계산 연결 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A02 `branches` | 조건의 경계와 우선순위 | values | 비교 14–19단원부터 조건 경계 연습 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A03 `loops` | 반복의 상태와 종료 | branches | for/range/while 23–25에서 진입 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A04 `collections` | 자료구조를 고르는 기준 | loops | 리스트 20–22와 dict/set/tuple 사전 설명 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A05 `copy` | 중첩 자료와 복사 | collections | 가변·불변과 얕은 복사 실험 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A06 `functions` | 함수의 계약과 지역 상태 | copy | 함수 26–28에서 지역변수 연결 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A07 `function-slots` | 함수 심화 · 남은 자리 계산 | functions | 함수 시그니처·인자 규칙을 단계별 제시 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A08 `files` | 모듈·파일·예외의 책임 | functions | 파일 경로·예외와 I/O 결과 확인 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A09 `objects` | 객체의 상태와 불변 조건 | files | 객체 상태를 변수·함수로 환원해 설명 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A10 `object-collaboration` | 클래스와 객체를 함께 사용하기 | objects | 객체 간 역할 분리 도식 | 독립 코드 작성·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A11 `numpy-shape` | 배열의 모양과 공유 | copy | 리스트→배열·shape·dtype 연결 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A12 `numpy-axis` | 축·마스크·행렬곱의 판단 | numpy-shape | 축·브로드캐스팅·행렬곱을 그림으로 분리 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A13 `numpy-index` | 배열 선택과 원본의 경계 | numpy-axis | 인덱스/슬라이싱과 view/copy 확인 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A14 `numpy-batches` | 결합·정렬·분할의 순서 | numpy-index | 합치기·정렬·분할을 별개 작은 연습 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A15 `numpy-random` | 다시 확인할 수 있는 무작위 추출 | numpy-batches | seed·재현성을 출력 비교로 학습 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A16 `pandas-select` | 행 선택과 라벨의 의미 | numpy-axis | 행/열·index/label 차이 선수 확인 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A17 `pandas-clean` | 정제 정책과 그룹 집계 | pandas-select | 결측치 정책과 그룹 집계의 근거 설명 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A18 `pandas-time` | 날짜·문자열·증감률을 잇는 분석 | pandas-clean | 날짜 정렬·문자열 정제·비율 변화 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A19 `charts` | 차트가 답해야 할 질문 | pandas-clean | 그래프 종류·축·표본 비교 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |
| A20 `eda-project` | 비교 가능한 분석 설계 | charts, objects | 독립 EDA 질문→분할→검증 보고 | 수학·데이터형·추상화 부하 | 예제·quiz·task 구조 존재; 실행/평가 결과 미검증 |


**Python advanced gaps:** A01 has an empty prerequisite list even though it assumes prior expressions and I/O; add *visual* B→A bridge without changing stored prerequisite metadata. The dependency graph branches at `copy` for NumPy and `functions` for files; list navigation may suggest a single linear order despite the DAG. A12 and A16 require axis/label/shape concepts; introduce 2–3 concrete diagrams before matrix operations. A20 references `charts` and `objects`; its gate must test a **new dataset**, not memorized code. Avoid counting Python lab unit total as 20 distinct executed mastery checks unless evidence demonstrates execution.

### Linux foundation — L01–L12
| Slot | Existing unit | Entry | Micro-bridge / authentic simulation task | Risk | Coverage / limit |
| --- | --- | --- | --- | --- | --- |
| L01 | undefined | 터미널·운영체제 첫 설명 | 터미널·셸·OS의 차이 관찰 | 파일 상태와 경로 시각화 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L02 | undefined | 이전 L단원 + 모의 터미널 조작 | pwd→ls→cd를 한 경로에서 반복 | 파일 상태와 경로 시각화 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L03 | undefined | 이전 L단원 + 모의 터미널 조작 | mkdir/touch/cp/mv/rm은 삭제 보호 | 파일 상태와 경로 시각화 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L04 | undefined | 이전 L단원 + 모의 터미널 조작 | cat/less/head/tail 결과 비교 | 파일 상태와 경로 시각화 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L05 | undefined | 이전 L단원 + 모의 터미널 조작 | find 경로 검색과 grep 내용 검색 | 파일 상태와 경로 시각화 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L06 | undefined | 이전 L단원 + 모의 터미널 조작 | 파이프 vs 리디렉션·덮어쓰기 위험 | 파일 상태와 경로 시각화 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L07 | undefined | 이전 L단원 + 모의 터미널 조작 | 권한 표 읽기→chmod 숫자 뜻 | 권한·위험 명령 또는 여러 개념 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L08 | undefined | 이전 L단원 + 모의 터미널 조작 | 프로세스 확인 후 종료 실습 위험 안내 | 권한·위험 명령 또는 여러 개념 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L09 | undefined | 이전 L단원 + 모의 터미널 조작 | 패키지 설치는 실제 실행과 모의 구분 | 권한·위험 명령 또는 여러 개념 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L10 | undefined | 이전 L단원 + 모의 터미널 조작 | 변수 치환·따옴표를 Python과 대비 | 권한·위험 명령 또는 여러 개념 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L11 | undefined | 이전 L단원 + 모의 터미널 조작 | if/for/while 조건 경계·종료 여부 | 권한·위험 명령 또는 여러 개념 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |
| L12 | undefined | 이전 L단원 + 모의 터미널 조작 | 네트워크 명령·자원 접근 모의 범위 명시 | 권한·위험 명령 또는 여러 개념 | 기초 설명·3레벨 퀴즈, 실제 셸 실습 아님 |


### Linux exercise library — E1–E9 (linked, not a duplicate course)
| Slot | Existing activity | Connected foundation unit | Micro-bridge / independent demonstration | Risk | Coverage / limit |
| --- | --- | --- | --- | --- | --- |
| E1 | 위치와 파일 | L2 개념 | pwd·ls·cd와 파일 이동을 상황으로 묶기 | 단일 명령→결과 확인 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E2 | 파일 읽기 | L4 개념 | cat/head/tail에서 표본 출력 비교 | 단일 명령→결과 확인 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E3 | 찾기와 검색 | L5 개념 | find/grep 선택과 오류 줄 찾기 | 단일 명령→결과 확인 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E4 | 파이프와 텍스트 | L6 개념 | 파이프와 저장의 손실·덮어쓰기 | 단일 명령→결과 확인 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E5 | 권한 | L7 개념 | rwx·ls -l·chmod 예측 후 안전 적용 | 복합 명령·모의 한계 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E6 | 프로세스 | L8 개념 | ps와 kill의 대상 식별 | 복합 명령·모의 한계 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E7 | 패키지 | L9 개념 | 패키지 이름·설치·삭제 위험 이해 | 복합 명령·모의 한계 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E8 | 쉘 스크립트 | L10 개념 | 변수·인용·실행 권한·스크립트 문법 | 복합 명령·모의 한계 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |
| E9 | 조건문 | L11 개념 | 조건 연산자·경계값·Bash 문법 | 복합 명령·모의 한계 | E1–E9 연습 라이브러리; 고유 진행 평가 별도 확인 |


**Linux gaps:** L02–L06 and E1–E4 are reinforcing practice rather than separate prerequisites; point from each L unit to its E mission after first concept and show return navigation. Avoid equating selecting correct CLI text with correctly operating a terminal. The limited simulator must not claim real filesystem/permissions/network effects, and tasks involving `rm`, `chmod`, `kill` or package changes need sandbox-only examples and explicit safety explanation. Keep recorded scores and E1–E9 labels unchanged.

### ML foundation — M1–M4
| Unit / stable ID | Existing lesson | Existing source prerequisite | Missing beginner bridge / assessment | Risk | Current coverage |
| --- | --- | --- | --- | --- | --- |
| M1 `linear` | 1. Linear Regression | 변수·함수, NumPy 배열, 좌표와 평균 | 숫자 예측·좌표·평균·기울기부터 설명 | 입문부터 Python·수학 선행 요구 | 예제·설명·단일 객관식과 전이 안내; 학습/평가 코드 미제공 |
| M2 `logistic` | 2. Logistic Regression | 회귀, 확률(0~1), if 조건문 | 확률 0~1·분류 임계값·시그모이드 분리 | 새 모델 개념·낯선 용어 | 예제·설명·단일 객관식과 전이 안내; 학습/평가 코드 미제공 |
| M3 `knn` | 3. KNN | 좌표, 거리, 정렬, 다수결 | 좌표·거리·최근접 k개와 특성 스케일 | 새 모델 개념·낯선 용어 | 예제·설명·단일 객관식과 전이 안내; 학습/평가 코드 미제공 |
| M4 `bayes` | 4. Naive Bayes | 조건부확률, 곱셈, 분류 | 조건부확률→가정→비정규화 점수 순서 | 조건부확률 인지부하 | 예제·설명·단일 객관식과 전이 안내; 학습/평가 코드 미제공 |


**ML P0 gap:** M1 presupposes NumPy arrays/coordinate/mean before they are taught in ML; provide an optional *zero-prerequisite* preflight (one numeric prediction, graph reading, mean, table/array) and link Python `numpy-shape` without forcing navigation. Before M2, compare a **class** versus a **number**; before M3, draw distance on a 1D line before 2D; before M4, teach base rate and conditional probability using counted examples. Keep four model IDs and the approved `9f953b5f...` connected-node visual exactly intact. Missing practical progression: baseline→train/validation/test split→fit/predict→metrics→data leakage→overfitting→model comparison with actual executable examples; no genuine `scikit-learn` training verified.

### DL foundation — D0 orientation + D1–D16 learning nodes
| Unit / stable ID | Existing lesson | Entry | Missing beginner bridge / independent check | Risk | Current coverage |
| --- | --- | --- | --- | --- | --- |
| D0 `map` | 전체 지도 | 없음 (오리엔테이션) | 개념 안내로만 분리; 기존 map 3문항은 선택 접근 | 안내와 학습 진도 혼동 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D1 `tensor` | 데이터와 Tensor | Python 배열·기초 수치 | 스칼라→벡터→행렬→shape 손으로 표시 | 새 용어·계산 전제 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D2 `network` | 신경망과 뉴런 | 앞선 DL 단원 + 수학 다리 | x·w·b→한 뉴런→두 층 계산 | 새 용어·계산 전제 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D3 `activation` | 활성화 함수 | 앞선 DL 단원 + 수학 다리 | 직선 모델 한계→ReLU 사례 | 새 용어·계산 전제 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D4 `forward` | Forward와 Prediction | 앞선 DL 단원 + 수학 다리 | 입력→층별 출력값 직접 계산 | 새 용어·계산 전제 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D5 `loss` | 손실 함수 | 앞선 DL 단원 + 수학 다리 | 예측/정답 차이→제곱·평균 | 새 용어·계산 전제 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D6 `backprop` | Gradient와 역전파 | 앞선 DL 단원 + 수학 다리 | 변화율·기울기 부호와 연쇄법칙 직관 | 새 용어·계산 전제 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D7 `optimizer` | Optimizer와 학습률 | 앞선 DL 단원 + 수학 다리 | 손실 기울기→학습률 변화 실험 | 개념 간 관계·수학 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D8 `loop` | Training Loop | 앞선 DL 단원 + 수학 다리 | 앞 단계들을 한 번의 업데이트로 연결 | 개념 간 관계·수학 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D9 `batch` | Batch와 Epoch | 앞선 DL 단원 + 수학 다리 | 샘플/배치/반복/에포크 구분 | 개념 간 관계·수학 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D10 `split` | Train·Validation·Test | 이전 DL 단원 + 평가/환경 개념 | 데이터 누수·검증/시험 분리 직접 실습 | 개념 간 관계·수학 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D11 `overfit` | 과적합과 과소적합 | 이전 DL 단원 + 평가/환경 개념 | 훈련/검증 손실 곡선 판단 | 개념 간 관계·수학 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D12 `gpu` | CPU와 GPU | 이전 DL 단원 + 평가/환경 개념 | GPU=가속; 모델·입력 device 동일성 | 개념 간 관계·수학 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D13 `colab` | Colab GPU 환경 | 이전 DL 단원 + 평가/환경 개념 | 실제 Colab 환경 선택은 외부 실습·비보장 | 환경·외부 실행 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D14 `save` | 모델 저장 이유 | 이전 DL 단원 + 평가/환경 개념 | 가중치/아키텍처/체크포인트 구분 | 환경·외부 실행 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D15 `load` | Save·Load·재추론 | 이전 DL 단원 + 평가/환경 개념 | 저장·재로딩 후 같은 입력 결과 비교 | 환경·외부 실행 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |
| D16 `drive` | Google Drive 보존 | 이전 DL 단원 + 평가/환경 개념 | 임시 파일과 영구 보관·접근권한 비교 | 환경·외부 실행 부담 | 원본 check/apply/recall 3문항; 실제 코드 역량 미검증 |


**DL P0 gap:** D0 `map` is legacy orientation, **not** a core learning step. Keep its ID, three questions, original `done`/`verified` and direct `?unit=map` URL; visible first learning node is D1 `tensor`, and visible completion denominator is 16. D1–D8 need a gradual numeric-to-graphical gradient bridge; D9–D12 need a tiny deterministic training-and-evaluation trace. D13–D16 are **environment/persistence concepts**, not evidence of a real GPU or file/Drive workflow. Existing one-step nonpersistent numerical experiment is a bridge only, **not PyTorch execution**. Required missing: `torch.tensor`, automatic differentiation, `nn.Module`, training loop, held-out evaluation, bugs/diagnostics, checkpoint reload, new-data inference, independent capstone.

### Shared minimal implementation order and release gates
1. **P0 instructional entry:** without changing saved IDs or questions, add an optional *first-time* path explaining what code/terminal/ML model/tensor are, and subject-specific one-click prerequisite mini-lessons. Prioritize M1→Python `values`/`numpy-shape`, D1→array/shape, and L1→terminal/OS. Preserve direct lesson access and no mandatory onboarding.
2. **P0 five-stage honesty:** render any *missing* C/E/G/I/R step as unavailable instead of counting quiz completion as programming competence. A completion badge based on old data remains "기존 단원 완료"; a distinct *verified capability* gate requires new independent code test and a migration plan **before** recording anything.
3. **P0 authentic ML/DL execution:** build a tiny executable, deterministic ML fit/evaluate exercise and a PyTorch model train/evaluate/save/reload exercise in a validated runtime; clearly label simulator/number demo vs actual code. Every project must produce output, test results and one error-repair task.
4. **P1 adaptive bridge:** after one wrong attempt show *why*, one smaller scaffold, and reattempt; schedule delayed no-hint recall **without** rewriting previous completion. Distinguish hints-used from independent success when storage migration is approved.
5. **P1 accessible assessment:** keyboard-only navigation and 320px screen; no required typing for concept comprehension, yet provide real typed code tasks for practical competency. An explicit "I already know this" short diagnostic is a bypass, not an unearned pass.
6. **QA acceptance:** prior PASS remains scoped to its original SHA; run one isolated unit+progress continuity QA for changed UI, plus a genuine novice walkthrough before claiming beginner readiness. Cross-check old `map` current/stage and navigation, B/A prerequisites, and Linux simulator boundaries. Report PASS/FAIL/NOT RUN, never fictitious learner outcomes.

**No code content, learning records, storage keys, evaluation algorithms, CI, Preview, main, or Production changes are authorized by this curriculum audit.**


## Blueprint v2.0 implementation alignment (2026-11-06; PLANNED, not shipped)

**Single source of truth:** this file supersedes conversational drafts; retain the source-audited B01–B30, A01–A20, L01–L12, E1–E9, four ML IDs and 17 DL IDs above. Do not duplicate lesson content, change legacy IDs, alter storage keys, or reinterpret existing completion as independent proficiency.

**Navigation contract:** preserve four subjects (Python, Linux, ML, DL) and five shared tabs (Home, Learn, Deepen, Together, My), with approved ML connected-node geometry/colors/states anchored to commit `9f953b5f70407a9306f79275da2e7d5a96eaeec4`. Add a *recommendation overlay*, not a fifth subject or replacement map. Home resumes one current action; Learn shows existing per-subject map; Deepen provides runnable practice; Together retains support; My separates completion from demonstrated skill.

**Suggested graph, no hard locks:** B01–B30 Python fundamentals → parallel (Linux L01–L05; Python advanced A01–A10) → data/maths bridge (A11–A20 reused selectively, especially `numpy-shape`, `numpy-axis`, `pandas-select`, `pandas-clean`, `charts`) → ML `linear`, `logistic`, `knn`, `bayes` → DL `map` orientation plus 16 substantive nodes. Linux L06–L12 and E-series remain accessible optional practice; environment-related units can be recommended on demand. These are recommended connections, not new persisted prerequisite metadata or forced unlocks.

**Bridge-only additions (minimum scope):** tiny worked practice for gradient/derivative, basic probability and variability, train/validation/test separation, leakage and metrics, only where existing A-units do not already teach/test the skill. Never create a standalone Data/Maths subject. A learner may enter any existing lesson directly.

**Prerequisite detour contract:** on evidence of difficulty, offer a voluntary 5–10 minute Concept → Example → Guided edit → Independent attempt → Recall micro-lesson; record the original subject, unit ID, step and exercise location in a temporary, validated internal return target. On completion, skip, back or refresh, restore that location without rewriting legacy progress. Limit to one active detour; prevent cycles, malformed targets and external redirects. Persistent resume requires a separately reviewed, backwards-compatible storage design; until verified, no new record writes.

**Independent evidence contract:** maintain current question scores, XP and completed units as-is; distinguish them from verified independent code execution, unseen transfer tests, deliberate debugging, and later no-hint recall. Reuse Python's existing Pyodide Worker/multi-case tests. Basic graduation must require condition + loop + function on novel input, not merely fixed string output. Advanced graduation must use a new dataset, robust edge cases and non-mutation checks. Linux simulator success is never labelled real shell proficiency. ML graduation needs actual sklearn fitting, a baseline, train/validation/test and held-out evaluation. DL graduation needs reproducible PyTorch training, save/reload equivalence and new-data inference; 51 intro questions alone are not sufficient.

**Execution priority:** P0-0 ownership-safe shell/mobile/storage regression → P0-1 Python graduation tests → P0-2 lightweight recommendation/return → P0-3 targeted maths/data bridges → P0-4 actual sklearn execution → P0-5 actual PyTorch training → P0-6 isolated real Linux shell assessment → P0-7 novice independent walkthrough. Preserve existing PASS only for matching source/conditions; label each other result NOT RUN. No duplicate CI/Preview/PR, and no main/Production/user-record/cost changes.

**P0-0 acceptance matrix (pending runtime evidence):** four subjects selectable; five tabs show the same shared navigation; direct-entry and back/refresh work; original 30+20 Python IDs, 12 Linux IDs, four ML IDs and 17 DL IDs remain reachable; approved ML map unchanged; 320/375px no horizontal clipping or obscured controls; save/reentry retains progress without migrations. A static code check does **not** certify browser/mobile/storage PASS. Work uncommitted files and ownership must be inspected in the Work checkout before any application-code edit.

**Status labels:** CURRENT = observed source capability; PLANNED = requirement; VERIFIED = reproduced on the specific build. This addendum is a documentation alignment only, not evidence that the implementation or QA is complete.
