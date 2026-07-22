/* Generated from v4.23 canonical lesson assets. Do not edit manually. */
window.MEOWDE_FALLBACK_DATA = {
  "ko": [
    {
      "slug": "start-field",
      "title": "시작의 들판",
      "short": "시작",
      "focus": [
        "시작",
        "print"
      ],
      "description": "코드는 컴퓨터에게 순서대로 부탁하는 짧은 문장이에요.",
      "output": "안녕",
      "exercises": [
        {
          "id": "start-field-c",
          "type": "concept",
          "title": "코드 첫 문장",
          "body": "코드는 위에서 아래로 읽혀요. print()는 화면에 값을 보여주는 첫 명령으로 쓰기 좋아요.",
          "code": "print(\"안녕\")",
          "hint": "괄호 안에 넣은 값이 화면에 보여요."
        },
        {
          "id": "start-field-p1",
          "type": "predict",
          "prompt": "이 코드는 무엇을 화면에 보여줄까요?",
          "code": "print(\"안녕\")",
          "choices": [
            "안녕",
            "print",
            "아무것도 안 보임",
            "에러"
          ],
          "answer": 0,
          "output": "안녕",
          "hint": "따옴표 안의 글자가 출력돼요.",
          "explain": "print()는 괄호 안의 문자열을 화면에 보여줘요."
        },
        {
          "id": "start-field-p2",
          "type": "predict",
          "prompt": "두 줄 코드는 어떤 순서로 출력될까요?",
          "code": "print(\"첫째\")\nprint(\"둘째\")",
          "choices": [
            "첫째\n둘째",
            "둘째\n첫째",
            "첫째둘째",
            "에러"
          ],
          "answer": 0,
          "output": "첫째\n둘째",
          "hint": "파이썬은 위에서 아래로 실행해요.",
          "explain": "첫 줄이 먼저, 다음 줄이 나중에 실행돼요."
        },
        {
          "id": "start-field-f",
          "type": "fill",
          "prompt": "빈칸에 들어갈 명령어를 고르세요.",
          "code": "____(\"Meowde\")",
          "tokens": [
            "print",
            "input",
            "range",
            "True"
          ],
          "answer": "print",
          "hint": "화면에 보여주는 명령은 print예요.",
          "explain": "print(\"Meowde\")가 되어야 출력돼요."
        },
        {
          "id": "start-field-b",
          "type": "bughunt",
          "prompt": "실행을 막는 줄을 고르세요.",
          "lines": [
            "print(\"준비\")",
            "print(\"출발\""
          ],
          "buggy": 1,
          "fixed": "print(\"출발\")",
          "hint": "괄호가 열렸으면 닫혀야 해요.",
          "explain": "두 번째 줄은 닫는 괄호가 빠져 있어요."
        },
        {
          "id": "start-field-w",
          "type": "write",
          "prompt": "직접 작성: 화면에 야옹을 출력하세요.",
          "starter": "# 아래에 코드를 작성하세요\n",
          "expected": "야옹",
          "testcase": "기대 출력: 야옹",
          "hint": "print() 안에 문자열을 넣어보세요.",
          "explain": "정확히 야옹이 출력되면 통과예요.",
          "model": "print(\"야옹\")"
        }
      ]
    },
    {
      "slug": "print-camp",
      "title": "출력 캠프",
      "short": "출력",
      "focus": [
        "출력",
        "print"
      ],
      "description": "print()는 값을 보여주고, 여러 번 쓰면 여러 줄이 출력돼요.",
      "output": "Meowde",
      "exercises": [
        {
          "id": "print-camp-c",
          "type": "concept",
          "title": "출력 순서",
          "body": "print()를 여러 번 쓰면 줄마다 결과가 쌓여요.",
          "code": "print(\"Meow\")\nprint(\"de\")",
          "hint": "각 print는 새 줄에 출력돼요."
        },
        {
          "id": "print-camp-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "print(\"Meow\")\nprint(\"de\")",
          "choices": [
            "Meow\nde",
            "Meowde",
            "de\nMeow",
            "에러"
          ],
          "answer": 0,
          "output": "Meow\nde",
          "hint": "print 두 개는 두 줄을 만들어요.",
          "explain": "첫 번째 print와 두 번째 print가 각각 한 줄씩 출력돼요."
        },
        {
          "id": "print-camp-p2",
          "type": "predict",
          "prompt": "숫자를 따옴표 없이 출력하면 어떻게 될까요?",
          "code": "print(2026)",
          "choices": [
            "2026",
            "\"2026\"",
            "이천이십육",
            "에러"
          ],
          "answer": 0,
          "output": "2026",
          "hint": "숫자도 print로 바로 보여줄 수 있어요.",
          "explain": "print(2026)은 숫자 2026을 화면에 보여줘요."
        },
        {
          "id": "print-camp-f",
          "type": "fill",
          "prompt": "빈칸에 들어갈 명령어를 고르세요.",
          "code": "____(2026)",
          "tokens": [
            "print",
            "str",
            "name",
            "while"
          ],
          "answer": "print",
          "hint": "출력 명령을 고르세요.",
          "explain": "print(2026)이 되어야 숫자가 출력돼요."
        },
        {
          "id": "print-camp-b",
          "type": "bughunt",
          "prompt": "이 중 실행을 막는 줄은?",
          "lines": [
            "print(\"고양이\")",
            "prnit(\"강아지\")",
            "print(\"토끼\")"
          ],
          "buggy": 1,
          "fixed": "print(\"강아지\")",
          "hint": "명령어 철자를 확인하세요.",
          "explain": "prnit은 print의 오타예요."
        },
        {
          "id": "print-camp-w",
          "type": "write",
          "prompt": "직접 작성: 두 줄로 cat과 code를 출력하세요.",
          "starter": "# cat과 code를 두 줄로 출력하세요\n",
          "expected": "cat\ncode",
          "testcase": "기대 출력: cat\ncode",
          "hint": "print()를 두 번 쓰면 돼요.",
          "explain": "두 줄의 출력이 정확히 맞아야 해요.",
          "model": "print(\"cat\")\nprint(\"code\")"
        }
      ]
    },
    {
      "slug": "string-bridge",
      "title": "문자열 다리",
      "short": "문자열",
      "focus": [
        "문자열",
        "string"
      ],
      "description": "따옴표로 감싼 값은 계산이 아니라 글자로 취급돼요.",
      "output": "3 + 4",
      "exercises": [
        {
          "id": "string-bridge-c",
          "type": "concept",
          "title": "문자열과 글자",
          "body": "따옴표 안의 내용은 그대로 글자가 돼요. 숫자처럼 보여도 문자열이면 계산되지 않아요.",
          "code": "print(\"3 + 4\")",
          "hint": "따옴표 안의 3 + 4는 계산식이 아니라 글자예요."
        },
        {
          "id": "string-bridge-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "print(\"3 + 4\")",
          "choices": [
            "3 + 4",
            "7",
            "\"7\"",
            "에러"
          ],
          "answer": 0,
          "output": "3 + 4",
          "hint": "따옴표 안쪽을 그대로 보세요.",
          "explain": "문자열은 계산하지 않고 그대로 출력돼요."
        },
        {
          "id": "string-bridge-p2",
          "type": "predict",
          "prompt": "아래 코드의 출력은?",
          "code": "print(\"cat\")",
          "choices": [
            "cat",
            "\"cat\"",
            "CAT",
            "에러"
          ],
          "answer": 0,
          "output": "cat",
          "hint": "출력될 때 따옴표는 보이지 않아요.",
          "explain": "따옴표는 문자열을 표시하는 기호일 뿐 출력되지는 않아요."
        },
        {
          "id": "string-bridge-f",
          "type": "fill",
          "prompt": "문자열을 출력하려면 어떤 명령을 써야 할까요?",
          "code": "____(\"python\")",
          "tokens": [
            "print",
            "input",
            "for",
            "name"
          ],
          "answer": "print",
          "hint": "화면에 보여주는 명령을 고르세요.",
          "explain": "print(\"python\")이 되어야 해요."
        },
        {
          "id": "string-bridge-b",
          "type": "bughunt",
          "prompt": "문자열이 끝나지 않아 문제인 줄을 고르세요.",
          "lines": [
            "print(\"cat\")",
            "print(\"dog)",
            "print(\"bird\")"
          ],
          "buggy": 1,
          "fixed": "print(\"dog\")",
          "hint": "여는 따옴표와 닫는 따옴표를 확인하세요.",
          "explain": "dog 앞에는 따옴표가 있는데 뒤에는 빠져 있어요."
        },
        {
          "id": "string-bridge-w",
          "type": "write",
          "prompt": "직접 작성: 문자열 Python을 출력하세요.",
          "starter": "# Python을 출력하세요\n",
          "expected": "Python",
          "testcase": "기대 출력: Python",
          "hint": "P는 대문자여야 해요.",
          "explain": "문자열은 대소문자까지 그대로 비교돼요.",
          "model": "print(\"Python\")"
        }
      ]
    },
    {
      "slug": "quote-gate",
      "title": "따옴표 문",
      "short": "따옴표",
      "focus": [
        "따옴표",
        "quotes"
      ],
      "description": "문자열은 시작과 끝 따옴표가 짝이 맞아야 해요.",
      "output": "츄르",
      "exercises": [
        {
          "id": "quote-gate-c",
          "type": "concept",
          "title": "따옴표 짝 맞추기",
          "body": "문자열을 시작한 따옴표는 반드시 같은 방향으로 닫아야 해요.",
          "code": "print(\"츄르\")",
          "hint": "따옴표, 괄호 순서로 짝을 확인하세요."
        },
        {
          "id": "quote-gate-p1",
          "type": "predict",
          "prompt": "아래 코드는 어떻게 될까요?",
          "code": "print(\"milk)",
          "choices": [
            "milk 출력",
            "에러",
            "아무것도 안 함",
            "True 출력"
          ],
          "answer": 1,
          "output": "SyntaxError",
          "hint": "닫는 따옴표가 없어요.",
          "explain": "문자열이 끝나지 않아서 문법 오류가 나요."
        },
        {
          "id": "quote-gate-p2",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "print('cat')",
          "choices": [
            "cat",
            "'cat'",
            "에러",
            "CAT"
          ],
          "answer": 0,
          "output": "cat",
          "hint": "작은따옴표도 문자열을 만들 수 있어요.",
          "explain": "작은따옴표로 감싼 문자열도 출력될 때 따옴표는 사라져요."
        },
        {
          "id": "quote-gate-f",
          "type": "fill",
          "prompt": "빈칸에 들어갈 명령어를 고르세요.",
          "code": "____('츄르')",
          "tokens": [
            "print",
            "else",
            "append",
            "score"
          ],
          "answer": "print",
          "hint": "문자열을 화면에 보여줘야 해요.",
          "explain": "print('츄르')가 되어야 해요."
        },
        {
          "id": "quote-gate-b",
          "type": "bughunt",
          "prompt": "따옴표 짝이 깨진 줄은?",
          "lines": [
            "print('red')",
            "print(\"green\")",
            "print('blue\")"
          ],
          "buggy": 2,
          "fixed": "print('blue')",
          "hint": "시작 따옴표와 끝 따옴표의 종류를 맞추세요.",
          "explain": "작은따옴표로 시작했으면 작은따옴표로 닫는 편이 안전해요."
        },
        {
          "id": "quote-gate-w",
          "type": "write",
          "prompt": "직접 작성: milk를 출력하세요.",
          "starter": "# milk를 출력하세요\n",
          "expected": "milk",
          "testcase": "기대 출력: milk",
          "hint": "작은따옴표나 큰따옴표 모두 가능해요.",
          "explain": "출력만 정확하면 통과예요.",
          "model": "print(\"milk\")"
        }
      ]
    },
    {
      "slug": "number-pond",
      "title": "숫자 연못",
      "short": "숫자",
      "focus": [
        "숫자",
        "number"
      ],
      "description": "숫자는 따옴표 없이 쓰면 계산할 수 있어요.",
      "output": "7",
      "exercises": [
        {
          "id": "number-pond-c",
          "type": "concept",
          "title": "숫자 계산",
          "body": "숫자는 문자열과 달라요. 따옴표 없이 쓰면 파이썬이 계산해요.",
          "code": "print(3 + 4)",
          "hint": "따옴표가 없으므로 3 + 4가 계산돼요."
        },
        {
          "id": "number-pond-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "print(3 + 4)",
          "choices": [
            "7",
            "3 + 4",
            "34",
            "에러"
          ],
          "answer": 0,
          "output": "7",
          "hint": "따옴표가 없으면 계산해요.",
          "explain": "3 + 4는 7로 계산된 뒤 출력돼요."
        },
        {
          "id": "number-pond-p2",
          "type": "predict",
          "prompt": "문자열 숫자를 더하면 어떻게 될까요?",
          "code": "print(\"3\" + \"4\")",
          "choices": [
            "34",
            "7",
            "3 4",
            "에러"
          ],
          "answer": 0,
          "output": "34",
          "hint": "따옴표가 있으면 숫자가 아니라 글자예요.",
          "explain": "문자열끼리 + 하면 이어 붙여져요."
        },
        {
          "id": "number-pond-f",
          "type": "fill",
          "prompt": "8과 5를 더해 13을 만들 연산자를 고르세요.",
          "code": "print(8 ____ 5)",
          "tokens": [
            "+",
            "-",
            "*",
            "/"
          ],
          "answer": "+",
          "hint": "더하기 연산자를 고르세요.",
          "explain": "8 + 5는 13이에요."
        },
        {
          "id": "number-pond-b",
          "type": "bughunt",
          "prompt": "계산식이 아니라 문자열이 되어버린 줄은?",
          "lines": [
            "print(2 + 3)",
            "print(\"2 + 3\")",
            "print(10 - 4)"
          ],
          "buggy": 1,
          "fixed": "print(2 + 3)",
          "hint": "따옴표가 있으면 계산하지 않아요.",
          "explain": "두 번째 줄은 2 + 3을 글자로 출력해요."
        },
        {
          "id": "number-pond-w",
          "type": "write",
          "prompt": "직접 작성: 계산으로 13을 출력하세요.",
          "starter": "# 계산식을 써서 13을 출력하세요\n",
          "expected": "13",
          "testcase": "기대 출력: 13",
          "hint": "print(8 + 5)처럼 계산식을 넣으세요.",
          "explain": "출력 결과가 13이면 통과예요.",
          "model": "print(8 + 5)"
        }
      ]
    },
    {
      "slug": "math-stone",
      "title": "계산 돌길",
      "short": "계산",
      "focus": [
        "계산",
        "math"
      ],
      "description": "연산자와 괄호로 계산 순서를 조절해요.",
      "output": "14",
      "exercises": [
        {
          "id": "math-stone-c",
          "type": "concept",
          "title": "계산 순서",
          "body": "곱셈은 덧셈보다 먼저 계산돼요. 괄호를 쓰면 순서를 바꿀 수 있어요.",
          "code": "print(2 + 3 * 4)",
          "hint": "3 * 4가 먼저 계산돼요."
        },
        {
          "id": "math-stone-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "print(2 + 3 * 4)",
          "choices": [
            "14",
            "20",
            "24",
            "에러"
          ],
          "answer": 0,
          "output": "14",
          "hint": "곱셈을 먼저 계산하세요.",
          "explain": "3 * 4 = 12, 2 + 12 = 14예요."
        },
        {
          "id": "math-stone-p2",
          "type": "predict",
          "prompt": "괄호가 있으면 결과는?",
          "code": "print((2 + 3) * 4)",
          "choices": [
            "20",
            "14",
            "9",
            "에러"
          ],
          "answer": 0,
          "output": "20",
          "hint": "괄호 안을 먼저 계산해요.",
          "explain": "2 + 3 = 5, 5 * 4 = 20이에요."
        },
        {
          "id": "math-stone-f",
          "type": "fill",
          "prompt": "12를 만들려면 빈칸에 어떤 연산자가 들어가야 할까요?",
          "code": "print(6 ____ 2)",
          "tokens": [
            "*",
            "+",
            "-",
            "/"
          ],
          "answer": "*",
          "hint": "6과 2로 12를 만들 연산자를 고르세요.",
          "explain": "6 * 2는 12예요."
        },
        {
          "id": "math-stone-b",
          "type": "bughunt",
          "prompt": "예상과 다르게 14가 나오는 줄은?",
          "lines": [
            "print((2 + 3) * 4)",
            "print(2 + 3 * 4)",
            "print(10 + 10)"
          ],
          "buggy": 1,
          "fixed": "print((2 + 3) * 4)",
          "hint": "괄호가 없으면 곱셈이 먼저예요.",
          "explain": "두 번째 줄은 20이 아니라 14를 출력해요."
        },
        {
          "id": "math-stone-w",
          "type": "write",
          "prompt": "직접 작성: 괄호를 사용해 21을 출력하세요.",
          "starter": "# 괄호를 사용해서 21을 출력하세요\n",
          "expected": "21",
          "testcase": "기대 출력: 21",
          "hint": "예: (4 + 3) * 3",
          "explain": "괄호로 먼저 계산할 부분을 묶어보세요.",
          "model": "print((4 + 3) * 3)"
        }
      ]
    },
    {
      "slug": "variable-pond",
      "title": "변수 연못",
      "short": "변수",
      "focus": [
        "변수",
        "variable"
      ],
      "description": "변수는 값을 담아두는 이름표예요.",
      "output": "코드냥",
      "exercises": [
        {
          "id": "variable-pond-c",
          "type": "concept",
          "title": "변수 만들기",
          "body": "변수는 값을 저장하는 이름이에요. 이름을 다시 부르면 저장된 값이 나와요.",
          "code": "name = \"코드냥\"\nprint(name)",
          "hint": "변수 이름에는 따옴표를 붙이지 않아요."
        },
        {
          "id": "variable-pond-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "name = \"코드냥\"\nprint(name)",
          "choices": [
            "코드냥",
            "name",
            "\"코드냥\"",
            "에러"
          ],
          "answer": 0,
          "output": "코드냥",
          "hint": "print(name)은 변수 안의 값을 출력해요.",
          "explain": "name에 저장된 문자열 코드냥이 출력돼요."
        },
        {
          "id": "variable-pond-p2",
          "type": "predict",
          "prompt": "아래 코드의 출력은?",
          "code": "city = \"Seoul\"\nprint(city)",
          "choices": [
            "Seoul",
            "city",
            "서울",
            "에러"
          ],
          "answer": 0,
          "output": "Seoul",
          "hint": "변수 이름이 아니라 안에 담긴 값을 보세요.",
          "explain": "city 변수에는 Seoul이 저장되어 있어요."
        },
        {
          "id": "variable-pond-f",
          "type": "fill",
          "prompt": "빈칸에 들어갈 변수 이름은?",
          "code": "pet = \"cat\"\nprint(____)",
          "tokens": [
            "pet",
            "cat",
            "print",
            "name"
          ],
          "answer": "pet",
          "hint": "변수 이름을 그대로 써야 해요.",
          "explain": "print(pet)이 되어야 cat이 출력돼요."
        },
        {
          "id": "variable-pond-b",
          "type": "bughunt",
          "prompt": "변수를 잘못 부른 줄은?",
          "lines": [
            "cat_name = \"Mimi\"",
            "print(catName)"
          ],
          "buggy": 1,
          "fixed": "print(cat_name)",
          "hint": "변수 이름은 철자와 밑줄까지 같아야 해요.",
          "explain": "catName과 cat_name은 다른 이름이에요."
        },
        {
          "id": "variable-pond-w",
          "type": "write",
          "prompt": "직접 작성: pet 변수에 고양이를 저장하고 출력하세요.",
          "starter": "# pet 변수에 고양이를 저장하고 출력하세요\n",
          "expected": "고양이",
          "testcase": "기대 출력: 고양이",
          "hint": "변수 저장 후 print(pet)을 사용하세요.",
          "explain": "변수에 값을 담고 다시 불러오는 연습이에요.",
          "model": "pet = \"고양이\"\nprint(pet)"
        }
      ]
    },
    {
      "slug": "value-swap",
      "title": "값 바꾸기 숲",
      "short": "업데이트",
      "focus": [
        "업데이트",
        "update"
      ],
      "description": "변수는 나중에 넣은 값으로 업데이트돼요.",
      "output": "3",
      "exercises": [
        {
          "id": "value-swap-c",
          "type": "concept",
          "title": "마지막 값 보기",
          "body": "같은 변수에 새 값을 넣으면 이전 값은 바뀌어요.",
          "code": "level = 1\nlevel = 3\nprint(level)",
          "hint": "마지막으로 저장한 값을 확인하세요."
        },
        {
          "id": "value-swap-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "level = 1\nlevel = 3\nprint(level)",
          "choices": [
            "3",
            "1",
            "4",
            "에러"
          ],
          "answer": 0,
          "output": "3",
          "hint": "같은 변수에 두 번 저장했어요.",
          "explain": "level의 마지막 값은 3이에요."
        },
        {
          "id": "value-swap-p2",
          "type": "predict",
          "prompt": "아래 코드의 출력은?",
          "code": "score = 10\nscore = score + 5\nprint(score)",
          "choices": [
            "15",
            "10",
            "5",
            "score"
          ],
          "answer": 0,
          "output": "15",
          "hint": "오른쪽의 score는 기존 값이에요.",
          "explain": "기존 10에 5를 더해 다시 score에 저장해요."
        },
        {
          "id": "value-swap-f",
          "type": "fill",
          "prompt": "score를 12로 만들려면 빈칸에 무엇이 들어갈까요?",
          "code": "score = 10\nscore = score + ____\nprint(score)",
          "tokens": [
            "2",
            "10",
            "12",
            "score"
          ],
          "answer": "2",
          "hint": "10에 무엇을 더해야 12가 될까요?",
          "explain": "score + 2가 되어야 12가 출력돼요."
        },
        {
          "id": "value-swap-b",
          "type": "bughunt",
          "prompt": "업데이트가 아니라 문자열을 만든 줄은?",
          "lines": [
            "score = 10",
            "score = \"score + 5\"",
            "print(score)"
          ],
          "buggy": 1,
          "fixed": "score = score + 5",
          "hint": "따옴표 안은 계산되지 않아요.",
          "explain": "두 번째 줄은 계산식이 아니라 글자를 저장해요."
        },
        {
          "id": "value-swap-w",
          "type": "write",
          "prompt": "직접 작성: count를 1에서 시작해 4로 바꾼 뒤 출력하세요.",
          "starter": "# count를 1에서 4로 업데이트하세요\n",
          "expected": "4",
          "testcase": "기대 출력: 4",
          "hint": "count = count + 3을 써도 돼요.",
          "explain": "변수 업데이트 연습이에요.",
          "model": "count = 1\ncount = count + 3\nprint(count)"
        }
      ]
    },
    {
      "slug": "name-rules",
      "title": "이름표 오솔길",
      "short": "변수명",
      "focus": [
        "변수명",
        "naming"
      ],
      "description": "변수 이름은 읽기 쉽고 일관되게 써야 해요.",
      "output": "3",
      "exercises": [
        {
          "id": "name-rules-c",
          "type": "concept",
          "title": "좋은 이름 만들기",
          "body": "cat_age처럼 의미가 보이는 이름을 쓰면 나중에 코드를 읽기 쉬워요.",
          "code": "cat_age = 3\nprint(cat_age)",
          "hint": "변수 이름은 만든 철자 그대로 불러야 해요."
        },
        {
          "id": "name-rules-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "cat_age = 3\nprint(cat_age)",
          "choices": [
            "3",
            "cat_age",
            "cat age",
            "에러"
          ],
          "answer": 0,
          "output": "3",
          "hint": "변수 안의 값을 출력해요.",
          "explain": "cat_age에는 숫자 3이 저장되어 있어요."
        },
        {
          "id": "name-rules-p2",
          "type": "predict",
          "prompt": "아래 코드는 어떻게 될까요?",
          "code": "cat_age = 3\nprint(catage)",
          "choices": [
            "에러",
            "3",
            "catage",
            "None"
          ],
          "answer": 0,
          "output": "NameError",
          "hint": "cat_age와 catage는 달라요.",
          "explain": "변수 이름을 다르게 부르면 찾을 수 없어요."
        },
        {
          "id": "name-rules-f",
          "type": "fill",
          "prompt": "빈칸에 들어갈 올바른 변수 이름은?",
          "code": "user_name = \"Amy\"\nprint(____)",
          "tokens": [
            "user_name",
            "username",
            "user",
            "name"
          ],
          "answer": "user_name",
          "hint": "밑줄까지 정확해야 해요.",
          "explain": "변수 이름은 user_name이에요."
        },
        {
          "id": "name-rules-b",
          "type": "bughunt",
          "prompt": "변수 이름이 일치하지 않는 줄은?",
          "lines": [
            "favorite_food = \"pizza\"",
            "print(favoriteFood)"
          ],
          "buggy": 1,
          "fixed": "print(favorite_food)",
          "hint": "대소문자와 밑줄을 확인하세요.",
          "explain": "favoriteFood와 favorite_food는 다른 이름이에요."
        },
        {
          "id": "name-rules-w",
          "type": "write",
          "prompt": "직접 작성: cat_level 변수에 5를 저장하고 출력하세요.",
          "starter": "# cat_level 변수에 5를 저장하고 출력하세요\n",
          "expected": "5",
          "testcase": "기대 출력: 5",
          "hint": "변수 이름을 정확히 다시 불러야 해요.",
          "explain": "이름 규칙과 출력 연습을 함께 해요.",
          "model": "cat_level = 5\nprint(cat_level)"
        }
      ]
    },
    {
      "slug": "concat-bridge",
      "title": "연결 다리",
      "short": "연결",
      "focus": [
        "연결",
        "concat"
      ],
      "description": "문자열은 + 로 이어 붙일 수 있고, 공백도 직접 넣어야 해요.",
      "output": "Hi Amy",
      "exercises": [
        {
          "id": "concat-bridge-c",
          "type": "concept",
          "title": "문자열 연결",
          "body": "문자열끼리 +를 쓰면 이어 붙어요. 필요한 공백도 문자열로 넣어야 해요.",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "hint": "Hi 뒤의 공백도 문자열 안에 들어 있어요."
        },
        {
          "id": "concat-bridge-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "choices": [
            "Hi Amy",
            "HiAmy",
            "Amy Hi",
            "에러"
          ],
          "answer": 0,
          "output": "Hi Amy",
          "hint": "따옴표 안 공백을 확인하세요.",
          "explain": "\"Hi \" 뒤에 name 값이 붙어요."
        },
        {
          "id": "concat-bridge-p2",
          "type": "predict",
          "prompt": "공백이 없으면 어떻게 출력될까요?",
          "code": "print(\"Code\" + \"Nyang\")",
          "choices": [
            "CodeNyang",
            "Code Nyang",
            "Code+Nyang",
            "에러"
          ],
          "answer": 0,
          "output": "CodeNyang",
          "hint": "문자열 사이에 자동 공백은 생기지 않아요.",
          "explain": "공백을 넣고 싶으면 \" \"를 직접 넣어야 해요."
        },
        {
          "id": "concat-bridge-f",
          "type": "fill",
          "prompt": "빈칸에 들어갈 변수 이름은?",
          "code": "first = \"Code\"\nsecond = \"Nyang\"\nprint(first + ____) ",
          "tokens": [
            "second",
            "first",
            "Code",
            "print"
          ],
          "answer": "second",
          "hint": "두 번째 문자열 변수를 이어 붙여야 해요.",
          "explain": "first + second가 되어야 CodeNyang이 출력돼요."
        },
        {
          "id": "concat-bridge-b",
          "type": "bughunt",
          "prompt": "문자열과 숫자를 바로 더해서 문제인 줄은?",
          "lines": [
            "level = 3",
            "print(\"Lv.\" + level)"
          ],
          "buggy": 1,
          "fixed": "print(\"Lv.\" + str(level))",
          "hint": "문자열과 숫자는 바로 + 할 수 없어요.",
          "explain": "숫자를 문자열로 바꾸려면 str(level)을 써요."
        },
        {
          "id": "concat-bridge-w",
          "type": "write",
          "prompt": "직접 작성: name 변수로 Hello Jieun을 출력하세요.",
          "starter": "# name 변수를 사용해 Hello Jieun을 출력하세요\n",
          "expected": "Hello Jieun",
          "testcase": "기대 출력: Hello Jieun",
          "hint": "name = \"Jieun\"을 만든 뒤 연결하세요.",
          "explain": "공백 포함 출력이 정확해야 해요.",
          "model": "name = \"Jieun\"\nprint(\"Hello \" + name)"
        }
      ]
    },
    {
      "slug": "input-window",
      "title": "입력 창가",
      "short": "입력",
      "focus": [
        "입력",
        "input"
      ],
      "description": "input()은 사용자의 답을 받아 변수에 저장하는 명령이에요.",
      "output": "Hi Amy",
      "exercises": [
        {
          "id": "input-window-c",
          "type": "concept",
          "title": "입력값 저장하기",
          "body": "input()은 사용자가 입력한 글자를 문자열로 받아요. 지금 앱에서는 실제 입력창 대신 예시 값을 변수에 넣어 연습해요.",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "hint": "input()으로 받은 값도 변수처럼 사용할 수 있어요."
        },
        {
          "id": "input-window-p1",
          "type": "predict",
          "prompt": "변수 name에 Amy가 들어있을 때 출력은?",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "choices": [
            "Hi Amy",
            "Hi name",
            "Amy Hi",
            "에러"
          ],
          "answer": 0,
          "output": "Hi Amy",
          "hint": "문자열 \"Hi \"와 변수 name의 값을 이어 붙여요.",
          "explain": "name 안의 Amy가 문자열 뒤에 붙어서 Hi Amy가 출력돼요."
        },
        {
          "id": "input-window-p2",
          "type": "predict",
          "prompt": "문자열과 변수 사이 공백은 어디에서 올까요?",
          "code": "name = \"Jieun\"\nprint(\"Hello\" + name)",
          "choices": [
            "HelloJieun",
            "Hello Jieun",
            "Hello name",
            "에러"
          ],
          "answer": 0,
          "output": "HelloJieun",
          "hint": "문자열 안에 공백이 없으면 자동으로 생기지 않아요.",
          "explain": "\"Hello\" 뒤에 공백이 없어서 바로 붙어요."
        },
        {
          "id": "input-window-f",
          "type": "fill",
          "prompt": "Hi Jieun을 출력하려면 빈칸에 어떤 변수 이름이 들어가야 할까요?",
          "code": "name = \"Jieun\"\nprint(\"Hi \" + ____)",
          "tokens": [
            "name",
            "\"name\"",
            "Jieun",
            "input"
          ],
          "answer": "name",
          "hint": "변수 안의 값을 쓰려면 따옴표 없이 변수 이름을 써요.",
          "explain": "print(\"Hi \" + name)이 되어야 변수값 Jieun이 붙어요."
        },
        {
          "id": "input-window-b",
          "type": "bughunt",
          "prompt": "사용자 이름을 붙이려는데 잘못된 줄을 고르세요.",
          "lines": [
            "name = \"Amy\"",
            "print(\"Hi \" + \"name\")"
          ],
          "buggy": 1,
          "fixed": "print(\"Hi \" + name)",
          "hint": "따옴표 안의 name은 변수 이름이 아니라 글자 name이에요.",
          "explain": "변수값을 쓰려면 name을 따옴표 없이 써야 해요."
        },
        {
          "id": "input-window-w",
          "type": "write",
          "prompt": "직접 작성: 변수 user에 Jieun을 넣고 Welcome Jieun을 출력하세요.",
          "starter": "# user 변수를 만들고 출력하세요\n",
          "expected": "Welcome Jieun",
          "testcase": "기대 출력: Welcome Jieun",
          "hint": "문자열 \"Welcome \" 뒤에 user를 붙이세요.",
          "explain": "변수 만들기와 문자열 연결을 함께 쓰는 문제예요.",
          "model": "user = \"Jieun\"\nprint(\"Welcome \" + user)"
        }
      ]
    },
    {
      "slug": "debug-missing-quote",
      "title": "따옴표 버그",
      "short": "디버깅",
      "focus": [
        "디버깅",
        "debug"
      ],
      "description": "SyntaxError가 나는 이유를 따옴표와 괄호 관점에서 찾는 연습이에요.",
      "output": "버그 수정",
      "exercises": [
        {
          "id": "debug-missing-quote-c",
          "type": "concept",
          "title": "문법 오류 읽기",
          "body": "파이썬은 따옴표, 괄호, 콜론처럼 짝이 필요한 기호가 빠지면 실행 전에 멈춰요.",
          "code": "print(\"버그 수정\")",
          "hint": "오류가 나면 코드가 틀렸다는 뜻이 아니라 고칠 단서가 생긴 거예요."
        },
        {
          "id": "debug-missing-quote-p1",
          "type": "predict",
          "prompt": "아래 코드는 어떻게 될까요?",
          "code": "print(\"hello)",
          "choices": [
            "hello 출력",
            "SyntaxError",
            "True 출력",
            "아무것도 안 함"
          ],
          "answer": 1,
          "output": "SyntaxError",
          "hint": "문자열이 시작됐지만 닫히지 않았어요.",
          "explain": "닫는 따옴표가 없어서 실행 전에 문법 오류가 나요."
        },
        {
          "id": "debug-missing-quote-p2",
          "type": "predict",
          "prompt": "아래 코드는 어떤 문제가 있을까요?",
          "code": "print(\"hello\"",
          "choices": [
            "닫는 괄호가 없음",
            "닫는 따옴표가 없음",
            "변수명이 틀림",
            "정상 실행"
          ],
          "answer": 0,
          "output": "SyntaxError",
          "hint": "따옴표는 닫혔지만 괄호를 확인하세요.",
          "explain": "print( 로 연 괄호가 닫히지 않았어요."
        },
        {
          "id": "debug-missing-quote-f",
          "type": "fill",
          "prompt": "코드를 정상 실행하려면 빈칸에 무엇이 들어가야 할까요?",
          "code": "print(\"debug\"____",
          "tokens": [
            ")",
            "\"",
            ":",
            "("
          ],
          "answer": ")",
          "hint": "print( 로 연 괄호를 닫아야 해요.",
          "explain": "print(\"debug\")가 되어야 해요."
        },
        {
          "id": "debug-missing-quote-b",
          "type": "bughunt",
          "prompt": "문자열 따옴표가 깨진 줄을 고르세요.",
          "lines": [
            "print(\"ready\")",
            "print(\"go)",
            "print(\"done\")"
          ],
          "buggy": 1,
          "fixed": "print(\"go\")",
          "hint": "go 뒤에 닫는 따옴표가 있는지 보세요.",
          "explain": "두 번째 줄은 문자열이 끝나지 않았어요."
        },
        {
          "id": "debug-missing-quote-w",
          "type": "write",
          "prompt": "직접 작성: 따옴표와 괄호를 정확히 닫아 fixed를 출력하세요.",
          "starter": "# fixed를 출력하세요\n",
          "expected": "fixed",
          "testcase": "기대 출력: fixed",
          "hint": "print(\"fixed\") 형태를 떠올리세요.",
          "explain": "기호의 짝을 정확히 닫는 연습이에요.",
          "model": "print(\"fixed\")"
        }
      ]
    },
    {
      "slug": "debug-typo",
      "title": "오타 탐정길",
      "short": "오타",
      "focus": [
        "오타",
        "typo"
      ],
      "description": "변수명과 명령어의 철자, 대소문자, 밑줄을 구분해요.",
      "output": "OK",
      "exercises": [
        {
          "id": "debug-typo-c",
          "type": "concept",
          "title": "이름은 정확해야 해요",
          "body": "파이썬은 cat_name과 catName을 다른 이름으로 봐요. 대소문자와 밑줄까지 정확히 맞아야 해요.",
          "code": "cat_name = \"Mimi\"\nprint(cat_name)",
          "hint": "사람 눈에는 비슷해도 컴퓨터는 정확히 구분해요."
        },
        {
          "id": "debug-typo-p1",
          "type": "predict",
          "prompt": "아래 코드는 어떻게 될까요?",
          "code": "score = 10\nprint(scroe)",
          "choices": [
            "10 출력",
            "NameError",
            "scroe 출력",
            "아무것도 안 함"
          ],
          "answer": 1,
          "output": "NameError",
          "hint": "score와 scroe의 철자가 달라요.",
          "explain": "만든 적 없는 scroe를 출력하려 해서 이름 오류가 나요."
        },
        {
          "id": "debug-typo-p2",
          "type": "predict",
          "prompt": "아래 코드의 출력은?",
          "code": "Score = 7\nprint(Score)",
          "choices": [
            "7",
            "Score",
            "score",
            "NameError"
          ],
          "answer": 0,
          "output": "7",
          "hint": "만든 이름과 부른 이름이 정확히 같아요.",
          "explain": "Score라는 변수에 7이 저장되어 있어요."
        },
        {
          "id": "debug-typo-f",
          "type": "fill",
          "prompt": "OK를 출력하려면 빈칸에 어떤 이름을 넣어야 할까요?",
          "code": "message = \"OK\"\nprint(____)",
          "tokens": [
            "message",
            "massage",
            "\"message\"",
            "print"
          ],
          "answer": "message",
          "hint": "변수 이름은 만든 그대로 써야 해요.",
          "explain": "message 안에 OK가 들어 있어요."
        },
        {
          "id": "debug-typo-b",
          "type": "bughunt",
          "prompt": "오타 때문에 실행되지 않는 줄을 고르세요.",
          "lines": [
            "result = \"DONE\"",
            "print(reslut)"
          ],
          "buggy": 1,
          "fixed": "print(result)",
          "hint": "result와 reslut의 글자 순서를 비교하세요.",
          "explain": "변수명을 잘못 불렀어요."
        },
        {
          "id": "debug-typo-w",
          "type": "write",
          "prompt": "직접 작성: 변수 answer에 DONE을 넣고 출력하세요.",
          "starter": "# answer 변수를 만들고 출력하세요\n",
          "expected": "DONE",
          "testcase": "기대 출력: DONE",
          "hint": "answer = \"DONE\" 다음 print(answer)를 쓰세요.",
          "explain": "변수명 오타 없이 다시 부르는 연습이에요.",
          "model": "answer = \"DONE\"\nprint(answer)"
        }
      ]
    },
    {
      "slug": "compare-gate",
      "title": "비교의 문",
      "short": "비교",
      "focus": [
        "비교",
        "compare"
      ],
      "description": "비교식은 값을 비교해서 True 또는 False를 만들어요.",
      "output": "True",
      "exercises": [
        {
          "id": "compare-gate-c",
          "type": "concept",
          "title": "비교 연산자",
          "body": ">, <, ==, != 는 질문을 만드는 기호예요. 결과는 항상 True 또는 False예요.",
          "code": "print(5 > 2)\nprint(5 == 2)",
          "hint": "==는 같다를 묻는 비교 연산자예요."
        },
        {
          "id": "compare-gate-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "print(5 > 2)",
          "choices": [
            "True",
            "False",
            "5 > 2",
            "에러"
          ],
          "answer": 0,
          "output": "True",
          "hint": "5는 2보다 커요.",
          "explain": "비교 결과가 참이라서 True가 출력돼요."
        },
        {
          "id": "compare-gate-p2",
          "type": "predict",
          "prompt": "같지 않음을 묻는 비교식의 결과는?",
          "code": "print(3 != 3)",
          "choices": [
            "False",
            "True",
            "3",
            "에러"
          ],
          "answer": 0,
          "output": "False",
          "hint": "!= 는 서로 다르냐고 묻는 기호예요.",
          "explain": "3과 3은 같으므로 '다르다'는 말은 False예요."
        },
        {
          "id": "compare-gate-f",
          "type": "fill",
          "prompt": "True를 만들려면 빈칸에 어떤 비교 연산자가 들어가야 할까요?",
          "code": "print(10 ____ 4)",
          "tokens": [
            ">",
            "<",
            "==",
            "!="
          ],
          "answer": ">",
          "hint": "10은 4보다 커요.",
          "explain": "10 > 4는 True예요."
        },
        {
          "id": "compare-gate-b",
          "type": "bughunt",
          "prompt": "값을 넣는 코드라서 비교가 아닌 줄을 고르세요.",
          "lines": [
            "print(5 == 5)",
            "print(5 = 5)",
            "print(5 != 3)"
          ],
          "buggy": 1,
          "fixed": "print(5 == 5)",
          "hint": "비교할 때는 = 하나가 아니라 == 두 개를 써요.",
          "explain": "=는 대입에 쓰이고, 비교에는 ==를 써요."
        },
        {
          "id": "compare-gate-w",
          "type": "write",
          "prompt": "직접 작성: 비교식으로 True를 출력하세요.",
          "starter": "# 비교식을 사용해 True를 출력하세요\n",
          "expected": "True",
          "testcase": "기대 출력: True",
          "hint": "예: print(9 > 3)",
          "explain": "결과가 True인 비교식을 만들면 돼요.",
          "model": "print(9 > 3)"
        }
      ]
    },
    {
      "slug": "if-gate",
      "title": "if 입구",
      "short": "if",
      "focus": [
        "if",
        "if"
      ],
      "description": "if는 조건이 참일 때만 들여쓴 코드를 실행해요.",
      "output": "통과",
      "exercises": [
        {
          "id": "if-gate-c",
          "type": "concept",
          "title": "조건이 문을 열어요",
          "body": "if 다음 조건이 True이면 들여쓴 줄이 실행돼요. False이면 그냥 지나가요.",
          "code": "score = 90\nif score >= 80:\n    print(\"통과\")",
          "hint": "콜론과 들여쓰기가 함께 필요해요."
        },
        {
          "id": "if-gate-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "score = 90\nif score >= 80:\n    print(\"통과\")",
          "choices": [
            "통과",
            "아무것도 출력하지 않음",
            "False",
            "에러"
          ],
          "answer": 0,
          "output": "통과",
          "hint": "90 >= 80은 True예요.",
          "explain": "조건이 참이라서 들여쓴 print가 실행돼요."
        },
        {
          "id": "if-gate-p2",
          "type": "predict",
          "prompt": "조건이 False면 어떻게 될까요?",
          "code": "score = 50\nif score >= 80:\n    print(\"통과\")",
          "choices": [
            "아무것도 출력하지 않음",
            "통과",
            "50",
            "에러"
          ],
          "answer": 0,
          "output": "",
          "hint": "else가 없으면 대신 실행할 코드가 없어요.",
          "explain": "조건이 거짓이고 else도 없어서 출력이 없어요."
        },
        {
          "id": "if-gate-f",
          "type": "fill",
          "prompt": "조건문을 만들려면 빈칸에 어떤 키워드가 들어갈까요?",
          "code": "____ score >= 80:\n    print(\"통과\")",
          "tokens": [
            "if",
            "for",
            "else",
            "print"
          ],
          "answer": "if",
          "hint": "조건이 참인지 확인하는 키워드예요.",
          "explain": "if score >= 80: 형태가 되어야 해요."
        },
        {
          "id": "if-gate-b",
          "type": "bughunt",
          "prompt": "if 문법에서 빠진 기호가 있는 줄을 고르세요.",
          "lines": [
            "score = 90",
            "if score >= 80",
            "    print(\"통과\")"
          ],
          "buggy": 1,
          "fixed": "if score >= 80:",
          "hint": "if 조건 끝에는 콜론이 필요해요.",
          "explain": "조건문 줄 끝에 : 이 빠졌어요."
        },
        {
          "id": "if-gate-w",
          "type": "write",
          "prompt": "직접 작성: level이 3 이상이면 입장을 출력하세요.",
          "starter": "level = 4\n# 조건문을 완성하세요\n",
          "expected": "입장",
          "testcase": "기대 출력: 입장",
          "hint": "if level >= 3: 다음 줄을 들여써요.",
          "explain": "조건, 콜론, 들여쓰기를 모두 맞춰야 해요.",
          "model": "level = 4\nif level >= 3:\n    print(\"입장\")"
        }
      ]
    },
    {
      "slug": "else-cabin",
      "title": "else 오두막",
      "short": "else",
      "focus": [
        "else",
        "else"
      ],
      "description": "else는 if 조건이 거짓일 때 실행되는 다른 길이에요.",
      "output": "다시",
      "exercises": [
        {
          "id": "else-cabin-c",
          "type": "concept",
          "title": "두 갈래 길",
          "body": "if가 True이면 if 블록이, False이면 else 블록이 실행돼요. 둘 중 하나만 실행돼요.",
          "code": "score = 50\nif score >= 80:\n    print(\"통과\")\nelse:\n    print(\"다시\")",
          "hint": "else에는 조건을 쓰지 않아요."
        },
        {
          "id": "else-cabin-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "score = 50\nif score >= 80:\n    print(\"통과\")\nelse:\n    print(\"다시\")",
          "choices": [
            "다시",
            "통과",
            "둘 다 출력",
            "에러"
          ],
          "answer": 0,
          "output": "다시",
          "hint": "50 >= 80은 False예요.",
          "explain": "if가 거짓이므로 else 블록이 실행돼요."
        },
        {
          "id": "else-cabin-p2",
          "type": "predict",
          "prompt": "score가 90이면 출력은?",
          "code": "score = 90\nif score >= 80:\n    print(\"통과\")\nelse:\n    print(\"다시\")",
          "choices": [
            "통과",
            "다시",
            "둘 다 출력",
            "아무것도 없음"
          ],
          "answer": 0,
          "output": "통과",
          "hint": "조건이 참이면 else는 건너뛰어요.",
          "explain": "if 블록만 실행되고 else는 실행되지 않아요."
        },
        {
          "id": "else-cabin-f",
          "type": "fill",
          "prompt": "if가 거짓일 때 실행할 블록을 만들려면?",
          "code": "score = 40\nif score >= 80:\n    print(\"통과\")\n____:\n    print(\"다시\")",
          "tokens": [
            "else",
            "elif",
            "if",
            "for"
          ],
          "answer": "else",
          "hint": "남은 경우를 처리하는 키워드예요.",
          "explain": "else: 가 되어야 해요."
        },
        {
          "id": "else-cabin-b",
          "type": "bughunt",
          "prompt": "else 문법이 잘못된 줄을 고르세요.",
          "lines": [
            "if score >= 80:",
            "    print(\"통과\")",
            "else score < 80:",
            "    print(\"다시\")"
          ],
          "buggy": 2,
          "fixed": "else:",
          "hint": "else 뒤에는 조건을 쓰지 않아요.",
          "explain": "조건을 추가로 쓰려면 elif를 써야 해요."
        },
        {
          "id": "else-cabin-w",
          "type": "write",
          "prompt": "직접 작성: age가 13 이상이면 OK, 아니면 WAIT를 출력하세요.",
          "starter": "age = 10\n# if/else를 완성하세요\n",
          "expected": "WAIT",
          "testcase": "기대 출력: WAIT",
          "hint": "False일 때 else에서 WAIT를 출력해야 해요.",
          "explain": "두 갈래 조건문을 직접 만드는 연습이에요.",
          "model": "age = 10\nif age >= 13:\n    print(\"OK\")\nelse:\n    print(\"WAIT\")"
        }
      ]
    },
    {
      "slug": "elif-mushroom",
      "title": "elif 버섯",
      "short": "elif",
      "focus": [
        "elif",
        "elif"
      ],
      "description": "elif는 위 조건이 틀렸을 때 다음 조건을 확인해요.",
      "output": "선선",
      "exercises": [
        {
          "id": "elif-mushroom-c",
          "type": "concept",
          "title": "여러 갈래 조건",
          "body": "if, elif, else는 위에서 아래로 검사하고, 처음 True가 되는 블록 하나만 실행해요.",
          "code": "temp = 20\nif temp > 25:\n    print(\"더움\")\nelif temp > 10:\n    print(\"선선\")\nelse:\n    print(\"추움\")",
          "hint": "순서가 중요해요."
        },
        {
          "id": "elif-mushroom-p1",
          "type": "predict",
          "prompt": "temp가 20일 때 출력은?",
          "code": "temp = 20\nif temp > 25:\n    print(\"더움\")\nelif temp > 10:\n    print(\"선선\")\nelse:\n    print(\"추움\")",
          "choices": [
            "선선",
            "더움",
            "추움",
            "둘 다 출력"
          ],
          "answer": 0,
          "output": "선선",
          "hint": "20 > 25는 False, 20 > 10은 True예요.",
          "explain": "첫 번째 조건은 실패하고 elif가 실행돼요."
        },
        {
          "id": "elif-mushroom-p2",
          "type": "predict",
          "prompt": "처음 True가 되면 아래 조건은 어떻게 될까요?",
          "code": "score = 95\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")",
          "choices": [
            "A",
            "B",
            "A와 B",
            "아무것도 없음"
          ],
          "answer": 0,
          "output": "A",
          "hint": "95는 두 조건을 모두 만족하지만, 처음 True 하나만 실행돼요.",
          "explain": "if가 실행되면 elif는 확인하지 않아요."
        },
        {
          "id": "elif-mushroom-f",
          "type": "fill",
          "prompt": "두 번째 조건을 검사하려면 빈칸에 무엇이 들어갈까요?",
          "code": "if temp > 25:\n    print(\"더움\")\n____ temp > 10:\n    print(\"선선\")",
          "tokens": [
            "elif",
            "else",
            "if",
            "for"
          ],
          "answer": "elif",
          "hint": "앞 조건이 실패했을 때 다음 조건을 확인하는 키워드예요.",
          "explain": "elif temp > 10: 형태가 맞아요."
        },
        {
          "id": "elif-mushroom-b",
          "type": "bughunt",
          "prompt": "elif 줄에서 빠진 기호가 있는 줄을 고르세요.",
          "lines": [
            "if temp > 25:",
            "    print(\"더움\")",
            "elif temp > 10",
            "    print(\"선선\")"
          ],
          "buggy": 2,
          "fixed": "elif temp > 10:",
          "hint": "조건문 줄 끝에는 콜론이 필요해요.",
          "explain": "elif도 if처럼 끝에 :가 필요해요."
        },
        {
          "id": "elif-mushroom-w",
          "type": "write",
          "prompt": "직접 작성: score가 70 이상이면 B, 아니면 C를 출력하세요.",
          "starter": "score = 75\n# if/elif/else를 써보세요\n",
          "expected": "B",
          "testcase": "기대 출력: B",
          "hint": "90 이상 A, 70 이상 B, 나머지 C처럼 만들 수 있어요.",
          "explain": "여러 조건 중 하나를 고르는 문제예요.",
          "model": "score = 75\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")"
        }
      ]
    },
    {
      "slug": "logic-lantern",
      "title": "논리 랜턴",
      "short": "논리",
      "focus": [
        "논리",
        "logic"
      ],
      "description": "and, or, not으로 조건을 더 정교하게 만들어요.",
      "output": "입장",
      "exercises": [
        {
          "id": "logic-lantern-c",
          "type": "concept",
          "title": "조건을 조합하기",
          "body": "and는 둘 다 참일 때, or는 하나라도 참일 때, not은 참/거짓을 뒤집을 때 써요.",
          "code": "age = 12\nhas_ticket = True\nif age >= 10 and has_ticket:\n    print(\"입장\")",
          "hint": "복잡한 조건도 작은 질문으로 쪼개면 쉬워요."
        },
        {
          "id": "logic-lantern-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "age = 12\nhas_ticket = True\nif age >= 10 and has_ticket:\n    print(\"입장\")",
          "choices": [
            "입장",
            "아무것도 없음",
            "False",
            "에러"
          ],
          "answer": 0,
          "output": "입장",
          "hint": "and 양쪽이 모두 True예요.",
          "explain": "나이 조건도 참이고 티켓도 있어서 입장이 출력돼요."
        },
        {
          "id": "logic-lantern-p2",
          "type": "predict",
          "prompt": "or 조건에서는 무엇이 출력될까요?",
          "code": "is_weekend = False\nis_holiday = True\nif is_weekend or is_holiday:\n    print(\"쉬는 날\")",
          "choices": [
            "쉬는 날",
            "아무것도 없음",
            "False",
            "에러"
          ],
          "answer": 0,
          "output": "쉬는 날",
          "hint": "or는 하나만 True여도 True예요.",
          "explain": "is_holiday가 True라서 전체 조건이 True예요."
        },
        {
          "id": "logic-lantern-f",
          "type": "fill",
          "prompt": "둘 다 참이어야 입장하려면 어떤 논리 연산자가 필요할까요?",
          "code": "if age >= 10 ____ has_ticket:\n    print(\"입장\")",
          "tokens": [
            "and",
            "or",
            "not",
            "else"
          ],
          "answer": "and",
          "hint": "양쪽 조건이 모두 필요해요.",
          "explain": "age 조건과 ticket 조건이 모두 참이어야 하므로 and예요."
        },
        {
          "id": "logic-lantern-b",
          "type": "bughunt",
          "prompt": "논리 연산자가 잘못되어 너무 쉽게 통과하는 줄을 고르세요.",
          "lines": [
            "age = 8",
            "has_ticket = True",
            "if age >= 10 or has_ticket:",
            "    print(\"입장\")"
          ],
          "buggy": 2,
          "fixed": "if age >= 10 and has_ticket:",
          "hint": "나이와 티켓이 둘 다 필요하다면 or가 아니라 and예요.",
          "explain": "or를 쓰면 티켓만 있어도 통과해버려요."
        },
        {
          "id": "logic-lantern-w",
          "type": "write",
          "prompt": "직접 작성: age가 14 이상이고 has_pass가 True이면 열림을 출력하세요.",
          "starter": "age = 15\nhas_pass = True\n# 조건문을 작성하세요\n",
          "expected": "열림",
          "testcase": "기대 출력: 열림",
          "hint": "if age >= 14 and has_pass:",
          "explain": "and 조건문을 직접 만드는 문제예요.",
          "model": "age = 15\nhas_pass = True\nif age >= 14 and has_pass:\n    print(\"열림\")"
        }
      ]
    },
    {
      "slug": "indent-valley",
      "title": "들여쓰기 계곡",
      "short": "들여쓰기",
      "focus": [
        "들여쓰기",
        "indent"
      ],
      "description": "Python은 들여쓰기로 어떤 코드가 조건문 안에 있는지 판단해요.",
      "output": "출발",
      "exercises": [
        {
          "id": "indent-valley-c",
          "type": "concept",
          "title": "블록 만들기",
          "body": "if, for, while 다음 줄은 들여써야 같은 블록으로 묶여요. 들여쓰기가 문법의 일부예요.",
          "code": "ready = True\nif ready:\n    print(\"출발\")",
          "hint": "줄 앞의 공백도 코드예요."
        },
        {
          "id": "indent-valley-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "ready = True\nif ready:\n    print(\"출발\")",
          "choices": [
            "출발",
            "아무것도 없음",
            "True",
            "에러"
          ],
          "answer": 0,
          "output": "출발",
          "hint": "ready가 True이고 print가 if 안에 있어요.",
          "explain": "조건이 참이라서 들여쓴 줄이 실행돼요."
        },
        {
          "id": "indent-valley-p2",
          "type": "predict",
          "prompt": "들여쓰기가 없으면 어떻게 될까요?",
          "code": "ready = True\nif ready:\nprint(\"출발\")",
          "choices": [
            "IndentationError",
            "출발",
            "아무것도 없음",
            "False"
          ],
          "answer": 0,
          "output": "IndentationError",
          "hint": "if 다음 줄은 들여써야 해요.",
          "explain": "조건문 아래 블록이 들여쓰기 되지 않아 오류가 나요."
        },
        {
          "id": "indent-valley-f",
          "type": "fill",
          "prompt": "조건문을 시작하는 키워드는?",
          "code": "ready = True\n____ ready:\n    print(\"출발\")",
          "tokens": [
            "if",
            "else",
            "print",
            "range"
          ],
          "answer": "if",
          "hint": "조건이 참인지 확인하는 키워드예요.",
          "explain": "if ready: 가 되어야 해요."
        },
        {
          "id": "indent-valley-b",
          "type": "bughunt",
          "prompt": "들여쓰기 때문에 오류가 나는 줄을 고르세요.",
          "lines": [
            "ready = True",
            "if ready:",
            "print(\"출발\")"
          ],
          "buggy": 2,
          "fixed": "    print(\"출발\")",
          "hint": "if 안의 코드는 오른쪽으로 들여써야 해요.",
          "explain": "세 번째 줄 앞에 공백이 필요해요."
        },
        {
          "id": "indent-valley-w",
          "type": "write",
          "prompt": "직접 작성: ready가 True이면 준비 완료를 출력하세요.",
          "starter": "ready = True\n# if와 들여쓰기를 사용하세요\n",
          "expected": "준비 완료",
          "testcase": "기대 출력: 준비 완료",
          "hint": "print 줄을 들여쓰세요.",
          "explain": "조건문 블록을 정확히 만드는 연습이에요.",
          "model": "ready = True\nif ready:\n    print(\"준비 완료\")"
        }
      ]
    },
    {
      "slug": "list-garden",
      "title": "리스트 정원",
      "short": "리스트",
      "focus": [
        "리스트",
        "list"
      ],
      "description": "리스트는 여러 값을 순서대로 담고, 인덱스로 꺼낼 수 있어요.",
      "output": "키보드",
      "exercises": [
        {
          "id": "list-garden-c",
          "type": "concept",
          "title": "여러 값을 한 번에 담기",
          "body": "리스트는 [ ] 안에 값을 넣고 쉼표로 구분해요. 첫 번째 값의 인덱스는 0이에요.",
          "code": "items = [\"키보드\", \"마우스\", \"노트북\"]\nprint(items[0])",
          "hint": "리스트는 순서를 기억해요."
        },
        {
          "id": "list-garden-p1",
          "type": "predict",
          "prompt": "아래 코드는 무엇을 출력할까요?",
          "code": "items = [\"키보드\", \"마우스\", \"노트북\"]\nprint(items[0])",
          "choices": [
            "키보드",
            "마우스",
            "노트북",
            "0"
          ],
          "answer": 0,
          "output": "키보드",
          "hint": "인덱스 0은 첫 번째 값이에요.",
          "explain": "items[0]은 리스트의 첫 번째 값 키보드를 꺼내요."
        },
        {
          "id": "list-garden-p2",
          "type": "predict",
          "prompt": "두 번째 값을 꺼내면?",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[1])",
          "choices": [
            "dog",
            "cat",
            "bird",
            "1"
          ],
          "answer": 0,
          "output": "dog",
          "hint": "인덱스는 0부터 시작해요.",
          "explain": "pets[1]은 두 번째 값 dog예요."
        },
        {
          "id": "list-garden-f",
          "type": "fill",
          "prompt": "bird를 출력하려면 어떤 인덱스가 들어가야 할까요?",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[____])",
          "tokens": [
            "0",
            "1",
            "2",
            "3"
          ],
          "answer": "2",
          "hint": "세 번째 값의 인덱스는 2예요.",
          "explain": "0부터 세면 cat=0, dog=1, bird=2예요."
        },
        {
          "id": "list-garden-b",
          "type": "bughunt",
          "prompt": "리스트 범위를 벗어나는 줄을 고르세요.",
          "lines": [
            "pets = [\"cat\", \"dog\"]",
            "print(pets[0])",
            "print(pets[2])"
          ],
          "buggy": 2,
          "fixed": "print(pets[1])",
          "hint": "값이 2개면 인덱스는 0과 1까지만 있어요.",
          "explain": "pets[2]는 세 번째 값을 찾지만 리스트에는 두 개만 있어요."
        },
        {
          "id": "list-garden-w",
          "type": "write",
          "prompt": "직접 작성: 리스트에서 펜을 출력하세요.",
          "starter": "items = [\"책\", \"펜\", \"노트\"]\n# 펜을 출력하세요\n",
          "expected": "펜",
          "testcase": "기대 출력: 펜",
          "hint": "펜은 두 번째 값이므로 인덱스 1이에요.",
          "explain": "리스트 인덱스를 직접 적용하는 문제예요.",
          "model": "items = [\"책\", \"펜\", \"노트\"]\nprint(items[1])"
        }
      ]
    },
    {
      "slug": "index-tower",
      "title": "인덱스 탑",
      "short": "인덱스",
      "focus": [
        "인덱스",
        "index"
      ],
      "description": "리스트의 첫 번째 위치는 0이에요.",
      "output": "dog",
      "exercises": [
        {
          "id": "index-tower-c",
          "type": "concept",
          "title": "인덱스 배우기",
          "body": "리스트의 첫 번째 위치는 0이에요.",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[1])",
          "hint": "인덱스는 0부터 시작해요. [1]은 두 번째 값이에요."
        },
        {
          "id": "index-tower-p",
          "type": "predict",
          "prompt": "인덱스 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[1])",
          "choices": [
            "dog",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "dog",
          "hint": "인덱스는 0부터 시작해요. [1]은 두 번째 값이에요.",
          "explain": "이 코드는 최종적으로 'dog' 값을 출력해요."
        },
        {
          "id": "index-tower-f",
          "type": "fill",
          "prompt": "인덱스 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\n____(pets[1])",
          "tokens": [
            "print",
            "input",
            "return",
            "range"
          ],
          "answer": "print",
          "hint": "인덱스는 0부터 시작해요. [1]은 두 번째 값이에요.",
          "explain": "이 코드는 최종적으로 'dog' 값을 출력해요."
        },
        {
          "id": "index-tower-b",
          "type": "bughunt",
          "prompt": "인덱스 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "pets = [\"cat\", \"dog\", \"bird\"]",
            "print pets[1])"
          ],
          "buggy": 1,
          "fixed": "print(pets[1])",
          "hint": "인덱스는 0부터 시작해요. [1]은 두 번째 값이에요.",
          "explain": "이 코드는 최종적으로 'dog' 값을 출력해요."
        },
        {
          "id": "index-tower-w",
          "type": "write",
          "prompt": "인덱스 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "bird",
          "testcase": "기대 출력: bird",
          "hint": "인덱스는 0부터 시작해요. [1]은 두 번째 값이에요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 'bird' 값을 출력해요.",
          "model": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[2])"
        }
      ]
    },
    {
      "slug": "append-dock",
      "title": "append 선착장",
      "short": "추가",
      "focus": [
        "추가",
        "append"
      ],
      "description": "append()로 리스트 끝에 값을 추가해요.",
      "output": "milk",
      "exercises": [
        {
          "id": "append-dock-c",
          "type": "concept",
          "title": "추가 배우기",
          "body": "append()로 리스트 끝에 값을 추가해요.",
          "code": "snacks = []\nsnacks.append(\"milk\")\nprint(snacks[0])",
          "hint": "append()는 리스트 맨 뒤에 값을 추가해요."
        },
        {
          "id": "append-dock-p",
          "type": "predict",
          "prompt": "추가 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "snacks = []\nsnacks.append(\"milk\")\nprint(snacks[0])",
          "choices": [
            "milk",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "milk",
          "hint": "append()는 리스트 맨 뒤에 값을 추가해요.",
          "explain": "이 코드는 최종적으로 'milk' 값을 출력해요."
        },
        {
          "id": "append-dock-f",
          "type": "fill",
          "prompt": "추가 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "snacks = []\nsnacks.append(\"milk\")\n____(snacks[0])",
          "tokens": [
            "print",
            "input",
            "return",
            "range"
          ],
          "answer": "print",
          "hint": "append()는 리스트 맨 뒤에 값을 추가해요.",
          "explain": "이 코드는 최종적으로 'milk' 값을 출력해요."
        },
        {
          "id": "append-dock-b",
          "type": "bughunt",
          "prompt": "추가 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "snacks = []",
            "snacks.append(\"milk\")",
            "print snacks[0])"
          ],
          "buggy": 2,
          "fixed": "print(snacks[0])",
          "hint": "append()는 리스트 맨 뒤에 값을 추가해요.",
          "explain": "이 코드는 최종적으로 'milk' 값을 출력해요."
        },
        {
          "id": "append-dock-w",
          "type": "write",
          "prompt": "추가 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "churu",
          "testcase": "기대 출력: churu",
          "hint": "append()는 리스트 맨 뒤에 값을 추가해요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 'churu' 값을 출력해요.",
          "model": "snacks = []\nsnacks.append(\"churu\")\nprint(snacks[0])"
        }
      ]
    },
    {
      "slug": "loop-hill",
      "title": "반복 언덕",
      "short": "for",
      "focus": [
        "for",
        "for"
      ],
      "description": "for는 같은 작업을 여러 번 반복해요.",
      "output": "1\n2\n3",
      "exercises": [
        {
          "id": "loop-hill-c",
          "type": "concept",
          "title": "for 배우기",
          "body": "for는 같은 작업을 여러 번 반복해요.",
          "code": "for n in [1, 2, 3]:\n    print(n)",
          "hint": "for는 리스트의 값을 하나씩 꺼내 반복해요."
        },
        {
          "id": "loop-hill-p",
          "type": "predict",
          "prompt": "for 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "for n in [1, 2, 3]:\n    print(n)",
          "choices": [
            "1\n2\n3",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "1\n2\n3",
          "hint": "for는 리스트의 값을 하나씩 꺼내 반복해요.",
          "explain": "이 코드는 최종적으로 '1\\n2\\n3' 값을 출력해요."
        },
        {
          "id": "loop-hill-f",
          "type": "fill",
          "prompt": "for 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "____ n in [1, 2, 3]:\n    print(n)",
          "tokens": [
            "for",
            "if",
            "def",
            "while"
          ],
          "answer": "for",
          "hint": "for는 리스트의 값을 하나씩 꺼내 반복해요.",
          "explain": "이 코드는 최종적으로 '1\\n2\\n3' 값을 출력해요."
        },
        {
          "id": "loop-hill-b",
          "type": "bughunt",
          "prompt": "for 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "for n in [1, 2, 3]",
            "    print(n)"
          ],
          "buggy": 0,
          "fixed": "for n in [1, 2, 3]:",
          "hint": "for는 리스트의 값을 하나씩 꺼내 반복해요.",
          "explain": "이 코드는 최종적으로 '1\\n2\\n3' 값을 출력해요."
        },
        {
          "id": "loop-hill-w",
          "type": "write",
          "prompt": "for 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "2\n4\n6",
          "testcase": "기대 출력: 2\n4\n6",
          "hint": "for는 리스트의 값을 하나씩 꺼내 반복해요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 '2\\n4\\n6' 값을 출력해요.",
          "model": "for n in [2, 4, 6]:\n    print(n)"
        }
      ]
    },
    {
      "slug": "range-rail",
      "title": "range 레일",
      "short": "range",
      "focus": [
        "range",
        "range"
      ],
      "description": "range()는 반복할 숫자 흐름을 만들어요.",
      "output": "0\n1\n2",
      "exercises": [
        {
          "id": "range-rail-c",
          "type": "concept",
          "title": "range 배우기",
          "body": "range()는 반복할 숫자 흐름을 만들어요.",
          "code": "for n in range(3):\n    print(n)",
          "hint": "range(3)은 0, 1, 2를 차례로 만들어요."
        },
        {
          "id": "range-rail-p",
          "type": "predict",
          "prompt": "range 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "for n in range(3):\n    print(n)",
          "choices": [
            "0\n1\n2",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "0\n1\n2",
          "hint": "range(3)은 0, 1, 2를 차례로 만들어요.",
          "explain": "이 코드는 최종적으로 '0\\n1\\n2' 값을 출력해요."
        },
        {
          "id": "range-rail-f",
          "type": "fill",
          "prompt": "range 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "____ n in range(3):\n    print(n)",
          "tokens": [
            "for",
            "if",
            "def",
            "while"
          ],
          "answer": "for",
          "hint": "range(3)은 0, 1, 2를 차례로 만들어요.",
          "explain": "이 코드는 최종적으로 '0\\n1\\n2' 값을 출력해요."
        },
        {
          "id": "range-rail-b",
          "type": "bughunt",
          "prompt": "range 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "for n in range(3)",
            "    print(n)"
          ],
          "buggy": 0,
          "fixed": "for n in range(3):",
          "hint": "range(3)은 0, 1, 2를 차례로 만들어요.",
          "explain": "이 코드는 최종적으로 '0\\n1\\n2' 값을 출력해요."
        },
        {
          "id": "range-rail-w",
          "type": "write",
          "prompt": "range 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "1\n2\n3",
          "testcase": "기대 출력: 1\n2\n3",
          "hint": "range(3)은 0, 1, 2를 차례로 만들어요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 '1\\n2\\n3' 값을 출력해요.",
          "model": "for n in range(1, 4):\n    print(n)"
        }
      ]
    },
    {
      "slug": "while-cave",
      "title": "while 동굴",
      "short": "while",
      "focus": [
        "while",
        "while"
      ],
      "description": "while은 조건이 참인 동안 반복해요.",
      "output": "0\n1\n2",
      "exercises": [
        {
          "id": "while-cave-c",
          "type": "concept",
          "title": "while 배우기",
          "body": "while은 조건이 참인 동안 반복해요.",
          "code": "count = 0\nwhile count < 3:\n    print(count)\n    count = count + 1",
          "hint": "while은 조건이 False가 될 때까지 반복해요. 값이 어떻게 변하는지 따라가세요."
        },
        {
          "id": "while-cave-p",
          "type": "predict",
          "prompt": "while 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "count = 0\nwhile count < 3:\n    print(count)\n    count = count + 1",
          "choices": [
            "0\n1\n2",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "0\n1\n2",
          "hint": "while은 조건이 False가 될 때까지 반복해요. 값이 어떻게 변하는지 따라가세요.",
          "explain": "이 코드는 최종적으로 '0\\n1\\n2' 값을 출력해요."
        },
        {
          "id": "while-cave-f",
          "type": "fill",
          "prompt": "while 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "count = 0\n____ count < 3:\n    print(count)\n    count = count + 1",
          "tokens": [
            "while",
            "if",
            "for",
            "def"
          ],
          "answer": "while",
          "hint": "while은 조건이 False가 될 때까지 반복해요. 값이 어떻게 변하는지 따라가세요.",
          "explain": "이 코드는 최종적으로 '0\\n1\\n2' 값을 출력해요."
        },
        {
          "id": "while-cave-b",
          "type": "bughunt",
          "prompt": "while 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "count = 0",
            "while count < 3",
            "    print(count)",
            "    count = count + 1"
          ],
          "buggy": 1,
          "fixed": "while count < 3:",
          "hint": "while은 조건이 False가 될 때까지 반복해요. 값이 어떻게 변하는지 따라가세요.",
          "explain": "이 코드는 최종적으로 '0\\n1\\n2' 값을 출력해요."
        },
        {
          "id": "while-cave-w",
          "type": "write",
          "prompt": "while 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "1\n2\n3",
          "testcase": "기대 출력: 1\n2\n3",
          "hint": "while은 조건이 False가 될 때까지 반복해요. 값이 어떻게 변하는지 따라가세요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 '1\\n2\\n3' 값을 출력해요.",
          "model": "count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1"
        }
      ]
    },
    {
      "slug": "function-house",
      "title": "함수 집",
      "short": "함수",
      "focus": [
        "함수",
        "function"
      ],
      "description": "함수는 코드를 이름 붙여 재사용하게 해줘요.",
      "output": "hello",
      "exercises": [
        {
          "id": "function-house-c",
          "type": "concept",
          "title": "함수 배우기",
          "body": "함수는 코드를 이름 붙여 재사용하게 해줘요.",
          "code": "def greet():\n    print(\"hello\")\ngreet()",
          "hint": "함수는 def로 만들고, 이름()으로 불러야 실행돼요."
        },
        {
          "id": "function-house-p",
          "type": "predict",
          "prompt": "함수 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "def greet():\n    print(\"hello\")\ngreet()",
          "choices": [
            "hello",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "hello",
          "hint": "함수는 def로 만들고, 이름()으로 불러야 실행돼요.",
          "explain": "이 코드는 최종적으로 'hello' 값을 출력해요."
        },
        {
          "id": "function-house-f",
          "type": "fill",
          "prompt": "함수 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "____ greet():\n    print(\"hello\")\ngreet()",
          "tokens": [
            "def",
            "for",
            "class",
            "print"
          ],
          "answer": "def",
          "hint": "함수는 def로 만들고, 이름()으로 불러야 실행돼요.",
          "explain": "이 코드는 최종적으로 'hello' 값을 출력해요."
        },
        {
          "id": "function-house-b",
          "type": "bughunt",
          "prompt": "함수 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "def greet()",
            "    print(\"hello\")",
            "greet()"
          ],
          "buggy": 0,
          "fixed": "def greet():",
          "hint": "함수는 def로 만들고, 이름()으로 불러야 실행돼요.",
          "explain": "이 코드는 최종적으로 'hello' 값을 출력해요."
        },
        {
          "id": "function-house-w",
          "type": "write",
          "prompt": "함수 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "meow",
          "testcase": "기대 출력: meow",
          "hint": "함수는 def로 만들고, 이름()으로 불러야 실행돼요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 'meow' 값을 출력해요.",
          "model": "def meow():\n    print(\"meow\")\nmeow()"
        }
      ]
    },
    {
      "slug": "parameter-mail",
      "title": "파라미터 우체국",
      "short": "파라미터",
      "focus": [
        "파라미터",
        "parameter"
      ],
      "description": "파라미터는 함수에게 전달하는 값이에요.",
      "output": "Hi Mina",
      "exercises": [
        {
          "id": "parameter-mail-c",
          "type": "concept",
          "title": "파라미터 배우기",
          "body": "파라미터는 함수에게 전달하는 값이에요.",
          "code": "def hi(name):\n    print(\"Hi \" + name)\nhi(\"Mina\")",
          "hint": "괄호 안 파라미터로 함수에 값을 전달해요."
        },
        {
          "id": "parameter-mail-p",
          "type": "predict",
          "prompt": "파라미터 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "def hi(name):\n    print(\"Hi \" + name)\nhi(\"Mina\")",
          "choices": [
            "Hi Mina",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "Hi Mina",
          "hint": "괄호 안 파라미터로 함수에 값을 전달해요.",
          "explain": "이 코드는 최종적으로 'Hi Mina' 값을 출력해요."
        },
        {
          "id": "parameter-mail-f",
          "type": "fill",
          "prompt": "파라미터 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "____ hi(name):\n    print(\"Hi \" + name)\nhi(\"Mina\")",
          "tokens": [
            "def",
            "for",
            "class",
            "print"
          ],
          "answer": "def",
          "hint": "괄호 안 파라미터로 함수에 값을 전달해요.",
          "explain": "이 코드는 최종적으로 'Hi Mina' 값을 출력해요."
        },
        {
          "id": "parameter-mail-b",
          "type": "bughunt",
          "prompt": "파라미터 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "def hi(name)",
            "    print(\"Hi \" + name)",
            "hi(\"Mina\")"
          ],
          "buggy": 0,
          "fixed": "def hi(name):",
          "hint": "괄호 안 파라미터로 함수에 값을 전달해요.",
          "explain": "이 코드는 최종적으로 'Hi Mina' 값을 출력해요."
        },
        {
          "id": "parameter-mail-w",
          "type": "write",
          "prompt": "파라미터 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "Welcome Amy",
          "testcase": "기대 출력: Welcome Amy",
          "hint": "괄호 안 파라미터로 함수에 값을 전달해요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 'Welcome Amy' 값을 출력해요.",
          "model": "def welcome(name):\n    print(\"Welcome \" + name)\nwelcome(\"Amy\")"
        }
      ]
    },
    {
      "slug": "return-spring",
      "title": "return 샘",
      "short": "return",
      "focus": [
        "return",
        "return"
      ],
      "description": "return은 함수 밖으로 값을 돌려줘요.",
      "output": "8",
      "exercises": [
        {
          "id": "return-spring-c",
          "type": "concept",
          "title": "return 배우기",
          "body": "return은 함수 밖으로 값을 돌려줘요.",
          "code": "def double(x):\n    return x * 2\nprint(double(4))",
          "hint": "return은 계산 결과를 함수 밖으로 돌려줘요."
        },
        {
          "id": "return-spring-p",
          "type": "predict",
          "prompt": "return 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "def double(x):\n    return x * 2\nprint(double(4))",
          "choices": [
            "8",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "8",
          "hint": "return은 계산 결과를 함수 밖으로 돌려줘요.",
          "explain": "이 코드는 최종적으로 '8' 값을 출력해요."
        },
        {
          "id": "return-spring-f",
          "type": "fill",
          "prompt": "return 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "____ double(x):\n    return x * 2\nprint(double(4))",
          "tokens": [
            "def",
            "for",
            "class",
            "print"
          ],
          "answer": "def",
          "hint": "return은 계산 결과를 함수 밖으로 돌려줘요.",
          "explain": "이 코드는 최종적으로 '8' 값을 출력해요."
        },
        {
          "id": "return-spring-b",
          "type": "bughunt",
          "prompt": "return 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "def double(x)",
            "    return x * 2",
            "print(double(4))"
          ],
          "buggy": 0,
          "fixed": "def double(x):",
          "hint": "return은 계산 결과를 함수 밖으로 돌려줘요.",
          "explain": "이 코드는 최종적으로 '8' 값을 출력해요."
        },
        {
          "id": "return-spring-w",
          "type": "write",
          "prompt": "return 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "9",
          "testcase": "기대 출력: 9",
          "hint": "return은 계산 결과를 함수 밖으로 돌려줘요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 '9' 값을 출력해요.",
          "model": "def triple(x):\n    return x * 3\nprint(triple(3))"
        }
      ]
    },
    {
      "slug": "mini-project",
      "title": "미니 프로젝트",
      "short": "프로젝트",
      "focus": [
        "프로젝트",
        "project"
      ],
      "description": "배운 내용을 묶어서 작은 소개 카드를 만들어요.",
      "output": "코드냥 Lv.3",
      "exercises": [
        {
          "id": "mini-project-c",
          "type": "concept",
          "title": "프로젝트 배우기",
          "body": "배운 내용을 묶어서 작은 소개 카드를 만들어요.",
          "code": "name = \"코드냥\"\nlevel = 3\nprint(name + \" Lv.\" + str(level))",
          "hint": "변수, 문자열 연결, print를 순서대로 조합해 보세요."
        },
        {
          "id": "mini-project-p",
          "type": "predict",
          "prompt": "프로젝트 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "name = \"코드냥\"\nlevel = 3\nprint(name + \" Lv.\" + str(level))",
          "choices": [
            "코드냥 Lv.3",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "코드냥 Lv.3",
          "hint": "변수, 문자열 연결, print를 순서대로 조합해 보세요.",
          "explain": "이 코드는 최종적으로 '코드냥 Lv.3' 값을 출력해요."
        },
        {
          "id": "mini-project-f",
          "type": "fill",
          "prompt": "프로젝트 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "name = \"코드냥\"\nlevel = 3\n____(name + \" Lv.\" + str(level))",
          "tokens": [
            "print",
            "input",
            "return",
            "range"
          ],
          "answer": "print",
          "hint": "변수, 문자열 연결, print를 순서대로 조합해 보세요.",
          "explain": "이 코드는 최종적으로 '코드냥 Lv.3' 값을 출력해요."
        },
        {
          "id": "mini-project-b",
          "type": "bughunt",
          "prompt": "프로젝트 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "name = \"코드냥\"",
            "level = 3",
            "print name + \" Lv.\" + str(level))"
          ],
          "buggy": 2,
          "fixed": "print(name + \" Lv.\" + str(level))",
          "hint": "변수, 문자열 연결, print를 순서대로 조합해 보세요.",
          "explain": "이 코드는 최종적으로 '코드냥 Lv.3' 값을 출력해요."
        },
        {
          "id": "mini-project-w",
          "type": "write",
          "prompt": "프로젝트 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "Meowde Lv.4",
          "testcase": "기대 출력: Meowde Lv.4",
          "hint": "변수, 문자열 연결, print를 순서대로 조합해 보세요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 'Meowde Lv.4' 값을 출력해요.",
          "model": "name = \"Meowde\"\nlevel = 4\nprint(name + \" Lv.\" + str(level))"
        }
      ]
    },
    {
      "slug": "boss-bug",
      "title": "보스 버그",
      "short": "보스",
      "focus": [
        "보스",
        "boss"
      ],
      "description": "버그링이 숨긴 오류를 찾아 마지막 관문을 통과해요.",
      "output": "CLEAR",
      "exercises": [
        {
          "id": "boss-bug-c",
          "type": "concept",
          "title": "보스 배우기",
          "body": "버그링이 숨긴 오류를 찾아 마지막 관문을 통과해요.",
          "code": "score = 100\nif score == 100:\n    print(\"CLEAR\")",
          "hint": "조건, 들여쓰기, 괄호를 차례로 점검해 보세요."
        },
        {
          "id": "boss-bug-p",
          "type": "predict",
          "prompt": "보스 문제: 아래 코드를 실행하면 무엇이 출력될까요?",
          "code": "score = 100\nif score == 100:\n    print(\"CLEAR\")",
          "choices": [
            "CLEAR",
            "아무것도 출력되지 않음",
            "에러",
            "True"
          ],
          "answer": 0,
          "output": "CLEAR",
          "hint": "조건, 들여쓰기, 괄호를 차례로 점검해 보세요.",
          "explain": "이 코드는 최종적으로 'CLEAR' 값을 출력해요."
        },
        {
          "id": "boss-bug-f",
          "type": "fill",
          "prompt": "보스 연습: 빈칸을 채워 같은 결과가 나오게 하세요.",
          "code": "score = 100\n____ score == 100:\n    print(\"CLEAR\")",
          "tokens": [
            "if",
            "for",
            "else",
            "while"
          ],
          "answer": "if",
          "hint": "조건, 들여쓰기, 괄호를 차례로 점검해 보세요.",
          "explain": "이 코드는 최종적으로 'CLEAR' 값을 출력해요."
        },
        {
          "id": "boss-bug-b",
          "type": "bughunt",
          "prompt": "보스 디버깅: 코드에서 이상한 줄을 고르세요.",
          "lines": [
            "score = 100",
            "if score == 100",
            "    print(\"CLEAR\")"
          ],
          "buggy": 1,
          "fixed": "if score == 100:",
          "hint": "조건, 들여쓰기, 괄호를 차례로 점검해 보세요.",
          "explain": "이 코드는 최종적으로 'CLEAR' 값을 출력해요."
        },
        {
          "id": "boss-bug-w",
          "type": "write",
          "prompt": "보스 직접 작성: 예측 문제와 다른 코드로 기대 출력을 만들어보세요.",
          "starter": "# 직접 고쳐보세요\n",
          "expected": "BOSS CLEAR",
          "testcase": "기대 출력: BOSS CLEAR",
          "hint": "조건, 들여쓰기, 괄호를 차례로 점검해 보세요. 이번엔 예측 문제와 다른 값을 써보세요.",
          "explain": "직접 작성 문제는 같은 개념을 새 값으로 적용해 보는 단계예요. 이 코드는 최종적으로 'BOSS CLEAR' 값을 출력해요.",
          "model": "score = 100\nif score >= 100:\n    print(\"BOSS CLEAR\")"
        }
      ]
    }
  ],
  "en": [
    {
      "slug": "start-field",
      "title": "Start Field",
      "short": "Start",
      "focus": [
        "Start",
        "print"
      ],
      "description": "Code is a short instruction that Python follows in order.",
      "output": "Hello",
      "exercises": [
        {
          "id": "start-field-c",
          "type": "concept",
          "title": "Your first code line",
          "body": "Python reads code from top to bottom. print() is a good first command because it shows a value on the screen.",
          "code": "print(\"Hello\")",
          "hint": "The value inside the parentheses is shown on the screen."
        },
        {
          "id": "start-field-p1",
          "type": "predict",
          "prompt": "What will this code show?",
          "code": "print(\"Hello\")",
          "choices": [
            "Hello",
            "print",
            "No output",
            "Error"
          ],
          "answer": 0,
          "output": "Hello",
          "hint": "Look inside the quotes.",
          "explain": "print() displays the string inside its parentheses."
        },
        {
          "id": "start-field-p2",
          "type": "predict",
          "prompt": "What order will these two lines print in?",
          "code": "print(\"first\")\nprint(\"second\")",
          "choices": [
            "first\nsecond",
            "second\nfirst",
            "firstsecond",
            "Error"
          ],
          "answer": 0,
          "output": "first\nsecond",
          "hint": "Python runs from top to bottom.",
          "explain": "The first line runs before the second line."
        },
        {
          "id": "start-field-f",
          "type": "fill",
          "prompt": "Choose the command for the blank.",
          "code": "____(\"Meowde\")",
          "tokens": [
            "print",
            "input",
            "range",
            "True"
          ],
          "answer": "print",
          "hint": "Choose the command that displays a value.",
          "explain": "print(\"Meowde\") displays Meowde."
        },
        {
          "id": "start-field-b",
          "type": "bughunt",
          "prompt": "Pick the line that blocks execution.",
          "lines": [
            "print(\"Ready\")",
            "print(\"Go\""
          ],
          "buggy": 1,
          "fixed": "print(\"Go\")",
          "hint": "An opened parenthesis must be closed.",
          "explain": "The second line is missing the closing parenthesis."
        },
        {
          "id": "start-field-w",
          "type": "write",
          "prompt": "Write code that prints meow.",
          "starter": "# Write your code below\n",
          "expected": "meow",
          "testcase": "Expected output: meow",
          "hint": "Put a string inside print().",
          "explain": "The output must be exactly meow.",
          "model": "print(\"meow\")"
        }
      ]
    },
    {
      "slug": "print-camp",
      "title": "Print Camp",
      "short": "Print",
      "focus": [
        "Print",
        "print"
      ],
      "description": "print() displays values. Multiple print calls create multiple lines.",
      "output": "Meowde",
      "exercises": [
        {
          "id": "print-camp-c",
          "type": "concept",
          "title": "Print order",
          "body": "If you use print() more than once, each result appears on its own line.",
          "code": "print(\"Meow\")\nprint(\"de\")",
          "hint": "Each print call creates a new output line."
        },
        {
          "id": "print-camp-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "print(\"Meow\")\nprint(\"de\")",
          "choices": [
            "Meow\nde",
            "Meowde",
            "de\nMeow",
            "Error"
          ],
          "answer": 0,
          "output": "Meow\nde",
          "hint": "Two print calls create two lines.",
          "explain": "The first print and second print appear on separate lines."
        },
        {
          "id": "print-camp-p2",
          "type": "predict",
          "prompt": "What happens when you print a number without quotes?",
          "code": "print(2026)",
          "choices": [
            "2026",
            "\"2026\"",
            "twenty twenty-six",
            "Error"
          ],
          "answer": 0,
          "output": "2026",
          "hint": "Numbers can be printed directly.",
          "explain": "print(2026) displays the number 2026."
        },
        {
          "id": "print-camp-f",
          "type": "fill",
          "prompt": "Choose the command for the blank.",
          "code": "____(2026)",
          "tokens": [
            "print",
            "str",
            "name",
            "while"
          ],
          "answer": "print",
          "hint": "Choose the output command.",
          "explain": "print(2026) displays the number."
        },
        {
          "id": "print-camp-b",
          "type": "bughunt",
          "prompt": "Which line has the typo?",
          "lines": [
            "print(\"cat\")",
            "prnit(\"dog\")",
            "print(\"rabbit\")"
          ],
          "buggy": 1,
          "fixed": "print(\"dog\")",
          "hint": "Check the spelling of the command.",
          "explain": "prnit is a typo for print."
        },
        {
          "id": "print-camp-w",
          "type": "write",
          "prompt": "Print cat and code on two separate lines.",
          "starter": "# Print cat and code on two lines\n",
          "expected": "cat\ncode",
          "testcase": "Expected output: cat\ncode",
          "hint": "Use print() twice.",
          "explain": "Both lines must match exactly.",
          "model": "print(\"cat\")\nprint(\"code\")"
        }
      ]
    },
    {
      "slug": "string-bridge",
      "title": "String Bridge",
      "short": "Strings",
      "focus": [
        "Strings",
        "string"
      ],
      "description": "A value wrapped in quotes is text, not a calculation.",
      "output": "3 + 4",
      "exercises": [
        {
          "id": "string-bridge-c",
          "type": "concept",
          "title": "Text values",
          "body": "Anything inside quotes is a string. Even if it looks like math, Python treats it as text.",
          "code": "print(\"3 + 4\")",
          "hint": "3 + 4 inside quotes is text, not a calculation."
        },
        {
          "id": "string-bridge-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "print(\"3 + 4\")",
          "choices": [
            "3 + 4",
            "7",
            "\"7\"",
            "Error"
          ],
          "answer": 0,
          "output": "3 + 4",
          "hint": "Look inside the quotes.",
          "explain": "A string is printed as written; it is not calculated."
        },
        {
          "id": "string-bridge-p2",
          "type": "predict",
          "prompt": "What is the output?",
          "code": "print(\"cat\")",
          "choices": [
            "cat",
            "\"cat\"",
            "CAT",
            "Error"
          ],
          "answer": 0,
          "output": "cat",
          "hint": "Quotes are not shown in the output.",
          "explain": "Quotes mark the string in code, but they disappear when printed."
        },
        {
          "id": "string-bridge-f",
          "type": "fill",
          "prompt": "Which command prints the string?",
          "code": "____(\"python\")",
          "tokens": [
            "print",
            "input",
            "for",
            "name"
          ],
          "answer": "print",
          "hint": "Choose the command that displays a value.",
          "explain": "print(\"python\") is correct."
        },
        {
          "id": "string-bridge-b",
          "type": "bughunt",
          "prompt": "Which line has an unfinished string?",
          "lines": [
            "print(\"cat\")",
            "print(\"dog)",
            "print(\"bird\")"
          ],
          "buggy": 1,
          "fixed": "print(\"dog\")",
          "hint": "Check opening and closing quotes.",
          "explain": "The dog string is missing a closing quote."
        },
        {
          "id": "string-bridge-w",
          "type": "write",
          "prompt": "Print the string Python.",
          "starter": "# Print Python\n",
          "expected": "Python",
          "testcase": "Expected output: Python",
          "hint": "The P must be uppercase.",
          "explain": "Strings are compared exactly, including capitalization.",
          "model": "print(\"Python\")"
        }
      ]
    },
    {
      "slug": "quote-gate",
      "title": "Quote Gate",
      "short": "Quotes",
      "focus": [
        "Quotes",
        "quotes"
      ],
      "description": "Strings need matching opening and closing quotes.",
      "output": "treat",
      "exercises": [
        {
          "id": "quote-gate-c",
          "type": "concept",
          "title": "Matching quotes",
          "body": "A string must be closed with a matching quote.",
          "code": "print(\"treat\")",
          "hint": "Check quotes first, then parentheses."
        },
        {
          "id": "quote-gate-p1",
          "type": "predict",
          "prompt": "What happens with this code?",
          "code": "print(\"milk)",
          "choices": [
            "It prints milk",
            "Error",
            "No output",
            "It prints True"
          ],
          "answer": 1,
          "output": "SyntaxError",
          "hint": "The closing quote is missing.",
          "explain": "The string never ends, so Python raises a syntax error."
        },
        {
          "id": "quote-gate-p2",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "print('cat')",
          "choices": [
            "cat",
            "'cat'",
            "Error",
            "CAT"
          ],
          "answer": 0,
          "output": "cat",
          "hint": "Single quotes can make strings too.",
          "explain": "The quotes disappear when the string is printed."
        },
        {
          "id": "quote-gate-f",
          "type": "fill",
          "prompt": "Choose the command for the blank.",
          "code": "____('treat')",
          "tokens": [
            "print",
            "else",
            "append",
            "score"
          ],
          "answer": "print",
          "hint": "The string should be displayed.",
          "explain": "print('treat') is correct."
        },
        {
          "id": "quote-gate-b",
          "type": "bughunt",
          "prompt": "Which line has mismatched quotes?",
          "lines": [
            "print('red')",
            "print(\"green\")",
            "print('blue\")"
          ],
          "buggy": 2,
          "fixed": "print('blue')",
          "hint": "Match the quote style.",
          "explain": "The line starts with a single quote but ends with a double quote."
        },
        {
          "id": "quote-gate-w",
          "type": "write",
          "prompt": "Write code that prints milk.",
          "starter": "# Print milk\n",
          "expected": "milk",
          "testcase": "Expected output: milk",
          "hint": "Single or double quotes are both fine.",
          "explain": "Only the final output matters.",
          "model": "print(\"milk\")"
        }
      ]
    },
    {
      "slug": "number-pond",
      "title": "Number Pond",
      "short": "Numbers",
      "focus": [
        "Numbers",
        "number"
      ],
      "description": "Numbers can be calculated when they are not inside quotes.",
      "output": "7",
      "exercises": [
        {
          "id": "number-pond-c",
          "type": "concept",
          "title": "Number math",
          "body": "Numbers are different from strings. Without quotes, Python calculates them.",
          "code": "print(3 + 4)",
          "hint": "No quotes means Python evaluates the addition."
        },
        {
          "id": "number-pond-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "print(3 + 4)",
          "choices": [
            "7",
            "3 + 4",
            "34",
            "Error"
          ],
          "answer": 0,
          "output": "7",
          "hint": "Without quotes, the expression is calculated.",
          "explain": "3 + 4 becomes 7 before it is printed."
        },
        {
          "id": "number-pond-p2",
          "type": "predict",
          "prompt": "What happens when string numbers are added?",
          "code": "print(\"3\" + \"4\")",
          "choices": [
            "34",
            "7",
            "3 4",
            "Error"
          ],
          "answer": 0,
          "output": "34",
          "hint": "Quoted numbers are text.",
          "explain": "String + string joins the strings together."
        },
        {
          "id": "number-pond-f",
          "type": "fill",
          "prompt": "Choose the operator that makes 13.",
          "code": "print(8 ____ 5)",
          "tokens": [
            "+",
            "-",
            "*",
            "/"
          ],
          "answer": "+",
          "hint": "Choose the addition operator.",
          "explain": "8 + 5 is 13."
        },
        {
          "id": "number-pond-b",
          "type": "bughunt",
          "prompt": "Which line turns math into text?",
          "lines": [
            "print(2 + 3)",
            "print(\"2 + 3\")",
            "print(10 - 4)"
          ],
          "buggy": 1,
          "fixed": "print(2 + 3)",
          "hint": "Quotes stop the calculation.",
          "explain": "The second line prints the characters 2 + 3."
        },
        {
          "id": "number-pond-w",
          "type": "write",
          "prompt": "Use a calculation to print 13.",
          "starter": "# Use math to print 13\n",
          "expected": "13",
          "testcase": "Expected output: 13",
          "hint": "Put an expression inside print().",
          "explain": "The final output must be 13.",
          "model": "print(8 + 5)"
        }
      ]
    },
    {
      "slug": "math-stone",
      "title": "Math Stones",
      "short": "Math",
      "focus": [
        "Math",
        "math"
      ],
      "description": "Operators and parentheses control calculation order.",
      "output": "14",
      "exercises": [
        {
          "id": "math-stone-c",
          "type": "concept",
          "title": "Order of operations",
          "body": "Multiplication happens before addition. Parentheses can change the order.",
          "code": "print(2 + 3 * 4)",
          "hint": "3 * 4 is calculated first."
        },
        {
          "id": "math-stone-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "print(2 + 3 * 4)",
          "choices": [
            "14",
            "20",
            "24",
            "Error"
          ],
          "answer": 0,
          "output": "14",
          "hint": "Multiply first.",
          "explain": "3 * 4 = 12, then 2 + 12 = 14."
        },
        {
          "id": "math-stone-p2",
          "type": "predict",
          "prompt": "What is the result with parentheses?",
          "code": "print((2 + 3) * 4)",
          "choices": [
            "20",
            "14",
            "9",
            "Error"
          ],
          "answer": 0,
          "output": "20",
          "hint": "Parentheses go first.",
          "explain": "2 + 3 = 5, then 5 * 4 = 20."
        },
        {
          "id": "math-stone-f",
          "type": "fill",
          "prompt": "Choose the operator for the blank.",
          "code": "print(6 ____ 2)",
          "tokens": [
            "*",
            "+",
            "-",
            "/"
          ],
          "answer": "*",
          "hint": "Choose the operator that makes 12.",
          "explain": "6 * 2 is 12."
        },
        {
          "id": "math-stone-b",
          "type": "bughunt",
          "prompt": "Which line gives 14 instead of 20?",
          "lines": [
            "print((2 + 3) * 4)",
            "print(2 + 3 * 4)",
            "print(10 + 10)"
          ],
          "buggy": 1,
          "fixed": "print((2 + 3) * 4)",
          "hint": "Without parentheses, multiplication happens first.",
          "explain": "The second line prints 14, not 20."
        },
        {
          "id": "math-stone-w",
          "type": "write",
          "prompt": "Use parentheses to print 21.",
          "starter": "# Use parentheses to print 21\n",
          "expected": "21",
          "testcase": "Expected output: 21",
          "hint": "Example idea: (4 + 3) * 3",
          "explain": "Group the addition before multiplying.",
          "model": "print((4 + 3) * 3)"
        }
      ]
    },
    {
      "slug": "variable-pond",
      "title": "Variable Pond",
      "short": "Variables",
      "focus": [
        "Variables",
        "variable"
      ],
      "description": "A variable is a name tag for a stored value.",
      "output": "Codenyang",
      "exercises": [
        {
          "id": "variable-pond-c",
          "type": "concept",
          "title": "Make a variable",
          "body": "A variable stores a value. When you call the name, Python uses the stored value.",
          "code": "name = \"Codenyang\"\nprint(name)",
          "hint": "Variable names are written without quotes."
        },
        {
          "id": "variable-pond-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "name = \"Codenyang\"\nprint(name)",
          "choices": [
            "Codenyang",
            "name",
            "\"Codenyang\"",
            "Error"
          ],
          "answer": 0,
          "output": "Codenyang",
          "hint": "print(name) prints the value inside name.",
          "explain": "The string Codenyang is stored in name."
        },
        {
          "id": "variable-pond-p2",
          "type": "predict",
          "prompt": "What is the output?",
          "code": "city = \"Seoul\"\nprint(city)",
          "choices": [
            "Seoul",
            "city",
            "서울",
            "Error"
          ],
          "answer": 0,
          "output": "Seoul",
          "hint": "Look at the stored value, not the variable name.",
          "explain": "city stores Seoul."
        },
        {
          "id": "variable-pond-f",
          "type": "fill",
          "prompt": "Which variable name belongs in the blank?",
          "code": "pet = \"cat\"\nprint(____)",
          "tokens": [
            "pet",
            "cat",
            "print",
            "name"
          ],
          "answer": "pet",
          "hint": "Use the variable name exactly.",
          "explain": "print(pet) outputs cat."
        },
        {
          "id": "variable-pond-b",
          "type": "bughunt",
          "prompt": "Which line calls the wrong variable?",
          "lines": [
            "cat_name = \"Mimi\"",
            "print(catName)"
          ],
          "buggy": 1,
          "fixed": "print(cat_name)",
          "hint": "Variable names must match exactly.",
          "explain": "catName and cat_name are different names."
        },
        {
          "id": "variable-pond-w",
          "type": "write",
          "prompt": "Store cat in pet and print it.",
          "starter": "# Store cat in pet and print it\n",
          "expected": "cat",
          "testcase": "Expected output: cat",
          "hint": "Assign first, then print(pet).",
          "explain": "This practices storing and recalling a value.",
          "model": "pet = \"cat\"\nprint(pet)"
        }
      ]
    },
    {
      "slug": "value-swap",
      "title": "Update Grove",
      "short": "Update",
      "focus": [
        "Update",
        "update"
      ],
      "description": "A variable can be updated with a new value.",
      "output": "3",
      "exercises": [
        {
          "id": "value-swap-c",
          "type": "concept",
          "title": "Use the latest value",
          "body": "If you assign a new value to the same variable, the old value is replaced.",
          "code": "level = 1\nlevel = 3\nprint(level)",
          "hint": "Check the last assigned value."
        },
        {
          "id": "value-swap-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "level = 1\nlevel = 3\nprint(level)",
          "choices": [
            "3",
            "1",
            "4",
            "Error"
          ],
          "answer": 0,
          "output": "3",
          "hint": "The same variable is assigned twice.",
          "explain": "level's latest value is 3."
        },
        {
          "id": "value-swap-p2",
          "type": "predict",
          "prompt": "What is the output?",
          "code": "score = 10\nscore = score + 5\nprint(score)",
          "choices": [
            "15",
            "10",
            "5",
            "score"
          ],
          "answer": 0,
          "output": "15",
          "hint": "The score on the right is the old value.",
          "explain": "Python adds 5 to the old score and stores the result again."
        },
        {
          "id": "value-swap-f",
          "type": "fill",
          "prompt": "What makes score become 12?",
          "code": "score = 10\nscore = score + ____\nprint(score)",
          "tokens": [
            "2",
            "10",
            "12",
            "score"
          ],
          "answer": "2",
          "hint": "What should be added to 10?",
          "explain": "score + 2 makes 12."
        },
        {
          "id": "value-swap-b",
          "type": "bughunt",
          "prompt": "Which line stores text instead of doing math?",
          "lines": [
            "score = 10",
            "score = \"score + 5\"",
            "print(score)"
          ],
          "buggy": 1,
          "fixed": "score = score + 5",
          "hint": "Text inside quotes is not calculated.",
          "explain": "The second line stores the characters score + 5."
        },
        {
          "id": "value-swap-w",
          "type": "write",
          "prompt": "Start count at 1, update it to 4, then print it.",
          "starter": "# Update count from 1 to 4\n",
          "expected": "4",
          "testcase": "Expected output: 4",
          "hint": "You can use count = count + 3.",
          "explain": "This practices variable updates.",
          "model": "count = 1\ncount = count + 3\nprint(count)"
        }
      ]
    },
    {
      "slug": "name-rules",
      "title": "Name Path",
      "short": "Names",
      "focus": [
        "Names",
        "naming"
      ],
      "description": "Variable names should be readable and consistent.",
      "output": "3",
      "exercises": [
        {
          "id": "name-rules-c",
          "type": "concept",
          "title": "Readable names",
          "body": "A name like cat_age explains what the value means, so the code is easier to read later.",
          "code": "cat_age = 3\nprint(cat_age)",
          "hint": "Call the variable with the exact spelling you created."
        },
        {
          "id": "name-rules-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "cat_age = 3\nprint(cat_age)",
          "choices": [
            "3",
            "cat_age",
            "cat age",
            "Error"
          ],
          "answer": 0,
          "output": "3",
          "hint": "It prints the stored value.",
          "explain": "cat_age stores the number 3."
        },
        {
          "id": "name-rules-p2",
          "type": "predict",
          "prompt": "What happens here?",
          "code": "cat_age = 3\nprint(catage)",
          "choices": [
            "Error",
            "3",
            "catage",
            "None"
          ],
          "answer": 0,
          "output": "NameError",
          "hint": "cat_age and catage are different names.",
          "explain": "Python cannot find a variable named catage."
        },
        {
          "id": "name-rules-f",
          "type": "fill",
          "prompt": "Choose the correct variable name.",
          "code": "user_name = \"Amy\"\nprint(____)",
          "tokens": [
            "user_name",
            "username",
            "user",
            "name"
          ],
          "answer": "user_name",
          "hint": "The underscore matters.",
          "explain": "The variable name is user_name."
        },
        {
          "id": "name-rules-b",
          "type": "bughunt",
          "prompt": "Which line uses the wrong name?",
          "lines": [
            "favorite_food = \"pizza\"",
            "print(favoriteFood)"
          ],
          "buggy": 1,
          "fixed": "print(favorite_food)",
          "hint": "Check capitalization and underscores.",
          "explain": "favoriteFood and favorite_food are different names."
        },
        {
          "id": "name-rules-w",
          "type": "write",
          "prompt": "Store 5 in cat_level and print it.",
          "starter": "# Store 5 in cat_level and print it\n",
          "expected": "5",
          "testcase": "Expected output: 5",
          "hint": "Call the same variable name exactly.",
          "explain": "This practices naming and printing together.",
          "model": "cat_level = 5\nprint(cat_level)"
        }
      ]
    },
    {
      "slug": "concat-bridge",
      "title": "Join Bridge",
      "short": "Join",
      "focus": [
        "Join",
        "concat"
      ],
      "description": "Strings can be joined with +, and spaces must be added manually.",
      "output": "Hi Amy",
      "exercises": [
        {
          "id": "concat-bridge-c",
          "type": "concept",
          "title": "Join strings",
          "body": "When you use + between strings, Python joins them. If you want a space, include it in the string.",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "hint": "The space after Hi is inside the string."
        },
        {
          "id": "concat-bridge-p1",
          "type": "predict",
          "prompt": "What will this code print?",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "choices": [
            "Hi Amy",
            "HiAmy",
            "Amy Hi",
            "Error"
          ],
          "answer": 0,
          "output": "Hi Amy",
          "hint": "Notice the space inside \"Hi \".",
          "explain": "The string \"Hi \" is joined with the value of name."
        },
        {
          "id": "concat-bridge-p2",
          "type": "predict",
          "prompt": "What if there is no space?",
          "code": "print(\"Code\" + \"Nyang\")",
          "choices": [
            "CodeNyang",
            "Code Nyang",
            "Code+Nyang",
            "Error"
          ],
          "answer": 0,
          "output": "CodeNyang",
          "hint": "Python does not insert a space automatically.",
          "explain": "You must add a space string yourself if you want one."
        },
        {
          "id": "concat-bridge-f",
          "type": "fill",
          "prompt": "Choose the variable for the blank.",
          "code": "first = \"Code\"\nsecond = \"Nyang\"\nprint(first + ____) ",
          "tokens": [
            "second",
            "first",
            "Code",
            "print"
          ],
          "answer": "second",
          "hint": "Join the second string variable.",
          "explain": "first + second prints CodeNyang."
        },
        {
          "id": "concat-bridge-b",
          "type": "bughunt",
          "prompt": "Which line tries to join text and a number directly?",
          "lines": [
            "level = 3",
            "print(\"Lv.\" + level)"
          ],
          "buggy": 1,
          "fixed": "print(\"Lv.\" + str(level))",
          "hint": "A string and a number cannot be joined directly with +.",
          "explain": "Use str(level) to turn the number into text."
        },
        {
          "id": "concat-bridge-w",
          "type": "write",
          "prompt": "Use a name variable to print Hello Jieun.",
          "starter": "# Use a name variable to print Hello Jieun\n",
          "expected": "Hello Jieun",
          "testcase": "Expected output: Hello Jieun",
          "hint": "Make name = \"Jieun\" and join it with \"Hello \".",
          "explain": "The output must include the space.",
          "model": "name = \"Jieun\"\nprint(\"Hello \" + name)"
        }
      ]
    },
    {
      "slug": "input-window",
      "title": "Input Window",
      "short": "Input",
      "focus": [
        "Input",
        "input"
      ],
      "description": "input() receives text and stores it in a variable.",
      "output": "Hi Amy",
      "exercises": [
        {
          "id": "input-window-c",
          "type": "concept",
          "title": "Store a user value",
          "body": "input() receives text from a user. In this prototype, we practice with a sample value in a variable.",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "hint": "A value from input() can be used like any other variable."
        },
        {
          "id": "input-window-p1",
          "type": "predict",
          "prompt": "What will this print when name stores Amy?",
          "code": "name = \"Amy\"\nprint(\"Hi \" + name)",
          "choices": [
            "Hi Amy",
            "Hi name",
            "Amy Hi",
            "Error"
          ],
          "answer": 0,
          "output": "Hi Amy",
          "hint": "Join the string and the value inside name.",
          "explain": "Amy is joined after Hi."
        },
        {
          "id": "input-window-p2",
          "type": "predict",
          "prompt": "Where does the space come from?",
          "code": "name = \"Jieun\"\nprint(\"Hello\" + name)",
          "choices": [
            "HelloJieun",
            "Hello Jieun",
            "Hello name",
            "Error"
          ],
          "answer": 0,
          "output": "HelloJieun",
          "hint": "No automatic space is added.",
          "explain": "The string Hello has no trailing space."
        },
        {
          "id": "input-window-f",
          "type": "fill",
          "prompt": "Which variable name prints Hi Jieun?",
          "code": "name = \"Jieun\"\nprint(\"Hi \" + ____)",
          "tokens": [
            "name",
            "\"name\"",
            "Jieun",
            "input"
          ],
          "answer": "name",
          "hint": "Use the variable name without quotes.",
          "explain": "print(\"Hi \" + name) uses the value inside name."
        },
        {
          "id": "input-window-b",
          "type": "bughunt",
          "prompt": "Pick the line that prints the word name instead of the value.",
          "lines": [
            "name = \"Amy\"",
            "print(\"Hi \" + \"name\")"
          ],
          "buggy": 1,
          "fixed": "print(\"Hi \" + name)",
          "hint": "Quoted name is just text.",
          "explain": "Use name without quotes to access the variable."
        },
        {
          "id": "input-window-w",
          "type": "write",
          "prompt": "Create user = Jieun and print Welcome Jieun.",
          "starter": "# Create user and print the message\n",
          "expected": "Welcome Jieun",
          "testcase": "Expected output: Welcome Jieun",
          "hint": "Join \"Welcome \" and user.",
          "explain": "This combines variables and string joining.",
          "model": "user = \"Jieun\"\nprint(\"Welcome \" + user)"
        }
      ]
    },
    {
      "slug": "debug-missing-quote",
      "title": "Quote Bug",
      "short": "Debug",
      "focus": [
        "Debug",
        "debug"
      ],
      "description": "Find SyntaxError causes in quotes and parentheses.",
      "output": "fixed",
      "exercises": [
        {
          "id": "debug-missing-quote-c",
          "type": "concept",
          "title": "Read syntax errors",
          "body": "Python stops before running when a quote, parenthesis, or colon is missing.",
          "code": "print(\"fixed\")",
          "hint": "Errors are clues, not failures."
        },
        {
          "id": "debug-missing-quote-p1",
          "type": "predict",
          "prompt": "What happens here?",
          "code": "print(\"hello)",
          "choices": [
            "Print hello",
            "SyntaxError",
            "Print True",
            "No output"
          ],
          "answer": 1,
          "output": "SyntaxError",
          "hint": "The string never closes.",
          "explain": "The closing quote is missing."
        },
        {
          "id": "debug-missing-quote-p2",
          "type": "predict",
          "prompt": "What is missing here?",
          "code": "print(\"hello\"",
          "choices": [
            "Closing parenthesis",
            "Closing quote",
            "Variable name",
            "Nothing"
          ],
          "answer": 0,
          "output": "SyntaxError",
          "hint": "The quote closes, but the parenthesis does not.",
          "explain": "print( needs a closing )."
        },
        {
          "id": "debug-missing-quote-f",
          "type": "fill",
          "prompt": "What completes the code?",
          "code": "print(\"debug\"____",
          "tokens": [
            ")",
            "\"",
            ":",
            "("
          ],
          "answer": ")",
          "hint": "Close the parenthesis opened by print(.",
          "explain": "print(\"debug\") is complete."
        },
        {
          "id": "debug-missing-quote-b",
          "type": "bughunt",
          "prompt": "Pick the line with the broken quote.",
          "lines": [
            "print(\"ready\")",
            "print(\"go)",
            "print(\"done\")"
          ],
          "buggy": 1,
          "fixed": "print(\"go\")",
          "hint": "Check after go.",
          "explain": "The second line has no closing quote."
        },
        {
          "id": "debug-missing-quote-w",
          "type": "write",
          "prompt": "Print fixed with correct quotes and parentheses.",
          "starter": "# Print fixed\n",
          "expected": "fixed",
          "testcase": "Expected output: fixed",
          "hint": "Use print(\"fixed\").",
          "explain": "Close every symbol pair.",
          "model": "print(\"fixed\")"
        }
      ]
    },
    {
      "slug": "debug-typo",
      "title": "Typo Trail",
      "short": "Typos",
      "focus": [
        "Typos",
        "typo"
      ],
      "description": "Match spelling, case, and underscores exactly.",
      "output": "OK",
      "exercises": [
        {
          "id": "debug-typo-c",
          "type": "concept",
          "title": "Names must match",
          "body": "Python treats cat_name and catName as different names.",
          "code": "cat_name = \"Mimi\"\nprint(cat_name)",
          "hint": "Small differences matter."
        },
        {
          "id": "debug-typo-p1",
          "type": "predict",
          "prompt": "What happens here?",
          "code": "score = 10\nprint(scroe)",
          "choices": [
            "10",
            "NameError",
            "scroe",
            "No output"
          ],
          "answer": 1,
          "output": "NameError",
          "hint": "score and scroe differ.",
          "explain": "scroe was never created."
        },
        {
          "id": "debug-typo-p2",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "Score = 7\nprint(Score)",
          "choices": [
            "7",
            "Score",
            "score",
            "NameError"
          ],
          "answer": 0,
          "output": "7",
          "hint": "The created and used names match.",
          "explain": "Score stores 7."
        },
        {
          "id": "debug-typo-f",
          "type": "fill",
          "prompt": "Which name prints OK?",
          "code": "message = \"OK\"\nprint(____)",
          "tokens": [
            "message",
            "massage",
            "\"message\"",
            "print"
          ],
          "answer": "message",
          "hint": "Use the exact variable name.",
          "explain": "message stores OK."
        },
        {
          "id": "debug-typo-b",
          "type": "bughunt",
          "prompt": "Pick the line with the typo.",
          "lines": [
            "result = \"DONE\"",
            "print(reslut)"
          ],
          "buggy": 1,
          "fixed": "print(result)",
          "hint": "Compare result and reslut.",
          "explain": "The variable name is misspelled."
        },
        {
          "id": "debug-typo-w",
          "type": "write",
          "prompt": "Create answer = DONE and print it.",
          "starter": "# Create answer and print it\n",
          "expected": "DONE",
          "testcase": "Expected output: DONE",
          "hint": "answer = \"DONE\" then print(answer).",
          "explain": "Use the same variable name twice.",
          "model": "answer = \"DONE\"\nprint(answer)"
        }
      ]
    },
    {
      "slug": "compare-gate",
      "title": "Compare Gate",
      "short": "Compare",
      "focus": [
        "Compare",
        "compare"
      ],
      "description": "Comparisons produce True or False.",
      "output": "True",
      "exercises": [
        {
          "id": "compare-gate-c",
          "type": "concept",
          "title": "Comparison operators",
          "body": ">, <, ==, and != ask questions. The result is True or False.",
          "code": "print(5 > 2)\nprint(5 == 2)",
          "hint": "== asks whether two values are equal."
        },
        {
          "id": "compare-gate-p1",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "print(5 > 2)",
          "choices": [
            "True",
            "False",
            "5 > 2",
            "Error"
          ],
          "answer": 0,
          "output": "True",
          "hint": "5 is greater than 2.",
          "explain": "The comparison is true."
        },
        {
          "id": "compare-gate-p2",
          "type": "predict",
          "prompt": "What is the result of this not-equal check?",
          "code": "print(3 != 3)",
          "choices": [
            "False",
            "True",
            "3",
            "Error"
          ],
          "answer": 0,
          "output": "False",
          "hint": "!= asks whether values differ.",
          "explain": "3 and 3 are not different."
        },
        {
          "id": "compare-gate-f",
          "type": "fill",
          "prompt": "Which operator makes True?",
          "code": "print(10 ____ 4)",
          "tokens": [
            ">",
            "<",
            "==",
            "!="
          ],
          "answer": ">",
          "hint": "10 is greater than 4.",
          "explain": "10 > 4 is True."
        },
        {
          "id": "compare-gate-b",
          "type": "bughunt",
          "prompt": "Pick the line that uses assignment instead of comparison.",
          "lines": [
            "print(5 == 5)",
            "print(5 = 5)",
            "print(5 != 3)"
          ],
          "buggy": 1,
          "fixed": "print(5 == 5)",
          "hint": "Use == for comparison.",
          "explain": "= is for assignment, not equality checks."
        },
        {
          "id": "compare-gate-w",
          "type": "write",
          "prompt": "Write a comparison that prints True.",
          "starter": "# Print True using a comparison\n",
          "expected": "True",
          "testcase": "Expected output: True",
          "hint": "Example: print(9 > 3)",
          "explain": "Any comparison that evaluates to True works.",
          "model": "print(9 > 3)"
        }
      ]
    },
    {
      "slug": "if-gate",
      "title": "If Gate",
      "short": "If",
      "focus": [
        "If",
        "if"
      ],
      "description": "if runs its block only when a condition is true.",
      "output": "Pass",
      "exercises": [
        {
          "id": "if-gate-c",
          "type": "concept",
          "title": "A condition opens the gate",
          "body": "If the condition is True, the indented line runs. If it is False, Python skips it.",
          "code": "score = 90\nif score >= 80:\n    print(\"Pass\")",
          "hint": "You need both a colon and indentation."
        },
        {
          "id": "if-gate-p1",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "score = 90\nif score >= 80:\n    print(\"Pass\")",
          "choices": [
            "Pass",
            "No output",
            "False",
            "Error"
          ],
          "answer": 0,
          "output": "Pass",
          "hint": "90 >= 80 is True.",
          "explain": "The indented print runs."
        },
        {
          "id": "if-gate-p2",
          "type": "predict",
          "prompt": "What happens when the condition is False?",
          "code": "score = 50\nif score >= 80:\n    print(\"Pass\")",
          "choices": [
            "No output",
            "Pass",
            "50",
            "Error"
          ],
          "answer": 0,
          "output": "",
          "hint": "There is no else block.",
          "explain": "The condition is false, so nothing prints."
        },
        {
          "id": "if-gate-f",
          "type": "fill",
          "prompt": "Which keyword starts the condition?",
          "code": "____ score >= 80:\n    print(\"Pass\")",
          "tokens": [
            "if",
            "for",
            "else",
            "print"
          ],
          "answer": "if",
          "hint": "This keyword checks a condition.",
          "explain": "if score >= 80: is correct."
        },
        {
          "id": "if-gate-b",
          "type": "bughunt",
          "prompt": "Pick the line missing a symbol.",
          "lines": [
            "score = 90",
            "if score >= 80",
            "    print(\"Pass\")"
          ],
          "buggy": 1,
          "fixed": "if score >= 80:",
          "hint": "if lines need a colon.",
          "explain": "The colon is missing."
        },
        {
          "id": "if-gate-w",
          "type": "write",
          "prompt": "Print Enter if level is at least 3.",
          "starter": "level = 4\n# Complete the condition\n",
          "expected": "Enter",
          "testcase": "Expected output: Enter",
          "hint": "if level >= 3:",
          "explain": "Use condition, colon, and indentation.",
          "model": "level = 4\nif level >= 3:\n    print(\"Enter\")"
        }
      ]
    },
    {
      "slug": "else-cabin",
      "title": "Else Cabin",
      "short": "Else",
      "focus": [
        "Else",
        "else"
      ],
      "description": "else runs when the if condition is false.",
      "output": "Try again",
      "exercises": [
        {
          "id": "else-cabin-c",
          "type": "concept",
          "title": "Two paths",
          "body": "If the condition is True, the if block runs. Otherwise, the else block runs.",
          "code": "score = 50\nif score >= 80:\n    print(\"Pass\")\nelse:\n    print(\"Try again\")",
          "hint": "else has no condition."
        },
        {
          "id": "else-cabin-p1",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "score = 50\nif score >= 80:\n    print(\"Pass\")\nelse:\n    print(\"Try again\")",
          "choices": [
            "Try again",
            "Pass",
            "Both",
            "Error"
          ],
          "answer": 0,
          "output": "Try again",
          "hint": "50 >= 80 is False.",
          "explain": "The else block runs."
        },
        {
          "id": "else-cabin-p2",
          "type": "predict",
          "prompt": "If score is 90, what prints?",
          "code": "score = 90\nif score >= 80:\n    print(\"Pass\")\nelse:\n    print(\"Try again\")",
          "choices": [
            "Pass",
            "Try again",
            "Both",
            "Nothing"
          ],
          "answer": 0,
          "output": "Pass",
          "hint": "When if runs, else is skipped.",
          "explain": "Only the if block runs."
        },
        {
          "id": "else-cabin-f",
          "type": "fill",
          "prompt": "Which keyword handles the false path?",
          "code": "score = 40\nif score >= 80:\n    print(\"Pass\")\n____:\n    print(\"Try again\")",
          "tokens": [
            "else",
            "elif",
            "if",
            "for"
          ],
          "answer": "else",
          "hint": "This handles all remaining cases.",
          "explain": "else: is correct."
        },
        {
          "id": "else-cabin-b",
          "type": "bughunt",
          "prompt": "Pick the incorrect else line.",
          "lines": [
            "if score >= 80:",
            "    print(\"Pass\")",
            "else score < 80:",
            "    print(\"Try again\")"
          ],
          "buggy": 2,
          "fixed": "else:",
          "hint": "else takes no condition.",
          "explain": "Use elif if you need another condition."
        },
        {
          "id": "else-cabin-w",
          "type": "write",
          "prompt": "If age is at least 13 print OK, otherwise WAIT.",
          "starter": "age = 10\n# Complete if/else\n",
          "expected": "WAIT",
          "testcase": "Expected output: WAIT",
          "hint": "Use else for WAIT.",
          "explain": "This builds a two-path condition.",
          "model": "age = 10\nif age >= 13:\n    print(\"OK\")\nelse:\n    print(\"WAIT\")"
        }
      ]
    },
    {
      "slug": "elif-mushroom",
      "title": "Elif Mushrooms",
      "short": "Elif",
      "focus": [
        "Elif",
        "elif"
      ],
      "description": "elif checks the next condition after if fails.",
      "output": "Cool",
      "exercises": [
        {
          "id": "elif-mushroom-c",
          "type": "concept",
          "title": "Multiple paths",
          "body": "if, elif, and else are checked from top to bottom. Only the first True block runs.",
          "code": "temp = 20\nif temp > 25:\n    print(\"Hot\")\nelif temp > 10:\n    print(\"Cool\")\nelse:\n    print(\"Cold\")",
          "hint": "Order matters."
        },
        {
          "id": "elif-mushroom-p1",
          "type": "predict",
          "prompt": "What prints when temp is 20?",
          "code": "temp = 20\nif temp > 25:\n    print(\"Hot\")\nelif temp > 10:\n    print(\"Cool\")\nelse:\n    print(\"Cold\")",
          "choices": [
            "Cool",
            "Hot",
            "Cold",
            "Both"
          ],
          "answer": 0,
          "output": "Cool",
          "hint": "20 > 25 is false, 20 > 10 is true.",
          "explain": "The elif block runs."
        },
        {
          "id": "elif-mushroom-p2",
          "type": "predict",
          "prompt": "What happens after the first True condition?",
          "code": "score = 95\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")",
          "choices": [
            "A",
            "B",
            "A and B",
            "Nothing"
          ],
          "answer": 0,
          "output": "A",
          "hint": "Only the first True block runs.",
          "explain": "The elif is skipped."
        },
        {
          "id": "elif-mushroom-f",
          "type": "fill",
          "prompt": "Which keyword checks the second condition?",
          "code": "if temp > 25:\n    print(\"Hot\")\n____ temp > 10:\n    print(\"Cool\")",
          "tokens": [
            "elif",
            "else",
            "if",
            "for"
          ],
          "answer": "elif",
          "hint": "It checks the next condition after if fails.",
          "explain": "elif temp > 10: is correct."
        },
        {
          "id": "elif-mushroom-b",
          "type": "bughunt",
          "prompt": "Pick the elif line missing a symbol.",
          "lines": [
            "if temp > 25:",
            "    print(\"Hot\")",
            "elif temp > 10",
            "    print(\"Cool\")"
          ],
          "buggy": 2,
          "fixed": "elif temp > 10:",
          "hint": "elif lines also need a colon.",
          "explain": "The colon is missing."
        },
        {
          "id": "elif-mushroom-w",
          "type": "write",
          "prompt": "Print B if score is at least 70, otherwise C.",
          "starter": "score = 75\n# Use if/elif/else\n",
          "expected": "B",
          "testcase": "Expected output: B",
          "hint": "A for 90+, B for 70+, else C.",
          "explain": "Choose one path among several.",
          "model": "score = 75\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")"
        }
      ]
    },
    {
      "slug": "logic-lantern",
      "title": "Logic Lantern",
      "short": "Logic",
      "focus": [
        "Logic",
        "logic"
      ],
      "description": "Use and, or, and not to combine conditions.",
      "output": "Enter",
      "exercises": [
        {
          "id": "logic-lantern-c",
          "type": "concept",
          "title": "Combine conditions",
          "body": "and needs both sides true. or needs at least one side true. not flips true and false.",
          "code": "age = 12\nhas_ticket = True\nif age >= 10 and has_ticket:\n    print(\"Enter\")",
          "hint": "Break complex conditions into small questions."
        },
        {
          "id": "logic-lantern-p1",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "age = 12\nhas_ticket = True\nif age >= 10 and has_ticket:\n    print(\"Enter\")",
          "choices": [
            "Enter",
            "Nothing",
            "False",
            "Error"
          ],
          "answer": 0,
          "output": "Enter",
          "hint": "Both sides are True.",
          "explain": "The whole and condition is True."
        },
        {
          "id": "logic-lantern-p2",
          "type": "predict",
          "prompt": "What happens with or?",
          "code": "is_weekend = False\nis_holiday = True\nif is_weekend or is_holiday:\n    print(\"Day off\")",
          "choices": [
            "Day off",
            "Nothing",
            "False",
            "Error"
          ],
          "answer": 0,
          "output": "Day off",
          "hint": "or needs one True side.",
          "explain": "is_holiday is True."
        },
        {
          "id": "logic-lantern-f",
          "type": "fill",
          "prompt": "Which operator requires both conditions?",
          "code": "if age >= 10 ____ has_ticket:\n    print(\"Enter\")",
          "tokens": [
            "and",
            "or",
            "not",
            "else"
          ],
          "answer": "and",
          "hint": "Both age and ticket are required.",
          "explain": "Use and when both must be true."
        },
        {
          "id": "logic-lantern-b",
          "type": "bughunt",
          "prompt": "Pick the line that passes too easily.",
          "lines": [
            "age = 8",
            "has_ticket = True",
            "if age >= 10 or has_ticket:",
            "    print(\"Enter\")"
          ],
          "buggy": 2,
          "fixed": "if age >= 10 and has_ticket:",
          "hint": "If both are required, use and.",
          "explain": "or lets the user pass with only a ticket."
        },
        {
          "id": "logic-lantern-w",
          "type": "write",
          "prompt": "Print Open when age >= 14 and has_pass is True.",
          "starter": "age = 15\nhas_pass = True\n# Write the condition\n",
          "expected": "Open",
          "testcase": "Expected output: Open",
          "hint": "if age >= 14 and has_pass:",
          "explain": "Practice a combined condition.",
          "model": "age = 15\nhas_pass = True\nif age >= 14 and has_pass:\n    print(\"Open\")"
        }
      ]
    },
    {
      "slug": "indent-valley",
      "title": "Indent Valley",
      "short": "Indent",
      "focus": [
        "Indent",
        "indent"
      ],
      "description": "Python uses indentation to group code blocks.",
      "output": "Go",
      "exercises": [
        {
          "id": "indent-valley-c",
          "type": "concept",
          "title": "Create a block",
          "body": "The line after if, for, or while must be indented to belong to the block.",
          "code": "ready = True\nif ready:\n    print(\"Go\")",
          "hint": "Leading spaces are part of the code."
        },
        {
          "id": "indent-valley-p1",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "ready = True\nif ready:\n    print(\"Go\")",
          "choices": [
            "Go",
            "Nothing",
            "True",
            "Error"
          ],
          "answer": 0,
          "output": "Go",
          "hint": "The print line is inside the if block.",
          "explain": "ready is True, so the block runs."
        },
        {
          "id": "indent-valley-p2",
          "type": "predict",
          "prompt": "What happens without indentation?",
          "code": "ready = True\nif ready:\nprint(\"Go\")",
          "choices": [
            "IndentationError",
            "Go",
            "Nothing",
            "False"
          ],
          "answer": 0,
          "output": "IndentationError",
          "hint": "The line after if must be indented.",
          "explain": "Python cannot find the if block."
        },
        {
          "id": "indent-valley-f",
          "type": "fill",
          "prompt": "Which keyword starts the condition?",
          "code": "ready = True\n____ ready:\n    print(\"Go\")",
          "tokens": [
            "if",
            "else",
            "print",
            "range"
          ],
          "answer": "if",
          "hint": "This checks a condition.",
          "explain": "if ready: is correct."
        },
        {
          "id": "indent-valley-b",
          "type": "bughunt",
          "prompt": "Pick the line that needs indentation.",
          "lines": [
            "ready = True",
            "if ready:",
            "print(\"Go\")"
          ],
          "buggy": 2,
          "fixed": "    print(\"Go\")",
          "hint": "Code inside if moves right.",
          "explain": "The third line must be indented."
        },
        {
          "id": "indent-valley-w",
          "type": "write",
          "prompt": "Print Ready when ready is True.",
          "starter": "ready = True\n# Use if and indentation\n",
          "expected": "Ready",
          "testcase": "Expected output: Ready",
          "hint": "Indent the print line.",
          "explain": "Practice creating a block.",
          "model": "ready = True\nif ready:\n    print(\"Ready\")"
        }
      ]
    },
    {
      "slug": "list-garden",
      "title": "List Garden",
      "short": "Lists",
      "focus": [
        "Lists",
        "list"
      ],
      "description": "A list stores values in order and lets you pull them out by index.",
      "output": "keyboard",
      "exercises": [
        {
          "id": "list-garden-c",
          "type": "concept",
          "title": "Store multiple values",
          "body": "Lists use [ ] and commas. The first item has index 0.",
          "code": "items = [\"keyboard\", \"mouse\", \"laptop\"]\nprint(items[0])",
          "hint": "Lists remember order."
        },
        {
          "id": "list-garden-p1",
          "type": "predict",
          "prompt": "What will this print?",
          "code": "items = [\"keyboard\", \"mouse\", \"laptop\"]\nprint(items[0])",
          "choices": [
            "keyboard",
            "mouse",
            "laptop",
            "0"
          ],
          "answer": 0,
          "output": "keyboard",
          "hint": "Index 0 means the first item.",
          "explain": "items[0] pulls keyboard."
        },
        {
          "id": "list-garden-p2",
          "type": "predict",
          "prompt": "What is the second item?",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[1])",
          "choices": [
            "dog",
            "cat",
            "bird",
            "1"
          ],
          "answer": 0,
          "output": "dog",
          "hint": "Indexes start at 0.",
          "explain": "pets[1] is dog."
        },
        {
          "id": "list-garden-f",
          "type": "fill",
          "prompt": "Which index prints bird?",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[____])",
          "tokens": [
            "0",
            "1",
            "2",
            "3"
          ],
          "answer": "2",
          "hint": "The third item has index 2.",
          "explain": "cat=0, dog=1, bird=2."
        },
        {
          "id": "list-garden-b",
          "type": "bughunt",
          "prompt": "Pick the line that goes out of range.",
          "lines": [
            "pets = [\"cat\", \"dog\"]",
            "print(pets[0])",
            "print(pets[2])"
          ],
          "buggy": 2,
          "fixed": "print(pets[1])",
          "hint": "Two items only have indexes 0 and 1.",
          "explain": "pets[2] asks for a third item that does not exist."
        },
        {
          "id": "list-garden-w",
          "type": "write",
          "prompt": "Print pen from the list.",
          "starter": "items = [\"book\", \"pen\", \"note\"]\n# Print pen\n",
          "expected": "pen",
          "testcase": "Expected output: pen",
          "hint": "pen is the second item, index 1.",
          "explain": "Apply list indexing.",
          "model": "items = [\"book\", \"pen\", \"note\"]\nprint(items[1])"
        }
      ]
    },
    {
      "slug": "index-tower",
      "title": "Index Tower",
      "short": "Index",
      "focus": [
        "Index",
        "index"
      ],
      "description": "The first list position is 0.",
      "output": "dog",
      "exercises": [
        {
          "id": "index-tower-c",
          "type": "concept",
          "title": "Learn Index",
          "body": "The first list position is 0.",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[1])",
          "hint": "Indexes start at 0, so [1] is the second item."
        },
        {
          "id": "index-tower-p",
          "type": "predict",
          "prompt": "Index check: What will this code print?",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[1])",
          "choices": [
            "dog",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "dog",
          "hint": "Indexes start at 0, so [1] is the second item.",
          "explain": "This code finally prints 'dog'."
        },
        {
          "id": "index-tower-f",
          "type": "fill",
          "prompt": "Index practice: Fill the blank to get the same result.",
          "code": "pets = [\"cat\", \"dog\", \"bird\"]\n____(pets[1])",
          "tokens": [
            "print",
            "input",
            "return",
            "range"
          ],
          "answer": "print",
          "hint": "Indexes start at 0, so [1] is the second item.",
          "explain": "This code finally prints 'dog'."
        },
        {
          "id": "index-tower-b",
          "type": "bughunt",
          "prompt": "Index debugging: Pick the suspicious line.",
          "lines": [
            "pets = [\"cat\", \"dog\", \"bird\"]",
            "print pets[1])"
          ],
          "buggy": 1,
          "fixed": "print(pets[1])",
          "hint": "Indexes start at 0, so [1] is the second item.",
          "explain": "This code finally prints 'dog'."
        },
        {
          "id": "index-tower-w",
          "type": "write",
          "prompt": "Index writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "bird",
          "testcase": "Expected output: bird",
          "hint": "Indexes start at 0, so [1] is the second item. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints 'bird'.",
          "model": "pets = [\"cat\", \"dog\", \"bird\"]\nprint(pets[2])"
        }
      ]
    },
    {
      "slug": "append-dock",
      "title": "Append Dock",
      "short": "Append",
      "focus": [
        "Append",
        "append"
      ],
      "description": "append() adds a value to the end of a list.",
      "output": "milk",
      "exercises": [
        {
          "id": "append-dock-c",
          "type": "concept",
          "title": "Learn Append",
          "body": "append() adds a value to the end of a list.",
          "code": "snacks = []\nsnacks.append(\"milk\")\nprint(snacks[0])",
          "hint": "append() adds a value to the end of the list."
        },
        {
          "id": "append-dock-p",
          "type": "predict",
          "prompt": "Append check: What will this code print?",
          "code": "snacks = []\nsnacks.append(\"milk\")\nprint(snacks[0])",
          "choices": [
            "milk",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "milk",
          "hint": "append() adds a value to the end of the list.",
          "explain": "This code finally prints 'milk'."
        },
        {
          "id": "append-dock-f",
          "type": "fill",
          "prompt": "Append practice: Fill the blank to get the same result.",
          "code": "snacks = []\nsnacks.append(\"milk\")\n____(snacks[0])",
          "tokens": [
            "print",
            "input",
            "return",
            "range"
          ],
          "answer": "print",
          "hint": "append() adds a value to the end of the list.",
          "explain": "This code finally prints 'milk'."
        },
        {
          "id": "append-dock-b",
          "type": "bughunt",
          "prompt": "Append debugging: Pick the suspicious line.",
          "lines": [
            "snacks = []",
            "snacks.append(\"milk\")",
            "print snacks[0])"
          ],
          "buggy": 2,
          "fixed": "print(snacks[0])",
          "hint": "append() adds a value to the end of the list.",
          "explain": "This code finally prints 'milk'."
        },
        {
          "id": "append-dock-w",
          "type": "write",
          "prompt": "Append writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "churu",
          "testcase": "Expected output: churu",
          "hint": "append() adds a value to the end of the list. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints 'churu'.",
          "model": "snacks = []\nsnacks.append(\"churu\")\nprint(snacks[0])"
        }
      ]
    },
    {
      "slug": "loop-hill",
      "title": "Loop Hill",
      "short": "For",
      "focus": [
        "For",
        "for"
      ],
      "description": "for repeats the same action.",
      "output": "1\n2\n3",
      "exercises": [
        {
          "id": "loop-hill-c",
          "type": "concept",
          "title": "Learn For",
          "body": "for repeats the same action.",
          "code": "for n in [1, 2, 3]:\n    print(n)",
          "hint": "for takes each value in the list one by one."
        },
        {
          "id": "loop-hill-p",
          "type": "predict",
          "prompt": "For check: What will this code print?",
          "code": "for n in [1, 2, 3]:\n    print(n)",
          "choices": [
            "1\n2\n3",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "1\n2\n3",
          "hint": "for takes each value in the list one by one.",
          "explain": "This code finally prints '1\\n2\\n3'."
        },
        {
          "id": "loop-hill-f",
          "type": "fill",
          "prompt": "For practice: Fill the blank to get the same result.",
          "code": "____ n in [1, 2, 3]:\n    print(n)",
          "tokens": [
            "for",
            "if",
            "def",
            "while"
          ],
          "answer": "for",
          "hint": "for takes each value in the list one by one.",
          "explain": "This code finally prints '1\\n2\\n3'."
        },
        {
          "id": "loop-hill-b",
          "type": "bughunt",
          "prompt": "For debugging: Pick the suspicious line.",
          "lines": [
            "for n in [1, 2, 3]",
            "    print(n)"
          ],
          "buggy": 0,
          "fixed": "for n in [1, 2, 3]:",
          "hint": "for takes each value in the list one by one.",
          "explain": "This code finally prints '1\\n2\\n3'."
        },
        {
          "id": "loop-hill-w",
          "type": "write",
          "prompt": "For writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "2\n4\n6",
          "testcase": "Expected output: 2\n4\n6",
          "hint": "for takes each value in the list one by one. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints '2\\n4\\n6'.",
          "model": "for n in [2, 4, 6]:\n    print(n)"
        }
      ]
    },
    {
      "slug": "range-rail",
      "title": "Range Rail",
      "short": "Range",
      "focus": [
        "Range",
        "range"
      ],
      "description": "range() creates a stream of numbers for loops.",
      "output": "0\n1\n2",
      "exercises": [
        {
          "id": "range-rail-c",
          "type": "concept",
          "title": "Learn Range",
          "body": "range() creates a stream of numbers for loops.",
          "code": "for n in range(3):\n    print(n)",
          "hint": "range(3) produces 0, 1, 2 in order."
        },
        {
          "id": "range-rail-p",
          "type": "predict",
          "prompt": "Range check: What will this code print?",
          "code": "for n in range(3):\n    print(n)",
          "choices": [
            "0\n1\n2",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "0\n1\n2",
          "hint": "range(3) produces 0, 1, 2 in order.",
          "explain": "This code finally prints '0\\n1\\n2'."
        },
        {
          "id": "range-rail-f",
          "type": "fill",
          "prompt": "Range practice: Fill the blank to get the same result.",
          "code": "____ n in range(3):\n    print(n)",
          "tokens": [
            "for",
            "if",
            "def",
            "while"
          ],
          "answer": "for",
          "hint": "range(3) produces 0, 1, 2 in order.",
          "explain": "This code finally prints '0\\n1\\n2'."
        },
        {
          "id": "range-rail-b",
          "type": "bughunt",
          "prompt": "Range debugging: Pick the suspicious line.",
          "lines": [
            "for n in range(3)",
            "    print(n)"
          ],
          "buggy": 0,
          "fixed": "for n in range(3):",
          "hint": "range(3) produces 0, 1, 2 in order.",
          "explain": "This code finally prints '0\\n1\\n2'."
        },
        {
          "id": "range-rail-w",
          "type": "write",
          "prompt": "Range writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "1\n2\n3",
          "testcase": "Expected output: 1\n2\n3",
          "hint": "range(3) produces 0, 1, 2 in order. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints '1\\n2\\n3'.",
          "model": "for n in range(1, 4):\n    print(n)"
        }
      ]
    },
    {
      "slug": "while-cave",
      "title": "While Cave",
      "short": "While",
      "focus": [
        "While",
        "while"
      ],
      "description": "while repeats while a condition stays true.",
      "output": "0\n1\n2",
      "exercises": [
        {
          "id": "while-cave-c",
          "type": "concept",
          "title": "Learn While",
          "body": "while repeats while a condition stays true.",
          "code": "count = 0\nwhile count < 3:\n    print(count)\n    count = count + 1",
          "hint": "while repeats until its condition becomes False. Track how the value changes."
        },
        {
          "id": "while-cave-p",
          "type": "predict",
          "prompt": "While check: What will this code print?",
          "code": "count = 0\nwhile count < 3:\n    print(count)\n    count = count + 1",
          "choices": [
            "0\n1\n2",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "0\n1\n2",
          "hint": "while repeats until its condition becomes False. Track how the value changes.",
          "explain": "This code finally prints '0\\n1\\n2'."
        },
        {
          "id": "while-cave-f",
          "type": "fill",
          "prompt": "While practice: Fill the blank to get the same result.",
          "code": "count = 0\n____ count < 3:\n    print(count)\n    count = count + 1",
          "tokens": [
            "while",
            "if",
            "for",
            "def"
          ],
          "answer": "while",
          "hint": "while repeats until its condition becomes False. Track how the value changes.",
          "explain": "This code finally prints '0\\n1\\n2'."
        },
        {
          "id": "while-cave-b",
          "type": "bughunt",
          "prompt": "While debugging: Pick the suspicious line.",
          "lines": [
            "count = 0",
            "while count < 3",
            "    print(count)",
            "    count = count + 1"
          ],
          "buggy": 1,
          "fixed": "while count < 3:",
          "hint": "while repeats until its condition becomes False. Track how the value changes.",
          "explain": "This code finally prints '0\\n1\\n2'."
        },
        {
          "id": "while-cave-w",
          "type": "write",
          "prompt": "While writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "1\n2\n3",
          "testcase": "Expected output: 1\n2\n3",
          "hint": "while repeats until its condition becomes False. Track how the value changes. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints '1\\n2\\n3'.",
          "model": "count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1"
        }
      ]
    },
    {
      "slug": "function-house",
      "title": "Function House",
      "short": "Functions",
      "focus": [
        "Functions",
        "function"
      ],
      "description": "A function names reusable code.",
      "output": "hello",
      "exercises": [
        {
          "id": "function-house-c",
          "type": "concept",
          "title": "Learn Functions",
          "body": "A function names reusable code.",
          "code": "def greet():\n    print(\"hello\")\ngreet()",
          "hint": "A function is made with def and runs only when called with name()."
        },
        {
          "id": "function-house-p",
          "type": "predict",
          "prompt": "Functions check: What will this code print?",
          "code": "def greet():\n    print(\"hello\")\ngreet()",
          "choices": [
            "hello",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "hello",
          "hint": "A function is made with def and runs only when called with name().",
          "explain": "This code finally prints 'hello'."
        },
        {
          "id": "function-house-f",
          "type": "fill",
          "prompt": "Functions practice: Fill the blank to get the same result.",
          "code": "____ greet():\n    print(\"hello\")\ngreet()",
          "tokens": [
            "def",
            "for",
            "class",
            "print"
          ],
          "answer": "def",
          "hint": "A function is made with def and runs only when called with name().",
          "explain": "This code finally prints 'hello'."
        },
        {
          "id": "function-house-b",
          "type": "bughunt",
          "prompt": "Functions debugging: Pick the suspicious line.",
          "lines": [
            "def greet()",
            "    print(\"hello\")",
            "greet()"
          ],
          "buggy": 0,
          "fixed": "def greet():",
          "hint": "A function is made with def and runs only when called with name().",
          "explain": "This code finally prints 'hello'."
        },
        {
          "id": "function-house-w",
          "type": "write",
          "prompt": "Functions writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "meow",
          "testcase": "Expected output: meow",
          "hint": "A function is made with def and runs only when called with name(). This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints 'meow'.",
          "model": "def meow():\n    print(\"meow\")\nmeow()"
        }
      ]
    },
    {
      "slug": "parameter-mail",
      "title": "Parameter Post",
      "short": "Parameters",
      "focus": [
        "Parameters",
        "parameter"
      ],
      "description": "A parameter is a value you pass into a function.",
      "output": "Hi Mina",
      "exercises": [
        {
          "id": "parameter-mail-c",
          "type": "concept",
          "title": "Learn Parameters",
          "body": "A parameter is a value you pass into a function.",
          "code": "def hi(name):\n    print(\"Hi \" + name)\nhi(\"Mina\")",
          "hint": "Parameters in the parentheses pass values into the function."
        },
        {
          "id": "parameter-mail-p",
          "type": "predict",
          "prompt": "Parameters check: What will this code print?",
          "code": "def hi(name):\n    print(\"Hi \" + name)\nhi(\"Mina\")",
          "choices": [
            "Hi Mina",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "Hi Mina",
          "hint": "Parameters in the parentheses pass values into the function.",
          "explain": "This code finally prints 'Hi Mina'."
        },
        {
          "id": "parameter-mail-f",
          "type": "fill",
          "prompt": "Parameters practice: Fill the blank to get the same result.",
          "code": "____ hi(name):\n    print(\"Hi \" + name)\nhi(\"Mina\")",
          "tokens": [
            "def",
            "for",
            "class",
            "print"
          ],
          "answer": "def",
          "hint": "Parameters in the parentheses pass values into the function.",
          "explain": "This code finally prints 'Hi Mina'."
        },
        {
          "id": "parameter-mail-b",
          "type": "bughunt",
          "prompt": "Parameters debugging: Pick the suspicious line.",
          "lines": [
            "def hi(name)",
            "    print(\"Hi \" + name)",
            "hi(\"Mina\")"
          ],
          "buggy": 0,
          "fixed": "def hi(name):",
          "hint": "Parameters in the parentheses pass values into the function.",
          "explain": "This code finally prints 'Hi Mina'."
        },
        {
          "id": "parameter-mail-w",
          "type": "write",
          "prompt": "Parameters writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "Welcome Amy",
          "testcase": "Expected output: Welcome Amy",
          "hint": "Parameters in the parentheses pass values into the function. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints 'Welcome Amy'.",
          "model": "def welcome(name):\n    print(\"Welcome \" + name)\nwelcome(\"Amy\")"
        }
      ]
    },
    {
      "slug": "return-spring",
      "title": "Return Spring",
      "short": "Return",
      "focus": [
        "Return",
        "return"
      ],
      "description": "return sends a value back out of a function.",
      "output": "8",
      "exercises": [
        {
          "id": "return-spring-c",
          "type": "concept",
          "title": "Learn Return",
          "body": "return sends a value back out of a function.",
          "code": "def double(x):\n    return x * 2\nprint(double(4))",
          "hint": "return sends the result back out of the function."
        },
        {
          "id": "return-spring-p",
          "type": "predict",
          "prompt": "Return check: What will this code print?",
          "code": "def double(x):\n    return x * 2\nprint(double(4))",
          "choices": [
            "8",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "8",
          "hint": "return sends the result back out of the function.",
          "explain": "This code finally prints '8'."
        },
        {
          "id": "return-spring-f",
          "type": "fill",
          "prompt": "Return practice: Fill the blank to get the same result.",
          "code": "____ double(x):\n    return x * 2\nprint(double(4))",
          "tokens": [
            "def",
            "for",
            "class",
            "print"
          ],
          "answer": "def",
          "hint": "return sends the result back out of the function.",
          "explain": "This code finally prints '8'."
        },
        {
          "id": "return-spring-b",
          "type": "bughunt",
          "prompt": "Return debugging: Pick the suspicious line.",
          "lines": [
            "def double(x)",
            "    return x * 2",
            "print(double(4))"
          ],
          "buggy": 0,
          "fixed": "def double(x):",
          "hint": "return sends the result back out of the function.",
          "explain": "This code finally prints '8'."
        },
        {
          "id": "return-spring-w",
          "type": "write",
          "prompt": "Return writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "9",
          "testcase": "Expected output: 9",
          "hint": "return sends the result back out of the function. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints '9'.",
          "model": "def triple(x):\n    return x * 3\nprint(triple(3))"
        }
      ]
    },
    {
      "slug": "mini-project",
      "title": "Mini Project",
      "short": "Project",
      "focus": [
        "Project",
        "project"
      ],
      "description": "Combine what you learned into a tiny intro card.",
      "output": "Codenyang Lv.3",
      "exercises": [
        {
          "id": "mini-project-c",
          "type": "concept",
          "title": "Learn Project",
          "body": "Combine what you learned into a tiny intro card.",
          "code": "name = \"Codenyang\"\nlevel = 3\nprint(name + \" Lv.\" + str(level))",
          "hint": "Combine variables, string joining, and print in order."
        },
        {
          "id": "mini-project-p",
          "type": "predict",
          "prompt": "Project check: What will this code print?",
          "code": "name = \"Codenyang\"\nlevel = 3\nprint(name + \" Lv.\" + str(level))",
          "choices": [
            "Codenyang Lv.3",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "Codenyang Lv.3",
          "hint": "Combine variables, string joining, and print in order.",
          "explain": "This code finally prints 'Codenyang Lv.3'."
        },
        {
          "id": "mini-project-f",
          "type": "fill",
          "prompt": "Project practice: Fill the blank to get the same result.",
          "code": "name = \"Codenyang\"\nlevel = 3\n____(name + \" Lv.\" + str(level))",
          "tokens": [
            "print",
            "input",
            "return",
            "range"
          ],
          "answer": "print",
          "hint": "Combine variables, string joining, and print in order.",
          "explain": "This code finally prints 'Codenyang Lv.3'."
        },
        {
          "id": "mini-project-b",
          "type": "bughunt",
          "prompt": "Project debugging: Pick the suspicious line.",
          "lines": [
            "name = \"Codenyang\"",
            "level = 3",
            "print name + \" Lv.\" + str(level))"
          ],
          "buggy": 2,
          "fixed": "print(name + \" Lv.\" + str(level))",
          "hint": "Combine variables, string joining, and print in order.",
          "explain": "This code finally prints 'Codenyang Lv.3'."
        },
        {
          "id": "mini-project-w",
          "type": "write",
          "prompt": "Project writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "Meowde Lv.4",
          "testcase": "Expected output: Meowde Lv.4",
          "hint": "Combine variables, string joining, and print in order. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints 'Meowde Lv.4'.",
          "model": "name = \"Meowde\"\nlevel = 4\nprint(name + \" Lv.\" + str(level))"
        }
      ]
    },
    {
      "slug": "boss-bug",
      "title": "Boss Bug",
      "short": "Boss",
      "focus": [
        "Boss",
        "boss"
      ],
      "description": "Find the hidden Bugling error and pass the final gate.",
      "output": "CLEAR",
      "exercises": [
        {
          "id": "boss-bug-c",
          "type": "concept",
          "title": "Learn Boss",
          "body": "Find the hidden Bugling error and pass the final gate.",
          "code": "score = 100\nif score == 100:\n    print(\"CLEAR\")",
          "hint": "Check the condition, indentation, and parentheses one by one."
        },
        {
          "id": "boss-bug-p",
          "type": "predict",
          "prompt": "Boss check: What will this code print?",
          "code": "score = 100\nif score == 100:\n    print(\"CLEAR\")",
          "choices": [
            "CLEAR",
            "No output",
            "Error",
            "True"
          ],
          "answer": 0,
          "output": "CLEAR",
          "hint": "Check the condition, indentation, and parentheses one by one.",
          "explain": "This code finally prints 'CLEAR'."
        },
        {
          "id": "boss-bug-f",
          "type": "fill",
          "prompt": "Boss practice: Fill the blank to get the same result.",
          "code": "score = 100\n____ score == 100:\n    print(\"CLEAR\")",
          "tokens": [
            "if",
            "for",
            "else",
            "while"
          ],
          "answer": "if",
          "hint": "Check the condition, indentation, and parentheses one by one.",
          "explain": "This code finally prints 'CLEAR'."
        },
        {
          "id": "boss-bug-b",
          "type": "bughunt",
          "prompt": "Boss debugging: Pick the suspicious line.",
          "lines": [
            "score = 100",
            "if score == 100",
            "    print(\"CLEAR\")"
          ],
          "buggy": 1,
          "fixed": "if score == 100:",
          "hint": "Check the condition, indentation, and parentheses one by one.",
          "explain": "This code finally prints 'CLEAR'."
        },
        {
          "id": "boss-bug-w",
          "type": "write",
          "prompt": "Boss writing: Use the same concept with a new value.",
          "starter": "# Try it here\n",
          "expected": "BOSS CLEAR",
          "testcase": "Expected output: BOSS CLEAR",
          "hint": "Check the condition, indentation, and parentheses one by one. This time, use a different value from the prediction task.",
          "explain": "The writing task applies the same concept to a new value. This code finally prints 'BOSS CLEAR'.",
          "model": "score = 100\nif score >= 100:\n    print(\"BOSS CLEAR\")"
        }
      ]
    }
  ]
};
