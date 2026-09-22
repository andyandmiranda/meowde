(function applyMeowdeV456Unit4Expansion(){
  "use strict";

  const VERSION="4.56-unit4-data";
  const UNIT_SIZE=10;
  const UNIT4_KO=[
    {
      slug:"string-methods",title:"문자열 변신소",short:"문자열 메서드",focus:["문자열","upper","lower"],
      description:"upper()와 lower()로 문자열의 대소문자를 바꿔요.",output:"MEOWDE",
      exercises:[
        {id:"string-methods-c",type:"concept",title:"문자열도 기능을 가지고 있어요",body:"문자열 뒤에 .upper()를 붙이면 대문자 문자열을, .lower()를 붙이면 소문자 문자열을 새로 만들어요. 원래 문자열 자체는 바뀌지 않아요.",code:'name = "Meowde"\nprint(name.upper())',hint:"점(.) 뒤에 문자열 메서드 이름과 괄호를 붙여요."},
        {id:"string-methods-p",type:"predict",prompt:'name에 "Meowde"가 들어있을 때 name.upper()는 무엇을 출력할까요?',code:'name = "Meowde"\nprint(name.upper())',choices:["MEOWDE","Meowde","meowde","에러"],answer:0,output:"MEOWDE",hint:"upper()는 알파벳을 대문자로 바꿔요.",explain:"Meowde의 영문자가 모두 대문자로 바뀌어 MEOWDE가 출력돼요."},
        {id:"string-methods-f",type:"fill",prompt:'word를 소문자 "python"으로 출력하려면 빈칸에 어떤 메서드가 들어갈까요?',code:'word = "PYTHON"\nprint(word.____())',tokens:["lower","upper","append","get"],answer:"lower",hint:"소문자로 바꾸는 문자열 메서드예요.",explain:"lower()는 영문자를 소문자로 바꿔요."},
        {id:"string-methods-b",type:"bughunt",prompt:"CAT을 출력하려는데 메서드를 실행하지 않은 줄을 고르세요.",lines:['word = "cat"','print(word.upper)'],buggy:1,fixed:"print(word.upper())",hint:"메서드는 이름 뒤에 ()를 붙여 호출해야 해요.",explain:"upper만 쓰면 메서드 자체를 가리키고, upper()로 호출해야 문자열이 변환돼요."},
        {id:"string-methods-w",type:"write",prompt:"shout(text) 함수를 만들어 text를 대문자로 반환하고, shout(\"meowde\")를 출력하세요.",starter:"# shout(text) 함수를 만들고 호출하세요\n",expected:"MEOWDE",testcase:"기대 출력: MEOWDE",hint:"return text.upper()를 사용하세요.",explain:"문자열 메서드를 함수 안에서 재사용 가능한 형태로 적용했어요.",model:'def shout(text):\n    return text.upper()\nprint(shout("meowde"))',grading:{tests:[{append:'print(shout("python"))',expected:"PYTHON",labelKo:"다른 문자열",labelEn:"another string"}]}}
      ]
    },
    {
      slug:"string-slice",title:"문자열 슬라이스",short:"슬라이싱",focus:["문자열","슬라이싱"],
      description:"문자열의 원하는 구간을 [시작:끝]으로 잘라내요.",output:"pyt",
      exercises:[
        {id:"string-slice-c",type:"concept",title:"문자열의 일부만 꺼내기",body:"문자열도 리스트처럼 0부터 위치를 세요. text[0:3]은 0, 1, 2 위치만 포함하고 끝 위치 3은 포함하지 않아요.",code:'text = "python"\nprint(text[0:3])',hint:"슬라이스의 끝 숫자는 포함되지 않아요."},
        {id:"string-slice-p",type:"predict",prompt:'word = "Meowde"일 때 word[1:4]는 무엇을 출력할까요?',code:'word = "Meowde"\nprint(word[1:4])',choices:["eow","Meo","eowd","owd"],answer:0,output:"eow",hint:"인덱스 1부터 3까지의 글자를 골라보세요.",explain:"1=e, 2=o, 3=w라서 eow가 출력돼요."},
        {id:"string-slice-f",type:"fill",prompt:'"python"에서 앞의 세 글자 pyt를 꺼내려면 끝 위치에 어떤 숫자가 들어갈까요?',code:'text = "python"\nprint(text[0:____])',tokens:["3","2","4","6"],answer:"3",hint:"끝 위치는 포함되지 않아요.",explain:"0:3은 인덱스 0, 1, 2를 포함해서 pyt가 돼요."},
        {id:"string-slice-b",type:"bughunt",prompt:"앞의 세 글자를 자르려는데 슬라이스 문법을 잘못 쓴 줄을 고르세요.",lines:['text = "python"','print(text[0, 3])'],buggy:1,fixed:"print(text[0:3])",hint:"슬라이스의 시작과 끝은 콤마가 아니라 콜론(:)으로 구분해요.",explain:"text[0:3]처럼 콜론을 사용해야 문자열 구간을 잘라낼 수 있어요."},
        {id:"string-slice-w",type:"write",prompt:"first_three(text) 함수를 만들어 문자열의 앞 세 글자를 반환하고, first_three(\"python\")을 출력하세요.",starter:"# first_three(text) 함수를 만들고 호출하세요\n",expected:"pyt",testcase:"기대 출력: pyt",hint:"return text[:3]을 사용해보세요.",explain:"슬라이싱을 함수로 만들어 다른 문자열에도 재사용할 수 있어요.",model:'def first_three(text):\n    return text[:3]\nprint(first_three("python"))',grading:{tests:[{append:'print(first_three("meowde"))',expected:"meo",labelKo:"다른 문자열",labelEn:"another string"}]}}
      ]
    },
    {
      slug:"membership-gate",title:"포함 여부 관문",short:"in",focus:["in","membership"],
      description:"in과 not in으로 값이 문자열이나 컬렉션 안에 있는지 확인해요.",output:"YES",
      exercises:[
        {id:"membership-gate-c",type:"concept",title:"안에 있는지 바로 묻기",body:"값 in 컬렉션은 포함되어 있으면 True를 만들어요. not in은 포함되어 있지 않을 때 True예요.",code:'pets = ["cat", "dog"]\nprint("cat" in pets)',hint:"찾는 값을 왼쪽, 확인할 컬렉션을 오른쪽에 둬요."},
        {id:"membership-gate-p",type:"predict",prompt:'pets에 cat과 dog가 있을 때 "bird" in pets의 결과는 무엇일까요?',code:'pets = ["cat", "dog"]\nprint("bird" in pets)',choices:["False","True","bird","에러"],answer:0,output:"False",hint:"bird가 리스트 안에 실제로 있는지 확인하세요.",explain:"pets에는 bird가 없으므로 False예요."},
        {id:"membership-gate-f",type:"fill",prompt:'"cat"이 pets 안에 있는지 검사하려면 빈칸에 어떤 연산자가 들어갈까요?',code:'pets = ["cat", "dog"]\nprint("cat" ____ pets)',tokens:["in","not in","==","and"],answer:"in",hint:"포함 여부를 검사하는 키워드예요.",explain:'"cat" in pets는 True가 돼요.'},
        {id:"membership-gate-b",type:"bughunt",prompt:'pets 안에 "cat"이 있는지 검사하려는데 포함 관계의 방향이 뒤집힌 줄을 고르세요.',lines:['pets = ["cat", "dog"]','if pets in "cat":','    print("YES")'],buggy:1,fixed:'if "cat" in pets:',hint:"찾는 값이 왼쪽, 컬렉션이 오른쪽이에요.",explain:'"cat" in pets처럼 써야 리스트 안에 cat이 있는지 검사해요.'},
        {id:"membership-gate-w",type:"write",prompt:'has_cat(pets) 함수를 만들어 "cat"이 있으면 YES, 없으면 NO를 반환하고 ["dog", "cat"] 결과를 출력하세요.',starter:"# has_cat(pets) 함수를 만들고 호출하세요\n",expected:"YES",testcase:"기대 출력: YES",hint:'if "cat" in pets: 를 사용하세요.',explain:"포함 여부를 조건문과 함수에 연결했어요.",model:'def has_cat(pets):\n    if "cat" in pets:\n        return "YES"\n    return "NO"\nprint(has_cat(["dog", "cat"]))',grading:{tests:[{append:'print(has_cat(["dog"]))',expected:"NO",labelKo:"cat이 없는 리스트",labelEn:"a list without cat"}]}}
      ]
    },
    {
      slug:"dict-seed",title:"딕셔너리 씨앗",short:"딕셔너리",focus:["dictionary","key","value"],
      description:"딕셔너리는 키와 값을 한 쌍으로 묶어 의미 있는 데이터를 저장해요.",output:"Mimi",
      exercises:[
        {id:"dict-seed-c",type:"concept",title:"이름표로 값을 찾는 컬렉션",body:"딕셔너리는 {키: 값} 형태로 저장해요. 리스트의 숫자 인덱스 대신 의미 있는 키를 사용해 값을 찾을 수 있어요.",code:'cat = {"name": "Mimi", "age": 3}\nprint(cat["name"])',hint:'키도 문자열이면 "name"처럼 따옴표를 써요.'},
        {id:"dict-seed-p",type:"predict",prompt:'cat 딕셔너리에서 cat["age"]를 출력하면 무엇이 나올까요?',code:'cat = {"name": "Mimi", "age": 3}\nprint(cat["age"])',choices:["3","age","Mimi","에러"],answer:0,output:"3",hint:"age 키에 연결된 값을 찾으세요.",explain:"age 키에는 숫자 3이 저장되어 있어요."},
        {id:"dict-seed-f",type:"fill",prompt:"Mimi를 출력하려면 대괄호 안에 어떤 키가 들어가야 할까요?",code:'cat = {"name": "Mimi", "age": 3}\nprint(cat[____])',tokens:['"name"','"age"',"0","name"],answer:'"name"',hint:"딕셔너리의 문자열 키는 따옴표와 함께 써요.",explain:'cat["name"]이 Mimi를 꺼내요.'},
        {id:"dict-seed-b",type:"bughunt",prompt:"Mimi를 출력하려는데 존재하지 않는 대문자 키를 사용한 줄을 고르세요.",lines:['cat = {"name": "Mimi", "age": 3}','print(cat["Name"])'],buggy:1,fixed:'print(cat["name"])',hint:"딕셔너리 키는 대소문자까지 정확히 일치해야 해요.",explain:'"Name"과 "name"은 다른 키예요.'},
        {id:"dict-seed-w",type:"write",prompt:'get_name(profile) 함수를 만들어 profile의 "name" 값을 반환하고, {"name": "Mimi"} 결과를 출력하세요.',starter:"# get_name(profile) 함수를 만들고 호출하세요\n",expected:"Mimi",testcase:"기대 출력: Mimi",hint:'return profile["name"]을 사용하세요.',explain:"키를 사용해 필요한 값을 함수 안에서 꺼냈어요.",model:'def get_name(profile):\n    return profile["name"]\nprint(get_name({"name": "Mimi"}))',grading:{tests:[{append:'print(get_name({"name": "Mina"}))',expected:"Mina",labelKo:"다른 딕셔너리",labelEn:"another dictionary"}]}}
      ]
    },
    {
      slug:"dict-update",title:"딕셔너리 업데이트",short:"값 바꾸기",focus:["dictionary","update"],
      description:"기존 키의 값을 바꾸거나 새 키를 추가해 딕셔너리를 업데이트해요.",output:"4",
      exercises:[
        {id:"dict-update-c",type:"concept",title:"키에 새 값을 저장하기",body:'dict["key"] = value 형태로 기존 값을 바꾸거나 새로운 키를 추가할 수 있어요.',code:'cat = {"age": 3}\ncat["age"] = 4\ncat["level"] = 1\nprint(cat["age"])',hint:"대괄호 안에 업데이트할 키를 적어요."},
        {id:"dict-update-p",type:"predict",prompt:'age를 3에서 4로 바꾼 뒤 cat["age"]를 출력하면 무엇이 나올까요?',code:'cat = {"age": 3}\ncat["age"] = 4\nprint(cat["age"])',choices:["4","3","age","에러"],answer:0,output:"4",hint:"같은 키에 나중에 저장한 값이 남아요.",explain:"age 키의 값이 4로 업데이트됐어요."},
        {id:"dict-update-f",type:"fill",prompt:'cat의 level 값을 2로 만들려면 빈칸에 어떤 키가 들어갈까요?',code:'cat = {"level": 1}\ncat[____] = 2\nprint(cat["level"])',tokens:['"level"','"age"',"level","2"],answer:'"level"',hint:"바꾸려는 키를 문자열로 정확히 적어요.",explain:'cat["level"] = 2가 기존 값을 바꿔요.'},
        {id:"dict-update-b",type:"bughunt",prompt:"age 값을 4로 바꾸려는데 키 이름을 변수처럼 써서 오류가 나는 줄을 고르세요.",lines:['cat = {"age": 3}','cat[age] = 4','print(cat["age"])'],buggy:1,fixed:'cat["age"] = 4',hint:"age라는 변수를 만든 적이 없어요. 키 문자열이 필요해요.",explain:'문자열 키는 cat["age"]처럼 따옴표로 감싸야 해요.'},
        {id:"dict-update-w",type:"write",prompt:'level_up(player) 함수를 만들어 player["level"]을 1 올리고 새 level을 반환하세요. level 2로 호출한 결과를 출력하세요.',starter:"# level_up(player) 함수를 만들고 호출하세요\n",expected:"3",testcase:"기대 출력: 3",hint:'player["level"] = player["level"] + 1 후 값을 return하세요.',explain:"딕셔너리 값을 읽고 업데이트한 뒤 결과를 반환했어요.",model:'def level_up(player):\n    player["level"] = player["level"] + 1\n    return player["level"]\nprint(level_up({"level": 2}))',grading:{tests:[{append:'print(level_up({"level": 7}))',expected:"8",labelKo:"다른 level",labelEn:"another level"}]}}
      ]
    },
    {
      slug:"dict-get",title:"안전한 조회소",short:"get",focus:["dictionary","get"],
      description:"get()으로 키가 없어도 기본값을 사용해 안전하게 조회해요.",output:"Unknown",
      exercises:[
        {id:"dict-get-c",type:"concept",title:"없는 키에도 대비하기",body:'dict.get("key", 기본값)은 키가 있으면 그 값을, 없으면 기본값을 돌려줘요. 사용자 데이터처럼 일부 값이 빠질 수 있을 때 유용해요.',code:'profile = {"name": "Amy"}\nprint(profile.get("city", "Unknown"))',hint:"get()의 두 번째 값은 키가 없을 때 사용할 기본값이에요."},
        {id:"dict-get-p",type:"predict",prompt:'city 키가 없는 profile에서 profile.get("city", "Unknown")은 무엇을 출력할까요?',code:'profile = {"name": "Amy"}\nprint(profile.get("city", "Unknown"))',choices:["Unknown","Amy","city","에러"],answer:0,output:"Unknown",hint:"city 키가 없을 때 두 번째 인자를 사용해요.",explain:"city가 없으므로 기본값 Unknown이 반환돼요."},
        {id:"dict-get-f",type:"fill",prompt:"키가 없을 때 기본값을 받을 수 있는 딕셔너리 메서드는 무엇일까요?",code:'profile = {"name": "Amy"}\nprint(profile.____("city", "Unknown"))',tokens:["get","append","upper","items"],answer:"get",hint:"안전하게 값을 조회하는 딕셔너리 메서드예요.",explain:"get()은 키가 없어도 지정한 기본값을 반환할 수 있어요."},
        {id:"dict-get-b",type:"bughunt",prompt:"city 키가 없을 수 있는데 직접 대괄호로 접근해 KeyError가 날 수 있는 줄을 고르세요.",lines:['profile = {"name": "Amy"}','print(profile["city"])'],buggy:1,fixed:'print(profile.get("city", "Unknown"))',hint:"키가 없을 가능성이 있으면 get()을 고려하세요.",explain:"직접 접근은 없는 키에서 KeyError가 나지만 get()은 기본값을 사용할 수 있어요."},
        {id:"dict-get-w",type:"write",prompt:'city_of(profile) 함수를 만들어 city가 있으면 그 값을, 없으면 "Unknown"을 반환하세요. {"name": "Amy"} 결과를 출력하세요.',starter:"# city_of(profile) 함수를 만들고 호출하세요\n",expected:"Unknown",testcase:"기대 출력: Unknown",hint:'return profile.get("city", "Unknown")을 사용하세요.',explain:"get()을 함수에 넣어 누락된 데이터에도 안전하게 대응했어요.",model:'def city_of(profile):\n    return profile.get("city", "Unknown")\nprint(city_of({"name": "Amy"}))',grading:{tests:[{append:'print(city_of({"city": "Seoul"}))',expected:"Seoul",labelKo:"city가 있는 딕셔너리",labelEn:"a dictionary with city"}]}}
      ]
    },
    {
      slug:"dict-loop",title:"딕셔너리 순회길",short:"items",focus:["dictionary","items","for"],
      description:"items()로 딕셔너리의 키와 값을 함께 반복해요.",output:"Amy:90\nMina:80",
      exercises:[
        {id:"dict-loop-c",type:"concept",title:"키와 값을 한 번에 꺼내기",body:"dict.items()는 키와 값을 한 쌍씩 꺼낼 수 있게 해줘요. for key, value in data.items(): 형태로 반복할 수 있어요.",code:'scores = {"Amy": 90, "Mina": 80}\nfor name, score in scores.items():\n    print(f"{name}:{score}")',hint:"items()는 각 반복에서 키와 값 두 개를 줘요."},
        {id:"dict-loop-p",type:"predict",prompt:"아래 반복문이 첫 번째 줄에 출력하는 값은 무엇일까요?",code:'scores = {"Amy": 90, "Mina": 80}\nfor name, score in scores.items():\n    print(f"{name}:{score}")',choices:["Amy:90","Mina:80","90:Amy","scores"],answer:0,output:"Amy:90\nMina:80",hint:"딕셔너리는 작성한 순서대로 Amy, Mina를 순회해요.",explain:"첫 번째 키-값 쌍 Amy와 90이 Amy:90으로 출력돼요."},
        {id:"dict-loop-f",type:"fill",prompt:"키와 값을 함께 순회하려면 scores 뒤에 어떤 메서드가 들어갈까요?",code:'scores = {"Amy": 90}\nfor name, score in scores.____():\n    print(name, score)',tokens:["items","get","append","upper"],answer:"items",hint:"키와 값의 쌍을 돌려주는 딕셔너리 메서드예요.",explain:"items()를 사용하면 name과 score를 동시에 받을 수 있어요."},
        {id:"dict-loop-b",type:"bughunt",prompt:"키와 값을 두 변수에 받으려는데 items()를 사용하지 않아 언패킹 오류가 날 수 있는 줄을 고르세요.",lines:['scores = {"Amy": 90, "Mina": 80}','for name, score in scores:','    print(name, score)'],buggy:1,fixed:"for name, score in scores.items():",hint:"딕셔너리 자체를 반복하면 기본적으로 키만 하나씩 나와요.",explain:"키와 값을 두 변수로 받으려면 scores.items()를 반복해야 해요."},
        {id:"dict-loop-w",type:"write",prompt:'show_scores(scores) 함수를 만들어 각 항목을 "이름:점수" 형식으로 출력하세요. Amy 90, Mina 80으로 호출하세요.',starter:"# show_scores(scores) 함수를 만들고 호출하세요\n",expected:"Amy:90\nMina:80",testcase:"기대 출력: Amy:90 / Mina:80 (각 한 줄)",hint:'for name, score in scores.items(): 와 f-string을 사용하세요.',explain:"딕셔너리의 여러 항목을 반복 처리했어요.",model:'def show_scores(scores):\n    for name, score in scores.items():\n        print(f"{name}:{score}")\nshow_scores({"Amy": 90, "Mina": 80})',grading:{tests:[{append:'show_scores({"Noa": 70})',expected:"Noa:70",labelKo:"한 항목 딕셔너리",labelEn:"a one-item dictionary"}]}}
      ]
    },
    {
      slug:"tuple-unpack",title:"튜플 언패킹",short:"튜플",focus:["tuple","unpacking"],
      description:"튜플은 순서가 있지만 값을 바꾸지 않는 묶음이고, 여러 변수로 한 번에 꺼낼 수 있어요.",output:"blue,red",
      exercises:[
        {id:"tuple-unpack-c",type:"concept",title:"고정된 값 묶음과 언패킹",body:"튜플은 (값1, 값2)처럼 만들어요. x, y = point처럼 같은 개수의 변수에 값을 한 번에 나눠 담는 것을 언패킹이라고 해요.",code:'point = (3, 5)\nx, y = point\nprint(x)\nprint(y)',hint:"왼쪽 변수 개수와 튜플 값 개수를 맞춰요."},
        {id:"tuple-unpack-p",type:"predict",prompt:'colors = ("red", "blue")를 first, second로 언패킹하면 second는 무엇일까요?',code:'colors = ("red", "blue")\nfirst, second = colors\nprint(second)',choices:["blue","red","colors","에러"],answer:0,output:"blue",hint:"튜플의 두 번째 값이 second에 들어가요.",explain:"red는 first, blue는 second에 저장돼요."},
        {id:"tuple-unpack-f",type:"fill",prompt:"튜플의 두 값을 x와 y에 나누어 담으려면 빈칸에 어떤 변수 이름이 들어갈까요?",code:'point = (3, 5)\nx, ____ = point\nprint(x)',tokens:["y","point","3","5"],answer:"y",hint:"튜플 값 두 개에 맞춰 변수도 두 개가 필요해요.",explain:"x, y = point가 3과 5를 각각 나눠 담아요."},
        {id:"tuple-unpack-b",type:"bughunt",prompt:"튜플의 첫 번째 값을 직접 바꾸려고 해서 TypeError가 나는 줄을 고르세요.",lines:['point = (3, 5)','point[0] = 9','print(point)'],buggy:1,fixed:"point = (9, 5)",hint:"튜플은 만든 뒤 항목을 직접 수정할 수 없어요.",explain:"튜플은 immutable이라 point[0]에 새 값을 대입할 수 없어요."},
        {id:"tuple-unpack-w",type:"write",prompt:'swap(pair) 함수를 만들어 두 값을 언패킹한 뒤 순서를 바꾼 "두번째,첫번째" 문자열을 반환하세요. ("red", "blue") 결과를 출력하세요.',starter:"# swap(pair) 함수를 만들고 호출하세요\n",expected:"blue,red",testcase:"기대 출력: blue,red",hint:'first, second = pair 후 return f"{second},{first}"를 사용하세요.',explain:"튜플 언패킹으로 두 값을 읽고 순서를 바꿔 사용했어요.",model:'def swap(pair):\n    first, second = pair\n    return f"{second},{first}"\nprint(swap(("red", "blue")))',grading:{tests:[{append:'print(swap(("cat", "dog")))',expected:"dog,cat",labelKo:"다른 튜플",labelEn:"another tuple"}]}}
      ]
    },
    {
      slug:"set-garden",title:"집합 정원",short:"set",focus:["set","unique"],
      description:"set은 중복 값을 하나로 정리하고 포함 여부를 빠르게 확인해요.",output:"3",
      exercises:[
        {id:"set-garden-c",type:"concept",title:"중복 없는 컬렉션",body:"set은 같은 값을 여러 번 넣어도 하나만 남겨요. 순서나 인덱스보다 '어떤 값들이 있는가'가 중요할 때 사용해요.",code:'numbers = [1, 1, 2, 3]\nunique = set(numbers)\nprint(len(unique))',hint:"set()으로 리스트를 집합으로 바꾸면 중복이 제거돼요."},
        {id:"set-garden-p",type:"predict",prompt:"[1, 1, 2]를 set으로 바꾼 뒤 길이를 출력하면 얼마일까요?",code:'numbers = [1, 1, 2]\nprint(len(set(numbers)))',choices:["2","3","1","에러"],answer:0,output:"2",hint:"중복된 1은 하나만 남아요.",explain:"집합에는 1과 2 두 값만 남으므로 길이는 2예요."},
        {id:"set-garden-f",type:"fill",prompt:"리스트의 중복을 제거하는 집합으로 바꾸려면 빈칸에 어떤 함수가 들어갈까요?",code:'numbers = [1, 1, 2]\nunique = ____(numbers)\nprint(len(unique))',tokens:["set","list","str","range"],answer:"set",hint:"중복 없는 컬렉션을 만드는 내장 함수예요.",explain:"set(numbers)가 중복을 제거한 집합을 만들어요."},
        {id:"set-garden-b",type:"bughunt",prompt:"집합을 리스트처럼 인덱스로 꺼내려고 해서 오류가 나는 줄을 고르세요.",lines:['colors = {"red", "blue"}','print(colors[0])'],buggy:1,fixed:'print("red" in colors)',hint:"set은 위치 번호로 값을 꺼내는 컬렉션이 아니에요.",explain:"집합은 인덱싱보다 in으로 포함 여부를 확인하는 데 적합해요."},
        {id:"set-garden-w",type:"write",prompt:"unique_count(items) 함수를 만들어 중복을 제거한 값의 개수를 반환하세요. [1, 1, 2, 3] 결과를 출력하세요.",starter:"# unique_count(items) 함수를 만들고 호출하세요\n",expected:"3",testcase:"기대 출력: 3",hint:"return len(set(items))를 사용하세요.",explain:"set으로 중복을 제거한 뒤 len으로 고유한 값의 개수를 셌어요.",model:'def unique_count(items):\n    return len(set(items))\nprint(unique_count([1, 1, 2, 3]))',grading:{tests:[{append:'print(unique_count([1, 1, 1]))',expected:"1",labelKo:"모두 같은 값",labelEn:"all duplicate values"}]}}
      ]
    },
    {
      slug:"data-project",title:"데이터 미니 프로젝트",short:"데이터 프로젝트",focus:["dictionary","function","condition","data"],
      description:"딕셔너리, 조건문, 함수, 반복을 묶어 작은 학생 결과 프로그램을 만들어요.",output:"Amy:PASS\nMina:MORE",
      exercises:[
        {id:"data-project-c",type:"concept",title:"구조화된 데이터를 함수로 처리하기",body:"딕셔너리는 한 사람의 여러 정보를 묶기 좋고, 함수는 같은 규칙을 여러 데이터에 재사용하기 좋아요. 리스트에 여러 딕셔너리를 넣으면 반복 처리도 할 수 있어요.",code:'def result(student):\n    if student["score"] >= 70:\n        return f"{student[\'name\']}:PASS"\n    return f"{student[\'name\']}:MORE"\n\nstudents = [{"name": "Amy", "score": 90}, {"name": "Mina", "score": 60}]\nfor student in students:\n    print(result(student))',hint:"한 학생은 딕셔너리, 여러 학생은 딕셔너리의 리스트로 표현해요."},
        {id:"data-project-p",type:"predict",prompt:"score가 60인 Mina를 result()에 넣으면 어떤 문자열이 반환될까요?",code:'def result(student):\n    if student["score"] >= 70:\n        return f"{student[\'name\']}:PASS"\n    return f"{student[\'name\']}:MORE"\nprint(result({"name": "Mina", "score": 60}))',choices:["Mina:MORE","Mina:PASS","60","에러"],answer:0,output:"Mina:MORE",hint:"60은 70 이상인지 확인하세요.",explain:"60은 70보다 작아서 MORE 경로가 실행돼요."},
        {id:"data-project-f",type:"fill",prompt:"학생의 score 값을 읽어 조건을 검사하려면 빈칸에 어떤 키가 들어갈까요?",code:'student = {"name": "Amy", "score": 90}\nif student[____] >= 70:\n    print("PASS")',tokens:['"score"','"name"',"score","90"],answer:'"score"',hint:"비교에 필요한 숫자가 저장된 키를 고르세요.",explain:'student["score"]가 90을 꺼내 조건에 사용돼요.'},
        {id:"data-project-b",type:"bughunt",prompt:"학생 이름을 출력하려는데 존재하지 않는 키를 사용한 줄을 고르세요.",lines:['student = {"name": "Amy", "score": 90}','print(student["student_name"])'],buggy:1,fixed:'print(student["name"])',hint:"딕셔너리에 실제로 정의된 키를 확인하세요.",explain:'이 딕셔너리의 이름 키는 "name"이에요.'},
        {id:"data-project-w",type:"write",prompt:'result(student) 함수를 만들어 score가 70 이상이면 "이름:PASS", 아니면 "이름:MORE"를 반환하세요. Amy 90, Mina 60을 리스트로 반복해 한 줄씩 출력하세요.',starter:"# result(student) 함수를 만들고 두 학생을 for로 반복하세요\n",expected:"Amy:PASS\nMina:MORE",testcase:"기대 출력: Amy:PASS / Mina:MORE (각 한 줄)",hint:'student["score"]와 student["name"]을 사용하고, 리스트를 for로 순회하세요.',explain:"딕셔너리, 함수, 조건문, 리스트 반복을 하나의 작은 데이터 프로그램으로 연결했어요.",model:'def result(student):\n    if student["score"] >= 70:\n        return f"{student[\'name\']}:PASS"\n    return f"{student[\'name\']}:MORE"\n\nstudents = [{"name": "Amy", "score": 90}, {"name": "Mina", "score": 60}]\nfor student in students:\n    print(result(student))',grading:{tests:[{append:'print(result({"name": "Noa", "score": 50}))',expected:"Noa:MORE",labelKo:"다른 학생 데이터",labelEn:"another student record"}]}}
      ]
    }
  ];

  const UNIT4_EN=[
    {
      slug:"string-methods",title:"String Workshop",short:"String Methods",focus:["strings","upper","lower"],
      description:"Use upper() and lower() to transform string letter case.",output:"MEOWDE",
      exercises:[
        {id:"string-methods-c",type:"concept",title:"Strings have useful methods",body:"Add .upper() to create an uppercase string or .lower() to create a lowercase string. These methods return a new string; they do not change the original value.",code:'name = "Meowde"\nprint(name.upper())',hint:"Put a dot, the method name, and parentheses after the string."},
        {id:"string-methods-p",type:"predict",prompt:'If name is "Meowde", what does name.upper() print?',code:'name = "Meowde"\nprint(name.upper())',choices:["MEOWDE","Meowde","meowde","Error"],answer:0,output:"MEOWDE",hint:"upper() changes letters to uppercase.",explain:"The letters in Meowde become uppercase, so the output is MEOWDE."},
        {id:"string-methods-f",type:"fill",prompt:'Which method makes word print as lowercase "python"?',code:'word = "PYTHON"\nprint(word.____())',tokens:["lower","upper","append","get"],answer:"lower",hint:"Choose the string method that creates lowercase text.",explain:"lower() changes alphabetic characters to lowercase."},
        {id:"string-methods-b",type:"bughunt",prompt:"Which line refers to the method but forgets to call it, so CAT is not printed?",lines:['word = "cat"','print(word.upper)'],buggy:1,fixed:"print(word.upper())",hint:"A method call needs parentheses.",explain:"upper refers to the method itself; upper() actually runs it."},
        {id:"string-methods-w",type:"write",prompt:'Define shout(text) to return uppercase text, then print shout("meowde").',starter:"# Define shout(text), then call it\n",expected:"MEOWDE",testcase:"Expected output: MEOWDE",hint:"Use return text.upper().",explain:"You put a string method inside a reusable function.",model:'def shout(text):\n    return text.upper()\nprint(shout("meowde"))',grading:{tests:[{append:'print(shout("python"))',expected:"PYTHON",labelKo:"다른 문자열",labelEn:"another string"}]}}
      ]
    },
    {
      slug:"string-slice",title:"String Slice",short:"Slicing",focus:["strings","slicing"],
      description:"Use [start:stop] to take only the part of a string you need.",output:"pyt",
      exercises:[
        {id:"string-slice-c",type:"concept",title:"Take a section of a string",body:"Strings use zero-based positions like lists. text[0:3] includes positions 0, 1, and 2; the stop position 3 is not included.",code:'text = "python"\nprint(text[0:3])',hint:"The stop number in a slice is excluded."},
        {id:"string-slice-p",type:"predict",prompt:'If word = "Meowde", what does word[1:4] print?',code:'word = "Meowde"\nprint(word[1:4])',choices:["eow","Meo","eowd","owd"],answer:0,output:"eow",hint:"Take positions 1 through 3.",explain:"Positions 1, 2, and 3 are e, o, and w."},
        {id:"string-slice-f",type:"fill",prompt:'Which stop position takes the first three letters, pyt, from "python"?',code:'text = "python"\nprint(text[0:____])',tokens:["3","2","4","6"],answer:"3",hint:"The stop position is excluded.",explain:"0:3 includes positions 0, 1, and 2, producing pyt."},
        {id:"string-slice-b",type:"bughunt",prompt:"Which line uses the wrong separator for a string slice?",lines:['text = "python"','print(text[0, 3])'],buggy:1,fixed:"print(text[0:3])",hint:"Slices separate start and stop with a colon (:), not a comma.",explain:"Use text[0:3] to slice a range of characters."},
        {id:"string-slice-w",type:"write",prompt:'Define first_three(text) to return the first three characters, then print first_three("python").',starter:"# Define first_three(text), then call it\n",expected:"pyt",testcase:"Expected output: pyt",hint:"Try return text[:3].",explain:"You turned slicing into a function that works on other strings.",model:'def first_three(text):\n    return text[:3]\nprint(first_three("python"))',grading:{tests:[{append:'print(first_three("meowde"))',expected:"meo",labelKo:"다른 문자열",labelEn:"another string"}]}}
      ]
    },
    {
      slug:"membership-gate",title:"Membership Gate",short:"in",focus:["in","membership"],
      description:"Use in and not in to check whether a value exists inside a string or collection.",output:"YES",
      exercises:[
        {id:"membership-gate-c",type:"concept",title:"Ask whether a value is inside",body:"value in collection becomes True when the value is present. not in becomes True when the value is absent.",code:'pets = ["cat", "dog"]\nprint("cat" in pets)',hint:"Put the value to find on the left and the collection on the right."},
        {id:"membership-gate-p",type:"predict",prompt:'If pets contains cat and dog, what is the result of "bird" in pets?',code:'pets = ["cat", "dog"]\nprint("bird" in pets)',choices:["False","True","bird","Error"],answer:0,output:"False",hint:"Check whether bird actually appears in the list.",explain:"bird is not in pets, so the result is False."},
        {id:"membership-gate-f",type:"fill",prompt:'Which operator checks whether "cat" is inside pets?',code:'pets = ["cat", "dog"]\nprint("cat" ____ pets)',tokens:["in","not in","==","and"],answer:"in",hint:"Choose the membership keyword.",explain:'"cat" in pets evaluates to True.'},
        {id:"membership-gate-b",type:"bughunt",prompt:'Which line reverses the membership relationship when checking whether "cat" is in pets?',lines:['pets = ["cat", "dog"]','if pets in "cat":','    print("YES")'],buggy:1,fixed:'if "cat" in pets:',hint:"The searched value goes on the left; the collection goes on the right.",explain:'Use "cat" in pets to test membership in the list.'},
        {id:"membership-gate-w",type:"write",prompt:'Define has_cat(pets) to return YES when "cat" is present and NO otherwise, then print the result for ["dog", "cat"].',starter:"# Define has_cat(pets), then call it\n",expected:"YES",testcase:"Expected output: YES",hint:'Use if "cat" in pets:.',explain:"You connected membership testing to a conditional function.",model:'def has_cat(pets):\n    if "cat" in pets:\n        return "YES"\n    return "NO"\nprint(has_cat(["dog", "cat"]))',grading:{tests:[{append:'print(has_cat(["dog"]))',expected:"NO",labelKo:"cat이 없는 리스트",labelEn:"a list without cat"}]}}
      ]
    },
    {
      slug:"dict-seed",title:"Dictionary Seed",short:"Dictionaries",focus:["dictionary","key","value"],
      description:"Store meaningful data as key-value pairs in a dictionary.",output:"Mimi",
      exercises:[
        {id:"dict-seed-c",type:"concept",title:"Find values by name",body:"A dictionary stores {key: value} pairs. Instead of a numeric list index, you use a meaningful key to retrieve a value.",code:'cat = {"name": "Mimi", "age": 3}\nprint(cat["name"])',hint:'String keys need quotes, such as "name".'},
        {id:"dict-seed-p",type:"predict",prompt:'What prints when cat["age"] is read from this dictionary?',code:'cat = {"name": "Mimi", "age": 3}\nprint(cat["age"])',choices:["3","age","Mimi","Error"],answer:0,output:"3",hint:"Find the value paired with the age key.",explain:"The age key stores the number 3."},
        {id:"dict-seed-f",type:"fill",prompt:"Which key belongs in the brackets to print Mimi?",code:'cat = {"name": "Mimi", "age": 3}\nprint(cat[____])',tokens:['"name"','"age"',"0","name"],answer:'"name"',hint:"Use the exact quoted key stored in the dictionary.",explain:'cat["name"] retrieves Mimi.'},
        {id:"dict-seed-b",type:"bughunt",prompt:"Which line uses a capitalized key that does not exist in the dictionary?",lines:['cat = {"name": "Mimi", "age": 3}','print(cat["Name"])'],buggy:1,fixed:'print(cat["name"])',hint:"Dictionary keys are case-sensitive.",explain:'"Name" and "name" are different keys.'},
        {id:"dict-seed-w",type:"write",prompt:'Define get_name(profile) to return the "name" value, then print the result for {"name": "Mimi"}.',starter:"# Define get_name(profile), then call it\n",expected:"Mimi",testcase:"Expected output: Mimi",hint:'Use return profile["name"].',explain:"You retrieved a named value inside a reusable function.",model:'def get_name(profile):\n    return profile["name"]\nprint(get_name({"name": "Mimi"}))',grading:{tests:[{append:'print(get_name({"name": "Mina"}))',expected:"Mina",labelKo:"다른 딕셔너리",labelEn:"another dictionary"}]}}
      ]
    },
    {
      slug:"dict-update",title:"Dictionary Update",short:"Updating Values",focus:["dictionary","update"],
      description:"Change an existing dictionary value or add a new key.",output:"4",
      exercises:[
        {id:"dict-update-c",type:"concept",title:"Store a new value under a key",body:'Use dict["key"] = value to update an existing key or create a new key.',code:'cat = {"age": 3}\ncat["age"] = 4\ncat["level"] = 1\nprint(cat["age"])',hint:"Put the key to update inside square brackets."},
        {id:"dict-update-p",type:"predict",prompt:'After changing age from 3 to 4, what does cat["age"] print?',code:'cat = {"age": 3}\ncat["age"] = 4\nprint(cat["age"])',choices:["4","3","age","Error"],answer:0,output:"4",hint:"The latest value stored under the same key remains.",explain:"The age value is updated to 4."},
        {id:"dict-update-f",type:"fill",prompt:"Which key belongs in the blank to change level to 2?",code:'cat = {"level": 1}\ncat[____] = 2\nprint(cat["level"])',tokens:['"level"','"age"',"level","2"],answer:'"level"',hint:"Use the exact quoted key you want to update.",explain:'cat["level"] = 2 replaces the previous value.'},
        {id:"dict-update-b",type:"bughunt",prompt:"Which line treats the key age as an undefined variable instead of a string key?",lines:['cat = {"age": 3}','cat[age] = 4','print(cat["age"])'],buggy:1,fixed:'cat["age"] = 4',hint:"No variable named age was defined.",explain:'Write the string key as cat["age"].'},
        {id:"dict-update-w",type:"write",prompt:'Define level_up(player) to increase player["level"] by 1 and return the new level. Print the result for level 2.',starter:"# Define level_up(player), then call it\n",expected:"3",testcase:"Expected output: 3",hint:'Update player["level"], then return it.',explain:"You read, updated, and returned a dictionary value.",model:'def level_up(player):\n    player["level"] = player["level"] + 1\n    return player["level"]\nprint(level_up({"level": 2}))',grading:{tests:[{append:'print(level_up({"level": 7}))',expected:"8",labelKo:"다른 level",labelEn:"another level"}]}}
      ]
    },
    {
      slug:"dict-get",title:"Safe Lookup",short:"get",focus:["dictionary","get"],
      description:"Use get() to read a key safely with a fallback value.",output:"Unknown",
      exercises:[
        {id:"dict-get-c",type:"concept",title:"Prepare for missing keys",body:'dict.get("key", default) returns the stored value when the key exists and the default when it does not. This is useful when user data may be incomplete.',code:'profile = {"name": "Amy"}\nprint(profile.get("city", "Unknown"))',hint:"The second argument is the fallback value."},
        {id:"dict-get-p",type:"predict",prompt:'If profile has no city key, what does profile.get("city", "Unknown") print?',code:'profile = {"name": "Amy"}\nprint(profile.get("city", "Unknown"))',choices:["Unknown","Amy","city","Error"],answer:0,output:"Unknown",hint:"The missing key makes get() use its second argument.",explain:"Because city is absent, get() returns Unknown."},
        {id:"dict-get-f",type:"fill",prompt:"Which dictionary method can return a fallback when a key is missing?",code:'profile = {"name": "Amy"}\nprint(profile.____("city", "Unknown"))',tokens:["get","append","upper","items"],answer:"get",hint:"Choose the safe dictionary lookup method.",explain:"get() can provide a fallback without raising a missing-key error."},
        {id:"dict-get-b",type:"bughunt",prompt:"Which line can raise KeyError because city might not exist?",lines:['profile = {"name": "Amy"}','print(profile["city"])'],buggy:1,fixed:'print(profile.get("city", "Unknown"))',hint:"Use get() when a key may be missing.",explain:"Direct bracket access raises KeyError for a missing key; get() can use a fallback."},
        {id:"dict-get-w",type:"write",prompt:'Define city_of(profile) to return city when present or "Unknown" otherwise. Print the result for {"name": "Amy"}.',starter:"# Define city_of(profile), then call it\n",expected:"Unknown",testcase:"Expected output: Unknown",hint:'Use return profile.get("city", "Unknown").',explain:"You used get() to handle incomplete data safely.",model:'def city_of(profile):\n    return profile.get("city", "Unknown")\nprint(city_of({"name": "Amy"}))',grading:{tests:[{append:'print(city_of({"city": "Seoul"}))',expected:"Seoul",labelKo:"city가 있는 딕셔너리",labelEn:"a dictionary with city"}]}}
      ]
    },
    {
      slug:"dict-loop",title:"Dictionary Loop",short:"items",focus:["dictionary","items","for"],
      description:"Use items() to loop through dictionary keys and values together.",output:"Amy:90\nMina:80",
      exercises:[
        {id:"dict-loop-c",type:"concept",title:"Read keys and values together",body:"dict.items() produces key-value pairs. Use for key, value in data.items(): to receive both parts on each loop.",code:'scores = {"Amy": 90, "Mina": 80}\nfor name, score in scores.items():\n    print(f"{name}:{score}")',hint:"items() gives two values on each iteration."},
        {id:"dict-loop-p",type:"predict",prompt:"What is the first line printed by this loop?",code:'scores = {"Amy": 90, "Mina": 80}\nfor name, score in scores.items():\n    print(f"{name}:{score}")',choices:["Amy:90","Mina:80","90:Amy","scores"],answer:0,output:"Amy:90\nMina:80",hint:"The dictionary is iterated in insertion order: Amy, then Mina.",explain:"The first key-value pair is Amy and 90, producing Amy:90."},
        {id:"dict-loop-f",type:"fill",prompt:"Which method belongs after scores to loop through keys and values together?",code:'scores = {"Amy": 90}\nfor name, score in scores.____():\n    print(name, score)',tokens:["items","get","append","upper"],answer:"items",hint:"Choose the method that produces key-value pairs.",explain:"items() lets name and score receive both parts of each pair."},
        {id:"dict-loop-b",type:"bughunt",prompt:"Which line tries to unpack two variables while iterating the dictionary keys only?",lines:['scores = {"Amy": 90, "Mina": 80}','for name, score in scores:','    print(name, score)'],buggy:1,fixed:"for name, score in scores.items():",hint:"Iterating a dictionary directly gives one key at a time.",explain:"Use scores.items() when the loop needs both key and value."},
        {id:"dict-loop-w",type:"write",prompt:'Define show_scores(scores) to print each entry as "name:score". Call it with Amy 90 and Mina 80.',starter:"# Define show_scores(scores), then call it\n",expected:"Amy:90\nMina:80",testcase:"Expected output: Amy:90 / Mina:80 on separate lines",hint:'Loop over scores.items() and use an f-string.',explain:"You processed multiple dictionary records with a loop.",model:'def show_scores(scores):\n    for name, score in scores.items():\n        print(f"{name}:{score}")\nshow_scores({"Amy": 90, "Mina": 80})',grading:{tests:[{append:'show_scores({"Noa": 70})',expected:"Noa:70",labelKo:"한 항목 딕셔너리",labelEn:"a one-item dictionary"}]}}
      ]
    },
    {
      slug:"tuple-unpack",title:"Tuple Unpacking",short:"Tuples",focus:["tuple","unpacking"],
      description:"Use tuples for fixed ordered values and unpack them into multiple variables.",output:"blue,red",
      exercises:[
        {id:"tuple-unpack-c",type:"concept",title:"Fixed groups and unpacking",body:"Create a tuple with (value1, value2). Writing x, y = point unpacks the values into the same number of variables.",code:'point = (3, 5)\nx, y = point\nprint(x)\nprint(y)',hint:"Match the number of variables to the number of tuple values."},
        {id:"tuple-unpack-p",type:"predict",prompt:'If colors = ("red", "blue") is unpacked into first, second, what is second?',code:'colors = ("red", "blue")\nfirst, second = colors\nprint(second)',choices:["blue","red","colors","Error"],answer:0,output:"blue",hint:"The second tuple value goes into second.",explain:"red goes to first and blue goes to second."},
        {id:"tuple-unpack-f",type:"fill",prompt:"Which variable completes the two-variable unpacking of point?",code:'point = (3, 5)\nx, ____ = point\nprint(x)',tokens:["y","point","3","5"],answer:"y",hint:"Two tuple values need two variables.",explain:"x, y = point stores 3 in x and 5 in y."},
        {id:"tuple-unpack-b",type:"bughunt",prompt:"Which line tries to modify an item inside an immutable tuple?",lines:['point = (3, 5)','point[0] = 9','print(point)'],buggy:1,fixed:"point = (9, 5)",hint:"Tuple items cannot be reassigned after creation.",explain:"Tuples are immutable, so point[0] cannot be replaced directly."},
        {id:"tuple-unpack-w",type:"write",prompt:'Define swap(pair) to unpack two values and return "second,first". Print the result for ("red", "blue").',starter:"# Define swap(pair), then call it\n",expected:"blue,red",testcase:"Expected output: blue,red",hint:'Unpack first, second = pair, then return f"{second},{first}".',explain:"You unpacked a tuple and reused the two values in a new order.",model:'def swap(pair):\n    first, second = pair\n    return f"{second},{first}"\nprint(swap(("red", "blue")))',grading:{tests:[{append:'print(swap(("cat", "dog")))',expected:"dog,cat",labelKo:"다른 튜플",labelEn:"another tuple"}]}}
      ]
    },
    {
      slug:"set-garden",title:"Set Garden",short:"Sets",focus:["set","unique"],
      description:"Use a set to keep unique values and test membership.",output:"3",
      exercises:[
        {id:"set-garden-c",type:"concept",title:"A collection without duplicates",body:"A set keeps only one copy of each value. Use it when which values exist matters more than their position or order.",code:'numbers = [1, 1, 2, 3]\nunique = set(numbers)\nprint(len(unique))',hint:"set() converts a list into a unique-value collection."},
        {id:"set-garden-p",type:"predict",prompt:"What is the length after [1, 1, 2] is converted to a set?",code:'numbers = [1, 1, 2]\nprint(len(set(numbers)))',choices:["2","3","1","Error"],answer:0,output:"2",hint:"The duplicate 1 is kept only once.",explain:"The set contains only 1 and 2, so its length is 2."},
        {id:"set-garden-f",type:"fill",prompt:"Which function converts the list into a collection with duplicates removed?",code:'numbers = [1, 1, 2]\nunique = ____(numbers)\nprint(len(unique))',tokens:["set","list","str","range"],answer:"set",hint:"Choose the built-in function that creates a set.",explain:"set(numbers) removes duplicate values."},
        {id:"set-garden-b",type:"bughunt",prompt:"Which line incorrectly tries to access a set by numeric index?",lines:['colors = {"red", "blue"}','print(colors[0])'],buggy:1,fixed:'print("red" in colors)',hint:"Sets are not indexed collections.",explain:"Use membership checks such as in rather than numeric indexing."},
        {id:"set-garden-w",type:"write",prompt:"Define unique_count(items) to return the number of unique values. Print the result for [1, 1, 2, 3].",starter:"# Define unique_count(items), then call it\n",expected:"3",testcase:"Expected output: 3",hint:"Use return len(set(items)).",explain:"You removed duplicates with set and counted the remaining values.",model:'def unique_count(items):\n    return len(set(items))\nprint(unique_count([1, 1, 2, 3]))',grading:{tests:[{append:'print(unique_count([1, 1, 1]))',expected:"1",labelKo:"모두 같은 값",labelEn:"all duplicate values"}]}}
      ]
    },
    {
      slug:"data-project",title:"Data Mini Project",short:"Data Project",focus:["dictionary","function","condition","data"],
      description:"Combine dictionaries, conditions, functions, and loops in a small student-results program.",output:"Amy:PASS\nMina:MORE",
      exercises:[
        {id:"data-project-c",type:"concept",title:"Process structured data with a function",body:"A dictionary can represent one record, a function can apply one rule, and a list of dictionaries can be processed repeatedly with a loop.",code:'def result(student):\n    if student["score"] >= 70:\n        return f"{student[\'name\']}:PASS"\n    return f"{student[\'name\']}:MORE"\n\nstudents = [{"name": "Amy", "score": 90}, {"name": "Mina", "score": 60}]\nfor student in students:\n    print(result(student))',hint:"Think of one student as one dictionary and many students as a list of dictionaries."},
        {id:"data-project-p",type:"predict",prompt:"What string does result() return for Mina with a score of 60?",code:'def result(student):\n    if student["score"] >= 70:\n        return f"{student[\'name\']}:PASS"\n    return f"{student[\'name\']}:MORE"\nprint(result({"name": "Mina", "score": 60}))',choices:["Mina:MORE","Mina:PASS","60","Error"],answer:0,output:"Mina:MORE",hint:"Check whether 60 is at least 70.",explain:"60 is below 70, so the MORE branch returns Mina:MORE."},
        {id:"data-project-f",type:"fill",prompt:"Which key belongs in the brackets to read the numeric score for the condition?",code:'student = {"name": "Amy", "score": 90}\nif student[____] >= 70:\n    print("PASS")',tokens:['"score"','"name"',"score","90"],answer:'"score"',hint:"Choose the key that stores the number used in the comparison.",explain:'student["score"] retrieves 90 for the condition.'},
        {id:"data-project-b",type:"bughunt",prompt:"Which line asks for a key that does not exist in the student dictionary?",lines:['student = {"name": "Amy", "score": 90}','print(student["student_name"])'],buggy:1,fixed:'print(student["name"])',hint:"Check the exact keys defined in the dictionary.",explain:'The name is stored under the key "name".'},
        {id:"data-project-w",type:"write",prompt:'Define result(student) to return "name:PASS" for scores 70 or higher, otherwise "name:MORE". Loop over Amy 90 and Mina 60 and print one result per line.',starter:"# Define result(student), then loop over the two students\n",expected:"Amy:PASS\nMina:MORE",testcase:"Expected output: Amy:PASS / Mina:MORE on separate lines",hint:'Use student["score"], student["name"], and a for loop over a list of dictionaries.',explain:"You combined structured data, a function, a condition, and iteration into one small program.",model:'def result(student):\n    if student["score"] >= 70:\n        return f"{student[\'name\']}:PASS"\n    return f"{student[\'name\']}:MORE"\n\nstudents = [{"name": "Amy", "score": 90}, {"name": "Mina", "score": 60}]\nfor student in students:\n    print(result(student))',grading:{tests:[{append:'print(result({"name": "Noa", "score": 50}))',expected:"Noa:MORE",labelKo:"다른 학생 데이터",labelEn:"another student record"}]}}
      ]
    }
  ];

  const CLARITY={
    ko:{
      "index-tower":{
        "index-tower-f":{prompt:'pets[1]의 값 dog를 출력하려면 빈칸에 어떤 함수 이름이 들어갈까요?'},
        "index-tower-b":{prompt:"dog를 출력하려는 코드에서 문법 오류가 있는 줄을 고르세요."}
      },
      "append-dock":{
        "append-dock-f":{prompt:'append한 milk를 출력하려면 빈칸에 어떤 함수 이름이 들어갈까요?'},
        "append-dock-b":{prompt:"milk를 출력하려는 코드에서 문법 오류가 있는 줄을 고르세요."}
      },
      "loop-hill":{
        "loop-hill-f":{prompt:"리스트의 1, 2, 3을 한 줄씩 반복 출력하려면 빈칸에 어떤 키워드가 들어갈까요?"},
        "loop-hill-b":{prompt:"for문을 실행할 수 없게 만드는 문법 오류가 있는 줄을 고르세요."}
      },
      "range-rail":{
        "range-rail-f":{prompt:"range(3)의 0, 1, 2를 반복 출력하려면 빈칸에 어떤 키워드가 들어갈까요?"},
        "range-rail-b":{prompt:"range 반복문에서 콜론(:)이 빠진 줄을 고르세요."}
      },
      "function-house":{
        "function-house-f":{prompt:"greet() 함수를 정의하려면 빈칸에 어떤 키워드가 들어갈까요?"},
        "function-house-b":{prompt:"greet() 함수 정의에서 콜론(:)이 빠진 줄을 고르세요."}
      },
      "parameter-mail":{
        "parameter-mail-f":{prompt:"hi(name) 함수를 정의하려면 빈칸에 어떤 키워드가 들어갈까요?"},
        "parameter-mail-b":{prompt:"hi(name) 함수 정의에서 콜론(:)이 빠진 줄을 고르세요."}
      },
      "return-spring":{
        "return-spring-f":{prompt:"double(x) 함수를 정의하려면 빈칸에 어떤 키워드가 들어갈까요?"},
        "return-spring-b":{prompt:"double(x) 함수 정의에서 콜론(:)이 빠진 줄을 고르세요."}
      },
      "boss-bug":{
        "boss-bug-f":{prompt:"score가 100인지 검사하는 조건문을 시작하려면 빈칸에 어떤 키워드가 들어갈까요?"},
        "boss-bug-b":{prompt:"score == 100 조건문에서 콜론(:)이 빠진 줄을 고르세요."},
        "boss-bug-w":{prompt:"직접 작성: score를 100으로 저장하고, score가 100이면 BOSS CLEAR를 출력하세요.",starter:"# score를 100으로 저장하고 if문을 작성하세요\n",hint:'score = 100 다음 if score == 100: 안에서 print("BOSS CLEAR")를 사용하세요.',explain:"변수, 비교, 조건문, 들여쓰기를 명확한 목표에 맞춰 연결했어요."}
      }
    },
    en:{
      "index-tower":{
        "index-tower-f":{prompt:"Which function name belongs in the blank to print pets[1], the value dog?"},
        "index-tower-b":{prompt:"Which line contains the syntax error that prevents dog from being printed?"}
      },
      "append-dock":{
        "append-dock-f":{prompt:"Which function name belongs in the blank to print the appended value milk?"},
        "append-dock-b":{prompt:"Which line contains the syntax error that prevents milk from being printed?"}
      },
      "loop-hill":{
        "loop-hill-f":{prompt:"Which keyword belongs in the blank to loop over and print 1, 2, and 3 on separate lines?"},
        "loop-hill-b":{prompt:"Which line contains the syntax error that prevents this for loop from running?"}
      },
      "range-rail":{
        "range-rail-f":{prompt:"Which keyword belongs in the blank to loop over range(3) and print 0, 1, and 2?"},
        "range-rail-b":{prompt:"Which line in the range loop is missing a colon (:)?"}
      },
      "function-house":{
        "function-house-f":{prompt:"Which keyword belongs in the blank to define greet()?"},
        "function-house-b":{prompt:"Which line in the greet() function definition is missing a colon (:)?"}
      },
      "parameter-mail":{
        "parameter-mail-f":{prompt:"Which keyword belongs in the blank to define hi(name)?"},
        "parameter-mail-b":{prompt:"Which line in the hi(name) function definition is missing a colon (:)?"}
      },
      "return-spring":{
        "return-spring-f":{prompt:"Which keyword belongs in the blank to define double(x)?"},
        "return-spring-b":{prompt:"Which line in the double(x) function definition is missing a colon (:)?"}
      },
      "boss-bug":{
        "boss-bug-f":{prompt:"Which keyword belongs in the blank to start a condition that checks score == 100?"},
        "boss-bug-b":{prompt:"Which line in the score == 100 condition is missing a colon (:)?" },
        "boss-bug-w":{prompt:'Write code: store 100 in score, then print BOSS CLEAR when score equals 100.',starter:"# Store 100 in score, then write the if statement\n",hint:'After score = 100, use if score == 100: and print("BOSS CLEAR").',explain:"You connected a variable, comparison, condition, and indentation to one explicit goal."}
      }
    }
  };

  function state(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function appendLessons(target,items){
    if(!Array.isArray(target))return [];
    const added=[];
    for(const lesson of items){
      if(target.some(existing=>existing&&existing.slug===lesson.slug))continue;
      target.push(JSON.parse(JSON.stringify(lesson)));
      added.push(lesson.slug);
    }
    return added;
  }
  function patchClarity(lessons,patches){
    const changed=[];
    if(!Array.isArray(lessons))return changed;
    for(const [slug,exercisePatches] of Object.entries(patches)){
      const lesson=lessons.find(item=>item&&item.slug===slug);
      if(!lesson)continue;
      for(const [id,patch] of Object.entries(exercisePatches)){
        const exercise=(lesson.exercises||[]).find(item=>item.id===id);
        if(!exercise)continue;
        Object.assign(exercise,patch);
        changed.push(id);
      }
    }
    return changed;
  }
  function unlockLegacyCompletion(){
    const current=state();
    if(!current||!Array.isArray(current.done))return false;
    const completedLegacy=Array.from({length:30},(_,index)=>index).every(index=>current.done.includes(index));
    if(!completedLegacy||Number(current.next)>=30)return false;
    current.next=30;
    if(typeof save==="function")save();
    return true;
  }
  function refresh(){
    const current=state();if(!current||current.screen==="lesson")return;
    if(current.screen==="home"&&typeof window.__MEOWDE_CANONICAL_HOME_RENDERER__==="function")window.__MEOWDE_CANONICAL_HOME_RENDERER__();
    else if(current.screen==="map"&&typeof window.__MEOWDE_CANONICAL_LEARN_RENDERER__==="function")window.__MEOWDE_CANONICAL_LEARN_RENDERER__();
    else if(current.screen==="review"&&typeof window.__MEOWDE_CANONICAL_REVIEW_RENDERER__==="function")window.__MEOWDE_CANONICAL_REVIEW_RENDERER__();
  }

  const addedKo=appendLessons(window.MEOWDE_LESSONS_KO,UNIT4_KO);
  const addedEn=appendLessons(window.MEOWDE_LESSONS_EN,UNIT4_EN);
  const clarifiedKo=patchClarity(window.MEOWDE_LESSONS_KO,CLARITY.ko);
  const clarifiedEn=patchClarity(window.MEOWDE_LESSONS_EN,CLARITY.en);
  const unlocked=unlockLegacyCompletion();
  document.documentElement.dataset.curriculumExpansion="v456";
  window.MeowCurriculumExpansion=Object.freeze({
    version:VERSION,unitSize:UNIT_SIZE,
    added:Object.freeze({ko:Object.freeze(addedKo),en:Object.freeze(addedEn)}),
    clarified:Object.freeze({ko:Object.freeze(clarifiedKo),en:Object.freeze(clarifiedEn)}),
    legacyCompletionUnlocked:unlocked
  });
  window.__MEOWDE_VERSION__=VERSION;
  refresh();
})();