//
// Budget Controller...........
var budgetController = (function (){
    // Function constructors start with a CAPITAL letter.
    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc  = desc;
        this.value = value;
        this.percentage = -1;
    };
    // Calculate THIS expense element as a percentage of ALL the income amounts totalled up.
    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0 ) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    //
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };
    //
    var Income = function(id, desc, value) {
        this.id = id;
        this.desc  = desc;
        this.value = value;
    };
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });
        // update the relevant (inc or exp) totals in the global dictionary a couple of lines below.
        data.totals[type] = sum;
    };
    //  'data' object which contains 'allItems' object, which is then made up of 2 arrays.
    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        // also a 'totals' object within the 'data' object which has 2 arrays.
        totals : {
            exp: 0,
            inc: 0
        },
        budget : 0,
        percentage : -1
    };
    // create a new income or expense object.
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // work out the id for the new object to be added. Records can be removed/added, so need the last element of the array - 1 (as arrays start at 0, but the lenght starts at 1), then increment this number by 1, so for example, existing array looks like  [1 2 3 4 5], so the next id needs to be 6, or if the array looks like this [1 2 4 6 8] next id needs to be 9. if you take the lenght of this array it is 5, 5 + 1 = 6, but ID 6 already exists. Need to get the value of the last element then add 1....
            // Create new ID....
            if (data.allItems[type] > 0 ) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            //
            //console.log('new ID ->' + ID + '<-  type ->' + type + '<-');
            //
            // Create new item based on the type, an income or expense ?
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            //console.log('newItem ->' + newItem + '<-');
            //
            // add the new inc/exp item into the data.allItems array.
            data.allItems[type].push(newItem);
            // Return the new item, make the newItem public to the method(s) which call this method,.
            return newItem;
        },
        deleteItem : function(type, id) {
            var ids, index;
            // example :-
            // id = 6
            // data.allItems[type][id];
            // ids = [1 2 4 6 8 ]
            // index would be 3, as 6 is the 3rd element in the array, rmemember arrays start at 0.
            // indexof returns an array.
            ids = data.allItems[type].map(function (current) {
                return current.id
            });
            //
            index = ids.indexOf(id);
            //
            // -1 means the index hasn't been found, ie the id=6, but 6 doesn't exist as an element in the array.
            if (index !== -1) {
                // splice removes elements from an array. It has a starting (element) position, in this example index is the starting position, assuming in the exmaple above we're trying to delete id = 6, which is position 3 in the array - as arrays start at 0, id = 6 is the first element to be deleted. The second parameter is the number of elements to deleted from the starting position, in our example it is 1. So only one element will be deleted.
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget : function() {
            // 1. calculate total income and expenses.
            calculateTotal('exp');
            calculateTotal('inc');
            // 2. calcualte the budget, ie income - expenses.
            data.budget = data.totals.inc - data.totals.exp;
            // 3. calculate the percentage of the income that we have spent, only if we have an income > 0
            if (data.totals.inc > 0 ) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentages : function () {
            // call the percentages function for each element in the 'expenses' array.
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);
            });
        },
        getPercentages : function () {
            var allPercentages = data.allItems.exp.map(function(curr) {
               return curr.getPercentage();
            });
            return allPercentages;
        },
        //
        getBudget : function(){
            return {
                budget     : data.budget,
                totalInc   : data.totals.inc,
                totalExp   : data.totals.exp,
                percentage : data.percentage
            };
        },
        // Only for testing purposes, comment out the , on the line above for this to run.
        testing : function() {
            console.log(data);
        }
    };
}) ();
//
//
// UI Controller...........
var UIController = (function() {
    // create some private variables to save the hardcoding throughout the program. These are from the HTML, the dot identifies the class name.
    var DOMStrings = {
        inputType            : '.add__type',
        inputDesc            : '.add__description',
        inputValue           : '.add__value',
        inputButton          : '.add__btn',
        incomeContainer      : '.income__list',
        expensesContainer    : '.expenses__list',
        budgetLabel          : '.budget__value',
        incomeLabel          : '.budget__income--value',
        expenseLabel         : '.budget__expenses--value',
        percentageLabel      : '.budget__expenses--percentage',
        container            : '.container',
        expensesPercentLabel : '.item__percentage',
        dateLabel            : '.budget__title--month'
    };
    //
     var formatNumber = function(num, type) {
        var num, numSplit, int, dec;
        // Remove any + or - signs with what's entered, just get the absolute number.
        num = Math.abs(num);
        // Round the number to 2 decimal places.
        num = num.toFixed(2);
        // Insert a comma into the number string if greater than 1000, using the split command, which will look for the decial place and split the integer and the decial into 2 elements of an array. Split puts the results inot an array.
        numSplit = num.split('.');
        int      = numSplit[0];
        if (int.length > 3) {
            // Check to see the size of the number entered (int.lenght - 3) :-
            // Input --> 2310.46  --> output 2,310.46
            // Input --> 23510.46 --> output 23.510.46
            int = int.substr(0, int.length - 3) + ','  + int.substr(int.length - 3, 3);
        }
        dec      = numSplit[1];
        // Concatinate and return the numnber, use the ternary expression to get the correct sign.
        //type === 'exp' ? sign = '-' : sign = '+';
        return (type === 'exp' ? '-' : '+') + ' '  + int + '.' + dec;
    };
    var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
        }
    };
    //
    return {
      getInput: function() {
          return {
            // am going to return an object, hence the use of the {} this means an object....
            // use a : instead of and =     : is defining properties of an object (object is getInput, the 3 properties are type,desc, value)
            type  : document.querySelector(DOMStrings.inputType).value, //this will either be inc or exp
            desc  : document.querySelector(DOMStrings.inputDesc).value,
            // parseFloat - converts a string to a number !! (like conv or pic)
            value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
          };
        },
        //
        addListItem : function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text. Update variable html based on type.
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }
            // Replace the placeholder text with some actual data.
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            // Call the above private function to format the number, before assigning it to variable newHtml.
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            //
            // Insert the HTML into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem : function(selectorID) {
            var element = document.getElementById(selectorID);
            // first need to select the 'parent id' (parentNode) of the element we want to delete (element), then say remove the child (element again).
            element.parentNode.removeChild(element);
        },
        // clear down the input fields.
        clearFields : function() {
            var fields, fieldsArray;
            // querySelectorAll will return a list of things.
            fields = document.querySelectorAll(DOMStrings.inputDesc + ', ' + DOMStrings.inputValue);
            // fields is a list, not an array, need to trick the 'slice' method to think fields is an array, as "slice" will retunrn an array only as long as an array is passed to it in the first place.
            fieldsArray = Array.prototype.slice.call(fields);
            //
            fieldsArray.forEach(function(current, index, array) {
                current.value = '';
            });
            // Put the focus to the description field after they've been cleared down.
            fieldsArray[0].focus();
            // Or you could do this...
            //document.querySelector(DOMStrings.inputDesc).focus();
        },
        displayBudget : function(obj) {
            // Need the type to pass into the formatNumber function, but we dont have it yet, so check if the budget amount is +ve or -ve and assign to the type here....
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            //
            document.querySelector(DOMStrings.budgetLabel).textContent  = formatNumber(obj.budget, type);   document.querySelector(DOMStrings.incomeLabel).textContent  = formatNumber(obj.totalInc, 'inc'); document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0 ) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }   else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },
        //
        displayPercentages : function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentLabel);
            //
            nodeListForEach(fields, function(current, index){
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
           });
        },
        displayDate : function() {
            var now, year, month;
            today = new Date();
            // var christmas = new Date(year, month, day);
            // var christmas = new Date(2018, 11, 25);
            var month = new Array();
            month[0]  = "January";
            month[1]  = "February";
            month[2]  = "March";
            month[3]  = "April";
            month[4]  = "May";
            month[5]  = "June";
            month[6]  = "July";
            month[7]  = "August";
            month[8]  = "September";
            month[9]  = "October";
            month[10] = "November";
            month[11] = "December";
            var month = month[today.getMonth()];
            //
            year  = today.getFullYear();
            // Update the DOM with the year...
            document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;

        },
        // New method to change the colurs depending on the tpye (inc = blue, exp = red).
        changeType : function () {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDesc + ',' +
                DOMStrings.inputValue);
            //
            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMStrings.inputButton).classList.toggle('red');
        },
        //as well as returning getInput, also make public the private DOMStrings object to use elsewhere.
        getDOMStrings : function () {
            return  DOMStrings;
         }
    };
}) ();
//
//
//
//
// Global App Controller............
var controller = (function (budgetCtrl, UICtrl) {
    //
    var setUpEventListener  = function() {
        // put all the event listeners in one place
        // Get the now public object where the hard coding has taken place
        var DOM = UICtrl.getDOMStrings();
        // User clicked the green tick button to confirm the input.......
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        // User clicked ok (this is code 13) to  confirm the input.......
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        // Add a listener for when a user clicks on the delete button on incomes or expenses lists...
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        // Add a listener for when a user changes the type of inc/exp...this will change the colours later.
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };
    //
    var updateBudget = function() {
        // 1. calculate budget
        budgetCtrl.calculateBudget();
        // 2. return the budget
        var budget = budgetCtrl.getBudget();
        // 3. display budget in the user interface (UI)
        UICtrl.displayBudget(budget);
    };
    //
    var updatePercentages = function() {
        // 1. Calculate new percentages.
        budgetCtrl.calculatePercentages();
        // 2. Read the new percentages from the budget controller.
        var percentages = budgetCtrl.getPercentages();
        // 3. Display the new percentages in the user interface (UI).
        UICtrl.displayPercentages(percentages);
    };
    //
    var ctrlAddItem = function() {
        // Variable declaration.
        var input, newItem;
        // 1. get the input data.
        input = UICtrl.getInput();
        console.log(input);
        //
        // Only do the following if a description AND value are entered.
        if (input.desc !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. add item to budget controller.
            newItem = budgetCtrl.addItem(input.type, input.desc, input.value);
            // 3. add new item to user interface (UI)
            UIController.addListItem(newItem, input.type);
            // 4. clear input fields.
            UIController.clearFields();
            // 5. Calculate and update the budget.
            updateBudget();
            // 6. Calculate and update percentages.
            updatePercentages();
        };
     };
    //
    var ctrlDeleteItem = function(event) {
        console.log(event);
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID ) {
            splitID = itemID.split('-');
            type = splitID[0];
            // parseInt - converts a string to an integer, the splitID is a string, we pass in ID to budgetCtrl.deleteItem which is checking for the number 1, it'll never match so the IF statement will always be set to -1.
            ID   = parseInt(splitID[1]);
            //
            // 1. delete the item from the data structure. (type = inc/exp, id = 3 or 5 or 6 etc.)
            budgetCtrl.deleteItem(type, ID);
            // 2. delete the item from the UI (User Interface). (itemID = income-0 or expense-3 or expense-4 etc. this is in the HTML file.)
            UICtrl.deleteListItem(itemID);
            // 3. Update and show the budget.
            updateBudget();
            // 4. Calculate and update percentages.
            updatePercentages();
        }
    };
    // Initialise function, also runs the eventlistener function.
    return {
        init : function () {
            console.log('Apllication has now started....');
            UICtrl.displayDate();
            UICtrl.displayBudget( {
                budget     : 0,
                totalInc   : 0,
                totalExp   : 0,
                percentage : -1
            });
            setUpEventListener();
        }
    };
}) (budgetController, UIController);
//
//
//
// Run the initialise function.
controller.init();







