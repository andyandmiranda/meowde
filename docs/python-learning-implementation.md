# 파이썬 학습 보강 구현과 검증

## 목적과 변경 범위

기존 단일 개념 위주 레슨 뒤에, 여러 개념과 경계 조건을 연결하는 학습 경로를 제공한다. 기존 60개 레슨의 순서·ID·문제·완료 배열은 변경하지 않는다. 홈·학습·복습 화면에 `/python-lab.html` 진입 링크를 추가한다. 새 콘텐츠는 한국어다. 영어 화면의 링크에도 한국어 콘텐츠임을 표시한다.

18개 단원에 선수 개념, 학습 목표, 개념·용어, 실행 예제·예상 출력·흐름, 오해, 선택별 이유가 있는 결과 예측 18개, 작성 과제 18개와 세 가지 힌트, 루브릭, 80개 실행 기준, 풀이 과정·실수·대안이 있다. 마지막 프로젝트에는 자동 판정하지 않는 서술·자기 점검 1개를 추가했다. 18개 단원으로 전체 참고 자료를 대체했다고 선언하지 않는다. [범위 대응표](python-learning-coverage.md)를 확인한다.

## 실행과 파일

2차 보강은 `tools/python_data_units.py`의 독립 작성 자료를 기존 생성기가 합쳐 만든다. 기존 단원은 위치 번호 대신 ID로 저장되므로 새 단원을 중간에 배치해도 기존 초안·통과·힌트·메모의 대응이 유지된다. `tests/fixtures/python-lab-v1-unit-hashes.json`과 Python 검증기로 이전 14개 단원의 내용도 그대로인지 확인한다. 새로운 목표는 배열의 쌍/조합 선택, 결합·안정 정렬·분할, 지역 난수 생성기의 비복원 추출, 문자열·날짜·월 집계와 0 분모 정책이다.

동작 확인에 [NumPy 인덱싱](https://numpy.org/doc/2.1/user/basics.indexing.html), [array_split](https://numpy.org/doc/2.1/reference/generated/numpy.array_split.html), [Generator.choice](https://numpy.org/doc/2.1/reference/random/generated/numpy.random.Generator.choice.html), [pandas 문자열 검색](https://pandas.pydata.org/pandas-docs/version/2.2/reference/api/pandas.Series.str.contains.html), [날짜 변환](https://pandas.pydata.org/pandas-docs/version/2.2/reference/api/pandas.to_datetime.html)의 공식 API를 참고했다. 예제·문제·입력 데이터는 독립 작성했다. ndarray.sort()의 반환값은 None이며 argsort와 구별한다.

- `node tools/serve-preview.cjs`, `http://127.0.0.1:4173/` → 실험실 링크. 이미 사용 중인 포트라면 환경 변수 `PORT`로 변경한다.
- 콘텐츠: `assets/python-lab-content.json`. 독립 작성 원본: `tools/build-learning-content.py`. 수정 후 `python tools/build-learning-content.py`로 생성한다.
- 범위: `docs/python-learning-coverage.json/md`. 수정 후 `python tools/build-learning-coverage.py`로 생성한다. 참고 파일은 읽지 않는 독립 작성·범위 생성 도구다.
- 화면/동작/실행기: `python-lab.html`, `assets/python-lab.css`, `assets/python-lab.js`, `assets/python-lab-worker.js`.
- 기존 앱 연결: ordered enhancement loader에 `assets/python-lab-entry.js`를 추가. 기존 `.scroll` 영역의 hero 다음에 링크를 배치하고 화면 재렌더링에도 재부착한다. 기존 렌더러를 감싸거나 재할당하지 않는다.
- 서비스워커 캐시 세대를 `meowde-v465-data-transfer`으로 갱신하고 새 학습 자산을 캐시에 포함한다. CDN Python 실행기는 자체적으로 오프라인 제공하지 않는다.

## 실행·피드백 흐름

사용자 클릭 → 별도 브라우저 Worker → Pyodide 0.28.0와 필요한 패키지 로딩 → 제출 코드와 기준별 확인 → JSON 결과 → 실패 기준·오류 종류·실행 위치·다음 행동·차트 표시 → 별도 학습 기록 저장.

[Pyodide Worker 사용 문서](https://pyodide.org/en/0.28.0/usage/webworker.html)의 API에 맞춰 구성했다. `loadPackagesFromImports`로 NumPy/pandas/matplotlib을 준비한다. 실행마다 Worker를 새로 만들며 각 기준에서 새 변수 사전·임시 폴더를 사용한다. PC·서버에서 사용자 코드를 실행하지 않는다. 실행 중지와 초기 로딩 120초/실행 15초 제한을 제공한다. 출력은 20,000자로 제한하며 차트는 두 개까지 표시한다. 이 환경을 악의적 제출을 위한 보안 격리·공인 시험 채점으로 주장하지 않는다. 테스트와 모범 답안은 클라이언트 콘텐츠이며 열람 가능하다.

정답 예시의 출력만 맞추는 방식 대신 함수의 반환값·배열 모양·원본 보존·빈 입력·분기 경계·동점·관측 정제 순서 등을 확인한다. 예외 종류와 해당 기준의 구체적인 피드백을 함께 제시한다. 일반적인 코드 오답은 시도로 기록하지만 실행기 초기화·네트워크 실패나 수동 중단은 오답으로 기록하지 않는다.

## 저장과 추천

새 키 `meowde-python-lab-v1`만 쓴다. 기존 `meowde-v410-state`와 보상·오답·Linux 키를 읽어 변경하지 않는다. 별도 키에 초안, 힌트 단계, 도움 여부, 예측·작성 시도, 통과 이력, 최근 실패 기준, 프로젝트 메모를 저장한다. 힌트·풀이를 사용한 제출은 도움을 받은 통과로 표시한다. ‘도움 없이 다시 작성’은 초안을 비우고 기존 통과 이력은 남긴다. 이 자기 보고 방식은 사용자가 외부 답을 보지 않았음을 증명하지 않는다.

예측과 독립 작성 통과를 모두 확인한 경우에만 ‘혼자 적용 확인’을 표시한다. 이후 코드 실패 시 최근 복습 필요를 우선 표시한다. 선수 개념의 미확인 상태와 다음 단원을 추천하며, 현재 실패 기준을 복습 안내에 연결한다. 지식 추적 모델이나 학습 효과 검증을 완료한 것은 아니다. 새 키는 기존 데이터 내보내기/복원 도구와 아직 통합하지 않았다.

## 검증 명령

1. `npm run validate` — 기존 검사와 새 콘텐츠·범위 구조 검사.
2. `python -m pip install -r requirements-python-lab.txt`, `python tools/validate-python-lab.py` — 저장소에 작성한 신뢰 가능한 예제·모범 코드만 PC에서 실행한다. 사용자 제출은 실행하지 않는다. 18개 예제 출력과 80개 기준, 불완전 초안 거절, 의도적인 오답 9개 거절, 기존 14개 단원의 내용 불변성을 확인한다.
3. `npm run test:python-lab` — 설치된 Playwright Chromium으로 별도 로컬 서버를 시작해 브라우저 검사. 인터넷이 필요하다. `MEOWDE_BROWSER_CHANNEL=msedge` 등의 설치 브라우저 선택 가능. 기본 포트 4189는 `LAB_PORT`, 진단 저장 폴더는 `LAB_OUTPUT`으로 조정한다. 기존 `npm run test:browser`와 별도이며 `*.spec.cjs` 자동 수집에는 포함하지 않는다.

## 남은 한계

배포된 동일 코드의 검증은 `LAB_BASE_URL=https://meowde.vercel.app`로 같은 브라우저 검사를 실행한다. 지정하면 로컬 서버를 띄우지 않는다. 검사마다 독립 브라우저와 합성 기록만 사용한다. 단원 목록은 데스크톱에서도 화면 높이 안에서 스크롤돼 늘어난 단원을 키보드로 접근할 수 있다.

1차 버전은 운영 배포됐고 이 문서는 2차 보강의 구현·검증 방법을 설명한다. 실제 사용자 데이터 대신 합성 저장 기록으로 보존을 검사했다. 데스크톱 Edge Chromium 및 모바일 에뮬레이션을 사용하며 실제 iPhone Safari·보조공학·초보자 관찰은 미실시다. 풀이 열람 여부를 보존하지만 학습 완료를 강제하지 않는다. 원문 전체 범위, 영어 콘텐츠, 단계별 학습 효과, 개방형 설계 평가, 실제 외부 데이터 분석은 후속 작업이다.
