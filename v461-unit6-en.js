(function applyMeowdeV461Unit6English(){
  "use strict";

  const VERSION="4.61-unit6-english";
  const lessons=Array.isArray(window.MEOWDE_LESSONS_EN)?window.MEOWDE_LESSONS_EN:[];
  const COPY={
    "class-blueprint":{
      lesson:{title:"Class Blueprint",short:"Classes & objects",description:"Define shared structure with a class and create objects that use its attributes."},
      exercises:{
        "class-blueprint-c":{title:"A blueprint and its objects",body:"A class is a blueprint for creating objects. Attributes defined on a class can be read from objects created from that class.",hint:"Use a colon after the class name and parentheses when creating an object."},
        "class-blueprint-p":{prompt:"What does mimi.species print?",choices:["cat","Cat","species","Error"],hint:"mimi is an object created from Cat.",explain:"The mimi object can read the species value defined on Cat."},
        "class-blueprint-f":{prompt:"Which keyword starts the Cat class?",hint:"It is the Python keyword for defining an object blueprint.",explain:"class Cat: defines a new class."},
        "class-blueprint-b":{prompt:"Choose the line with the syntax error in the class definition.",hint:"A class declaration ends with a colon.",explain:"Use class Cat: to begin the class block."},
        "class-blueprint-w":{prompt:'Create a Cat class with species = "cat". Create one Cat object and print its species.',starter:"# Create Cat and one object\n",testcase:"Expected output: cat",hint:'Define species = "cat" inside class Cat.',explain:"Another object from the same class can reuse the same class attribute."}
      }
    },
    "init-self":{
      lesson:{title:"__init__ and self",short:"Initialization",description:"Store a different starting value on each object inside __init__."},
      exercises:{
        "init-self-c":{title:"Store per-object values",body:"__init__ runs when an object is created. self.name = name stores the argument as an attribute on that specific object.",hint:"self refers to the object currently being created."},
        "init-self-p":{prompt:'What does Cat("Bori").name print?',hint:"__init__ stores the name argument in self.name.",explain:"Bori becomes the name attribute of that Cat object."},
        "init-self-f":{prompt:"What conventional first parameter refers to the current instance?",hint:"It is the conventional first parameter of instance methods.",explain:"self lets a method access the current object's attributes."},
        "init-self-b":{prompt:"Choose the line that fails to store name on the object.",hint:"Use self.attribute to keep the value after __init__ ends.",explain:"self.name = name stores the value on the object."},
        "init-self-w":{prompt:'Create Cat(name), store name in self.name, and print Cat("Mimi").name.',starter:"# Store name in __init__\n",testcase:"Expected output: Mimi",hint:"Use self.name = name inside __init__.",explain:"Each Cat object can now hold a different name."}
      }
    },
    "instance-method":{
      lesson:{title:"Object Behavior",short:"Instance methods",description:"Use instance methods to make an object act on its own attributes."},
      exercises:{
        "instance-method-c":{title:"Keep data and behavior together",body:"A function inside a class is a method. With self, it can use attributes such as the current object's name.",hint:"Call a method as object.method()."},
        "instance-method-p":{prompt:'What does Cat("Mimi").greet() return?',choices:["Hi Mimi","Mimi","Hi self","Error"],hint:"greet uses self.name inside the string.",explain:"The current object's name, Mimi, is inserted into the greeting."},
        "instance-method-f":{prompt:"Which name calls the current object's greeting method?",hint:"Use parentheses to execute the method.",explain:"cat.greet() calls the method on that object."},
        "instance-method-b":{prompt:"Choose the line that does not read the current object's name.",hint:"Object attributes are accessed through self.",explain:"Use self.name to read the current object's value."},
        "instance-method-w":{prompt:'Add greet() to Cat(name) so it returns "Hi name". Print Cat("Mimi").greet().',starter:"# Add a greet method\n",testcase:"Expected output: Hi Mimi",hint:'Return f"Hi {self.name}".',explain:"The same method uses each object's own name."}
      }
    },
    "state-change":{
      lesson:{title:"Changing Object State",short:"State changes",description:"Update self attributes in methods so an object remembers its changing state."},
      exercises:{
        "state-change-c":{title:"Update state with a method",body:"Methods can change object attributes. self.level += 1 changes the actual level stored on that object, so the new value remains for later calls.",hint:"Update self.attribute rather than a temporary local variable."},
        "state-change-p":{prompt:"What prints after level_up() once from level 2?",hint:"self.level += 1 stores one more than the previous value.",explain:"The stored level changes from 2 to 3."},
        "state-change-f":{prompt:"What belongs in the blank to update the current object's level?",hint:"The current object owns the attribute.",explain:"self.level updates the state of that object."},
        "state-change-b":{prompt:"Choose the line that changes only a local variable instead of object state.",hint:"Store the result back into self.level.",explain:"self.level += 1 updates the object itself."},
        "state-change-w":{prompt:"Create Player(level) with level_up() that increases level by 1. Start at 2, call it once, and print level.",starter:"# Create Player and level_up\n",testcase:"Expected output: 3",hint:"Use self.level += 1 inside level_up.",explain:"Object state persists, so repeated calls accumulate."}
      }
    },
    "object-collection":{
      lesson:{title:"Working with Many Objects",short:"Object lists",description:"Put multiple objects in a list and process them with the same loop."},
      exercises:{
        "object-collection-c":{title:"Objects can live in lists",body:"Objects can be list values just like strings or numbers. A for loop can pull out each object and read attributes such as student.name.",hint:"The loop is familiar; each value just happens to be a Student object."},
        "object-collection-p":{prompt:"What do the two Student names become when joined in order?",choices:["Amy,Mina","Student,Student","Amy Mina,","Error"],hint:"Read .name from each object.",explain:"Amy and Mina are joined in the same order as the objects."},
        "object-collection-f":{prompt:"Which attribute reads the student's name?",hint:"Use dot notation with the attribute name.",explain:"student.name reads the name from each Student object."},
        "object-collection-b":{prompt:"Choose the line that passes objects themselves into string join.",hint:"join needs strings, so read each object's name.",explain:"Join student.name strings rather than Student objects."},
        "object-collection-w":{prompt:"Create Student(name) and names(students), returning all object names joined by commas. Print the result for Amy and Mina.",starter:"# Create Student and names(students)\n",testcase:"Expected output: Amy,Mina",hint:'You can return ",".join(student.name for student in students).',explain:"The same function works with a different number of objects."}
      }
    },
    "inheritance-basics":{
      lesson:{title:"Inheritance Basics",short:"Inheritance",description:"Reuse initialization and attributes from a parent class in a more specific child class."},
      exercises:{
        "inheritance-basics-c":{title:"Keep shared code in a parent",body:"class Cat(Animal): makes Cat inherit from Animal. super().__init__(name) reuses the parent's initialization code.",hint:"The class in parentheses is the parent class."},
        "inheritance-basics-p":{prompt:'If Cat reuses Animal.__init__, what is Cat("Mimi").name?',hint:"super().__init__(name) runs the parent's self.name assignment.",explain:"The Cat object receives the name attribute defined by Animal initialization."},
        "inheritance-basics-f":{prompt:"Which parent class belongs in the blank?",hint:"Put the parent class inside parentheses after the child name.",explain:"class Cat(Animal): inherits from Animal."},
        "inheritance-basics-b":{prompt:"Choose the line that calls the parent initializer incorrectly.",hint:"Call super() first, then access __init__.",explain:"super().__init__(name) runs the parent's initializer."},
        "inheritance-basics-w":{prompt:'Create Animal(name) and a Cat child class. Cat.describe() should return "Cat:name". Print Cat("Mimi").describe().',starter:"# Create Animal and Cat with inheritance\n",testcase:"Expected output: Cat:Mimi",hint:"Call super().__init__(name) in Cat and use self.name in describe.",explain:"Shared initialization stays in the parent while Cat adds its own behavior."}
      }
    },
    "object-to-dict":{
      lesson:{title:"Object to Dictionary",short:"to_dict",description:"Convert object state into a plain dictionary that is easy to save."},
      exercises:{
        "object-to-dict-c":{title:"Extract object state",body:"A to_dict() method can turn self.name and self.level into a normal dictionary. This is a common step before saving as JSON.",hint:"Use the object's current attributes as dictionary values."},
        "object-to-dict-p":{prompt:'For name=Mimi and level=3, what is to_dict()["level"]?',hint:"to_dict stores self.level under the level key.",explain:"The object's level 3 becomes the dictionary value for level."},
        "object-to-dict-f":{prompt:"What should read the current object's name?",hint:"Current object attributes are accessed through self.",explain:'Use {"name": self.name} to copy the current value.'},
        "object-to-dict-b":{prompt:"Choose the line that hardcodes level and fails for another object.",hint:"Different objects can have different levels.",explain:"Use self.level instead of the fixed number 3."},
        "object-to-dict-w":{prompt:'Create Profile(name, level) with to_dict() returning {"name": current name, "level": current level}. Print the level for Mimi, 3.',starter:"# Create Profile and to_dict\n",testcase:"Expected output: 3",hint:'Return {"name": self.name, "level": self.level}.',explain:"The current object state is now represented as plain data."}
      }
    },
    "object-json":{
      lesson:{title:"Object to JSON",short:"Object → JSON",description:"Convert an object to a dictionary, then serialize it to a JSON string."},
      exercises:{
        "object-json-c":{title:"Objects are not automatically JSON",body:"A custom object may not be directly serializable. Convert it to basic JSON-friendly values with to_dict(), then call json.dumps().",hint:"Think object → dictionary → JSON string."},
        "object-json-p":{prompt:"What type does json.dumps(profile.to_dict()) return?",hint:"The s in dumps can remind you of string.",explain:"json.dumps() returns a JSON-formatted string."},
        "object-json-f":{prompt:"Which function makes a JSON string from a dictionary?",hint:"This version creates a string rather than writing a file.",explain:"json.dumps() serializes Python data into a JSON string."},
        "object-json-b":{prompt:"Choose the line that skips converting the custom object to plain data.",hint:"Convert the object into JSON-friendly data first.",explain:"Passing profile.to_dict() lets dumps serialize the state safely."},
        "object-json-w":{prompt:"Add to_dict() and to_json() to Profile(name, level). to_json() should return json.dumps(self.to_dict()). Serialize Amy,3, parse it, and print name.",starter:"# Import json and create Profile.to_json()\n",testcase:"Expected output: Amy",hint:"Return json.dumps(self.to_dict()) from to_json.",explain:"Serialized object state can now be stored or transmitted."}
      }
    },
    "json-to-object":{
      lesson:{title:"JSON Back to an Object",short:"JSON → object",description:"Read JSON data and construct a new class instance so behavior is available again."},
      exercises:{
        "json-to-object-c":{title:"Rebuild an object from data",body:"After json.loads() gives you a dictionary, pass its values into the class constructor to rebuild an object.",hint:"Think JSON → dictionary → constructor."},
        "json-to-object-p":{prompt:'After loading {"name":"Mina","level":7}, what is profile.level?',hint:"The level value becomes the constructor's level argument.",explain:"The JSON value 7 becomes the new Profile object's level."},
        "json-to-object-f":{prompt:"Which function converts a JSON string into Python data?",hint:"This version reads from a string.",explain:"json.loads() converts a JSON string into Python values."},
        "json-to-object-b":{prompt:"Choose the line that passes name and level in the wrong order.",hint:"Match the Profile constructor parameter order.",explain:'Pass data["name"] to name and data["level"] to level.'},
        "json-to-object-w":{prompt:'Create Profile(name, level) and profile_from_json(text) returning a new Profile from JSON. Restore Amy,3 and print "Amy:3".',starter:"# Import json and create profile_from_json(text)\n",testcase:"Expected output: Amy:3",hint:'After json.loads(text), return Profile(data["name"], data["level"]).',explain:"Saved data is reconstructed as an object with attributes again."}
      }
    },
    "pet-tracker-project":{
      lesson:{title:"Pet Tracker Project",short:"OOP project",description:"Connect object state changes with JSON file save and restore in one small program."},
      exercises:{
        "pet-tracker-project-c":{title:"Continue an object's life through a file",body:"A Pet can change energy with feed(), expose state with to_dict(), save it with json.dump(), and later rebuild a new Pet from that file.",hint:"Connect state change → dictionary → file save → object reconstruction."},
        "pet-tracker-project-p":{prompt:"A Pet starts with energy 1, feeds once, then is saved and restored. What is its energy?",hint:"feed() runs before the object is saved.",explain:"The updated energy 2 is saved and restored into the new object."},
        "pet-tracker-project-f":{prompt:"Which JSON function writes the Pet dictionary directly to a file?",hint:"This version writes to a file object.",explain:"json.dump(data, file) stores Python data in a JSON file."},
        "pet-tracker-project-b":{prompt:"Choose the line that reconstructs Pet with constructor arguments in the wrong order.",hint:"Pet expects name, then energy.",explain:"Pass the saved values back in the same order as the constructor parameters."},
        "pet-tracker-project-w":{prompt:'Complete Pet(name, energy=0), feed(), to_dict(), save_pet(filename, pet), and load_pet(filename). Start Mimi at 1, feed once, save and restore, then print "Mimi:2".',starter:"# Complete the Pet Tracker\nimport json\n",testcase:"Expected output: Mimi:2",hint:'Use self.energy += 1, json.dump(pet.to_dict(), file), and Pet(data["name"], data["energy"]).',explain:"You connected class state and behavior to persistent JSON storage."}
      }
    }
  };

  let patched=0;
  for(const [slug,copy] of Object.entries(COPY)){
    const lesson=lessons.find(item=>item&&item.slug===slug);
    if(!lesson)continue;
    Object.assign(lesson,copy.lesson||{});
    for(const exercise of lesson.exercises||[]){
      const next=copy.exercises&&copy.exercises[exercise.id];
      if(next)Object.assign(exercise,next);
    }
    patched++;
  }

  const ready=patched===Object.keys(COPY).length;
  if(ready)document.documentElement.dataset.unit6English="v461";
  window.MeowCurriculumUnit6English=Object.freeze({version:VERSION,ready,patched});
  window.__MEOWDE_VERSION__=VERSION;
})();