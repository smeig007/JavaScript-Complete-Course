// Lecture = let and const (was var in ES5)
//
/*
// ES5 way...
//
var name5 = 'Jane Smith';
var age5  = 23;
name5     = 'Jane Miller';
//
console.log(name5);
//
//
// ES6 way...this will error as 'const' are not allowed to change their value ! 'let' is similar to 'var'
const name6 = 'Jane Smith';
let   age6  = 23;
name6       = 'Jane Miller';
//
console.log(name6);
*/
//
//
// VERY important 'let' and 'const' are BLOCKED scoped and not function scoped as 'var' is, the following ES6 code will fail, as you can not used name and yearOfBirth outside of the 'if' block, although you ARE still inide the function 'driversLicense'.
//
//
/*
// ES5.....
function driversLicense5 (passedTest) {
    if (passedTest) {
        var name = 'John';
        var yearOfBirth = 1990;
    }
    console.log(name + ', born in ' + yearOfBirth + ', is now allowed to drive. 5');
}
//
driversLicense5(true);
//
/* ES6......wont work, as the console.log doesn't have access to the 2 variabels as it's outside the block.
function driversLicense6a (passedTest) {
    if (passedTest) {
        let name = 'John';
        const yearOfBirth = 1990;
    }
    console.log(name + ', born in ' + yearOfBirth + ', is now allowed to drive. 6a');
}
//
driversLicense6a(true);
*/
//
/* ES6......this will work
function driversLicense6b (passedTest) {
    // Declare the name here, but dont need to assign anything to it.
    // Declare AND assign the yearOfBirth as it is a 'constant'.
    // The console.log will now work as the 2 variables, name and yearOfBirth are defined.
    let name;
    const yearOfBirth = 1990;
    //
    if (passedTest) {
        name = 'John';
        }
    console.log(name + ', born in ' + yearOfBirth + ', is now allowed to drive. 6b');
}
//
driversLicense6b(true);
*/
//
//
//
//
// Lecture = Blocks and IIFES.
//
/* ES5 - private variables inside an IFFE. The console.log will fail as 'c' is inside a private function.
(function() {
    var c = 3;
}) ();
//
console.log(c);
//
//
// ES6 - will fail as 'a' and 'b' are declared inside a block (as defined by the squiggly brackets).
{
    const a = 1;
    let   b = 2;
}
//
console.log(a + b);
*/
//
//
//
// Lecture = Strings.
/*
let firstName = 'John';
let lastName  = 'Smith';
const yearOfBirth = 1990;
//
function calcAge(year) {
    return 2018 - year;
}
//
// ES5....
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');
//
// ES6....using template literals,start it off using a `
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);
//
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('h'));
console.log(n.includes('J'));
*/
//
//
//
//
//
// Lecture = Arrow functions
/*
const years = [1990, 1965, 1982, 1937];
//
// ES5...
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);
//
//
// ES6....
let ages6a = years.map(el => 2016 - el);
console.log(ages6a);
//
// or
//
// in case you need to pass in more than one parameter, you need to use brackets....
let ages6b = years.map((el, index) => `6b - Age element ${index + 1} : ${2016 - el}.`);
console.log(ages6b);
//
//
// If the statement goes over more than 1 line, you HAVE to use the {} and also use the return command !
let ages6c = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `6c - Age element ${index + 1} : ${age}.`
});
console.log(ages6c);
*/
//
//
//
//
// Lecture = Arrow functions, Lexical 'THIS' keyword.
/*
// ES5..
var box5 = {
    colour : 'green',
    position : 1,
    clickMe  : function () {
        // as 'this.' cant be used inside the below function store it into a new variable instead, so we can use the information contained in the 'this' variable. Commonly nameed as 'self' but can call it anything you like.
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            var string = 'es5 - This is box number '  + self.position + ' and it is ' + self.colour + '.';
            // pop up a box using the alert method...
            alert(string);
        });
    }
}
// call the 'clickMe' method...
//box5.clickMe();
*/
/*
// ES6..
const box6a = {
    colour : 'green',
    position : 1,
    clickMe  : function () {
        // With arrow functions 'this.' is shared so no need to store it some where...
        document.querySelector('.green').addEventListener('click', () => {
            var string = 'es6 - This is box number '  + this.position + ' and it is ' + this.colour + '.';
            // pop up a box using the alert method...
            alert(string);
        });
    }
}
// call the 'clickMe' method...
box6a.clickMe();
*/
//
//
/*
function Person(name) {
    this.name = name;
}
// ES5
Person.prototype.myFriends5 = function(friends) {
    var array = friends.map(function(el) {
        return this.name + ' is friends with ' + el + '.';
    }.bind(this));
    console.log(array);
}
//
var friends = ['Bob', 'Jane', 'Fred'];
//
new Person('John').myFriends5(friends);
//
//
//
// ES6
Person.prototype.myFriends6 = function(friends) {
    var array = friends.map(el => `${this.name} is friends with ${el}`);
    console.log(array);
}
new Person('Fred').myFriends6(friends);
*/
//
//
//
//
//
//
//
// Lecture - Destructuring...
/*
// The object john is an array, with two elements name and age. Need to take each element out of the array and put them into their own variables....
//
// ES5
var john  = ['John', 26];
var name5 = john[0];
var age5  = john[1];
//
//
// ES6
const [name6, age] = ['Fred', 33];
console.log(name6);
console.log(age);
//
//
// also....construct the object...
const obj = {
  firstName : 'Bob',
  lastName  : 'Jones'
};
console.log(obj);
//
// Deconstruct the object....
const {firstName, lastName} = obj;
//
console.log(firstName);
console.log(lastName);
//
// if you wish to rename the variabels...
const {firstName : a, lastName: b} = obj;
//
console.log(a);
console.log(b);
//
//
//
// ES5
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
const [age2,retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);
*/
//
//
//
//
//
/* Lecture - Arrays in ES6
const boxes = document.querySelectorAll('.box');
//
//
// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
//
boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'red';
});
//
//
// ES6...
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
//
//
//
// ES5
for (var i = 0; i < boxesArr5.length; i ++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }
    boxesArr5[i].textContent = 'I\'ve changed to BLUE !';
}
//
//
// ES6
for (const cur of boxesArr6) {
    if (cur.className.includes ('blue')) {
        continue;
    }
    cur.textContent = 'I\'m NOW blue...';
}
//
//
//
//ES5
var ages = [12, 17, 6, 21, 14, 11];
//
var full = ages.map(function(cur) {
   return cur >= 18;
});
//
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);
//
//
// ES6
// To get the index number where the call back function is true...
console.log(ages.findIndex(cur => cur >= 18));
// To get the value of the element where the call back function is true...
console.log(ages.find(cur => cur >= 18));
*/
//
//
//
//
//
// Lecture - The Spread operator (these are used in the function call ! )
/*
function addFourAges(a, b, c, d) {
    return a + b + c + d;
};
//
var sum1 = addFourAges(18, 30, 12, 21);
//
console.log(sum1);
//
//
// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);
//
//
// ES6 - this is used in the function call.
var sum3 = addFourAges(...ages);
console.log(sum3);
//
//
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
//
const bigFamily = [...familySmith,'Lilly',...familyMiller];
//
console.log(bigFamily);
//
//
// Change the colour of the text...
// Select the heading text by it's element name, not class or id, so no need for a . or #
const heading = document.querySelector('h1');
// Select the text in ALL the boxes use the class name
const boxes = document.querySelectorAll('.box');
// join the two objects together using the spread operator (...)
const allText = [heading, ...boxes];
console.log(allText);
//
Array.from(allText).forEach(cur => cur.style.color = 'purple');
*/
//
//
//
//
//
//
// Lecture - Rest Parameters (these are used in the function declaration ! )
/*
//ES5
function isFullAge5() {
    // put each parameter being passed into 'isFullAge' into an array.
    var argsArray = Array.prototype.slice.call(arguments);
    // loop around the new array, looking ot see if they're greater than 18 (diplays true or false).
    argsArray.forEach(function(cur) {
       console.log((2016 - cur) >= 18);
    })
}
//
//isFullAge5(1990, 1999, 1965, 2016, 1987);
//
//
// ES6 - this is used in the function declaration !
function isFullAge6(...years) {
    years.forEach(cur => console.log((2016 - cur) >= 18));
}
//
isFullAge6(1990, 1999, 1965, 2016, 1987);
*/
//
//
//
/*
function isFullAge5(limit) {
    // display all the argurments passed in, include the age limit, currently set to 21.
    //console.log(arguments);
    // put each parameter being passed into 'isFullAge' into an array. By now including the 1 in the statement the SLICE command will start 'copying' the array from position 1, thus what ever is passed into the funciton in position 0 is ignred and NOT put in the the array called argsArray.
    var argsArray = Array.prototype.slice.call(arguments, 1);
    // the first parameter, currently set to 21 will not be in the argsArray object.
    //console.log(argsArray);
    // loop around the new array, looking ot see if they're greater than 18 (diplays true or false).
    argsArray.forEach(function(cur) {
       console.log((2016 - cur) >= limit);
    })
}
// Now pass in an age liimt in postion 0, currently set to 21.
//isFullAge5(21, 1990, 1999, 1965, 2016, 1987);
//
//
// ES6 - this is used in the function declaration !
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2016 - cur) >= limit));
}
//
isFullAge6(16, 1990, 1999, 1965, 2016, 1987);
*/
//
//
//
//
//
// Lecture - Default parameters
/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    //
    lastName === undefined ? lastName = 'Smith' : lastName;
    nationality === undefined ? nationality = 'USA' : nationality;
    //
    this.firstName   = firstName,
    this.yearOfBirth = yearOfBirth,
    this.lastName    = lastName,
    this.nationality = nationality
}
//
var john = new SmithPerson('John', 1972);
console.log(john);
//
var emily = new SmithPerson('emily', 1982, 'Jones');
console.log(emily);
*/
/*
// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'USA') {
    //
    this.firstName   = firstName,
    this.yearOfBirth = yearOfBirth,
    this.lastName    = lastName,
    this.nationality = nationality
}
var john = new SmithPerson('John', 1972);
console.log(john);
//
var emily = new SmithPerson('Emily', 1982, 'Jones');
console.log(emily);
*/
//
//
//
//
//
//
// Lecture - Maps (ES6 only)
/*
const question = new Map();
//
// Build the map up
question.set('question', 'What is the latest major version of JavaScript ?');
//
question.set(1, 'ES5 ?');
question.set(2, 'ES6 ?');
question.set(3, 'ES2015 ?');
question.set(4, 'ES7 ?');
//
question.set('correct', 3);
//
question.set(true, 'Correct Answer !');
question.set(false, 'Wrong ansswer, Please Try again');
//
console.log(question.get('question'));
console.log(question.size);
//
// Remove one...
//question.delete(4);
//console.log(question.size);
//
// Conditionally remove one....using the has method.
//if (question.has(1)) {
//    question.delete(1);
//    console.log(question.size);
//}
//
// Remove everything from the map.......using clear.
//question.clear();
//
// Loop through a map - same as an array. Hence we can use forEach....
//question.forEach((value, key) => console.log(`This is key number ${key} and the value it contains is ${value}` ));
//
// OR
//
//for (let [key, value] of question.entries()) {
//    console.log(`This is key number ${key}, the value it contains is ${value}`);
//}
/*
for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
    console.log(`Answer ${key} is : ${value}`);
    }
}
//
const answer = parseInt(prompt('Please enter the answer'));
//
console.log(question.get(answer === question.get('correct')));
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
//
// Lecture - Classes
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name        = name;
    this.yearOfBirth = yearOfBirth;
    this.job         = job;
}
//
Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}
//
var john5 = new Person5('John', 1990, 'driver');
//
console.log(john5);
//
//
// ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name        = name;
        this.yearOfBirth = yearOfBirth;
        this.job         = job;
    }
    calculateAge () {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    static greeting() {
        console.log('Hello, this is the static greeting');
    }
}
//
const fred6 = new Person6('Fred', 1980, 'teacher');
//
console.log(fred6);
//
Person6.greeting();
*/
//
//
//
//
// Lecture - Classes with Subclasses
/*/
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name        = name;
    this.yearOfBirth = yearOfBirth;
    this.job         = job;
}
//
Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}
//
var john5 = new Person5('John', 1990, 'driver');
//
//console.log(john5);
//
var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals       = medals;
}
//
// Now join the class (Person5) with the subclass (Athlete5)
Athlete5.prototype = Object.create(Person5.prototype);
//
// This must go after the join - ELSE - a message will appear in the console say "wonMedals" is not a function.
Athlete5.prototype.wonMedal = function() {
    this.medals ++;
    console.log(this.medals);
}
//
var johnAthlete5 = new Athlete5('johnAthlete', 1990, 'swimmer', 3, 10);
//
//console.log(johnAthlete5);
//
johnAthlete5.calculateAge();
//
johnAthlete5.wonMedal();
*/
//
//
// ES6
/*
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name        = name;
        this.yearOfBirth = yearOfBirth;
        this.job         = job;
    }
    calculateAge () {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(`The age is ${age}.`);
    }
}
//
class Athlete6 extends Person6 {
    constructor (name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olmpicGames = olympicGames;
        this.medals      = medals;
    }
    wonMedal () {
        this.medals ++;
        console.log(`The new number of medales are ${this.medals}.`);
    }
}
//
const fredAthlete6 = new Athlete6('Fred', 1980, 'sprinter', 7, 12);
//
fredAthlete6.calculateAge();
//
fredAthlete6.wonMedal();
*/
//
//
//
//
//
//
//
//
// Coding Challenge - Parks & Street Info..........
//
// create the main class (which is the 'superclass')
class Element {
    constructor (name, buildYear) {
    this.name      = name;
    this.buildYear = buildYear;
    }
}
//
// create the Parks sub-classe
class Parks extends Element {
    constructor (name, buildYear, numOfTrees, parkSize) {
        super(name, buildYear);
        this.numOfTrees = numOfTrees;
        this.parkSize   = parkSize;
    }
    // Add a method into the sub-class to ascertain the densisty of a park.
    treeDensity() {
        const density = this.numOfTrees / this.parkSize;
        console.log(`  ${this.name} has a tree density of ${density} in a square meter.`);
    }
}
// create the Streets sub-class
class Streets extends Element {
    // Default the street size type with a value of normal (type = 3).
    constructor (name, buildYear, streetLength, streetSize = 3) {
        super (name, buildYear);
        this.streetLength = streetLength;
        this.streetSize   = streetSize;
    }
    // add a method to the sub-class to ascertian its sizing.
    streetDef () {
        const typeOfStreet = new Map();
        typeOfStreet.set(1, 'tiny');
        typeOfStreet.set(2, 'small');
        typeOfStreet.set(3, 'normal');
        typeOfStreet.set(4, 'big');
        typeOfStreet.set(5, 'huge');
        //console.log(this.streetSize);
        console.log(`  ${this.name}, built in ${this.buildYear}, is classed as ${typeOfStreet.get(this.streetSize)} street.`);
    }
}
// Define the 3 parks within an array.
const allParks = [new Parks ('Rose Park', 1945, 399, 2.8),
                  new Parks ('Lily Park', 1914, 501, 1.1),
                  new Parks ('Violet Park', 1916, 355, 3.6)
                 ];
//
// Define the streets in an array.
const allStreets = [new Streets ('Grays Lane', 1930, 2.7, 4),
                    new Streets ('CaonsField', 1932, 0.4, 2),
                    new Streets ('Cadwell Lane', 1939, 1.4, 3),
                    new Streets ('High Street', 1889, 5.7,5)
                   ];
//
// Generic function to calculate average ages...
function calcAve(array) {
    // use REDUCE to take all the elements in 'array' and reduce it to a single number, by looping round adding all the numbers up, bit like a for...loop, initialise the total to 0 first.
    const sum = array.reduce((total, amount, index) => total + amount, 0);
    // return both the sum and also an average.
    return [sum, sum / array.length];
}
//
// Get and print to the console the parks Information.
function parksInfo (infoOnPark) {
    console.log('*** Park Report ***');
    // execute the densisty method contained in the Parks class above.
    infoOnPark.forEach(el => el.treeDensity());
    // Work out the age of each park.
    const totalAges = infoOnPark.map(el => new Date().getFullYear() - el.buildYear);
    // Average age of the park, call generic averages function
    const [totAges, aveAge] = calcAve(totalAges);
    console.log(`  The average age of all our parks is ${aveAge} years.`);
    // Find out which park has more then 500 trees in it
    const treesOver500 = infoOnPark.map(el => el.numOfTrees).findIndex(el => el >= 500);
    //
    console.log(`  ${infoOnPark[treesOver500].name} has over 500 trees in it.`);
    console.log('*** End of Park Report ***');
}
//
// Get and print to the console the street information.
function streetInfo (infoOnStreet) {
    console.log('*** Street Report ***');
    // Get the total street length and the average stree length by calling the generic averages function.
    const [totStreetLen, aveStreetLen] = calcAve(infoOnStreet.map (el => el.streetLength));
    //
    console.log(`Our ${infoOnStreet.length} streets have a total length of ${totStreetLen} meters, the average street length is ${aveStreetLen} meters.`);
    //
    // execute the street definition method contained in the Streets class above.
    infoOnStreet.forEach(el => el.streetDef());
    //
    console.log('*** End of Street Report ***');
}


// Execute the parkInfo function, passing in the allParks array.
parksInfo(allParks);
//
// Execute the streetIno function, passing in the allStreets array.
streetInfo(allStreets);































