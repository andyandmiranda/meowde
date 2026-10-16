# 파이썬 참고 범위와 구현 대응표

기준: 2026-10-15, main `11feed313b5048b743d9ac56889b748c8d9cdd6f`. 신규 경로 `/python-lab.html`. 기존 60개 레슨은 보존.

**이 표는 전체 완성 선언이 아니다.** 보강은 해당 행의 핵심 목표에 대한 학습·연습·피드백을 갖췄다는 뜻이다. 부분/설명만/미구현은 후속 작업이다. 정답 예제의 테스트 통과만으로 사람의 학습 효과를 입증하지 않는다.

| 참고 범위 | 학습 목표 | 기존 연결 | 새 단원·검증 | 상태 | 남은 범위 |
|---|---|---|---|---|---|
| [python] 01. 파이썬 기초.pdf 3–27 | 파이썬 실행 환경과 편집기 역할을 구별한다. | start-field | values · 예측+작성+4개 기준+3단계 힌트 | 부분 | 앱 내 실행기는 제공. 로컬 설치·PATH·편집기 설정 실습은 별도 보강 필요. |
| [python] 01. 파이썬 기초.pdf 28–45 | 입출력·자료형·대입·변환·출력 형식을 적용한다. | print-camp, input-window, concat-bridge, debug-missing-quote | values · 예측+작성+4개 기준+3단계 힌트 | 보강 | input 대기 실습은 기존 input-window에서 수행. 새 실험실은 함수 인자 기반. |
| [python] 01. 파이썬 기초.pdf 46–51 | 산술·비교·논리·포함 연산을 선택한다. | math-stone, compare-gate, logic-lantern, membership-gate | branches · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 실험실 몫·나머지·or 경계 검증 포함. 모든 연산자별 독립 심화 문제는 없음. |
| [python] 01. 파이썬 기초.pdf 52–63 | 분기 순서·등호 경계·들여쓰기를 판단한다. | if-gate, else-cabin, elif-mushroom, indent-valley | branches · 예측+작성+4개 기준+3단계 힌트 | 보강 | 해당 핵심 목표 보강 |
| [python] 01. 파이썬 기초.pdf 64–72 | 반복 상태·range 끝 제외·종료·건너뛰기를 구별한다. | loop-hill, range-rail, while-cave | loops · 예측+작성+4개 기준+3단계 힌트 | 보강 | 새 문제는 for 중심. while 직접 작성은 기존 레슨에 있음. |
| [python] 02. iterables.pdf 4–9,17–29 | 리스트 인덱스·슬라이스·수정·순회·집계를 적용한다. | list-garden, index-tower, append-dock | collections · 예측+작성+4개 기준+3단계 힌트 | 부분 | 여러 list 메서드의 독립 작성 문제는 후속 과제. |
| [python] 02. iterables.pdf 10–16 | 참조 공유·얕은 복사·중첩 복사를 판단한다. | list-garden | copy · 예측+작성+4개 기준+3단계 힌트 | 보강 | 2차원 정수 행까지 검증. 임의 객체 그래프의 deepcopy 직접 작성은 미포함. |
| [python] 02. iterables.pdf 31–39 | 컴프리헨션과 중첩 반복의 실행 순서를 해석한다. | loop-hill | copy · 예측+작성+4개 기준+3단계 힌트 | 부분 | 일반 반복과 대안 컴프리헨션 제공. 조건부 컴프리헨션 별도 과제는 없음. |
| [python] 02. iterables.pdf 40–49 | 문자열 불변성과 정규화·나누기·합치기를 적용한다. | string-methods, string-slice | collections · 예측+작성+4개 기준+3단계 힌트 | 부분 | strip/lower 직접 평가. split/join은 설명 및 기존 기초 중심. |
| [python] 02. iterables.pdf 50–51 | 문자와 코드 포인트를 상호 변환한다. | 없음 | 없음 | 미구현 | ord/chr 및 ASCII와 유니코드 차이 학습 필요. |
| [python] 02. iterables.pdf 54 | 튜플의 역할과 언패킹을 이해한다. | tuple-unpack | values · 예측+작성+4개 기준+3단계 힌트 | 부분 | 반환 튜플은 평가. 튜플 불변성과 포함 객체의 변경 가능성은 심화 미포함. |
| [python] 02. iterables.pdf 55–65 | 키 조회·갱신·빈도 집계에 딕셔너리를 사용한다. | dict-seed, dict-update, dict-get, dict-loop | collections · 예측+작성+4개 기준+3단계 힌트 | 보강 | 해당 핵심 목표 보강 |
| [python] 02. iterables.pdf 66–71 | 중복 제거와 집합 연산을 적용한다. | set-garden | collections · 예측+작성+4개 기준+3단계 힌트 | 부분 | 중복 제거 결과 예측과 집합 연산 설명. 교집합·차집합 직접 작성은 미포함. |
| [python] 03. Function, Module & File IO.pdf 4–10 | 함수 입력·반환·타입 힌트를 구별한다. | function-house, parameter-mail, return-spring | functions · 예측+작성+4개 기준+3단계 힌트 | 부분 | 반환·지역 상태 작성 검증. 타입 힌트 작성·검사기 실습은 미포함. |
| [python] 03. Function, Module & File IO.pdf 11–15 | 기본값·키워드·가변 인자를 설계한다. | parameter-mail | functions · 예측+작성+4개 기준+3단계 힌트 | 부분 | 기본값 공유 오류는 직접 검증. *args/**kwargs는 용어 설명 수준. |
| [python] 03. Function, Module & File IO.pdf 16–20 | 지역 범위와 호출 사이 상태를 설명한다. | function-house | functions · 예측+작성+4개 기준+3단계 힌트 | 보강 | global/nonlocal 직접 사용 과제는 없음. |
| [python] 03. Function, Module & File IO.pdf 22–29 | 모듈·패키지·라이브러리와 import를 구별한다. | math-module, statistics-module | files · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 모듈 파일 제작과 패키지 구조 실습은 미포함. |
| [python] 03. Function, Module & File IO.pdf 30–42 | 난수·날짜·시간 기능으로 응용을 구성한다. | math-module, statistics-module | 없음 | 미구현 | random/datetime/time의 전용 학습·심화 문제 필요. 원문 게임은 복제하지 않음. |
| [python] 03. Function, Module & File IO.pdf 44–50 | 파일 모드·인코딩·문맥 관리·줄 처리를 수행한다. | file-write, file-read, file-lines, json-bridge | files · 예측+작성+4개 기준+3단계 힌트 | 보강 | 실험실 파일은 임시 브라우저 파일. 로컬 다운로드·영구 파일 저장은 미포함. |
| [python] 03. Function, Module & File IO.pdf 51–53 | 데이터를 저장하고 복원하는 프로그램을 구성한다. | persistence-project, pet-tracker-project | files · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 오류 줄 집계 작성 포함. 원문의 프로젝트를 재현하지 않음. |
| [python] 04. OOP.pdf 4–19 | 클래스·인스턴스·self·초기 상태·메서드를 설계한다. | class-blueprint, init-self, instance-method, state-change | objects · 예측+작성+4개 기준+3단계 힌트 | 보강 | 해당 핵심 목표 보강 |
| [python] 04. OOP.pdf 17 | 클래스 공유값과 인스턴스 상태를 구별한다. | state-change | objects · 예측+작성+4개 기준+3단계 힌트 | 부분 | 설명 및 인스턴스 독립성 검증. 클래스 변수 수정 비교 과제는 없음. |
| [python] 04. OOP.pdf 26–34 | 상속·오버라이딩·super·추상화를 적용한다. | inheritance-basics | objects · 예측+작성+4개 기준+3단계 힌트 | 부분 | 오버라이딩 예측 추가. super·추상 인터페이스 구현 및 다형성 설계는 심화 미포함. |
| [python] 04. OOP.pdf 35–43 | 캡슐화·접근 규약·프로퍼티를 설계한다. | instance-method | objects · 예측+작성+4개 기준+3단계 힌트 | 부분 | 상태 불변 조건을 직접 평가. name mangling, property/getter/setter/decorator는 미구현. |
| [python] 04. OOP.pdf 44–64 | 다중 객체와 상태를 가진 프로젝트를 설계한다. | object-collection, pet-tracker-project | objects · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 할당량 객체 설계 과제 추가. 대규모 객체 협력 프로젝트·원문 게임은 미포함. |
| [python] 05. Numpy.pdf 3–15 | 노트북의 셀·재실행·휘발성·문서화를 이해한다. | 없음 | files · 예측+작성+4개 기준+3단계 힌트 | 부분 | 임시 환경 설명 포함. Colab·마크다운·셀 순서 의존 실습은 미구현. |
| [python] 05. Numpy.pdf 17–29,35–46 | 배열 차원·shape·dtype·생성·속성을 해석한다. | 없음 | numpy-shape · 예측+작성+4개 기준+3단계 힌트 | 부분 | array/arange/reshape 직접 평가. linspace/zeros/ones/full은 설명 수준. |
| [python] 05. Numpy.pdf 47–54 | 다차원 인덱싱·뷰·조건 선택·브로드캐스팅을 적용한다. | 없음 | numpy-shape · 예측+작성+4개 기준+3단계 힌트 | 부분 | 브로드캐스팅 직접 평가. fancy indexing·다양한 슬라이싱 직접 과제는 미포함. |
| [python] 05. Numpy.pdf 30–34,55–56 | 행렬곱 모양과 원소별 곱의 차이를 판단한다. | 없음 | numpy-axis · 예측+작성+4개 기준+3단계 힌트 | 보강 | 원문과 달리 행렬곱을 합성곱과 구별해 설명. |
| [python] 05. Numpy.pdf 57–60 | 축별 합계·평균·산포·극값 위치를 해석한다. | 없음 | numpy-axis · 예측+작성+4개 기준+3단계 힌트 | 부분 | 축 예측과 가중 합 평가. std/var/ddof·argmin/argmax 직접 과제는 미포함. |
| [python] 05. Numpy.pdf 61–66 | 재배열·전치·평탄화·정렬을 적용한다. | 없음 | numpy-shape · 예측+작성+4개 기준+3단계 힌트 | 부분 | reshape 평가. transpose/flatten/sort/argsort는 후속 단원 필요. |
| [학습] numpy.ipynb 섹션 1–5 | 생성·속성·선택·변형·브로드캐스팅을 연결한다. | 없음 | numpy-shape · 예측+작성+4개 기준+3단계 힌트 | 부분 | 생성 함수 전체와 전치·평탄화의 독립 연습은 미포함. |
| [학습] numpy.ipynb 섹션 6–7,10 | 축 집계·마스크·행렬곱을 연결한다. | 없음 | numpy-axis · 예측+작성+4개 기준+3단계 힌트 | 보강 | 원본 문제·숫자·해설을 사용하지 않음. |
| [학습] numpy.ipynb 섹션 8–9 | 배열 결합·분할·난수 재현성을 적용한다. | 없음 | 없음 | 미구현 | stack/concatenate/split 및 난수 생성기·seed 학습 필요. |
| [python] 06. pandas.pdf 4–20 | Series/DataFrame·데이터 입출력·구조를 점검한다. | 없음 | pandas-select · 예측+작성+4개 기준+3단계 힌트 | 부분 | 구조 설명과 직접 표 생성 포함. CSV 읽기/저장·info/describe 독립 과제는 없음. |
| [python] 06. pandas.pdf 21–42 | 라벨·위치·복합 조건·정렬·열 변경을 적용한다. | 없음 | pandas-select · 예측+작성+4개 기준+3단계 힌트 | 부분 | 선택·정렬·원본 보존 평가. 행 추가/삭제/concat·astype 별도 과제는 미포함. |
| [python] 06. pandas.pdf 46–58 | 누락·중복·자료형 정제 정책을 설계한다. | 없음 | pandas-clean · 예측+작성+4개 기준+3단계 힌트 | 보강 | 누락 대체 정책과 숫자 문자열 변환 직접 과제는 후속 필요. |
| [python] 06. pandas.pdf 59–69 | 그룹·집계·적용을 구별하고 요약한다. | 없음 | pandas-clean · 예측+작성+4개 기준+3단계 힌트 | 부분 | groupby/agg/sum/count 직접 평가. 사용자 정의 apply·다중 집계 선택 심화는 미포함. |
| [실습 1] pandas_athletes.ipynb 전체 학습 목표 | 필터·극값·평균·정렬·복합 집계를 수행한다. | 없음 | pandas-select · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 작업 목록으로 필터·동점 정렬 평가. 원자료·질문은 미사용. 극값 행 선택·순위 세부 실습 필요. |
| [실습 2] pandas_students.ipynb 전체 학습 목표 | 표의 조건 선택·파생 수치·요약을 수행한다. | 없음 | pandas-clean · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 관측 자료로 유효값·그룹 집계 평가. 파생 열 생성·전체 기초 집계 독립 과제 필요. |
| [실습 5] pandas_books.ipynb 전체 학습 목표 | 문자열 조건·범위·그룹 요약을 수행한다. | 없음 | collections · 예측+작성+4개 기준+3단계 힌트 | 부분 | 문자열 정규화와 빈도 집계는 평가. Series.str 패턴·연도 범위·극값 연결 과제 필요. |
| [python] 07. Data Visualization.pdf 4–33 | 질문에 맞는 기본 차트와 축·범례를 구성한다. | 없음 | charts · 예측+작성+4개 기준+3단계 힌트 | 부분 | 막대 작성·축·제목·순서 평가. 선 예제 실행. 산점도·원형·범례·폰트 직접 과제는 미포함. |
| [python] 07. Data Visualization.pdf 36–47 | 분포·이상 후보·행렬값을 시각화한다. | 없음 | charts · 예측+작성+4개 기준+3단계 힌트 | 부분 | 상자그림 선택 예측. histogram/box/heatmap 직접 작성과 해석 과제 필요. |
| [python] 07. Data Visualization.pdf 49–66 | seaborn의 통계 요약과 그룹 비교를 해석한다. | 없음 | charts · 예측+작성+4개 기준+3단계 힌트 | 설명만 | seaborn API 실행·hue·집계/오차막대·pairplot 직접 과제 미구현. |
| [python] 07. Data Visualization.pdf 68–77 | pandas plot과 장형·광형 변환을 적용한다. | 없음 | charts · 예측+작성+4개 기준+3단계 힌트 | 설명만 | melt/pivot 및 pandas.plot 직접 실행 문제 미구현. |
| EDA실습_01 (Seoul Bike Data).ipynb 전체 학습 목표 | 시간·날씨·운영 조건을 통제해 관측 자료를 비교한다. | 없음 | eda-project · 예측+작성+4개 기준+3단계 힌트 | 부분 | 새 공간 관측 자료로 분모·유효 관측·정렬·비인과 판단 평가. 날짜/시간/계절 처리와 다중 비교 차트 필요. |
| EDA실습_02 (online shop).ipynb 전체 학습 목표 | 시계열·비율·집계 수준·순위의 의미를 판단한다. | 없음 | eda-project · 예측+작성+4개 기준+3단계 힌트 | 부분 | 관측 수준과 집계 함정 판단 포함. 성장률·전체 대비 비중·중복 합계 제거·시계열 차트 직접 과제 필요. |
| EDA실습_03 (Video Game Sales).ipynb 전체 학습 목표 | 집단별 합계·평균·순위·연도 추세를 비교한다. | 없음 | eda-project · 예측+작성+4개 기준+3단계 힌트 | 부분 | 그룹 평균·관측 수·동점 정렬 평가. 지역 비율/출시 연도/표본 편향 차트 분석은 미포함. |
| E10.zip 10개 실습 README 및 루트 README; 스크립트는 읽기만 함 | 셸의 인자·반복·표준입력·파일·조건을 조합한다. | Linux 별도 과정 | 없음 | 미구현 | 파이썬 우선으로 Linux 콘텐츠는 이번에 변경하지 않음. 문제·스크립트 미복제·미실행. |

## 확인 방법

`python tools/validate-python-lab.py`는 독립 작성 예제 14개 출력, 모범 구현 56개 기준, 오답 변형 4개 거절을 검사한다. `tests/python-lab.browser.cjs`는 실제 Pyodide 실행·진도 보존·홈 연결·차트·중지·모바일·실행기 장애를 검사한다. 개별 세부 목표가 단원 설명에 언급된 것만으로 완료 처리하지 않는다.

## 자료 이용과 한계

제공된 PDF 7개(473쪽), ipynb 7개, E10.zip을 로컬에서 텍스트·메타데이터·셀·ZIP 항목 중심으로 읽었다. PDF의 시각적 전 페이지 검수는 하지 않았다. 노트북의 셸 명령, 제출 지시, ZIP의 실행 스크립트는 작업 지시로 취급하지 않았고 실행하지 않았다. 자료 텍스트와 확인한 메타데이터·ZIP 목록에서 콘텐츠 재배포를 허용하는 명시적 라이선스를 확인하지 못했다. 이미지 속 별도 이용 조건까지 확인한 것은 아니다. 출처 표기는 허가로 간주하지 않는다.

원문의 문장·비유·예제·문제·해설·데이터·페이지 배치를 제품에 넣지 않았다. 새 설명과 합성 자료, 새 API 계약·경계 조건·코드·문제를 독립 작성했다. 추출 자료는 작업 폴더에만 두고 저장소·배포 패키지에 포함하지 않는다. 파일 이름·쪽수와 일반 개념 범위만 이 대응표에 기록했다.

## 다음 우선순위

1. 초보자 관찰로 선수 용어와 설명 길이·힌트 단계를 보정한다.
2. 부분/설명만 행을 목표별 소단원으로 나누어 직접 작성·오류 수정·추가 입력 검증을 붙인다. 특히 상속/프로퍼티, NumPy 선택·결합·난수, pandas 문자열·날짜·비율, 통계 차트가 우선이다.
3. seaborn/표 변형·실제 데이터 EDA를 원문과 다른 자료와 질문으로 추가한다. 외부 데이터는 출처와 이용 조건을 별도로 확인한다.
4. Linux E10은 이번 범위에서 미구현이며 셸 실행·채점 지원 범위를 먼저 정한다.
