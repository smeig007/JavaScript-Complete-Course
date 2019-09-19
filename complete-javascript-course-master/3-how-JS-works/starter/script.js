///////////////////////////////////////
// Lecture: Hoisting...the function execution is hoisted up to the top....ONLY works on FUNCTION DECLARATIONS......
//
// This works as it's a function declaration...
/*calculateAge(1992);
//
function calculateAge(year){
    console.log(2018 - year);
}
*/
//
// however this wont work - as it's a "function expresion"
/*retirement(1970);
//
var retirement = function(year){
    console.log(65 - (2018 - year));
}
*/
//
// Variables.....
/* 1st console log will return as "undefined" as we've not declared "age" yet.....
console.log(age);
var age = 46;
console.log(age);
*/
// However if we console log an unknown variable, it'll come back saying "job is not defined"...
//console.log(job);
//
/*
function foo() {
    var age = 65;
    console.log(age);
}
//
foo();
console.log(age);
*/
//
//
//
//
///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/
//
//
//
///////////////////////////////////////
// Lecture: The this keyword
/*
console.log(this);
//
calculateAge(1972);
//

// this is a 'regular function call' (always points to the 'window object') it is NOT a 'method' so the 'this' keyword is associated with the gloabl (window) object...
function calculateAge(year) {
    console.log(2016 - year);
    console.log(this);
}
*/
//
var greig = {
    name : 'greig',
    yearOfBirth : 1972,
    // following line is a method...
    calculateAge : function () {
        // the 'this' on the following line is associated with the 'greig' object and NOT the global (window) object....as it's a method.
        console.log(this);
        console.log(2018 -  this.yearOfBirth);
        /*
        function innerFunction () {
            // 'this' is referring to the global (window) object and NOT the 'greig' object because the rule is - "that when a regular function call happens then the default object is the global (window) object....as that how it happens in the browser.
            console.log(this);
        }
        innerFunction();
        */
    }
}
greig.calculateAge();
//
//
var simon = {
    name : 'Simon',
    yearOfBirth : 1971
};
// Method Borrowing.....
simon.calculateAge = greig.calculateAge;
simon.calculateAge();


















