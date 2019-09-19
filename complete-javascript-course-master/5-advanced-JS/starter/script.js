//
// Function constructor.
/*
// Old way....
var john = {
    name: 'John',
    yearOfBirth : 1990,
    job: 'driver'
};
//
// New way...
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
// Attach a method to the constructor functions prototype property....Common way...
Person.prototype.calculateAge = function() {
        console.log(2016 - this.yearOfBirth);
};
//
// Another way is to add a property....this isn't very common...
//
Person.prototype.lastName = 'Jones';
//
var john = new Person('John', 1990, 'driver');
var jane = new Person('Jane', 1969, 'nurse');
var mark = new Person('Mark', 1948, 'retired');
//
john.calculateAge();
jane.calculateAge();
mark.calculateAge();
//
console.log('last name ->' + john.lastName + '<-');
console.log('last name ->' + jane.lastName + '<-');
console.log('last name ->' + mark.lastName + '<-');
//
*/
//
/*
// Object.create
//
//Object.create() is a Javascript function which takes 2 arguments and returns a new object.
//
//The first argument is an object which will be the prototype of the newly created object.
//
//The second argument is an object which will be the properties of the newly created object.
//
var personProto = {
    calculateAge : function() {
        console.log('age is ->' + 2018 - this.yearOfBirth);
    }
}
//
var john = Object.create(personProto);
//
john.name = 'john';
john.yearOfBirth = 1972;
john.job = 'rally driver';
//
//
// OR
//
var jane = Object.create(personProto,
    {
    name : {value : 'jane'},
    yearOfBirth : {value : 1969},
    job : {value : 'secreary'}
});
*/
//
//
//
// Primitives versus object.....
//
// Primitives (ie they have NO properties) = boolean, null, numbers, strings, undefined
//
// Prmatives ACTUALLY hold the value, objects only hold the reference to where the value is stored.
//
/*
// Primatives.....
var a = 23;
var b = a;
a = 46;
//
console.log('a ->' + a + '<-');
console.log('b ->' + b + '<-');
//
//
// Objects....
var obj1 = {
    name : 'john',
    age : 22
};
//
var obj2 = obj1;
//
obj1.age = 33;
//
console.log(obj1.age);
console.log(obj2.age);
//
//
// Functions...
var age = 25;
var obj = {
    name : 'bob',
    city : 'hitchin'
};
//
function change(a, b) {
    a = 30;
    b.city = 'dunstable';
}
//
change(age, obj);
//
console.log('age ->' + age + '<-');
console.log('city ->' + obj.city + '<-');
//
*/
//
//
//
// FUNCTIONS...........
//
// Passing functions as arguments. Call back function.
/*
var years = [1946, 1972, 1990, 1999, 2007];
//
function arrayCalc(arr, fn) {
    // declare an empty array....
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        // push (ie add to the end) the current element into the empty array after calling the function...
        arrRes.push(fn(arr[i]));
    }
    // return the new contents to of the array....
    return arrRes;
}
//
// calculate the age from element being passed in....
function calculateAge(el) {
    return 2018 - el;
}
//
// calculate if the age is >=18 (true) or not (false)
function isFullAge(el){
    return el >= 18;
}
//
// calculate max heart rate if age >=18 and less < 81
function maxHeartRate(el) {
    if (el >=18 && el < 81){
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}
//
// store the ages returned from the function(s)..
var ages = arrayCalc(years, calculateAge);
//
// store true/false vales if ages (return in 1st call to arrayCalc) are >=18 (true) or less than (false)
var fullAge = arrayCalc(ages, isFullAge);
//
// store the max hear rates when the age is >= 18 and < 81 or -1 if not.
var maxHeart = arrayCalc(ages, maxHeartRate);
//
console.log(ages);
console.log(fullAge);
console.log(maxHeart);
*/
//
//
//
//
// Functions returning functions.........
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is ?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('what is the subject you teach please, ' + name + ' ?');
        }
    } else {
        return function(name) {
            console.log('What job do you do, ' + name + ' ?');
        }
    }
}
//
// declare variables to hold the result of the call to the function interviewQuestion...
var teacherQuestion  = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
//
// Call the variable (teacherQuestion) which holds the function interviewQuestion details.
teacherQuestion('John');
designerQuestion('John');
//
// Another way to call the function is to call it with two parameters, they work left to right.
interviewQuestion('teacher')('Jimmy');
/*
//
//
//
//
//
//
// Immediately Invoked Functional Expressions (IIFE)
//
// old way, lot of effort to create a hidden variable (score).
/* function game() {
    var score = Math.random() * 10;
    console.log(score > 4);
}
//
game();
//
console.log(score);
*/
//
//
//
//
//
//
//
// IIFE examples...Immediately invoked function expression.
/*
 (function () {
    var score = Math.random() * 10;
    console.log(score > 4);
}) ();
//
// The javascript parser treats things inside paranthases () as expesion. Anything inside paranthases can NOT be STATEMENT !!!!
//
// (); calls/invokes the statement
/*
//
(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score > 4 - goodLuck);
}) (5);
*/
//
//
//
//
//
//
//
//
//
// Closures.......
/*
function retirement(retirementAge) {
    var a = ' years left until retirement';
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        //console.log('retirement age = ' + retirementAge);
        //console.log('persons age = ' + age);
        console.log((retirementAge - age) + a);
    }
}
//
var retirementAgeUk = retirement(65);
var retirementAgeIceland = retirement(67);
var retirementAgeUSA = retirement(70);
//
retirementAgeUk(1972);
retirementAgeIceland(1972);
retirementAgeUSA(1972);
//
//OR
retirement(65)(1972);
//
//
// Interview questions - using Closeures....
function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is ?');
        } else if (job === 'teacher') {
            console.log('what is the subject you teach please, ' + name + ' ?');
        } else {
            console.log('What job do you do, ' + name + ' ?');
        }
    }
}
//
interviewQuestion('teacher')('Jimmy');
*/
//
//
//
//
//
// Bind.....CALL.....APPLY
//
// .call ---> allows us to set the 'this' property. Then parms as comma delimited
// .apply --> allows us to set the 'this' property. Then pass the parms as an array.
//
// .bind ---> Similar to 'call', but doesn't immediately call the function straight away, but instead creates a copy of the function, so it can be stored somewhere.
//
/*
var john = {
    name: 'john',
    age: 26,
    job: 'teacher',
    presentation : function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', ladies and gentlemen. I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hi ! What\s up ! I\'m ' + this.name + ' I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};
//
john.presentation('formal', 'morning');
//
var emily = {
    name: 'emily',
    age: 35,
    job: 'designer'
};
//
// Use CALL to borrow Johns's method....this is method borrowing. First argument in the brackets (emily...is setting the 'this.' johns method, so instead of johns data ie age etc it'll be emily's data...
john.presentation.call(emily, 'friendly', 'afternoon');
//
//
// Use APPLY to borrow Johns's method....ie method borrowing. Difference is the parms are passed as an array.
john.presentation.apply(emily, ['friendly', 'day']);
//
//
// Use BIND...set only the 1st parm, not both of them. (bit like hard coding - called currying) it doesn't immediately call the function straight away, but instead generates a copy to be run later. Using BIND returns a function, so need to store it in a VARiable. Still need the first agrument to set the 'this.' variable, in this case it's john.
var johnFriendly = john.presentation.bind(john, 'friendly');
//
johnFriendly('lunch');
johnFriendly('night');
//
// Using BIND returns a function, so need to store it in a VARiable. Still need the first agrument to set the // 'this.' variable, in this case it's emily.
var emilyFormal = john.presentation.bind(emily, 'formal');
//
emilyFormal('bum');
*/
//
//
//
//
//
/*
var years = [1946, 1972, 1990, 1999, 2007];
//
function arrayCalc(arr, fn) {
    // declare an empty array....
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        // push (ie add to the end) the current element into the empty array after calling the function...
        arrRes.push(fn(arr[i]));
    }
    // return the new contents to of the array....
    return arrRes;
}
//
// calculate the age from element being passed in....
function calculateAge(el) {
    return 2018 - el;
}
//
// calculate if the age is >=18 (true) or not (false)
function isFullAge(limit, el) {
    return el >= 18;
}
//
var ages = arrayCalc(years, calculateAge);
//
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
//
console.log(ages);
console.log(fullJapan);
*/
//
//
//
//
//
//
// Prototype explanation code....sort of.
/*
function doSomething(){};
doSomething.prototype.foo = "bar";      // add a property onto the prototype
//console.log( doSomething.prototype );
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";   // add a property onto the object
console.log(doSomeInstancing);
*/
//
// It does not matter how you declare the function, a function in JavaScript will always have a default
// prototype property.
//var doSomething = function(){};
//console.log(doSomething.prototype);
//
/*
function doSomething(){};
//
doSomething.prototype.foo = "bar";
//
var doSomeInstancing = new doSomething();
//
doSomeInstancing.prop = "some value";
//
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);
*/
//
/*
// So, when you call....
var o = new Foo();
//
// JavaScript actually just does....
var o = new Object();
o.[[Prototype]] = Foo.prototype;
Foo.call(o);
//
//(or something like that) and when you later do....
//
o.someProp;
//it checks whether o has a property someProp. If not, it checks Object.getPrototypeOf(o).someProp, and if that doesn't exist it checks Object.getPrototypeOf(Object.getPrototypeOf(o)).someProp, and so on.
*/
//
//
//
//
// Coding challenge 7. Part 1.
//
// Make it an Immediately invoked function expression (IIFE).
/*
(function() {
    // Firstly create the function constructor.
    function Question(question, aswers, correct) {
        this.question = question;
        this.answers = aswers;
        this.correct = correct;
    }
    //
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    };
    //
    Question.prototype.displayAnswer = function(ans) {
        if (ans === this.correct) {
            console.log('Correct Answer');
        } else {
            console.log('Wrong answer, please try again');
        }
    };

    var q1 = new Question('Is Javascript the coolest programming language ?',
                         ['Yes', 'No'],
                         0);
    //
    var q2 = new Question('Whats the name of this course\'s teacher ?',
                         ['John', 'Mike', 'Jonas'],
                         2);
    //
    var q3 = new Question('What does best describe coding ?',
                         ['Hard', 'Fun', 'Boring', 'Tedious'],
                         1);
    //
    var questions = [q1, q2, q3];
    //
    // math.floor - removes the decimal values, so we get an integer returned.
    var randomNumber = Math.floor(Math.random() * questions.length);
    //
    // get a random question....
    questions[randomNumber].displayQuestion();
    //
    // Pop up a little dialogue box, in which the answer will be typed into.
    var answer = parseInt(prompt('Please enter the correct answer :'));
    //
    // Check to see if the users answer matches the correct answer.
    questions[randomNumber].displayAnswer(answer);
})  ();
*/
//
//
//
// // Coding challenge 7. Part 2.
// Expert level for the same 'quiz' function above....
//
(function() {
    // Firstly create the function constructor.
    function Question(question, aswers, correct) {
        this.question = question;
        this.answers = aswers;
        this.correct = correct;
    }
    //
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    };
    //
    Question.prototype.displayAnswer = function(ans, callback) {
        var score;
        if (ans === this.correct) {
            console.log('Correct Answer');
            // This is the keepScore variable/return function
            score = callback(true);
        } else {
            console.log('Wrong answer, please try again');
            // This is the keepScore variable/return function
            score = callback(false);
        }
        this.displayScore(score);
    };
    //
    // Write a methos to dsplay the current score in the console
    Question.prototype.displayScore = function(score) {
        console.log('Your current score is ->' + score + '<-');
        console.log('------------------------------------------------------');
    };

    //
    var q1 = new Question('Is Javascript the coolest programming language ?',
                         ['Yes', 'No'],
                         0);
    //
    var q2 = new Question('Whats the name of this course\'s teacher ?',
                         ['John', 'Mike', 'Jonas'],
                         2);
    //
    var q3 = new Question('What does best describe coding ?',
                         ['Hard', 'Fun', 'Boring', 'Tedious'],
                         1);
    //
    var questions = [q1, q2, q3];
    //
    // Keep a running score.
    function runningScore() {
        var score = 0;
        return function(correct) {
            if (correct) {
                score++;
            }
            return score;
        }
    }
    //
    var keepScore = runningScore();
    //
    // Create a function, which asks the functions repeatedly.
    function nextQuestion(){
        // math.floor - removes the decimal values, so we get an integer returned.
        var randomNumber = Math.floor(Math.random() * questions.length);
        //
        // get a random question....
        questions[randomNumber].displayQuestion();
        //
        // Pop up a little dialogue box, in which the answer will be typed into. Remove the parseInt from the check, otherwise the string will get converted to a number and with never = "exit"
        var answer = prompt('Type exit to leave the game or please enter the correct answer :');
        console.log('Answer  ->' + answer + '<-');
        //
        // Once the initial question has been displayed, answered and checked, call the function again for the next question, only if the user hasn't exited.
        if (answer !== 'exit') {
            // Check to see if the users answer matches the correct answer. Add the parseInt in here...
            questions[randomNumber].displayAnswer(parseInt(answer), keepScore);
            //
            nextQuestion();
            }
        }
//
// Now the initial call to the function we just created.
nextQuestion();
//
})  ();











































