"""Author independently written learning content; never reads teaching attachments."""
import json
from pathlib import Path

units=[]
def add(id,title,prerequisites,goals,concept,glossary,example,output,flow,pitfalls,quiz,task):
    units.append(dict(id=id,title=title,prerequisites=prerequisites,goals=goals,concept=concept,glossary=glossary,example=example,output=output,flow=flow,pitfalls=pitfalls,quiz=quiz,task=task))
def q(code,choices,answer,reasons):
    return dict(type='predict',difficulty='기초 → 이해',code=code,choices=choices,answer=answer,reasons=reasons,goal='실행 순서와 값의 변화를 근거로 결과를 예측한다.',criteria='선택한 결과와 실행 흐름을 대조한다.')
def test(label,code,feedback):return dict(label=label,code=code,feedback=feedback)
def task(prompt,starter,model,tests,hints,steps,mistake,alternative,difficulty='응용',kind='코드 작성'):
    return dict(type=kind,difficulty=difficulty,prompt=prompt,starter=starter,model=model,tests=tests,hints=hints,steps=steps,mistake=mistake,alternative=alternative,criteria=[t['label'] for t in tests])

add('values','문자에서 계산으로',[],['문자열과 수를 구별한다.','형변환 후 몫·나머지로 자원을 배분한다.'],
'입력 장치나 파일에서 읽은 숫자는 글자일 수 있습니다. 문자열의 +는 이어 붙이기이고 정수의 +는 덧셈입니다. 변수를 대입하면 오른쪽 식을 먼저 계산해 그 결과에 이름을 붙입니다. //는 나눈 결과의 내림 몫, %는 나머지입니다. 음수에서는 단순히 소수 부분을 지우는 것과 다릅니다. 실제 입력을 받는 input()도 문자열을 돌려줍니다. 아래 예제는 입력 대기 없이 실행할 수 있도록 문자열을 미리 넣었습니다.',
{'str':'문자열. 따옴표로 묶은 텍스트입니다.','int':'정수 자료형. int("8")처럼 숫자 문자열을 변환할 수도 있습니다.','return':'함수 호출 위치로 결과를 돌려주는 문장입니다. 함수 작성법은 코드 틀에 제공했습니다.','튜플':'여러 결과를 순서대로 묶는 값입니다. return a, b는 두 결과를 묶습니다.'},
'text = "23"\ncount = int(text)\nprint(count // 6, count % 6)\nprint("총", count, sep=":")','3 5\n총:23',
['"23"을 int로 변환해 정수 23을 얻습니다.','23을 6으로 나눈 몫 3과 나머지 5를 출력합니다.','print의 sep는 여러 출력값 사이 구분자를 정합니다. end는 출력 끝 문자이며 기본은 줄바꿈입니다.'],
['"4" + "2"는 42라는 문자열입니다. 숫자 6을 원하면 먼저 변환해야 합니다.','int("2.5")는 실패합니다. 이 단원 입력은 0 이상의 정수 문자열로 제한합니다.'],
q('x = "9"\nprint(int(x) + 2)\nprint(x + "2")',['11\n92','92\n11','11\n11'],0,['첫 줄은 수의 덧셈이고 둘째 줄은 문자열 연결입니다.','int가 적용되는 식을 다시 확인하세요.','원래 x는 바뀌지 않습니다. 변환 결과를 다시 x에 대입하지 않았습니다.']),
task('pack(text, capacity)를 완성하세요. text는 0 이상의 정수 문자열, capacity는 1 이상의 정수입니다. 꽉 찬 상자 수와 남은 수를 튜플로 반환하세요. 예: pack("23", 6) → (3, 5). 출력이 아니라 반환값을 평가합니다.',
'def pack(text, capacity):\n    # 문자열을 정수로 바꾸세요\n    pass',
'def pack(text, capacity):\n    count = int(text)\n    return count // capacity, count % capacity',
[test('일반 입력','assert pack("23", 6) == (3, 5)','형변환 후 몫과 나머지를 구했는지 확인하세요.'),test('빈 수량','assert pack("0", 4) == (0, 0)','0개는 상자도 나머지도 0입니다.'),test('정확히 나누어짐','assert pack("24", 6) == (4, 0)','나머지 0도 결과에 포함하세요.'),test('다른 용량','assert pack("7", 10) == (0, 7)','예시 숫자를 고정하지 말고 매개변수를 사용하세요.')],
['문자열 상태로 계산하고 있지 않은지 확인하세요.','상자 수는 나눗셈의 몫, 남은 수는 나머지입니다.','count = int(text)를 만든 후 두 연산 결과를 return으로 묶으세요.'],
['입력 조건을 확인하고 수량을 변환합니다.','몫과 나머지를 각각 계산합니다.','두 값을 반환한 뒤 0과 정수 배수에서 확인합니다.'],'print만 사용하면 함수의 반환값은 None입니다.','divmod(count, capacity)는 몫과 나머지를 한 번에 구하지만 두 연산을 이해한 뒤 사용하세요.'))

add('branches','조건의 경계와 우선순위',['values'],['조건의 경계를 빠짐없이 분류한다.','서로 배타적인 분기를 설계한다.'],
'조건식은 True 또는 False로 판단할 수 있는 식입니다. if/elif/else는 위에서부터 검사해 처음 참인 블록 하나를 실행합니다. 독립된 if 두 개는 둘 다 실행될 수 있습니다. 따라서 범주를 하나만 고를 때는 조건 순서가 중요합니다. and는 두 조건을 모두 요구하고 or는 하나 이상을 요구합니다. not은 참·거짓을 뒤집습니다. 들여쓴 줄들이 같은 코드 블록이며 콜론 뒤에 시작합니다.',
{'bool':'참과 거짓을 나타내는 자료형입니다.','elif':'앞 조건이 거짓일 때 검사하는 다음 조건입니다.','경계값':'규칙이 바뀌는 값입니다. <와 <=의 차이를 드러냅니다.'},
'battery = 18\nif battery < 10:\n    label = "stop"\nelif battery < 25:\n    label = "charge"\nelse:\n    label = "ready"\nprint(label)','charge',
['18 < 10은 거짓이어서 다음 조건으로 갑니다.','18 < 25는 참이어서 charge를 대입합니다.','이미 한 블록을 선택했으므로 else를 실행하지 않습니다.'],
['좁은 조건을 뒤에 두면 넓은 조건이 먼저 잡아버릴 수 있습니다.','x == 5는 비교이고 x = 5는 대입입니다.'],
q('n = 10\nif n < 10:\n    print("low")\nelif n <= 10:\n    print("edge")\nelse:\n    print("high")',['low','edge','high'],1,['10은 10보다 작지 않습니다.','첫 조건은 거짓, 둘째 조건은 참입니다.','<=는 경계 10을 포함합니다.']),
task('shipping(total, member)를 완성하세요. total은 0 이상의 정수, member는 bool입니다. total이 30000 이상이거나 회원이면 배송비 0, 그렇지 않으면 2500을 반환합니다. 예: shipping(29999, False) → 2500. 두 조건 중 하나만 충족해도 무료입니다.',
'def shipping(total, member):\n    pass',
'def shipping(total, member):\n    if total >= 30000 or member:\n        return 0\n    return 2500',
[test('경계 직전','assert shipping(29999, False) == 2500','금액이 기준보다 작은 비회원은 배송비가 있습니다.'),test('경계 포함','assert shipping(30000, False) == 0','30000 이상이므로 == 경계를 포함하세요.'),test('회원 조건','assert shipping(0, True) == 0','회원 조건만 참이어도 무료입니다. and와 or를 구별하세요.'),test('두 조건 모두 참','assert shipping(50000, True) == 0','조건이 겹쳐도 배송비는 하나만 반환하세요.')],
['금액과 회원 조건을 따로 말로 써보세요.','둘 중 하나가 참이면 무료이므로 or가 필요합니다.','무료 조건에서 0을 반환하고 나머지 경로에서 2500을 반환하세요.'],
['참·거짓 조합 네 가지를 적습니다.','금액 조건에 등호를 넣습니다.','둘 중 하나로 결정한 뒤 모든 경로에서 반환합니다.'],'and는 두 조건을 동시에 요구하므로 회원 혜택을 누락합니다.','두 if로 나눌 수도 있으나 조건을 한 곳에 모으면 규칙을 읽기 쉽습니다.'))

add('loops','반복의 상태와 종료',['branches'],['누적값의 초기화 위치를 설명한다.','break와 continue를 구별한다.'],
'반복은 동일한 처리 규칙을 여러 값에 적용합니다. for는 반복 가능한 값에서 요소를 하나씩 꺼냅니다. range(시작, 끝, 간격)는 끝을 제외한 정수 흐름을 제공합니다. while은 조건이 참인 동안 실행하므로 조건이 바뀌거나 break를 만나야 끝납니다. continue는 이번 반복의 나머지를 건너뛰고, break는 가장 가까운 반복 전체를 끝냅니다. 누적값은 반복 전에 초기화하고 반복 안에서 갱신합니다.',
{'누적값':'처리한 데이터의 결과를 다음 반복으로 전달하는 변수입니다.','iterable':'for가 요소를 차례로 꺼낼 수 있는 값입니다. 리스트와 문자열 외에 range, 파일 등도 가능합니다.','리스트':'[ ]로 묶은 순서 있는 여러 값입니다.'},
'total = 0\nfor value in [4, -1, 7, 0, 9]:\n    if value == 0:\n        break\n    if value < 0:\n        continue\n    total += value\nprint(total)','11',
['total을 반복 밖에서 0으로 시작합니다.','4를 더하고 -1은 건너뛴 후 7을 더합니다.','0에서 반복이 끝나므로 9는 읽지 않습니다. +=는 기존 값에 더해 다시 대입합니다.'],
['누적값을 반복 안에서 0으로 만들면 앞의 합을 잃습니다.','while에서 continue 전에 진행 변수가 갱신되지 않으면 무한 반복이 될 수 있습니다.'],
q('total = 0\nfor n in [2, 0, 5]:\n    if n == 0:\n        continue\n    total += n\nprint(total)',['2','7','0'],1,['continue는 반복 전체를 중단하지 않습니다.','0만 건너뛰므로 2와 5를 더합니다.','초기값 이후 갱신되는 줄을 따라가세요.']),
task('collect(values)를 완성하세요. values는 정수 리스트입니다. 첫 0까지만 읽고 그 전의 양수만 더해 반환하세요. 음수는 무시합니다. 0이 없으면 끝까지 읽습니다. 빈 리스트의 결과는 0입니다. 예: [6, -3, 2, 0, 8] → 8.',
'def collect(values):\n    # 합계를 반복 밖에서 초기화하세요\n    pass',
'def collect(values):\n    total = 0\n    for value in values:\n        if value == 0:\n            break\n        if value < 0:\n            continue\n        total += value\n    return total',
[test('종료 후 값 제외','assert collect([6, -3, 2, 0, 8]) == 8','0 이후는 더하지 않습니다. break 위치를 보세요.'),test('빈 목록','assert collect([]) == 0','반복 전에 합계를 초기화하세요.'),test('음수만 존재','assert collect([-5, -1]) == 0','음수를 합계에 포함하지 마세요.'),test('종료값 없음','assert collect([3, 4]) == 7','0이 없어도 목록 끝에서 정상 반환해야 합니다.')],
['현재 값이 0인지, 음수인지, 양수인지 나눠보세요.','0은 break, 음수는 continue로 처리할 수 있습니다.','total은 반복 전에 0으로 만들고 return은 반복 뒤에 둡니다.'],
['종료 규칙을 먼저 확인합니다.','무시할 값을 건너뜁니다.','처리할 값만 누적하고 마지막에 반환합니다.'],'반복 안의 return은 첫 값만 처리하고 함수를 끝냅니다.','while과 인덱스로도 가능하지만 for는 인덱스 갱신 누락을 줄입니다.'))

add('collections','자료구조를 고르는 기준',['loops'],['리스트·튜플·딕셔너리·집합을 용도에 맞게 선택한다.','문자열을 정규화하고 빈도를 센다.'],
'리스트는 순서대로 보관하고 수정할 때, 튜플은 고정된 묶음을 전달할 때 사용합니다. 딕셔너리는 키에 대응하는 값을 찾고, 집합(set)은 중복 없는 요소와 포함 관계를 다룹니다. 문자열도 순서가 있지만 글자 하나를 직접 바꿀 수 없습니다. strip은 양끝 공백을, lower는 대소문자 차이를 정리해 새 문자열을 만듭니다. split은 구분자로 나누고 join은 문자열 목록을 합칩니다. 인덱스는 0부터 시작하며 [a:b]는 b 직전까지의 슬라이스입니다.',
{'키':'딕셔너리에서 값을 찾는 식별자입니다.','get(key, default)':'키가 없으면 기본값을 돌려줍니다.','컴프리헨션':'[식 for 요소 in 목록 if 조건]으로 새 리스트를 만드는 표현입니다. 일반 반복문을 먼저 이해하세요.','집합 연산':'a & b는 공통 요소, a | b는 합집합, a - b는 차집합입니다.'},
'counts = {}\nfor raw in [" Mint ", "mint", "ROSE"]:\n    name = raw.strip().lower()\n    counts[name] = counts.get(name, 0) + 1\nprint(counts["mint"])','2',
['빈 딕셔너리로 시작합니다.','공백 제거와 소문자 변환 결과를 name에 저장합니다.','처음 나온 키는 0에서 시작하고 같은 키는 기존 수에 1을 더합니다.'],
['집합만 사용하면 각 항목이 몇 번 나왔는지 잃습니다.','strip과 lower는 원래 문자열을 수정하지 않습니다. 반환값을 사용하세요.'],
q('items = ["a", "b", "a"]\nprint(len(items), len(set(items)))',['3 3','2 2','3 2'],2,['집합은 중복을 합칩니다.','리스트의 길이는 중복을 포함합니다.','리스트는 3개, 집합은 서로 다른 두 요소입니다.']),
task('tally(labels)를 완성하세요. 문자열 리스트의 양끝 공백을 제거하고 소문자로 바꿔 빈도를 딕셔너리로 반환하세요. 정리 후 빈 문자열은 제외합니다. 예: [" Sky ", "sky", ""] → {"sky": 2}. 원래 리스트는 변경하지 않습니다.',
'def tally(labels):\n    pass',
'def tally(labels):\n    counts = {}\n    for raw in labels:\n        name = raw.strip().lower()\n        if name != "":\n            counts[name] = counts.get(name, 0) + 1\n    return counts',
[test('정규화와 합산','assert tally([" Sky ", "sky", "Moss"]) == {"sky": 2, "moss": 1}','정리한 문자열을 키로 사용하세요.'),test('공백 제외','assert tally(["", "  "]) == {}','strip 후 빈 문자열을 제외하세요.'),test('빈 목록','assert tally([]) == {}','빈 입력에는 빈 딕셔너리를 반환하세요.'),test('원본 보존','original = ["Sky "]; tally(original); assert original == ["Sky "]','입력 요소를 직접 바꾸지 말고 새 결과를 만드세요.')],
['같은 단어를 같은 키로 만들려면 먼저 정리해야 합니다.','각 키의 이전 빈도가 없으면 0으로 시작하세요.','counts[name] = counts.get(name, 0) + 1을 빈 문자열이 아닐 때 실행하세요.'],
['입력 문자열을 정리합니다.','빈 값을 제거합니다.','딕셔너리의 해당 키를 갱신합니다.'],'정규화 전 raw를 키로 쓰면 공백·대문자가 다른 그룹이 됩니다.','collections.Counter로 짧게 쓸 수 있지만 정규화·빈 값 제외는 별도이며 이 단원에서는 직접 누적합니다.'))

add('copy','중첩 자료와 복사',['collections'],['참조 공유와 얕은 복사를 구별한다.','중첩 리스트의 원본을 보존한다.'],
'대입은 객체를 복제하지 않고 같은 객체에 다른 이름을 연결할 수 있습니다. 리스트의 [:]나 copy()는 바깥 리스트만 새로 만들기 때문에 안쪽 리스트는 공유할 수 있습니다. 2차원 격자를 독립적으로 바꾸려면 각 행도 새로 만들어야 합니다. 이 과제의 행은 정수만 담으므로 행 슬라이스로 충분합니다. 더 깊거나 복잡한 중첩은 copy.deepcopy를 검토해야 합니다. 중첩 for는 바깥 요소마다 안쪽 반복 전체를 실행합니다.',
{'참조':'이름이나 컨테이너가 객체를 가리키는 관계입니다.','얕은 복사':'바깥 컨테이너만 새로 만들고 안쪽 객체는 공유하는 복사입니다.','컴프리헨션의 중첩':'[[값 for 열 in 행] for 행 in 격자]처럼 행마다 새 결과를 만듭니다.'},
'grid = [[2, 4], [6, 8]]\nother = grid[:]\nother[0][0] = 99\nprint(grid[0][0])','99',
['other의 바깥 목록은 새 객체입니다.','other[0]과 grid[0]은 같은 행을 가리킵니다.','공유 행의 첫 요소를 수정했으므로 원본에서도 99를 읽습니다.'],
['[[]] * 3은 같은 안쪽 리스트를 세 번 공유합니다.','새 바깥 리스트가 있다고 모든 깊이가 독립적인 것은 아닙니다.'],
q('a = [[1]]\nb = [row[:] for row in a]\nb[0][0] = 7\nprint(a[0][0])',['7','1','오류'],1,['행도 새 리스트로 만들었습니다.','안쪽 행이 독립적이라 a는 1을 유지합니다.','정수 하나를 담은 행의 슬라이스는 유효합니다.']),
task('아래 shift(grid, delta)는 바깥 리스트만 복사해 원본의 행까지 바꾸는 결함이 있습니다. 이를 수정하세요. 정수로 된 행들의 리스트에서 모든 원소에 delta를 더한 새 격자를 반환해야 합니다. 원본과 결과는 행까지 독립적이어야 합니다. 빈 격자·빈 행·행마다 다른 길이를 허용합니다. 예: [[1, 3], []], 2 → [[3, 5], []].',
'def shift(grid, delta):\n    result = grid[:]\n    for row in result:\n        for i in range(len(row)):\n            row[i] += delta\n    return result',
'def shift(grid, delta):\n    result = []\n    for row in grid:\n        changed = []\n        for value in row:\n            changed.append(value + delta)\n        result.append(changed)\n    return result',
[test('값 변환','assert shift([[1, 3], []], 2) == [[3, 5], []]','각 행에서 새 행을 만들고 delta를 더하세요.'),test('빈 격자','assert shift([], 8) == []','행이 없어도 빈 결과를 반환하세요.'),test('음수와 불균등 행','assert shift([[0], [-2, 4]], -1) == [[-1], [-3, 3]]','정사각형이라는 가정을 하지 마세요.'),test('참조 독립성','g = [[1, 2]]; r = shift(g, 0); r[0][0] = 77; assert g == [[1, 2]]','각 행을 복제해야 결과 변경이 원본으로 전파되지 않습니다.')],
['바깥 결과와 각 행의 결과를 따로 만들어보세요.','행마다 changed = []를 새로 만들고 각 원소를 append하세요.','중첩 컴프리헨션 [[value + delta for value in row] for row in grid]도 같은 원리입니다.'],
['새 바깥 리스트를 만듭니다.','각 행을 새 리스트로 변환합니다.','결과를 바꿔도 원본이 유지되는지 시험합니다.'],'result = grid 또는 행 자체를 append하면 참조가 공유됩니다.','중첩 컴프리헨션은 짧지만 두 반복의 순서를 읽기 어렵다면 일반 for가 명확합니다.',kind='오류 수정 · 코드 작성'))

add('functions','함수의 계약과 지역 상태',['copy'],['입력·출력 계약을 설계한다.','호출 사이 상태가 새지 않게 한다.'],
'함수는 입력인 매개변수와 출력인 반환값 사이의 규칙을 묶습니다. def는 함수를 정의하고 호출할 때 본문을 실행합니다. 함수 안에서 대입한 이름은 보통 지역 이름이라 호출마다 새로 만들어집니다. 기본 인자는 생략된 인자에 쓰이지만 함수 정의 시 한 번 계산되므로 변경 가능한 리스트를 기본값으로 두면 호출 사이에 공유됩니다. None을 기본값으로 두고 내부에서 새 리스트를 만들 수 있습니다. 타입 힌트는 기대 자료형을 알리는 표기이며 자동 검증은 아닙니다.',
{'매개변수/인자':'정의에서 쓰는 이름이 매개변수, 호출에서 전달하는 값이 인자입니다.','None':'값이 없거나 아직 정해지지 않음을 나타내는 값입니다.','키워드 인자':'f(limit=3)처럼 매개변수 이름을 적어 전달합니다.','*args / **kwargs':'여러 위치 인자를 튜플, 여러 키워드 인자를 딕셔너리로 받는 문법입니다. 이 과제에는 필요하지 않습니다.'},
'def keep(values, limit=5):\n    result = []\n    for value in values:\n        if value >= limit:\n            result.append(value)\n    return result\nprint(keep([3, 5, 8], limit=6))','[8]',
['호출 시 values와 limit에 값을 전달합니다.','호출마다 result를 새로 만듭니다.','필터링 결과를 반환한 뒤 호출한 쪽에서 출력합니다.'],
['print는 화면 효과이고 return은 다른 코드가 재사용할 값입니다.','기본값에 []를 두고 append하면 이전 호출의 항목이 남을 수 있습니다.'],
q('def f(x):\n    x = x + 1\n    return x\nx = 4\ny = f(x)\nprint(x, y)',['5 5','4 5','4 None'],1,['함수 안 x 대입은 바깥 x를 다시 대입하지 않습니다.','지역 x는 5가 되고 반환값만 y에 연결됩니다.','return x가 있으므로 y는 None이 아닙니다.']),
task('append_tag(tag, tags=None)를 완성하세요. tags가 없으면 새 리스트를 사용하고, 있으면 복사한 후 tag를 끝에 추가해 반환하세요. tags는 문자열 리스트 또는 None입니다. 원본을 변경하지 않으며 각 호출은 독립적이어야 합니다. 예: append_tag("new", ["old"]) → ["old", "new"].',
'def append_tag(tag, tags=None):\n    pass',
'def append_tag(tag, tags=None):\n    if tags is None:\n        result = []\n    else:\n        result = tags[:]\n    result.append(tag)\n    return result',
[test('목록 확장','assert append_tag("new", ["old"]) == ["old", "new"]','원래 요소 순서를 유지하고 끝에 추가하세요.'),test('기본 호출 독립성','assert append_tag("a") == ["a"]; assert append_tag("b") == ["b"]','호출마다 새 리스트를 만들어야 합니다.'),test('원본 보존','a = ["x"]; append_tag("y", a); assert a == ["x"]','tags를 복사한 뒤 추가하세요.'),test('빈 목록','assert append_tag("", []) == [""]','빈 태그도 유효한 문자열입니다. 임의로 제외하지 마세요.')],
['None인지 확인할 때는 tags is None을 사용합니다.','새 결과를 만들지 않고 tags.append를 하고 있지는 않나요?','None이면 [], 아니면 tags[:]로 시작한 뒤 append하고 반환하세요.'],
['기본값과 명시적 입력을 나눕니다.','새 결과에만 변경을 적용합니다.','두 번 연속 호출해 독립성을 확인합니다.'],'if not tags는 None과 빈 리스트를 모두 잡습니다. 계약을 명확히 하려면 is None을 씁니다.','list(tags)도 복사할 수 있지만 tags가 None일 때는 별도 분기가 필요합니다.'))

add('files','모듈·파일·예외의 책임',['functions'],['모듈을 불러와 파일을 읽는다.','깨진 레코드를 명시적으로 처리한다.'],
'모듈은 기능을 담은 파이썬 파일이나 라이브러리 단위이며 import로 불러옵니다. 패키지는 모듈을 묶습니다. 파일은 프로그램이 끝나도 데이터를 남길 때 사용합니다. with open(...)은 블록을 벗어날 때 파일을 닫습니다. r은 읽기, w는 기존 내용을 덮어쓰기, a는 끝에 추가하기입니다. encoding="utf-8"처럼 문자 해석 방법을 명시합니다. json은 기본 자료형을 텍스트로 저장하는 표준 모듈입니다. 파일 오류를 무조건 무시하면 데이터 손실을 숨길 수 있어, 처리할 예외와 전파할 예외를 구분해야 합니다.',
{'JSON':'문자열·숫자·리스트·키와 값 등의 데이터를 교환하는 텍스트 형식입니다.','loads / dumps':'JSON 문자열에서 파이썬 값으로 / 파이썬 값에서 JSON 문자열로 변환합니다. load/dump는 파일 객체를 받습니다.','try / except':'실행 중 발생한 특정 예외를 잡아 처리하는 구조입니다.','ValueError':'자료형은 허용되지만 내용이 변환 규칙에 맞지 않을 때 등의 예외입니다.'},
'import json\ntext = json.dumps({"visits": 4})\nwith open("sample.json", "w", encoding="utf-8") as file:\n    file.write(text)\nwith open("sample.json", "r", encoding="utf-8") as file:\n    data = json.load(file)\nprint(data["visits"])','4',
['파이썬 딕셔너리를 JSON 문자열로 바꿉니다.','브라우저 실행기의 임시 파일에 기록합니다.','다시 읽으면 문자열이 아닌 딕셔너리를 얻어 키로 접근합니다. 브라우저 파일은 내 PC 파일이 아니며 실행 종료 시 초기화됩니다.'],
['w 모드는 기존 파일을 지웁니다.','except:처럼 모든 예외를 잡으면 코드 자체의 결함까지 가립니다.'],
q('import json\nx = json.loads(\'{"n": 6}\')\nprint(x["n"] + 1)',['7','61','오류'],0,['JSON 숫자는 파이썬 정수로 복원되어 1을 더합니다.','JSON에서 6은 따옴표 없는 수입니다.','정상 JSON이며 n 키가 존재합니다.']),
task('read_total(path)를 완성하세요. UTF-8 파일의 한 줄마다 정수 하나가 있습니다. 공백만 있는 줄과 int 변환이 ValueError를 내는 줄은 건너뛰고 합계를 반환하세요. 파일이 없으면 FileNotFoundError를 그대로 전파합니다. 예: "5\\nwrong\\n-2\\n" → 3. 파일 객체를 for로 순회하면 한 줄씩 읽습니다.',
'def read_total(path):\n    pass',
'def read_total(path):\n    total = 0\n    with open(path, "r", encoding="utf-8") as file:\n        for line in file:\n            try:\n                value = int(line.strip())\n            except ValueError:\n                continue\n            total += value\n    return total',
[test('오류 줄 제외','from pathlib import Path\nPath("one.txt").write_text("5\\nwrong\\n-2\\n", encoding="utf-8")\nassert read_total("one.txt") == 3','각 줄의 변환 실패만 건너뛰세요.'),test('공백 처리','from pathlib import Path\nPath("two.txt").write_text(" 8 \\n\\n  \\n2\\n", encoding="utf-8")\nassert read_total("two.txt") == 10','양끝 공백은 strip으로 정리할 수 있습니다.'),test('빈 파일','from pathlib import Path\nPath("empty.txt").write_text("", encoding="utf-8")\nassert read_total("empty.txt") == 0','반복 전 합계를 0으로 두세요.'),test('없는 파일 오류 보존','try:\n    read_total("missing-lesson-947.txt")\nexcept FileNotFoundError:\n    pass\nelse:\n    raise AssertionError("missing file error required")','파일 열기 오류까지 무시하지 마세요.')],
['파일을 여는 책임과 한 줄을 해석하는 책임을 나누세요.','int 변환만 try 안에 두고 ValueError만 잡아보세요.','with open(path, "r", encoding="utf-8") 안에서 for line in file을 사용하세요.'],
['파일을 열고 한 줄씩 읽습니다.','변환할 수 있는 줄만 누적합니다.','잘못된 줄과 파일 자체의 오류를 구별합니다.'],'파일 전체를 int로 변환하면 여러 줄 입력을 처리할 수 없습니다.','모든 값을 리스트로 만든 뒤 sum할 수도 있지만 스트리밍 누적은 파일 크기에 비례한 추가 메모리를 줄입니다.'))

add('objects','객체의 상태와 불변 조건',['files'],['인스턴스별 상태를 보존한다.','잘못된 요청에도 상태 규칙을 지킨다.'],
'객체는 상태인 속성과 행동인 메서드를 함께 묶습니다. class는 객체의 공통 규칙을 정의하고 __init__은 새 객체의 초기 상태를 설정합니다. self는 현재 호출 대상 객체입니다. 상태가 0 이상이어야 한다면 모든 변경 경로가 그 규칙을 지켜야 합니다. 캡슐화는 이런 변경 규칙을 한 곳에 모아 외부가 내부 구현에 의존하지 않도록 하는 설계입니다. 상속은 공통 행동을 재사용하고 오버라이딩은 하위 클래스가 같은 메서드 이름을 새로 정의하는 것입니다. 단순 데이터 처리에는 함수가 더 간단할 수도 있습니다.',
{'인스턴스':'클래스를 호출해 만든 개별 객체입니다.','클래스 변수':'클래스에 두어 인스턴스들이 공유할 수 있는 값입니다. 객체별 변경 상태와 구별하세요.','불변 조건':'객체가 사용되는 내내 유지해야 하는 규칙입니다.','다형성':'같은 메서드 호출 규약으로 서로 다른 구현을 사용할 수 있는 성질입니다.'},
'class Meter:\n    def __init__(self, value):\n        self.value = value\n    def add(self, amount):\n        self.value += amount\na = Meter(2)\nb = Meter(10)\na.add(3)\nprint(a.value, b.value)','5 10',
['객체 a와 b는 각각 value 속성을 가집니다.','a.add(3)은 self가 a인 호출입니다.','a만 바뀌므로 b의 값은 10입니다.'],
['메서드에서 value = ...는 지역 변수이고 self.value와 다릅니다.','공유 클래스 리스트에 객체별 기록을 저장하면 다른 객체 기록이 섞입니다.'],
q('class Base:\n    def label(self):\n        return "base"\nclass Child(Base):\n    def label(self):\n        return "child"\nprint(Child().label())',['base','child','오류'],1,['하위 클래스의 동일 이름 메서드가 우선합니다.','Child가 label을 오버라이딩했습니다.','Child(Base)는 유효한 상속 선언입니다.']),
task('Quota(limit) 클래스를 작성하세요. limit은 0 이상의 정수입니다. remaining 속성을 limit으로 시작하고 use(amount)는 amount가 양의 정수이며 잔량 이하이면 차감 후 True, 그 외 정수 요청이면 상태를 유지하고 False를 반환합니다. 입력은 정수로 제한합니다. 예: Quota(4).use(3) → True, 잔량 1. 인스턴스끼리 상태를 공유하지 않습니다.',
'class Quota:\n    def __init__(self, limit):\n        pass\n\n    def use(self, amount):\n        pass',
'class Quota:\n    def __init__(self, limit):\n        self.remaining = limit\n    def use(self, amount):\n        if amount <= 0 or amount > self.remaining:\n            return False\n        self.remaining -= amount\n        return True',
[test('정상 차감','q = Quota(4); assert q.use(3) is True; assert q.remaining == 1','self.remaining을 변경하고 bool을 반환하세요.'),test('초과 요청 무변경','q = Quota(2); assert q.use(3) is False; assert q.remaining == 2','검증을 통과하기 전에 차감하지 마세요.'),test('0·음수 요청','q = Quota(2); assert q.use(0) is False; assert q.use(-3) is False; assert q.remaining == 2','음수 차감으로 잔량이 늘지 않게 하세요.'),test('경계와 인스턴스 독립성','a = Quota(3); b = Quota(8); assert a.use(3) is True; assert a.remaining == 0; assert b.remaining == 8','정확한 잔량 사용은 허용하고 다른 객체를 변경하지 마세요.')],
['남은 수량이 0 이상이라는 규칙을 먼저 적어보세요.','유효하지 않은 요청을 먼저 거절하면 상태를 보존하기 쉽습니다.','self.remaining에 초기값을 두고 0 < amount <= self.remaining일 때만 차감하세요.'],
['생성자에서 객체별 상태를 만듭니다.','요청의 유효성을 검사합니다.','유효한 경우만 변경하고 결과를 반환합니다.'],'먼저 빼고 실패 시 되돌리면 복잡한 경로에서 복구를 빠뜨릴 수 있습니다.','함수에 remaining을 전달하고 새 잔량을 반환할 수도 있습니다. 클래스는 여러 호출 동안 상태를 유지할 때 유용합니다.',difficulty='심화',kind='설계 · 코드 작성'))

add('numpy-shape','배열의 모양과 공유',['copy'],['ndarray의 shape·dtype·차원을 해석한다.','형태 변경과 원소별 연산을 연결한다.'],
'NumPy의 ndarray는 보통 같은 자료형의 값을 여러 차원에 담습니다. shape은 축별 길이, ndim은 축 수, size는 전체 원소 수, dtype은 원소 표현 방식입니다. 리스트의 +는 연결이지만 배열의 +는 원소별 덧셈입니다. reshape는 원소 수를 유지하며 모양을 바꿉니다. -1은 나머지 차원에서 길이를 계산하라는 의미입니다. 슬라이스가 원본을 공유하는 뷰일 수 있으므로 독립 수정에는 copy()를 사용합니다. 브로드캐스팅은 뒤쪽 축부터 크기가 같거나 한쪽이 1일 때 확장해 계산하는 규칙입니다.',
{'스칼라·벡터·행렬':'각각 0·1·2차원 배열로 표현할 수 있습니다. 텐서는 더 일반적인 다차원 표현입니다.','astype':'배열 원소의 자료형을 변환합니다.','arange / linspace':'일정 간격의 값 / 양끝 사이 지정 개수의 값을 생성합니다.','zeros / ones / full':'지정한 shape의 배열을 0 / 1 / 주어진 값으로 채웁니다.'},
'import numpy as np\na = np.arange(6).reshape(2, 3)\nb = a + np.array([10, 20, 30])\nprint(a.shape, a.size)\nprint(b.tolist())','(2, 3) 6\n[[10, 21, 32], [13, 24, 35]]',
['arange(6)은 0부터 5까지 여섯 값을 만듭니다.','2×3으로 재배열해도 원소 수 6은 같습니다.','길이 3 벡터가 각 행에 적용됩니다. tolist()는 배열을 일반 리스트로 바꿉니다.'],
['(2, 3)과 (2,)는 뒤쪽 차원 3과 2가 달라 바로 더할 수 없습니다.','reshape가 항상 복사본을 만든다고 가정하지 마세요.'],
q('import numpy as np\na = np.array([[2, 5], [8, 11]])\nprint((a + np.array([1, 3])).tolist())',['[[3, 8], [9, 14]]','[[3, 6], [11, 14]]','오류'],0,['열 위치가 같은 값끼리 더하고 각 행에 반복합니다.','길이 2 벡터는 행별 상수가 아니라 뒤쪽 축과 대응합니다.','(2, 2)와 (2,)는 브로드캐스팅이 가능합니다.']),
task('offset_rows(flat, width, offsets)를 작성하세요. flat은 길이가 width의 배수인 정수 리스트, width는 양의 정수, offsets는 길이 width인 정수 리스트입니다. flat을 (-1, width) 모양으로 만들고 각 열에 offsets를 더한 ndarray를 반환하세요. 빈 flat이면 shape (0, width)입니다. 원본 리스트를 바꾸지 않습니다. 예: [1,2,3,4], 2, [10,20] → [[11,22],[13,24]].',
'import numpy as np\n\ndef offset_rows(flat, width, offsets):\n    pass',
'import numpy as np\ndef offset_rows(flat, width, offsets):\n    a = np.array(flat, dtype=int).reshape(-1, width)\n    return a + np.array(offsets)',
[test('형태와 값','r = offset_rows([1,2,3,4], 2, [10,20]); assert isinstance(r, np.ndarray); assert r.shape == (2,2); assert r.tolist() == [[11,22],[13,24]]','배열로 만들고 열 방향으로 오프셋을 더하세요.'),test('빈 배열의 모양','assert offset_rows([], 3, [1,2,3]).shape == (0,3)','빈 입력에서도 width 차원을 유지하세요.'),test('다른 폭','assert offset_rows([0,-1,2], 3, [2,3,4]).tolist() == [[2,2,6]]','폭 2를 고정하지 마세요.'),test('원본 보존','a=[1,2]; offset_rows(a, 2, [4,5]); assert a == [1,2]','입력 리스트를 직접 변경하지 마세요.')],
['flat의 원소 수와 width로 행 수를 결정하세요.','np.array(...).reshape(-1, width)를 사용할 수 있습니다.','열별 offsets 벡터를 배열 전체에 더하면 브로드캐스팅됩니다.'],
['1차원 입력을 배열로 만듭니다.','행 수를 유도하여 재배열합니다.','열 벡터를 원소별로 더합니다.'],'리스트에 + offsets를 사용하면 연결이 되어 모양과 값이 모두 잘못됩니다.','이중 반복문으로도 가능하지만 배열 연산은 모양이 계산 의도를 드러냅니다.'))

add('numpy-axis','축·마스크·행렬곱의 판단',['numpy-shape'],['axis로 집계 방향을 선택한다.','조건 필터링과 행렬곱을 구별한다.'],
'배열의 axis는 집계하면서 없앨 축을 지정합니다. shape (행, 열)에서 sum(axis=0)은 행 축을 없애 열별 합을, axis=1은 열 축을 없애 행별 합을 만듭니다. a > 0은 같은 shape의 bool 배열이고 a[a > 0]은 참인 원소만 선택합니다. np.where(조건, 참일 때 값, 거짓일 때 값)는 모양을 유지한 선택입니다. *는 원소별 곱이고 @는 행렬곱입니다. (m,n) @ (n,p)의 결과는 (m,p)이며 내부 길이가 같아야 합니다.',
{'마스크':'선택 여부를 각 위치의 True/False로 표현한 배열입니다.','keepdims':'집계 축을 길이 1로 남겨 후속 브로드캐스팅을 쉽게 하는 옵션입니다.','argmax':'최댓값 자체가 아니라 그 위치를 반환합니다.','mean / std / var':'평균 / 표준편차 / 분산 집계입니다. 표본·모집단 구분에 따라 ddof를 명시합니다.'},
'import numpy as np\na = np.array([[1, 4], [3, 8]])\nprint(a.sum(axis=0).tolist())\nprint((a @ np.array([2, 1])).tolist())','[4, 12]\n[6, 14]',
['axis=0은 같은 열의 1+3, 4+8을 계산합니다.','행렬곱은 각 행과 가중치 벡터의 대응 곱을 합합니다.','첫 행은 1×2+4×1=6, 둘째 행은 3×2+8×1=14입니다.'],
['행렬곱은 합성곱(convolution)과 다른 연산입니다.','mean에서 누락값을 임의로 0 처리하면 분모와 의미가 바뀝니다. 이 과제는 누락값 없는 유한 수만 받습니다.'],
q('import numpy as np\na = np.array([[1, 2, 3], [4, 5, 6]])\nprint(a.sum(axis=1).tolist())',['[5, 7, 9]','[6, 15]','21'],1,['그것은 axis=0의 열별 합입니다.','각 행의 열들을 합쳐 두 결과를 남깁니다.','axis를 지정했으므로 전체 단일 합이 아닙니다.']),
task('weighted_positive(matrix, weights)를 작성하세요. matrix는 shape (m,n)의 유한 실수 ndarray, weights는 shape (n,) ndarray입니다. 음수 원소만 0으로 바꾼 뒤 행렬곱으로 행별 가중 합 shape (m,)을 반환하세요. n >= 1이고 m=0도 허용합니다. 원본은 변경하지 않습니다. 예: [[-2,4],[3,1]], [2,3] → [12,9].',
'import numpy as np\n\ndef weighted_positive(matrix, weights):\n    pass',
'import numpy as np\ndef weighted_positive(matrix, weights):\n    clean = np.where(matrix < 0, 0, matrix)\n    return clean @ weights',
[test('마스크와 가중 합','a=np.array([[-2.,4.],[3.,1.]]); assert np.allclose(weighted_positive(a,np.array([2.,3.])),[12,9])','음수만 바꾼 뒤 대응 곱의 합을 구하세요.'),test('0과 음수','assert np.allclose(weighted_positive(np.array([[0.,-3.]]), np.array([2.,4.])), [0])','0은 그대로이고 음수만 0이 됩니다.'),test('빈 행','assert weighted_positive(np.empty((0,2)), np.array([1.,2.])).shape == (0,)','행 수가 0이어도 결과 차원을 유지하세요.'),test('원본 보존','a=np.array([[-1.,2.]]); weighted_positive(a,np.ones(2)); assert a.tolist()==[[-1.,2.]]','원본 마스크 대입보다 새 clean 배열을 만드세요.')],
['필터링은 원소 수를 바꿀 수 있습니다. 모양 유지가 필요합니다.','np.where로 음수만 0으로 대체한 새 배열을 만들 수 있습니다.','clean @ weights로 행마다 가중 합을 얻으세요.'],
['모양과 유효값 조건을 확인합니다.','음수를 0으로 바꾸되 모양을 유지합니다.','행렬곱을 적용하고 결과 shape을 확인합니다.'],'matrix[matrix >= 0]는 1차원으로 펼쳐 원래 행 구분을 잃습니다.','(clean * weights).sum(axis=1)도 같습니다. @는 선형 결합 의도를 간결하게 나타냅니다.',difficulty='심화'))

add('pandas-select','행 선택과 라벨의 의미',['numpy-axis'],['loc와 iloc의 기준을 구별한다.','복합 조건으로 원본을 보존하며 선택한다.'],
'pandas의 Series는 라벨을 가진 1차원 데이터이고 DataFrame은 열 이름과 행 인덱스가 있는 표입니다. loc는 라벨로, iloc는 0부터 시작하는 위치로 선택합니다. loc의 라벨 슬라이스는 끝 라벨을 포함할 수 있지만 iloc의 위치 슬라이스는 끝을 제외합니다. shape, dtypes, info(), head(), describe()는 분석 전 구조·자료형·요약 확인에 유용합니다. 조건 결합에서는 and 대신 &를 사용하고 각 비교를 괄호로 묶습니다. 정렬은 sort_values로 하며 동점의 순서도 계약으로 정해야 합니다.',
{'불리언 인덱싱':'조건이 참인 행만 선택하는 방식입니다.','copy()':'선택 결과를 독립적인 표로 만들어 원본 보존 의도를 명시합니다.','isin':'여러 허용 값 중 포함되는지 판단합니다.','str.contains':'문자열 열에 패턴이 포함되는지 검사합니다. 누락값 처리와 정규식 여부를 지정할 수 있습니다.'},
'import pandas as pd\ndf = pd.DataFrame({"team":["A","B","A"], "hours":[2,7,5]}, index=[10,20,30])\nchosen = df.loc[(df["team"] == "A") & (df["hours"] >= 3)]\nprint(chosen["hours"].tolist())\nprint(df.iloc[0]["hours"])','[5]\n2',
['인덱스 라벨은 10·20·30이며 위치는 0·1·2입니다.','두 조건을 모두 만족하는 마지막 행만 고릅니다.','iloc[0]은 라벨 0이 아니라 첫 번째 행입니다.'],
['정수 인덱스가 있어도 위치와 라벨은 같지 않을 수 있습니다.','조건마다 괄호를 빼면 연산 우선순위로 의도와 달라집니다.'],
q('import pandas as pd\ns = pd.Series([8, 3], index=[50, 10])\nprint(s.loc[10], s.iloc[0])',['8 3','3 8','오류'],1,['loc는 라벨 10의 값을 찾습니다.','라벨 10은 3, 첫 위치는 8입니다.','라벨과 위치 모두 존재합니다.']),
task('select_jobs(df, minimum)를 작성하세요. df에는 name(문자열), active(bool), hours(정수) 열과 임의의 고유 인덱스가 있습니다. active가 True이며 hours >= minimum인 행에서 name, hours 열만 선택하고 hours 내림차순, name 오름차순으로 정렬한 독립 DataFrame을 반환하세요. 기존 인덱스를 보존합니다. 예: 활성 작업 [B:5, A:5, C:2], minimum=5 → A:5, B:5.',
'import pandas as pd\n\ndef select_jobs(df, minimum):\n    pass',
'import pandas as pd\ndef select_jobs(df, minimum):\n    mask = df["active"] & (df["hours"] >= minimum)\n    return df.loc[mask, ["name", "hours"]].sort_values(["hours", "name"], ascending=[False, True]).copy()',
[test('필터와 동점 순서','d=pd.DataFrame({"name":["B","A","C","D"],"active":[True,True,True,False],"hours":[5,5,2,9]},index=[7,3,1,8]); r=select_jobs(d,5); assert r["name"].tolist()==["A","B"]; assert r.index.tolist()==[3,7]','동점에는 name 오름차순이며 원래 라벨을 유지하세요.'),test('열 계약','d=pd.DataFrame({"name":["a"],"active":[True],"hours":[1]}); assert list(select_jobs(d,0).columns)==["name","hours"]','요구된 두 열만 반환하세요.'),test('일치 없음','d=pd.DataFrame({"name":["a"],"active":[True],"hours":[1]}); assert select_jobs(d,2).empty','빈 결과도 DataFrame이어야 합니다.'),test('반환값 독립성','d=pd.DataFrame({"name":["a"],"active":[True],"hours":[1]}); r=select_jobs(d,0); r.iloc[0,1]=99; assert d.iloc[0]["hours"]==1','원본 표를 수정하지 마세요.')],
['조건 선택, 열 선택, 정렬을 각각 나누어보세요.','활성 조건과 괄호로 묶은 시간 조건을 &로 결합합니다.','sort_values(["hours", "name"], ascending=[False, True])로 정렬 방향을 각각 지정하세요.'],
['두 조건의 마스크를 만듭니다.','loc로 필요한 열만 선택합니다.','정렬 후 copy로 반환합니다.'],'reset_index를 호출하면 보존해야 하는 인덱스를 잃습니다.','query로도 조건을 표현할 수 있지만 외부 변수와 열 이름 처리 규칙을 추가로 알아야 합니다.'))

add('pandas-clean','정제 정책과 그룹 집계',['pandas-select'],['누락·중복 처리 순서를 설계한다.','전체 합과 그룹 평균의 의미를 구별한다.'],
'정제는 분석 대상의 정의를 코드로 만드는 과정입니다. isna는 누락값을 찾고 dropna는 제거, fillna는 대체합니다. 대체는 분석 의미를 바꾸므로 이유가 있어야 합니다. drop_duplicates는 지정 키 기준 중복을 제거하며 keep="last"는 현재 행 순서의 마지막을 남깁니다. groupby는 같은 키의 행들을 묶고 agg는 합·평균·개수 같은 요약을 만듭니다. count는 누락이 아닌 값의 수, size는 행 수입니다. apply는 그룹이나 행에 사용자 함수를 적용하지만 내장 집계로 가능한지 먼저 확인하세요.',
{'중복 키':'같은 관측으로 취급할 식별자입니다. 모든 열이 같다는 뜻과 다릅니다.','to_numeric':'숫자 문자열을 수로 변환합니다. errors="coerce"는 실패값을 누락으로 바꿉니다.','집계 수준':'한 행이 무엇을 대표하는지입니다. 원래 관측과 그룹 결과의 수준은 다릅니다.','분모':'평균이나 비율을 계산할 때 기준으로 나누는 수입니다.'},
'import pandas as pd\ndf = pd.DataFrame({"zone":["E","E","W"], "value":[2,None,8]})\nclean = df.dropna(subset=["value"])\nprint(clean.groupby("zone")["value"].mean().to_dict())',"{'E': 2.0, 'W': 8.0}",
['누락 관측을 제외한다는 정책을 명시합니다.','그룹별 유효 관측만 평균을 구합니다.','누락을 0으로 채우면 E 평균이 1이 되므로 서로 다른 질문에 답하게 됩니다.'],
['그룹 평균의 단순 평균은 표본 수가 다르면 전체 평균과 다릅니다.','유효하지 않은 최신 레코드를 제거한 뒤 중복 제거하면 오래된 값이 되살아날 수 있습니다. 순서가 정책입니다.'],
q('import pandas as pd\ns = pd.Series([2, None, 6])\nprint(int(s.count()), len(s))',['3 3','2 3','2 2'],1,['count는 누락을 제외합니다.','유효값은 2개이고 전체 행은 3개입니다.','len은 누락도 한 위치로 셉니다.']),
task('summarize(df)를 작성하세요. 열은 id(문자열), zone(문자열), value(수 또는 누락)입니다. 같은 id의 마지막 행만 유지한 다음 value 누락 행을 제외하고 zone별 value 합계를 딕셔너리로 반환하세요. 최신 행의 value가 누락이면 그 id는 제외되며 이전 값으로 복구하지 않습니다. 원본은 그대로 둡니다. 빈 결과는 {}입니다.',
'import pandas as pd\n\ndef summarize(df):\n    pass',
'import pandas as pd\ndef summarize(df):\n    latest = df.drop_duplicates(subset=["id"], keep="last")\n    valid = latest.dropna(subset=["value"])\n    return valid.groupby("zone")["value"].sum().to_dict()',
[test('중복 후 합계','d=pd.DataFrame({"id":["a","a","b"],"zone":["X","X","Y"],"value":[1,7,3]}); assert summarize(d)=={"X":7,"Y":3}','id 기준 마지막 행을 남기세요.'),test('최신 누락의 의미','d=pd.DataFrame({"id":["a","a","b"],"zone":["X","X","X"],"value":[5,None,2]}); assert summarize(d)=={"X":2}','중복 제거를 누락 제거보다 먼저 수행하세요.'),test('빈 입력','d=pd.DataFrame(columns=["id","zone","value"]); assert summarize(d)=={}','관측이 없으면 빈 딕셔너리입니다.'),test('원본 보존','d=pd.DataFrame({"id":["a","a"],"zone":["X","X"],"value":[1,2]}); before=d.copy(deep=True); summarize(d); assert d.equals(before)','inplace로 원본을 바꾸지 마세요.')],
['어느 행이 최신인지 먼저 확정해야 합니다.','drop_duplicates(subset=["id"], keep="last")를 먼저 적용하세요.','이후 dropna(subset=["value"])와 groupby("zone")["value"].sum()을 연결하세요.'],
['중복 정책을 적용합니다.','그 결과에서 누락값을 제외합니다.','그룹별 합계를 계산합니다.'],'dropna를 먼저 실행하면 지워져야 하는 오래된 id의 값이 살아납니다.','agg로 sum과 count를 함께 반환하면 합계와 관측 수를 같이 해석할 수 있습니다. 이 문제 반환 계약은 합계만 요구합니다.',difficulty='심화',kind='요구사항 응용'))

add('charts','차트가 답해야 할 질문',['pandas-clean'],['질문에 맞는 시각화 종류를 선택한다.','그림의 데이터·레이블을 검증한다.'],
'시간에 따른 변화에는 선, 범주 비교에는 막대, 두 수치의 관계에는 산점도, 분포에는 히스토그램을 주로 사용합니다. 상자그림은 중앙값·사분위·이상 후보를, 히트맵은 행렬의 값을 색으로 요약합니다. 원형 차트는 합이 의미 있는 전체일 때 사용하며 많은 범주 비교에는 불리합니다. matplotlib의 Figure는 그림 전체, Axes는 데이터를 그리는 좌표 영역입니다. seaborn은 표와 변수 이름을 받아 통계 요약을 쉽게 그리지만 자동 평균·불확실성 표시가 질문과 맞는지 확인해야 합니다. pandas.plot도 같은 좌표 객체 위에 그릴 수 있습니다.',
{'축 레이블':'축에 무엇을 어떤 단위로 표시했는지 설명합니다.','범례':'색·선 형태와 그룹의 대응입니다.','장형/광형':'한 행에 하나의 관측 변수 / 여러 변수 열을 두는 표 형태입니다. melt·pivot으로 바꿀 수 있습니다.','상관':'함께 변하는 관계입니다. 원인과 결과를 보장하지 않습니다.'},
'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2, 3], [4, 7, 5], marker="o")\nax.set_xlabel("Day")\nax.set_ylabel("Visits (count)")\nax.set_title("Visits over time")\nprint(len(ax.lines))','1',
['Figure와 Axes를 만듭니다.','각 x와 y를 같은 위치끼리 짝지어 하나의 선을 만듭니다.','단위와 제목을 붙입니다. 이 실험실에서는 생성한 그림도 실행 결과 아래에 표시합니다.'],
['집계가 다른 두 집단의 합계를 비교하면 관측 수 차이를 효과로 오해할 수 있습니다.','자동 채점은 레이블과 데이터 같은 일부 조건만 확인합니다. 설득력과 공정성은 스스로 설명해야 합니다.'],
q('# 각 센서의 측정값 분포를 비교하려고 합니다.\n# 이상 후보와 중앙값을 함께 보고 싶습니다.',['상자그림','시간 선 그래프','원형 차트'],0,['상자그림은 중앙값·사분위와 이상 후보를 비교할 수 있습니다.','시간 순서를 비교한다는 질문이 아닙니다.','전체의 부분 비중을 묻는 질문이 아닙니다.']),
task('plot_counts(labels, values)를 작성하세요. labels는 고유 문자열 리스트, values는 같은 길이의 0 이상 정수 리스트입니다. 입력 순서대로 막대를 그리고 Axes를 반환하세요. x축은 "Category", y축은 "Count", 제목은 "Observed counts"입니다. 빈 입력도 허용합니다. plt.subplots(), ax.bar(), set_xlabel/set_ylabel/set_title을 사용합니다. 예: ["R","S"], [3,1]은 높이 3,1인 두 막대입니다.',
'import matplotlib.pyplot as plt\n\ndef plot_counts(labels, values):\n    pass',
'import matplotlib.pyplot as plt\ndef plot_counts(labels, values):\n    fig, ax = plt.subplots()\n    ax.bar(labels, values)\n    ax.set_xlabel("Category")\n    ax.set_ylabel("Count")\n    ax.set_title("Observed counts")\n    return ax',
[test('막대 데이터','from matplotlib.axes import Axes\na=plot_counts(["R","S"],[3,1]); assert isinstance(a, Axes); assert [p.get_height() for p in a.patches]==[3,1]','값을 막대 높이로 전달하고 Axes를 반환하세요.'),test('축과 제목','a=plot_counts(["R"],[2]); assert a.get_xlabel()=="Category"; assert a.get_ylabel()=="Count"; assert a.get_title()=="Observed counts"','축의 의미와 제목을 정확히 지정하세요.'),test('범주 순서','a=plot_counts(["Z","A"],[2,4]); assert [t.get_text() for t in a.get_xticklabels()]==["Z","A"]','자동으로 정렬하지 말고 입력 순서를 유지하세요.'),test('빈 데이터','a=plot_counts([],[]); assert len(a.patches)==0','빈 목록에서도 유효한 Axes를 반환하세요.')],
['그림 전체와 좌표 영역 중 무엇을 반환할지 확인하세요.','fig, ax = plt.subplots() 후 ax.bar(labels, values)를 호출합니다.','레이블과 제목을 설정한 뒤 return ax를 사용하세요.'],
['범주 비교이므로 막대를 선택합니다.','데이터 순서를 유지합니다.','축과 단위를 명시한 뒤 반환합니다.'],'plt.show()의 반환값은 Axes가 아닙니다.','pandas.Series(...).plot.bar()도 가능하지만 라이브러리 자동 레이블이 요구사항과 맞는지 확인해야 합니다.',kind='코드 작성 · 시각화'))

add('eda-project','비교 가능한 분석 설계',['charts','objects'],['관측 수·분모·동점 정책을 설계한다.','정제부터 요약까지 재현 가능한 함수를 만든다.'],
'EDA는 탐색적 데이터 분석으로, 질문을 세우고 자료를 점검해 비교 가능한 근거를 만드는 과정입니다. 단순 순위보다 관측 단위·누락·중복·집단 크기를 먼저 확인합니다. 예를 들어 운영 시간 수가 다른 공간의 총 방문 수를 비교하면 관측 기회 차이가 섞입니다. 평균은 관측 수와 함께 제시하고, 인과 주장은 관찰 자료만으로 확정하지 않습니다. 정제 정책과 동점 규칙을 코드 계약으로 명시하면 다른 자료에서도 같은 분석을 재현할 수 있습니다. 이 프로젝트는 실제 외부 자료 대신 새로 만든 작은 표를 사용합니다.',
{'관측 단위':'한 행이 의미하는 대상입니다. 여기서는 한 공간의 한 운영 구간입니다.','재현성':'같은 입력과 정책에서 같은 결과를 얻을 수 있는 성질입니다.','교란 요인':'비교 대상 외에 결과 차이를 설명할 수 있는 다른 요인입니다.','루브릭':'결과 외에 설계 판단까지 점검하는 평가 기준입니다.'},
'import pandas as pd\ndf = pd.DataFrame({"space":["L","L","M"], "visits":[2,6,7]})\nprint(df.groupby("space")["visits"].agg(["mean","count"]).to_dict("index"))',"{'L': {'mean': 4.0, 'count': 2}, 'M': {'mean': 7.0, 'count': 1}}",
['space는 비교 집단이고 각 행은 운영 구간입니다.','평균과 관측 수를 함께 계산합니다.','M의 평균이 높아도 관측이 하나이므로 안정적인 우위라고 단정할 수 없습니다.'],
['합계가 높다는 이유만으로 구간당 방문이 많다고 결론내리지 마세요.','동점·유효 관측 없음·최소 표본 수를 나중에 임의로 처리하면 결과가 달라집니다.'],
q('# 공간 A: 2개 구간에서 방문 합계 20\n# 공간 B: 10개 구간에서 방문 합계 50\n# 구간당 평균 방문이 더 큰 공간은?',['A','B','총합만 같으면 알 수 있다'],0,['A는 20/2=10, B는 50/10=5입니다. 인과적 우위까지 뜻하지는 않습니다.','합계 대신 구간 수로 나눈 평균을 비교해야 합니다.','필요한 구간 수와 합계가 모두 주어져 있습니다.']),
task('report(df, minimum=2)를 작성하세요. 열은 slot(고유 관측 식별 문자열), space(문자열), visits(수 또는 누락)입니다. 같은 slot은 마지막 행을 남기고 visits 누락·음수 행을 제외합니다. space별 유효 관측 수가 minimum 이상인 집단만 남깁니다. minimum은 1 이상 정수입니다. 결과는 {"space": 이름, "mean": 평균, "count": 수} 딕셔너리의 리스트이며 평균 내림차순, 동점이면 space 오름차순입니다. 반올림하지 마세요. 원본을 변경하지 않습니다. 예: A:[2,6], B:[9], minimum=2 → [{"space":"A","mean":4.0,"count":2}].',
'import pandas as pd\n\ndef report(df, minimum=2):\n    pass',
'import pandas as pd\ndef report(df, minimum=2):\n    latest = df.drop_duplicates(subset=["slot"], keep="last")\n    valid = latest.dropna(subset=["visits"])\n    valid = valid.loc[valid["visits"] >= 0]\n    grouped = valid.groupby("space")["visits"].agg(["mean", "count"])\n    grouped = grouped.loc[grouped["count"] >= minimum].reset_index()\n    return grouped.sort_values(["mean", "space"], ascending=[False, True]).to_dict("records")',
[test('최소 관측 수','d=pd.DataFrame({"slot":["a","b","c"],"space":["A","A","B"],"visits":[2,6,9]}); assert report(d)==[{"space":"A","mean":4.0,"count":2}]','집계 후 관측 수로 필터링하세요.'),test('최신 값과 무효 관측','d=pd.DataFrame({"slot":["a","a","b","c","d"],"space":["A"]*5,"visits":[99,None,4,-1,8]}); assert report(d)==[{"space":"A","mean":6.0,"count":2}]','중복을 먼저 제거하고 누락·음수를 제외하세요.'),test('동점 정렬','d=pd.DataFrame({"slot":["a","b"],"space":["Z","A"],"visits":[3,3]}); assert [r["space"] for r in report(d,1)]==["A","Z"]','평균 동점일 때 space 이름을 오름차순 정렬하세요.'),test('빈 결과와 원본 보존','d=pd.DataFrame({"slot":["a"],"space":["A"],"visits":[2]}); before=d.copy(deep=True); assert report(d)==[]; assert d.equals(before)','조건을 만족하지 않으면 []이며 원본을 유지해야 합니다.')],
['정제와 요약을 단계별 변수로 나누세요.','중복 → 누락·음수 제외 → 그룹 mean/count → 최소 관측 수 순서입니다.','agg(["mean", "count"]) 후 reset_index(), sort_values(), to_dict("records")로 반환 형식을 맞추세요. reset_index는 그룹 라벨 space를 일반 열로 바꿉니다.'],
['관측 단위 slot과 중복 규칙을 확정합니다.','유효 표본만 남기고 평균과 표본 수를 계산합니다.','최소 표본 수와 동점 규칙을 적용합니다.','어떤 교란 요인이 남는지 따로 설명합니다.'],'원본 행 수를 count로 쓰면 중복·누락을 포함한 잘못된 분모가 됩니다.','순수 파이썬 딕셔너리로도 집계할 수 있습니다. pandas는 정제·집계 단계를 명시하기 쉽지만 작은 자료에서는 함수와 반복문만으로 충분할 수 있습니다.',difficulty='프로젝트',kind='프로젝트'))

units[-1]['reflection']={'prompt':'평균이 가장 높은 공간에 예산을 모두 배정해도 될까요? 관측 구간 선택, 공간 크기, 최소 관측 수 기준의 한계를 설명하고 추가로 필요한 자료를 두 가지 적으세요.', 'criteria':['평균과 관측 수를 함께 해석한다.','관찰 비교를 인과로 단정하지 않는다.','서로 다른 대안 설명 두 가지와 추가 자료를 연결한다.'], 'guidance':'예: 공간 크기와 운영 시간대가 방문 수에 영향을 줄 수 있습니다. 시간대가 비슷한 구간끼리 비교하고 수용 인원 대비 방문 비율도 확인할 수 있습니다. 최소 2개라는 기준은 통계적 신뢰성을 보장하지 않습니다. 이 서술은 자동 정답 판정하지 않으며 자기 점검으로 저장합니다.'}

data={'version':1,'language':'ko','title':'파이썬 개념·응용 실험실','units':units,
      'notice':'새로 작성한 설명과 합성 데이터로 학습합니다. 기존 60개 레슨 진도와 별도로 기록됩니다.',
      'runtime':'Pyodide 0.28.0 / 브라우저 Worker. 첫 실행에는 인터넷과 초기 로딩 시간이 필요합니다.'}
root=Path(__file__).resolve().parents[1]
(root/'assets/python-lab-content.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Authored {len(units)} units, {len(units)*2+1} activities, {sum(len(u["task"]["tests"]) for u in units)} executable checks')
