(function applyMeowdeV461Unit6(){
  "use strict";

  const VERSION="4.61-unit6-oop";
  const PREVIOUS_COUNT=50;
  const TARGET_COUNT=60;

  const UNIT6_KO=[
    {
      slug:"class-blueprint",title:"클래스 설계도",short:"class와 객체",focus:["class","object","attribute"],
      description:"class로 공통 구조를 정의하고 객체를 만들어 같은 속성을 사용해요.",output:"cat",
      exercises:[
        {id:"class-blueprint-c",type:"concept",title:"설계도와 실제 객체",body:"class는 객체를 만들기 위한 설계도예요. 클래스 안에 정의한 속성은 그 클래스로 만든 객체에서 사용할 수 있어요.",code:'class Cat:\n    species = "cat"\n\nmimi = Cat()\nprint(mimi.species)',hint:"클래스 이름 뒤에는 콜론(:), 객체를 만들 때는 클래스 이름 뒤에 ()를 붙여요."},
        {id:"class-blueprint-p",type:"predict",prompt:"mimi.species를 출력하면 무엇이 나올까요?",code:'class Cat:\n    species = "cat"\n\nmimi = Cat()\nprint(mimi.species)',choices:["cat","Cat","species","에러"],answer:0,output:"cat",hint:"mimi는 Cat 클래스로 만든 객체예요.",explain:"Cat에 정의된 species 값 cat을 mimi 객체에서 읽을 수 있어요."},
        {id:"class-blueprint-f",type:"fill",prompt:"Cat이라는 클래스를 시작하려면 빈칸에 어떤 키워드가 들어갈까요?",code:'____ Cat:\n    species = "cat"',tokens:["class","def","import","return"],answer:"class",hint:"객체의 설계도를 만드는 Python 키워드예요.",explain:"class Cat:으로 새 클래스를 정의해요."},
        {id:"class-blueprint-b",type:"bughunt",prompt:"Cat 클래스를 정의하는 코드에서 문법 오류가 있는 줄을 고르세요.",lines:['class Cat','    species = "cat"','mimi = Cat()'],buggy:0,fixed:"class Cat:",hint:"클래스 선언 줄 끝에도 콜론(:)이 필요해요.",explain:"class Cat:처럼 콜론을 붙여 클래스 블록을 시작해요."},
        {id:"class-blueprint-w",type:"write",prompt:'Cat 클래스를 만들고 species 속성을 "cat"으로 정의하세요. Cat 객체를 하나 만든 뒤 species를 출력하세요.',starter:"# Cat 클래스를 만들고 객체를 생성하세요\n",expected:"cat",testcase:"기대 출력: cat",hint:'class Cat: 안에 species = "cat"을 정의하세요.',explain:"같은 클래스로 만든 다른 객체도 같은 클래스 속성을 사용할 수 있어요.",model:'class Cat:\n    species = "cat"\ncat = Cat()\nprint(cat.species)',grading:{tests:[{append:'other = Cat()\nprint(other.species)',expected:"cat",labelKo:"다른 Cat 객체",labelEn:"another Cat object"}]},diagnostic:{ko:{cause:"Cat 객체가 공통 species 속성을 사용하지 못해요.",reason:"첫 출력만 맞추거나 클래스 밖의 고정값을 출력하면 다른 Cat 객체에서 같은 속성을 읽을 수 없어요.",action:'class Cat: 안에 species = "cat"을 정의하고 객체의 .species를 사용하세요.'},en:{cause:"Cat objects cannot reuse the shared species attribute.",reason:"A fixed first output may work, but another Cat object cannot read the same class attribute.",action:'Define species = "cat" inside class Cat and read it through the object.'}}}
      ]
    },
    {
      slug:"init-self",title:"__init__과 self",short:"초기화",focus:["__init__","self","instance attribute"],
      description:"__init__에서 객체마다 다른 시작값을 self에 저장해요.",output:"Mimi",
      exercises:[
        {id:"init-self-c",type:"concept",title:"객체마다 다른 값 저장하기",body:"__init__은 객체를 만들 때 자동으로 실행돼요. self.name = name처럼 작성하면 전달받은 값을 그 객체의 속성으로 저장할 수 있어요.",code:'class Cat:\n    def __init__(self, name):\n        self.name = name\n\nmimi = Cat("Mimi")\nprint(mimi.name)',hint:"self는 지금 만들어지고 있는 객체 자신을 가리켜요."},
        {id:"init-self-p",type:"predict",prompt:'Cat("Bori")를 만들고 cat.name을 출력하면 무엇이 나올까요?',code:'class Cat:\n    def __init__(self, name):\n        self.name = name\n\ncat = Cat("Bori")\nprint(cat.name)',choices:["Bori","name","Cat","None"],answer:0,output:"Bori",hint:"__init__이 받은 name이 self.name에 저장돼요.",explain:"Bori가 cat 객체의 name 속성으로 저장돼요."},
        {id:"init-self-f",type:"fill",prompt:"객체 자신을 가리키는 첫 번째 파라미터 이름으로 일반적으로 무엇을 사용할까요?",code:'class Cat:\n    def __init__(____, name):\n        self.name = name',tokens:["self","this","object","name"],answer:"self",hint:"Python 인스턴스 메서드의 관례적인 첫 파라미터예요.",explain:"self를 통해 현재 객체의 속성에 접근해요."},
        {id:"init-self-b",type:"bughunt",prompt:"name을 객체에 저장하려는데 지역변수에만 다시 넣은 줄을 고르세요.",lines:['def __init__(self, name):','    name = name'],buggy:1,fixed:"    self.name = name",hint:"객체에 남기려면 self.속성 형태로 저장해야 해요.",explain:"self.name = name으로 저장해야 __init__이 끝난 뒤에도 객체가 값을 기억해요."},
        {id:"init-self-w",type:"write",prompt:'Cat(name) 클래스를 만들어 전달받은 name을 self.name에 저장하세요. Cat("Mimi").name을 출력하세요.',starter:"# __init__에서 name을 객체에 저장하세요\n",expected:"Mimi",testcase:"기대 출력: Mimi",hint:"def __init__(self, name): 안에서 self.name = name을 사용하세요.",explain:"객체마다 서로 다른 name 값을 가질 수 있게 됐어요.",model:'class Cat:\n    def __init__(self, name):\n        self.name = name\ncat = Cat("Mimi")\nprint(cat.name)',grading:{tests:[{append:'print(Cat("Mina").name)',expected:"Mina",labelKo:"다른 이름",labelEn:"another name"}]},diagnostic:{ko:{cause:"생성할 때 받은 name이 객체 속성으로 저장되지 않았어요.",reason:"Mimi만 직접 출력하면 다른 이름으로 객체를 만들 때 값이 함께 바뀌지 않아요.",action:"__init__(self, name) 안에서 self.name = name으로 저장하세요."},en:{cause:"The constructor argument is not stored on the object.",reason:"Printing Mimi directly works once, but another object name does not change with its input.",action:"Store the argument with self.name = name inside __init__(self, name)."}}}
      ]
    },
    {
      slug:"instance-method",title:"객체의 행동",short:"인스턴스 메서드",focus:["method","self","return"],
      description:"메서드에서 self의 속성을 읽어 객체가 자신의 데이터를 사용해 행동하게 해요.",output:"Hi Mimi",
      exercises:[
        {id:"instance-method-c",type:"concept",title:"데이터와 행동을 한곳에 묶기",body:"클래스 안의 함수는 메서드가 돼요. greet(self)처럼 self를 받으면 현재 객체의 name 같은 속성을 사용해 결과를 만들 수 있어요.",code:'class Cat:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hi {self.name}"',hint:"메서드를 호출할 때는 객체.메서드() 형태를 사용해요."},
        {id:"instance-method-p",type:"predict",prompt:'Cat("Mimi").greet()는 무엇을 반환할까요?',code:'class Cat:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hi {self.name}"\n\nprint(Cat("Mimi").greet())',choices:["Hi Mimi","Mimi","Hi self","에러"],answer:0,output:"Hi Mimi",hint:"greet는 self.name을 문자열 안에 넣어요.",explain:"현재 객체의 name인 Mimi가 사용돼 Hi Mimi가 돼요."},
        {id:"instance-method-f",type:"fill",prompt:"현재 객체의 greet 메서드를 호출하려면 빈칸에 무엇이 들어갈까요?",code:'cat = Cat("Mimi")\nprint(cat.____())',tokens:["greet","name","self","Cat"],answer:"greet",hint:"괄호까지 붙여 메서드를 실행해요.",explain:"cat.greet()로 해당 객체의 메서드를 호출해요."},
        {id:"instance-method-b",type:"bughunt",prompt:"메서드에서 현재 객체의 name을 읽으려는데 잘못 작성한 줄을 고르세요.",lines:['def greet(self):','    return f"Hi {name}"'],buggy:1,fixed:'    return f"Hi {self.name}"',hint:"객체의 속성에는 self.를 붙여 접근해요.",explain:"name이 아니라 self.name을 사용해야 현재 객체의 값을 읽어요."},
        {id:"instance-method-w",type:"write",prompt:'Cat(name)에 greet() 메서드를 추가해 "Hi 이름"을 반환하게 하세요. Cat("Mimi").greet()를 출력하세요.',starter:"# Cat 클래스에 greet 메서드를 추가하세요\n",expected:"Hi Mimi",testcase:"기대 출력: Hi Mimi",hint:'return f"Hi {self.name}"을 사용하세요.',explain:"같은 메서드가 각 객체의 name을 읽어 서로 다른 결과를 만들어요.",model:'class Cat:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hi {self.name}"\nprint(Cat("Mimi").greet())',grading:{tests:[{append:'print(Cat("Bori").greet())',expected:"Hi Bori",labelKo:"다른 객체 이름",labelEn:"another object name"}]},diagnostic:{ko:{cause:"greet()가 현재 객체의 name을 사용하지 않았어요.",reason:"Mimi에서는 맞아도 다른 이름의 Cat 객체를 만들면 인사말이 함께 바뀌지 않아요.",action:'greet(self) 안에서 self.name을 사용해 f"Hi {self.name}"을 반환하세요.'},en:{cause:"greet() does not use the current object's name.",reason:"It may work for Mimi, but another Cat object's greeting does not change with its name.",action:'Use self.name inside greet(self) and return f"Hi {self.name}".'}}}
      ]
    },
    {
      slug:"state-change",title:"객체 상태 바꾸기",short:"상태 변경",focus:["state","method","mutation"],
      description:"메서드가 self의 값을 바꾸면서 객체가 이전 상태를 기억하게 해요.",output:"3",
      exercises:[
        {id:"state-change-c",type:"concept",title:"메서드로 상태 업데이트하기",body:"객체 속성은 메서드 안에서 바꿀 수 있어요. self.level += 1을 실행하면 그 객체의 level이 실제로 증가해 다음 호출에서도 바뀐 값이 유지돼요.",code:'class Player:\n    def __init__(self, level):\n        self.level = level\n    def level_up(self):\n        self.level += 1',hint:"상태를 바꾸려면 지역변수가 아니라 self.속성을 수정해야 해요."},
        {id:"state-change-p",type:"predict",prompt:"level 2에서 level_up()을 한 번 호출하면 무엇을 출력할까요?",code:'player = Player(2)\nplayer.level_up()\nprint(player.level)',choices:["3","2","1","None"],answer:0,output:"3",hint:"self.level += 1은 기존 값에 1을 더해 다시 저장해요.",explain:"2였던 level이 메서드 호출 뒤 3으로 바뀌어요."},
        {id:"state-change-f",type:"fill",prompt:"현재 객체의 level을 1 올리려면 빈칸에 무엇이 들어갈까요?",code:'def level_up(self):\n    ____.level += 1',tokens:["self","player","class","return"],answer:"self",hint:"현재 객체의 속성을 수정해야 해요.",explain:"self.level을 수정하면 해당 객체의 상태가 바뀌어요."},
        {id:"state-change-b",type:"bughunt",prompt:"level을 올리려는데 객체 상태가 바뀌지 않는 줄을 고르세요.",lines:['def level_up(self):','    level = self.level + 1'],buggy:1,fixed:"    self.level += 1",hint:"새 지역변수 level이 아니라 self.level에 다시 저장해야 해요.",explain:"self.level += 1로 객체 속성 자체를 업데이트해야 해요."},
        {id:"state-change-w",type:"write",prompt:"Player(level) 클래스에 level_up() 메서드를 만들어 level을 1 증가시키세요. level 2에서 한 번 실행한 뒤 level을 출력하세요.",starter:"# Player 클래스와 level_up 메서드를 만드세요\n",expected:"3",testcase:"기대 출력: 3",hint:"level_up에서 self.level += 1을 사용하세요.",explain:"객체가 자신의 상태를 유지하므로 여러 번 호출할수록 level이 누적돼요.",model:'class Player:\n    def __init__(self, level):\n        self.level = level\n    def level_up(self):\n        self.level += 1\nplayer = Player(2)\nplayer.level_up()\nprint(player.level)',grading:{tests:[{append:'other = Player(5)\nother.level_up()\nother.level_up()\nprint(other.level)',expected:"7",labelKo:"다른 시작 level과 두 번 호출",labelEn:"another starting level and two calls"}]},diagnostic:{ko:{cause:"level_up()이 객체의 현재 level을 누적해서 바꾸지 않았어요.",reason:"2→3 예시는 맞아도 다른 시작값에서 여러 번 호출하면 상태가 이어지지 않아요.",action:"self.level += 1로 객체 속성 자체를 업데이트하세요."},en:{cause:"level_up() is not updating the object's current level cumulatively.",reason:"The 2→3 example may work, but repeated calls from another starting level do not preserve state.",action:"Update the object attribute itself with self.level += 1."}}}
      ]
    },
    {
      slug:"object-collection",title:"여러 객체 다루기",short:"객체 리스트",focus:["objects","list","loop"],
      description:"같은 클래스로 만든 여러 객체를 리스트에 담고 반복해서 처리해요.",output:"Amy,Mina",
      exercises:[
        {id:"object-collection-c",type:"concept",title:"객체도 리스트에 담을 수 있어요",body:"객체는 문자열이나 숫자처럼 리스트의 값이 될 수 있어요. for문으로 각 객체를 꺼내면 student.name처럼 속성을 사용할 수 있어요.",code:'students = [Student("Amy"), Student("Mina")]\nfor student in students:\n    print(student.name)',hint:"리스트 안의 각 값이 Student 객체라는 점만 다를 뿐 for 사용법은 같아요."},
        {id:"object-collection-p",type:"predict",prompt:"두 Student 객체의 name을 순서대로 이어 붙이면 무엇이 될까요?",code:'students = [Student("Amy"), Student("Mina")]\nprint(",".join(student.name for student in students))',choices:["Amy,Mina","Student,Student","Amy Mina,","에러"],answer:0,output:"Amy,Mina",hint:"각 객체에서 .name을 읽어요.",explain:"첫 객체의 Amy와 두 번째 객체의 Mina가 같은 순서로 연결돼요."},
        {id:"object-collection-f",type:"fill",prompt:"student 객체의 name 속성을 읽으려면 빈칸에 무엇이 들어갈까요?",code:'for student in students:\n    print(student.____)',tokens:["name","self","Student","append"],answer:"name",hint:"점(.) 뒤에 객체 속성 이름을 적어요.",explain:"student.name이 각 Student 객체의 이름을 읽어요."},
        {id:"object-collection-b",type:"bughunt",prompt:"객체의 이름 대신 객체 자체를 문자열 join에 넣은 줄을 고르세요.",lines:['students = [Student("Amy"), Student("Mina")]','print(",".join(student for student in students))'],buggy:1,fixed:'print(",".join(student.name for student in students))',hint:"join에는 문자열이 필요하므로 각 객체의 name을 꺼내세요.",explain:"Student 객체 자체가 아니라 student.name 문자열을 연결해야 해요."},
        {id:"object-collection-w",type:"write",prompt:'Student(name) 클래스와 names(students) 함수를 만들어 객체들의 name을 쉼표로 연결해 반환하세요. Amy와 Mina 결과를 출력하세요.',starter:"# Student 클래스와 names(students) 함수를 만드세요\n",expected:"Amy,Mina",testcase:"기대 출력: Amy,Mina",hint:'return ",".join(student.name for student in students)를 사용할 수 있어요.',explain:"객체 모음을 함수로 처리하면 객체 수가 달라져도 같은 규칙을 적용할 수 있어요.",model:'class Student:\n    def __init__(self, name):\n        self.name = name\ndef names(students):\n    return ",".join(student.name for student in students)\nprint(names([Student("Amy"), Student("Mina")]))',grading:{tests:[{append:'print(names([Student("Joon"), Student("Bori"), Student("Leo")]))',expected:"Joon,Bori,Leo",labelKo:"객체 세 개",labelEn:"three objects"}]},diagnostic:{ko:{cause:"names()가 실제 Student 객체들의 name을 반복해서 읽지 않았어요.",reason:"Amy,Mina 예시만 고정하면 객체 수와 이름이 바뀔 때 같은 규칙이 적용되지 않아요.",action:"students를 반복하면서 각 student.name을 모아 연결하세요."},en:{cause:"names() is not reading each Student object's name.",reason:"A fixed Amy,Mina output does not generalize when the number or names of objects change.",action:"Iterate over students, read each student.name, and join those values."}}}
      ]
    },
    {
      slug:"inheritance-basics",title:"상속 첫걸음",short:"상속",focus:["inheritance","super","override"],
      description:"기존 클래스의 초기화와 속성을 물려받아 더 구체적인 클래스를 만들어요.",output:"Cat:Mimi",
      exercises:[
        {id:"inheritance-basics-c",type:"concept",title:"공통 코드는 부모 클래스에",body:"class Cat(Animal):처럼 작성하면 Cat이 Animal을 상속해요. super().__init__(name)을 호출하면 부모의 초기화 코드를 재사용할 수 있어요.",code:'class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Cat(Animal):\n    def __init__(self, name):\n        super().__init__(name)',hint:"괄호 안의 클래스가 부모 클래스예요."},
        {id:"inheritance-basics-p",type:"predict",prompt:'Cat이 Animal의 __init__을 재사용하면 Cat("Mimi").name은 무엇일까요?',code:'class Animal:\n    def __init__(self, name):\n        self.name = name\nclass Cat(Animal):\n    def __init__(self, name):\n        super().__init__(name)\nprint(Cat("Mimi").name)',choices:["Mimi","Cat","Animal","None"],answer:0,output:"Mimi",hint:"super().__init__(name)이 부모의 self.name 저장 코드를 실행해요.",explain:"Cat 객체에도 Animal에서 정의한 name 속성이 생겨요."},
        {id:"inheritance-basics-f",type:"fill",prompt:"부모 클래스 Animal을 상속하려면 빈칸에 무엇이 들어갈까요?",code:'class Cat(____):\n    pass',tokens:["Animal","self","super","Cat"],answer:"Animal",hint:"클래스 이름 뒤 괄호 안에 부모 클래스를 적어요.",explain:"class Cat(Animal):으로 Animal의 기능을 상속해요."},
        {id:"inheritance-basics-b",type:"bughunt",prompt:"부모의 __init__을 호출하려는데 괄호 호출이 빠진 줄을 고르세요.",lines:['def __init__(self, name):','    super.__init__(name)'],buggy:1,fixed:"    super().__init__(name)",hint:"super는 함수처럼 super()로 호출한 뒤 메서드에 접근해요.",explain:"super().__init__(name) 형태로 부모 초기화를 실행해요."},
        {id:"inheritance-basics-w",type:"write",prompt:'Animal(name)을 상속하는 Cat 클래스를 만들고 describe()가 "Cat:이름"을 반환하게 하세요. Cat("Mimi").describe()를 출력하세요.',starter:"# Animal과 Cat 클래스를 만들고 상속을 사용하세요\n",expected:"Cat:Mimi",testcase:"기대 출력: Cat:Mimi",hint:"Cat.__init__에서 super().__init__(name)을 호출하고 describe에서 self.name을 사용하세요.",explain:"부모의 공통 초기화 코드는 재사용하고 Cat만의 행동을 추가했어요.",model:'class Animal:\n    def __init__(self, name):\n        self.name = name\nclass Cat(Animal):\n    def __init__(self, name):\n        super().__init__(name)\n    def describe(self):\n        return f"Cat:{self.name}"\nprint(Cat("Mimi").describe())',grading:{tests:[{append:'print(Cat("Bori").describe())',expected:"Cat:Bori",labelKo:"다른 Cat 이름",labelEn:"another Cat name"}]},diagnostic:{ko:{cause:"Cat이 부모 초기화나 현재 객체의 name을 재사용하지 않았어요.",reason:"Mimi를 고정하면 다른 Cat 객체에서 상속받은 name이 결과에 반영되지 않아요.",action:"super().__init__(name)으로 name을 저장하고 describe()에서 self.name을 사용하세요."},en:{cause:"Cat is not reusing the parent initialization or the current object's name.",reason:"A fixed Mimi output does not reflect the inherited name on another Cat object.",action:"Call super().__init__(name) and use self.name inside describe()."}}}
      ]
    },
    {
      slug:"object-to-dict",title:"객체를 딕셔너리로",short:"to_dict",focus:["method","dictionary","serialization"],
      description:"객체 상태를 딕셔너리로 바꿔 저장하기 쉬운 데이터 형태로 만들어요.",output:"3",
      exercises:[
        {id:"object-to-dict-c",type:"concept",title:"객체 상태 꺼내기",body:"to_dict() 같은 메서드를 만들면 self.name과 self.level을 일반 딕셔너리로 바꿀 수 있어요. JSON 저장 전에 자주 쓰는 패턴이에요.",code:'def to_dict(self):\n    return {"name": self.name, "level": self.level}',hint:"딕셔너리 값에 self의 현재 속성을 넣어요."},
        {id:"object-to-dict-p",type:"predict",prompt:"name=Mimi, level=3인 객체의 to_dict()[\"level\"]은 무엇일까요?",code:'profile = Profile("Mimi", 3)\nprint(profile.to_dict()["level"])',choices:["3","level","Mimi","None"],answer:0,output:"3",hint:"to_dict가 level 키에 self.level을 넣어요.",explain:"객체의 level 3이 딕셔너리의 level 값으로 변환돼요."},
        {id:"object-to-dict-f",type:"fill",prompt:"현재 객체의 name을 딕셔너리에 넣으려면 빈칸에 무엇이 들어갈까요?",code:'return {"name": ____.name, "level": self.level}',tokens:["self","Profile","name","dict"],answer:"self",hint:"현재 객체 속성에는 self로 접근해요.",explain:'{"name": self.name}처럼 현재 객체 값을 넣어요.'},
        {id:"object-to-dict-b",type:"bughunt",prompt:"level 값을 고정해서 다른 객체에서 틀리는 줄을 고르세요.",lines:['def to_dict(self):','    return {"name": self.name, "level": 3}'],buggy:1,fixed:'    return {"name": self.name, "level": self.level}',hint:"객체마다 level이 다를 수 있어요.",explain:"고정 숫자 3이 아니라 self.level을 사용해야 해요."},
        {id:"object-to-dict-w",type:"write",prompt:'Profile(name, level) 클래스에 to_dict()를 만들어 {"name": 현재이름, "level": 현재레벨}을 반환하세요. Mimi, 3의 level을 출력하세요.',starter:"# Profile 클래스와 to_dict 메서드를 만드세요\n",expected:"3",testcase:"기대 출력: 3",hint:'return {"name": self.name, "level": self.level}을 사용하세요.',explain:"객체의 현재 상태를 일반 데이터 구조로 변환했어요.",model:'class Profile:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\n    def to_dict(self):\n        return {"name": self.name, "level": self.level}\nprofile = Profile("Mimi", 3)\nprint(profile.to_dict()["level"])',grading:{tests:[{append:'other = Profile("Mina", 7)\nprint(other.to_dict()["name"] + ":" + str(other.to_dict()["level"]))',expected:"Mina:7",labelKo:"다른 객체 상태",labelEn:"another object state"}]},diagnostic:{ko:{cause:"to_dict()가 현재 객체의 name과 level을 그대로 변환하지 않았어요.",reason:"Mimi/3만 맞춰두면 다른 Profile 객체의 상태가 딕셔너리에 반영되지 않아요.",action:'딕셔너리 값에 self.name과 self.level을 사용하세요.'},en:{cause:"to_dict() is not converting the current object's name and level.",reason:"A fixed Mimi/3 result does not reflect another Profile object's state.",action:"Use self.name and self.level as the dictionary values."}}}
      ]
    },
    {
      slug:"object-json",title:"객체를 JSON으로",short:"객체 → JSON",focus:["json","dumps","to_dict"],
      description:"객체를 딕셔너리로 바꾼 뒤 json.dumps()로 JSON 문자열을 만들어요.",output:"Amy",
      exercises:[
        {id:"object-json-c",type:"concept",title:"객체는 바로 JSON이 아니에요",body:"일반 객체는 json.dumps()가 바로 처리하지 못할 수 있어요. 먼저 to_dict()로 문자열·숫자·리스트·딕셔너리 같은 JSON 가능한 값으로 바꾼 뒤 dumps()를 사용해요.",code:'text = json.dumps(profile.to_dict())\nprint(text)',hint:"객체 → 딕셔너리 → JSON 문자열 순서로 생각하세요."},
        {id:"object-json-p",type:"predict",prompt:"profile.to_dict() 결과를 json.dumps()하면 결과의 자료형은 무엇일까요?",code:'text = json.dumps(profile.to_dict())\nprint(type(text).__name__)',choices:["str","dict","Profile","list"],answer:0,output:"str",hint:"dumps의 s는 문자열 string을 떠올리면 돼요.",explain:"json.dumps()는 JSON 형식의 문자열을 반환해요."},
        {id:"object-json-f",type:"fill",prompt:"딕셔너리를 JSON 문자열로 만들려면 어떤 함수가 들어갈까요?",code:'text = json.____(profile.to_dict())',tokens:["dumps","loads","dump","load"],answer:"dumps",hint:"파일이 아니라 문자열을 만드는 함수예요.",explain:"json.dumps()가 Python 데이터를 JSON 문자열로 직렬화해요."},
        {id:"object-json-b",type:"bughunt",prompt:"객체를 JSON 문자열로 만들기 전에 딕셔너리 변환을 빠뜨린 줄을 고르세요.",lines:['profile = Profile("Amy", 3)','text = json.dumps(profile)'],buggy:1,fixed:"text = json.dumps(profile.to_dict())",hint:"먼저 JSON이 이해할 수 있는 기본 데이터로 바꿔야 해요.",explain:"profile.to_dict() 결과를 dumps()에 전달하면 안전하게 JSON 문자열을 만들 수 있어요."},
        {id:"object-json-w",type:"write",prompt:'Profile(name, level)에 to_dict()와 to_json()을 만들고 to_json()이 json.dumps(self.to_dict())를 반환하게 하세요. Amy,3 객체를 JSON으로 만든 뒤 name을 다시 읽어 출력하세요.',starter:"# json을 import하고 Profile.to_json()을 만드세요\n",expected:"Amy",testcase:"기대 출력: Amy",hint:"to_json에서 return json.dumps(self.to_dict())를 사용하세요.",explain:"객체 상태를 JSON 문자열로 직렬화하면 저장이나 전송에 사용할 수 있어요.",model:'import json\nclass Profile:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\n    def to_dict(self):\n        return {"name": self.name, "level": self.level}\n    def to_json(self):\n        return json.dumps(self.to_dict())\nprofile = Profile("Amy", 3)\nprint(json.loads(profile.to_json())["name"])',grading:{tests:[{append:'other = Profile("Mina", 7)\nprint(json.loads(other.to_json())["level"])',expected:"7",labelKo:"다른 객체 JSON",labelEn:"another object JSON"}]},diagnostic:{ko:{cause:"to_json()이 현재 객체 상태를 JSON으로 변환하지 않았어요.",reason:"Amy 예시만 맞으면 다른 name/level 객체를 직렬화했을 때 값이 유지되지 않아요.",action:"self.to_dict() 결과를 json.dumps()에 전달해 반환하세요."},en:{cause:"to_json() is not serializing the current object's state.",reason:"A fixed Amy example does not preserve another object's name and level in JSON.",action:"Return json.dumps(self.to_dict())."}}}
      ]
    },
    {
      slug:"json-to-object",title:"JSON에서 객체 복원",short:"JSON → 객체",focus:["json","loads","reconstruction"],
      description:"JSON 데이터를 읽어 다시 클래스 객체로 만들어 프로그램의 행동을 되살려요.",output:"Amy:3",
      exercises:[
        {id:"json-to-object-c",type:"concept",title:"데이터를 다시 객체로 조립하기",body:"json.loads()로 얻은 딕셔너리의 값을 생성자에 전달하면 저장된 데이터를 다시 객체로 만들 수 있어요.",code:'data = json.loads(text)\nprofile = Profile(data["name"], data["level"])',hint:"JSON → 딕셔너리 → 클래스 생성자 순서예요."},
        {id:"json-to-object-p",type:"predict",prompt:'{"name":"Mina","level":7}을 읽어 Profile을 만들면 profile.level은 무엇일까요?',code:'data = json.loads(\'{"name":"Mina","level":7}\')\nprofile = Profile(data["name"], data["level"])\nprint(profile.level)',choices:["7","level","Mina","None"],answer:0,output:"7",hint:"level 키의 값이 생성자의 level 인자로 들어가요.",explain:"JSON의 7이 새 Profile 객체의 level 속성으로 복원돼요."},
        {id:"json-to-object-f",type:"fill",prompt:"JSON 문자열을 Python 딕셔너리로 바꾸려면 어떤 함수가 들어갈까요?",code:'data = json.____(text)',tokens:["loads","dumps","load","dump"],answer:"loads",hint:"문자열에서 읽는 함수예요.",explain:"json.loads()가 JSON 문자열을 Python 값으로 변환해요."},
        {id:"json-to-object-b",type:"bughunt",prompt:"JSON의 name과 level 순서를 뒤집어 객체를 잘못 만드는 줄을 고르세요.",lines:['data = json.loads(text)','profile = Profile(data["level"], data["name"])'],buggy:1,fixed:'profile = Profile(data["name"], data["level"])',hint:"Profile 생성자의 파라미터 순서를 확인하세요.",explain:"name에는 data[\"name\"], level에는 data[\"level\"]을 전달해야 해요."},
        {id:"json-to-object-w",type:"write",prompt:'Profile(name, level)과 profile_from_json(text) 함수를 만들어 JSON의 name과 level로 새 Profile 객체를 반환하세요. Amy,3 JSON을 복원해 "Amy:3"을 출력하세요.',starter:"# json을 import하고 profile_from_json(text)를 만드세요\n",expected:"Amy:3",testcase:"기대 출력: Amy:3",hint:'data = json.loads(text) 후 Profile(data["name"], data["level"])을 반환하세요.',explain:"저장된 데이터가 다시 메서드와 속성을 가진 객체로 복원됐어요.",model:'import json\nclass Profile:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\ndef profile_from_json(text):\n    data = json.loads(text)\n    return Profile(data["name"], data["level"])\nprofile = profile_from_json(\'{"name":"Amy","level":3}\')\nprint(f"{profile.name}:{profile.level}")',grading:{tests:[{append:'other = profile_from_json(\'{"name":"Mina","level":7}\')\nprint(f"{other.name}:{other.level}")',expected:"Mina:7",labelKo:"다른 JSON 프로필",labelEn:"another JSON profile"}]},diagnostic:{ko:{cause:"profile_from_json()이 JSON 값으로 새 Profile 객체를 만들지 않았어요.",reason:"Amy:3만 고정하면 다른 JSON의 name과 level이 객체 속성으로 복원되지 않아요.",action:'json.loads(text) 후 Profile(data["name"], data["level"])을 반환하세요.'},en:{cause:"profile_from_json() is not constructing a new Profile from the JSON values.",reason:"A fixed Amy:3 output does not restore another JSON record into object attributes.",action:'Use json.loads(text), then return Profile(data["name"], data["level"]).'}}}
      ]
    },
    {
      slug:"pet-tracker-project",title:"Pet Tracker 프로젝트",short:"OOP 미니 프로젝트",focus:["class","state","json","file"],
      description:"클래스 상태 변경과 JSON 파일 저장·복원을 하나의 작은 프로그램으로 연결해요.",output:"Mimi:2",
      exercises:[
        {id:"pet-tracker-project-c",type:"concept",title:"객체의 삶을 파일에 이어서 저장하기",body:"Pet 객체가 feed()로 energy를 바꾸고, to_dict()로 상태를 꺼낸 뒤 json.dump()로 저장할 수 있어요. 파일을 다시 읽어 Pet 객체를 만들면 이전 상태를 이어갈 수 있어요.",code:'pet.feed()\nsave_pet("pet.json", pet)\nrestored = load_pet("pet.json")',hint:"상태 변경 → 딕셔너리 → 파일 저장 → 객체 복원 순서로 연결해요."},
        {id:"pet-tracker-project-p",type:"predict",prompt:"energy가 1인 Pet이 feed()를 한 번 실행한 뒤 저장·복원되면 energy는 얼마일까요?",code:'pet = Pet("Mimi", 1)\npet.feed()\nsave_pet("pet.json", pet)\nrestored = load_pet("pet.json")\nprint(restored.energy)',choices:["2","1","0","None"],answer:0,output:"2",hint:"feed()가 저장 전에 energy를 1 올려요.",explain:"변경된 energy 2가 파일에 저장되고 새 객체에도 그대로 복원돼요."},
        {id:"pet-tracker-project-f",type:"fill",prompt:"Pet 객체의 상태 딕셔너리를 JSON 파일에 저장하려면 빈칸에 무엇이 들어갈까요?",code:'with open(filename, "w") as file:\n    json.____(pet.to_dict(), file)',tokens:["dump","load","dumps","loads"],answer:"dump",hint:"파일 객체에 직접 쓰는 JSON 함수예요.",explain:"json.dump(data, file)이 Python 데이터를 JSON 파일로 저장해요."},
        {id:"pet-tracker-project-b",type:"bughunt",prompt:"파일에서 읽은 data로 Pet을 복원하는 순서가 뒤집힌 줄을 고르세요.",lines:['data = json.load(file)','return Pet(data["energy"], data["name"])'],buggy:1,fixed:'return Pet(data["name"], data["energy"])',hint:"Pet 생성자는 name, energy 순서예요.",explain:"저장된 name과 energy를 생성자 파라미터 순서에 맞게 전달해야 해요."},
        {id:"pet-tracker-project-w",type:"write",prompt:'Pet(name, energy=0), feed(), to_dict(), save_pet(filename, pet), load_pet(filename)을 완성하세요. Mimi의 energy를 1에서 한 번 올려 저장·복원한 뒤 "Mimi:2"를 출력하세요.',starter:"# Pet Tracker를 완성하세요\nimport json\n",expected:"Mimi:2",testcase:"기대 출력: Mimi:2",hint:'feed는 self.energy += 1, 저장은 json.dump(pet.to_dict(), file), 복원은 Pet(data["name"], data["energy"])을 사용하세요.',explain:"클래스의 상태와 행동을 파일 저장까지 연결해 작은 지속형 프로그램을 완성했어요.",model:'import json\nclass Pet:\n    def __init__(self, name, energy=0):\n        self.name = name\n        self.energy = energy\n    def feed(self):\n        self.energy += 1\n    def to_dict(self):\n        return {"name": self.name, "energy": self.energy}\ndef save_pet(filename, pet):\n    with open(filename, "w") as file:\n        json.dump(pet.to_dict(), file)\ndef load_pet(filename):\n    with open(filename, "r") as file:\n        data = json.load(file)\n    return Pet(data["name"], data["energy"])\npet = Pet("Mimi", 1)\npet.feed()\nsave_pet("pet.json", pet)\nrestored = load_pet("pet.json")\nprint(f"{restored.name}:{restored.energy}")',grading:{tests:[{append:'other = Pet("Bori", 4)\nother.feed()\nother.feed()\nsave_pet("other-pet.json", other)\nloaded = load_pet("other-pet.json")\nprint(f"{loaded.name}:{loaded.energy}")',expected:"Bori:6",labelKo:"다른 Pet의 누적 상태",labelEn:"another Pet with accumulated state"}]},diagnostic:{ko:{cause:"Pet의 상태 변경·저장·복원이 하나의 흐름으로 연결되지 않았어요.",reason:"Mimi:2만 고정하면 다른 Pet에서 feed()로 바뀐 energy가 파일을 거쳐 새 객체에 유지되지 않아요.",action:"self.energy를 변경하고, to_dict()를 dump한 뒤 load한 data로 새 Pet을 만들어 반환하세요."},en:{cause:"The Pet state update, save, and restore flow is not connected end to end.",reason:"A fixed Mimi:2 result does not preserve another Pet's changed energy through the JSON file.",action:"Update self.energy, dump pet.to_dict(), then construct and return a new Pet from the loaded data."}}}
      ]
    }
  ];

  const UNIT6_EN=UNIT6_KO.map(lesson=>JSON.parse(JSON.stringify(lesson)));

  const EN_TEXT={
    "class-blueprint":{title:"Class Blueprint",short:"Classes & objects",description:"Define shared structure with a class and create objects that use its attributes."},
    "init-self":{title:"__init__ and self",short:"Initialization",description:"Store a different starting value on each object inside __init__."},
    "instance-method":{title:"Object Behavior",short:"Instance methods",description:"Use instance methods to make an object act on its own attributes."},
    "state-change":{title:"Changing Object State",short:"State changes",description:"Update self attributes in methods so an object remembers its changing state."},
    "object-collection":{title:"Working with Many Objects",short:"Object lists",description:"Put multiple objects in a list and process them with the same loop."},
    "inheritance-basics":{title:"Inheritance Basics",short:"Inheritance",description:"Reuse initialization and attributes from a parent class in a more specific child class."},
    "object-to-dict":{title:"Object to Dictionary",short:"to_dict",description:"Convert object state into a plain dictionary that is easy to save."},
    "object-json":{title:"Object to JSON",short:"Object → JSON",description:"Convert an object to a dictionary, then serialize it to a JSON string."},
    "json-to-object":{title:"JSON Back to an Object",short:"JSON → object",description:"Read JSON data and construct a new class instance so behavior is available again."},
    "pet-tracker-project":{title:"Pet Tracker Project",short:"OOP project",description:"Connect object state changes with JSON file save and restore in one small program."}
  };
  UNIT6_EN.forEach(lesson=>Object.assign(lesson,EN_TEXT[lesson.slug]||{}));

  function clone(value){return JSON.parse(JSON.stringify(value))}
  function appendUnit(target,items){
    if(!Array.isArray(target))return false;
    const slugs=new Set(target.map(item=>item&&item.slug));
    const already=items.every(item=>slugs.has(item.slug));
    if(already)return target.length>=TARGET_COUNT;
    if(target.length!==PREVIOUS_COUNT)return false;
    target.push(...items.map(clone));
    return true;
  }

  const koReady=appendUnit(window.MEOWDE_LESSONS_KO,UNIT6_KO);
  const enReady=appendUnit(window.MEOWDE_LESSONS_EN,UNIT6_EN);
  const ready=Boolean(koReady&&enReady&&window.MEOWDE_LESSONS_KO.length>=TARGET_COUNT&&window.MEOWDE_LESSONS_EN.length>=TARGET_COUNT);

  if(ready)document.documentElement.dataset.unit6Curriculum="v461";
  window.MeowCurriculumUnit6=Object.freeze({
    version:VERSION,previousCount:PREVIOUS_COUNT,targetCount:TARGET_COUNT,
    ready,lessons:Object.freeze(UNIT6_KO.map(item=>item.slug))
  });
  window.__MEOWDE_VERSION__=VERSION;
})();