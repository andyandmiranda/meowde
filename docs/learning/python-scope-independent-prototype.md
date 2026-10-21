# Independent Python scope learning prototype (not app-integrated)

Status: Draft-only. Ownership: isolated prototype for Issue #100; shared Python lab files, graders, UI, and storage are untouched pending PR #99 handoff.

## Learning outcomes
Learners can distinguish a local assignment from a name in an enclosing function, correct a stateful closure with `nonlocal`, and compare a closure with explicit state passing.

## Original concept guide (Korean)
함수 안에서 이름에 값을 대입하면 기본적으로 그 이름은 **지역변수**로 취급됩니다. 값을 넣기 전에 같은 지역변수를 읽으면 `UnboundLocalError`가 발생할 수 있습니다. 함수 안에 또 다른 함수를 만들 때 바깥 함수의 변수를 새 값으로 연결하려면 `nonlocal`을 사용할 수 있습니다. `global`은 가장 바깥 모듈 공간의 이름을 가리키며 다른 호출에도 영향이 퍼질 수 있으므로 필요한 경우를 신중히 판단합니다.

## Independent assessments
1. **예측과 오류 분석:** 점수 갱신 함수가 값 읽기보다 먼저 지역 이름으로 판단되는 이유를 설명하고, 예외 종류를 선택합니다.
2. **직접 작성:** `make_counter(start=0)`가 내부 `advance(step)` 함수를 반환하도록 작성합니다. 반환된 함수는 자체 누적값을 기억합니다. 각 팩토리 호출은 독립적이어야 합니다.
3. **응용:** `add_to_total(total, step)`로 현재 값을 명시적으로 전달해 반환합니다. 숨은 전역 상태를 바꾸지 않습니다.

## Oracle and acceptance
- Test with `python -m unittest discover -s tests/learning_scope -p 'test_scope_mastery.py' -v` at repository root.
- Six cases test accumulation, independent closures, negative increments, explicit state purity, missing `nonlocal` error, and local-before-assignment error.
- These checks validate the *reference behavior*, **not** learner-submitted variants or the MEOWDE grader. Browser/Pyodide, KO/EN, new stable IDs, save/load and accessibility are NOT RUN.
- Do not mark this prototype as user-accessible or deploy it. Independent content similarity and rights review remains a release gate. No private teaching assets were used or copied.
