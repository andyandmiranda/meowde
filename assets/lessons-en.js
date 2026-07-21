/* Generated from index.html DATA. Do not edit manually. */
window.MEOWDE_LESSONS_EN = [
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
];
