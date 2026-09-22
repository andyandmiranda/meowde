(function applyMeowdeV457DiagnosticFeedback(){
  "use strict";

  const VERSION="4.57-diagnostic-feedback";

  const HIDDEN={
    "input-window-w":{
      ko:{cause:"보이는 입력값에만 맞춘 코드예요.",reason:"화면의 Amy에서는 맞지만 다른 입력값에서는 같은 규칙이 유지되지 않았어요.",action:"input()으로 값을 읽고, 읽은 변수를 출력 문자열에 사용하세요."},
      en:{cause:"The code only works for the visible input.",reason:"It works for Amy, but the same rule does not hold for another input.",action:"Read the value with input() and use that variable in the output."}
    },
    "function-house-w":{
      ko:{cause:"함수를 재사용할 수 있는 형태가 아니에요.",reason:"첫 출력은 맞았지만 meow()를 다시 호출했을 때 같은 동작을 하지 못했어요.",action:"def meow(): 안에 출력 코드를 넣고, 함수 이름으로 다시 호출할 수 있게 만드세요."},
      en:{cause:"The solution is not reusable as a function.",reason:"The first output is correct, but calling meow() again does not repeat the behavior.",action:"Put the output inside def meow(): so the function can be called again."}
    },
    "parameter-mail-w":{
      ko:{cause:"함수의 파라미터가 결과에 반영되지 않았어요.",reason:"Amy에서는 맞지만 다른 이름을 전달하면 출력이 함께 바뀌지 않았어요.",action:"welcome(name) 안에서 고정된 이름 대신 name 변수를 사용하세요."},
      en:{cause:"The parameter is not affecting the result.",reason:"The result works for Amy but does not change when another name is passed in.",action:"Inside welcome(name), use the name parameter instead of a fixed name."}
    },
    "return-spring-w":{
      ko:{cause:"결과가 입력값에 따라 계산되지 않았어요.",reason:"triple(3)은 맞았지만 다른 숫자를 넣으면 3배 결과가 나오지 않았어요.",action:"함수 안에서 return x * 3처럼 파라미터 x를 계산에 사용하세요."},
      en:{cause:"The result is not calculated from the input value.",reason:"triple(3) works, but another number does not produce three times that value.",action:"Use the parameter in the calculation, such as return x * 3."}
    },
    "string-methods-w":{
      ko:{cause:"특정 문자열만 대문자로 맞춘 코드예요.",reason:"meowde에서는 맞지만 다른 문자열에서는 대문자 변환 규칙이 적용되지 않았어요.",action:"고정된 MEOWDE를 반환하지 말고 text.upper()의 결과를 return하세요."},
      en:{cause:"The code is hardcoded for one string.",reason:"It works for meowde but does not apply uppercase conversion to another string.",action:"Return text.upper() instead of a fixed MEOWDE value."}
    },
    "string-slice-w":{
      ko:{cause:"앞 세 글자를 실제 입력에서 잘라내지 않았어요.",reason:"python에서는 맞지만 다른 문자열을 넣으면 앞 세 글자가 함께 바뀌지 않았어요.",action:"return text[:3]처럼 함수가 받은 text를 슬라이싱하세요."},
      en:{cause:"The first three characters are not being taken from the actual input.",reason:"It works for python but does not change for another string.",action:"Slice the function argument, for example return text[:3]."}
    },
    "membership-gate-w":{
      ko:{cause:"cat의 존재 여부를 실제 리스트에서 검사하지 않았어요.",reason:"cat이 있는 경우는 맞지만 없는 리스트에서도 결과가 달라지지 않았어요.",action:'if "cat" in pets: 로 포함 여부를 검사하고 YES/NO를 나누세요.'},
      en:{cause:"The function is not actually checking whether cat is present.",reason:"The case with cat works, but the result does not change when cat is absent.",action:'Use if "cat" in pets: and return different results for present and absent cases.'}
    },
    "dict-seed-w":{
      ko:{cause:"딕셔너리의 name 값을 실제로 읽지 않았어요.",reason:"Mimi에서는 맞지만 다른 profile의 name으로 결과가 바뀌지 않았어요.",action:'고정 문자열 대신 return profile["name"]을 사용하세요.'},
      en:{cause:"The code is not reading the dictionary's name value.",reason:"It works for Mimi but does not change for another profile.",action:'Return profile["name"] instead of a fixed string.'}
    },
    "dict-update-w":{
      ko:{cause:"현재 level을 기준으로 업데이트하지 않았어요.",reason:"level 2에서는 맞지만 다른 시작 level에서는 +1 규칙이 유지되지 않았어요.",action:'player["level"]의 현재 값을 읽어 1을 더한 뒤 다시 저장하고 반환하세요.'},
      en:{cause:"The update is not based on the current level.",reason:"It works from level 2 but the +1 rule fails for another starting level.",action:'Read player["level"], add 1, store it back, and return the updated value.'}
    },
    "dict-get-w":{
      ko:{cause:"city가 있을 때와 없을 때를 구분하지 않았어요.",reason:"city가 없는 경우는 맞지만 city가 있는 딕셔너리에서도 기존 값을 돌려주지 못했어요.",action:'profile.get("city", "Unknown")으로 실제 값과 기본값을 함께 처리하세요.'},
      en:{cause:"The function is not distinguishing present and missing city values.",reason:"The missing-city case works, but an existing city is not returned.",action:'Use profile.get("city", "Unknown") to handle both cases.'}
    },
    "dict-loop-w":{
      ko:{cause:"딕셔너리 항목을 실제로 반복하지 않았어요.",reason:"예시 두 줄은 맞지만 항목 수나 이름이 바뀌면 같은 형식으로 출력되지 않았어요.",action:"scores.items()를 for로 순회하며 각 name과 score를 출력하세요."},
      en:{cause:"The dictionary entries are not actually being iterated.",reason:"The two example lines work, but changed entries are not printed with the same rule.",action:"Loop over scores.items() and print each name and score."}
    },
    "tuple-unpack-w":{
      ko:{cause:"함수가 받은 두 값을 사용하지 않았어요.",reason:"red, blue에서는 맞지만 다른 튜플을 넣으면 순서가 함께 바뀌지 않았어요.",action:"first, second = pair로 언패킹하고 second와 first를 반환 문자열에 사용하세요."},
      en:{cause:"The function is not using the two values it receives.",reason:"It works for red and blue but does not swap another tuple.",action:"Unpack first, second = pair and build the result from those variables."}
    },
    "set-garden-w":{
      ko:{cause:"고유 값의 개수를 실제 데이터에서 계산하지 않았어요.",reason:"예시에서는 3이 맞지만 중복 구성이 달라지면 결과가 바뀌지 않았어요.",action:"len(set(items))처럼 입력 리스트에서 중복을 제거한 뒤 개수를 계산하세요."},
      en:{cause:"The unique count is not being calculated from the actual data.",reason:"The example gives 3, but the result does not change when duplicate structure changes.",action:"Calculate from the input, for example len(set(items))."}
    },
    "data-project-w":{
      ko:{cause:"학생 데이터에 따라 결과를 계산하지 않았어요.",reason:"예시 Amy/Mina는 맞지만 다른 이름과 점수를 넣었을 때 같은 판정 규칙이 적용되지 않았어요.",action:'student["name"]과 student["score"]를 함수 안에서 읽어 PASS/MORE를 결정하세요.'},
      en:{cause:"The result is not being calculated from each student record.",reason:"The Amy/Mina example works, but the same rule fails for another name and score.",action:'Read student["name"] and student["score"] inside the function and decide PASS or MORE.'}
    }
  };

  function state(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function text(value){return String(value==null?"":value)}
  function short(value,max=90){
    const clean=text(value).replace(/\s+/g," ").trim();
    if(!clean)return "";
    return clean.length>max?clean.slice(0,max-1)+"…":clean;
  }
  function language(){const current=state();return current&&current.lang==="en"?"en":"ko"}
  function labels(){
    return language()==="ko"
      ?{cause:"원인",reason:"왜 틀렸을까",action:"다음 수정"}
      :{cause:"Cause",reason:"Why it failed",action:"Next fix"};
  }
  function codeValue(){const current=state();return current&&typeof current.write==="string"?current.write:""}
  function outputValue(){const current=state();return current&&typeof current.output==="string"?current.output:""}

  function hiddenResult(){
    const api=window.MeowWriteGrading;
    if(!api||typeof api.lastResult!=="function")return null;
    const result=api.lastResult();
    return result&&result.visiblePassed===true&&result.passed===false?result:null;
  }

  function runtimeDiagnosis(output){
    const lang=language();
    const checks=[
      ["IndentationError",
        {ko:{cause:"들여쓰기가 Python 문법과 맞지 않아요.",reason:"if, for, while, def 뒤의 코드 블록은 같은 깊이로 들여써야 해요.",action:"오류가 난 줄과 바로 위의 콜론(:) 줄을 보고 들여쓰기 칸 수를 맞추세요."},
         en:{cause:"The indentation does not match Python syntax.",reason:"Code inside if, for, while, and def blocks must be indented consistently.",action:"Check the error line and the colon line above it, then align the indentation."}}],
      ["SyntaxError",
        {ko:{cause:"Python이 코드를 문법적으로 읽지 못했어요.",reason:"괄호, 따옴표, 콜론(:) 또는 키워드 위치 중 하나가 완성되지 않았을 가능성이 커요.",action:"오류가 난 줄부터 괄호·따옴표 짝과 문장 끝의 콜론을 확인하세요."},
         en:{cause:"Python could not parse the code.",reason:"A parenthesis, quote, colon, or keyword position is likely incomplete.",action:"Start at the error line and check matching brackets, quotes, and required colons."}}],
      ["NameError",
        {ko:{cause:"정의하지 않은 이름을 사용했어요.",reason:"변수나 함수 이름의 철자·대소문자가 정의한 이름과 다르거나, 정의 전에 사용했을 수 있어요.",action:"오류에 나온 이름이 앞에서 정확히 정의되었는지 확인하세요."},
         en:{cause:"The code uses a name that has not been defined.",reason:"A variable or function may be misspelled, use different capitalization, or be used before definition.",action:"Check that the name in the error was defined earlier with exactly the same spelling."}}],
      ["TypeError",
        {ko:{cause:"서로 맞지 않는 자료형으로 연산했어요.",reason:"문자열과 숫자를 바로 더하는 것처럼 현재 연산이 받을 수 없는 타입이 들어갔어요.",action:"값의 타입을 확인하고 필요하면 int(), str() 같은 변환을 사용하세요."},
         en:{cause:"The operation received an incompatible data type.",reason:"For example, a string and a number cannot always be combined directly.",action:"Check the value types and convert them with int(), str(), or another appropriate conversion."}}],
      ["KeyError",
        {ko:{cause:"딕셔너리에 없는 키를 직접 조회했어요.",reason:"대괄호 접근은 해당 키가 반드시 존재해야 해요.",action:"키 철자를 확인하거나, 없어도 되는 값이라면 get()과 기본값을 사용하세요."},
         en:{cause:"The code directly requested a dictionary key that does not exist.",reason:"Bracket lookup requires that key to be present.",action:"Check the key spelling or use get() with a fallback when the key may be missing."}}],
      ["IndexError",
        {ko:{cause:"컬렉션 범위를 벗어난 위치를 조회했어요.",reason:"리스트나 문자열의 인덱스는 0부터 시작하고 마지막 인덱스는 길이보다 1 작아요.",action:"len()으로 길이를 확인하고 사용한 인덱스가 범위 안인지 다시 보세요."},
         en:{cause:"The code accessed a position outside the collection.",reason:"Indexes start at 0, so the last valid index is one less than the length.",action:"Check the length with len() and make sure the index is inside the valid range."}}],
      ["AttributeError",
        {ko:{cause:"현재 값에 없는 메서드나 속성을 사용했어요.",reason:"자료형마다 사용할 수 있는 메서드가 달라요.",action:"점(.) 앞 값의 자료형과 호출한 메서드가 서로 맞는지 확인하세요."},
         en:{cause:"The code called a method or attribute that this value does not have.",reason:"Available methods depend on the value's data type.",action:"Check the type before the dot and whether that method belongs to it."}}]
    ];
    const found=checks.find(([name])=>output.includes(name));
    return found?Object.assign({kind:"runtime"},found[1][lang]):null;
  }

  function specializedHidden(exercise){
    const lang=language(),code=codeValue(),id=exercise&&exercise.id||"";
    if(id==="input-window-w"){
      if(!/\binput\s*\(/.test(code)){
        return lang==="ko"
          ?{kind:"generalization",cause:"input()으로 입력값을 읽지 않았어요.",reason:"보이는 Amy를 직접 출력하면 첫 테스트는 맞아도 다른 입력값에는 대응할 수 없어요.",action:"name = input()으로 값을 받고, 출력에서 name을 사용하세요."}
          :{kind:"generalization",cause:"The code never reads input() from the user.",reason:"Printing Amy directly can pass the visible case but cannot adapt to another input.",action:"Read name = input() and use name in the output."};
      }
      if(/Welcome\s+Amy/.test(code)){
        return lang==="ko"
          ?{kind:"generalization",cause:"입력은 읽었지만 출력에는 고정된 Amy를 사용했어요.",reason:"name 값이 바뀌어도 출력 문자열이 그대로라 추가 테스트에서 실패해요.",action:'"Welcome " + name 또는 f"Welcome {name}"처럼 입력 변수를 사용하세요.'}
          :{kind:"generalization",cause:"The input is read, but the output still hardcodes Amy.",reason:"The printed text stays the same when name changes.",action:'Use the input variable, such as "Welcome " + name or f"Welcome {name}".'};
      }
    }
    if(id==="function-house-w"&&!/\bdef\s+meow\s*\(/.test(code)){
      return lang==="ko"
        ?{kind:"generalization",cause:"meow() 함수를 정의하지 않았어요.",reason:"print(\"meow\")만 쓰면 첫 출력은 맞지만 meow()를 다시 호출할 수 없어요.",action:"def meow(): 블록 안에 print를 넣고 meow()를 호출하세요."}
        :{kind:"generalization",cause:"The code does not define meow().",reason:'print("meow") can match the first output, but meow() cannot be called again.',action:"Define def meow():, put the print inside it, then call meow()."};
    }
    if(id==="parameter-mail-w"){
      if(!/\bdef\s+welcome\s*\(/.test(code)){
        return lang==="ko"
          ?{kind:"generalization",cause:"welcome(name) 함수를 정의하지 않았어요.",reason:"예시 문장을 직접 출력하면 다른 이름을 함수에 전달할 수 없어요.",action:"def welcome(name): 형태로 함수를 만든 뒤 name을 출력에 사용하세요."}
          :{kind:"generalization",cause:"The code does not define welcome(name).",reason:"Printing the example directly cannot accept another name as an argument.",action:"Define welcome(name) and use name in the output."};
      }
      if(/Welcome\s+Amy/.test(code)){
        return lang==="ko"
          ?{kind:"generalization",cause:"파라미터 대신 Amy를 고정해서 사용했어요.",reason:"welcome(\"Mina\")처럼 다른 인자를 전달해도 출력이 Amy로 남아요.",action:"함수 안의 고정된 이름을 name 변수로 바꾸세요."}
          :{kind:"generalization",cause:"Amy is hardcoded instead of using the parameter.",reason:'Calling welcome("Mina") still keeps Amy in the output.',action:"Replace the fixed name with the name parameter."};
      }
    }
    if(id==="return-spring-w"){
      if(!/\breturn\b/.test(code)){
        return lang==="ko"
          ?{kind:"generalization",cause:"함수에서 계산 결과를 return하지 않았어요.",reason:"화면에 9를 출력하는 것과 triple(x)가 값을 돌려주는 것은 달라요.",action:"함수 안에서 return x * 3을 사용하고, 바깥에서 print(triple(3)) 하세요."}
          :{kind:"generalization",cause:"The function does not return its calculated value.",reason:"Printing 9 is different from triple(x) returning a value.",action:"Use return x * 3 inside the function, then print(triple(3)) outside."};
      }
      if(/\breturn\s+9\b|\bprint\s*\(\s*9\s*\)/.test(code)){
        return lang==="ko"
          ?{kind:"generalization",cause:"9를 특정 값으로 하드코딩했어요.",reason:"triple(3)에는 맞지만 triple(5) 같은 다른 입력에서는 3배 규칙이 적용되지 않아요.",action:"고정 숫자 9 대신 파라미터 x를 사용해 return x * 3으로 계산하세요."}
          :{kind:"generalization",cause:"The value 9 is hardcoded.",reason:"It matches triple(3), but another input such as triple(5) does not follow the times-three rule.",action:"Use the parameter: return x * 3 instead of a fixed 9."};
      }
    }
    const preset=HIDDEN[id]&&HIDDEN[id][lang];
    return preset?Object.assign({kind:"generalization"},preset):null;
  }

  function writeDiagnosis(exercise){
    const output=outputValue();
    const runtime=runtimeDiagnosis(output);
    if(runtime)return runtime;

    if(hiddenResult()){
      const detailed=specializedHidden(exercise);
      if(detailed)return detailed;
      return language()==="ko"
        ?{kind:"generalization",cause:"보이는 예시는 맞았지만 추가 값에서는 실패했어요.",reason:"현재 코드는 예시 값에만 맞고 같은 규칙을 다른 데이터에 재사용하지 못해요.",action:"고정된 값 대신 함수의 파라미터·입력값·컬렉션 값을 계산에 사용하세요."}
        :{kind:"generalization",cause:"The visible example passes, but another value fails.",reason:"The current code fits the example but does not reuse the same rule on different data.",action:"Use the function parameter, input value, or collection data instead of fixed values."};
    }

    const expected=short(exercise&&exercise.expected);
    const actual=short(output);
    if(language()==="ko"){
      const reason=actual
        ?`현재 출력은 “${actual}”이고 기대 출력은 “${expected}”예요.`
        :`기대 출력은 “${expected}”인데 현재 출력이 비어 있어요.`;
      return {kind:"output",cause:"실행 결과가 문제의 기대 출력과 달라요.",reason,action:exercise&&exercise.hint?exercise.hint:"print() 또는 return으로 값이 만들어지는 경로를 한 줄씩 확인하세요."};
    }
    const reason=actual
      ?`The current output is “${actual}”, while the expected output is “${expected}”.`
      :`The expected output is “${expected}”, but the current output is empty.`;
    return {kind:"output",cause:"The program output does not match the expected result.",reason,action:exercise&&exercise.hint?exercise.hint:"Trace the value into print() or return one line at a time."};
  }

  function predictDiagnosis(exercise){
    const current=state(),selected=current&&Number.isInteger(current.sel)?exercise.choices&&exercise.choices[current.sel]:"";
    const correct=exercise&&exercise.choices&&exercise.choices[exercise.answer];
    return language()==="ko"
      ?{kind:"predict",cause:"코드 실행 결과를 다르게 예측했어요.",reason:`선택: “${short(selected)}” · 실제 결과: “${short(correct)}”`,action:exercise.explain||exercise.hint||"변수가 바뀌는 순서를 위에서 아래로 다시 따라가세요."}
      :{kind:"predict",cause:"The predicted result does not match the program.",reason:`Selected: “${short(selected)}” · Actual: “${short(correct)}”`,action:exercise.explain||exercise.hint||"Trace the code from top to bottom and follow each value change."};
  }

  function fillDiagnosis(exercise){
    const current=state(),selected=current&&current.fill||"",answer=exercise&&exercise.answer||"";
    return language()==="ko"
      ?{kind:"fill",cause:"이 빈칸의 역할과 선택한 토큰이 맞지 않아요.",reason:`선택: “${short(selected)}” · 이 자리에는 “${short(answer)}”가 필요해요.`,action:exercise.explain||exercise.hint||"빈칸의 앞뒤 코드를 보고 필요한 키워드·함수·연산자의 역할을 확인하세요."}
      :{kind:"fill",cause:"The selected token does not fit the role of this blank.",reason:`Selected: “${short(selected)}” · This position needs “${short(answer)}”.`,action:exercise.explain||exercise.hint||"Read the code around the blank and identify the required keyword, function, or operator."};
  }

  function bugDiagnosis(exercise){
    const current=state(),chosen=current&&Number.isInteger(current.sel)?current.sel+1:null,actual=Number(exercise&&exercise.buggy)+1;
    return language()==="ko"
      ?{kind:"bughunt",cause:"실제 오류 지점과 다른 줄을 선택했어요.",reason:`선택한 줄: ${chosen||"-"}번 · 오류가 있는 줄: ${actual}번`,action:exercise.fixed?`수정 형태: ${exercise.fixed}`:(exercise.explain||exercise.hint||"문법과 변수 이름을 줄별로 비교하세요.")}
      :{kind:"bughunt",cause:"The selected line is not the actual bug location.",reason:`Selected line: ${chosen||"-"} · Bug line: ${actual}`,action:exercise.fixed?`A corrected form is: ${exercise.fixed}`:(exercise.explain||exercise.hint||"Compare syntax and variable names line by line.")};
  }

  function fallback(exercise){
    return language()==="ko"
      ?{kind:"general",cause:"이 답은 현재 문제의 조건을 모두 만족하지 않아요.",reason:exercise&&exercise.explain||"정답이 되는 규칙과 현재 답의 차이를 다시 확인해보세요.",action:exercise&&exercise.hint||"힌트를 보고 한 부분만 수정한 뒤 다시 실행해보세요."}
      :{kind:"general",cause:"This answer does not satisfy all of the task conditions.",reason:exercise&&exercise.explain||"Compare the rule required by the task with the current answer.",action:exercise&&exercise.hint||"Use the hint, change one part, and try again."};
  }

  function diagnose(exercise){
    const current=state();
    if(!exercise||!current||!current.checked||current.correct)return null;
    if(exercise.type==="write")return writeDiagnosis(exercise);
    if(exercise.type==="predict")return predictDiagnosis(exercise);
    if(exercise.type==="fill")return fillDiagnosis(exercise);
    if(exercise.type==="bughunt")return bugDiagnosis(exercise);
    return fallback(exercise);
  }

  const api=Object.freeze({version:VERSION,diagnose,labels,hidden:HIDDEN});
  window.MeowDiagnosticFeedback=api;
  document.documentElement.dataset.diagnosticFeedback="v457";
  window.__MEOWDE_VERSION__=VERSION;

  const current=state();
  if(current&&current.screen==="lesson"&&typeof window.renderLesson==="function")window.renderLesson();
})();