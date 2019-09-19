//
//
// ** NOTE =  "axios" is a popular HTTP request libary....now need to IMPORT the package...
import axios from 'axios';
//
// import from the configuration file
import { proxy, myKey } from '../config';
//
//
// Define a new class, MUST always have a constructor !
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    //
    async getRecipe() {
        try {                                  
            const result = await axios(`${proxy}https://www.food2fork.com/api/get?key=${myKey}&rId=${this.id}`);
            // Ascertain info about the selected reciepe. 
            this.title       = result.data.recipe.title;
            this.author      = result.data.recipe.publisher;
            this.img         = result.data.recipe.image_url;
            this.url         = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
            //console.log(result);
        } catch (error) {
            console.log(error);
            alert('I have had an error !');
        }
    }
    // Work out a very basic time estimate for the dish selected. Assume we will need 15 per 3 ingredients
    calcTime() {
        const numIng  = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time     = periods * 15;
    }
    //
    // Work out the number of servings this selected dish can make.
    calcServings() {
        this.servings = 4;
    }
    //
    parseIngredients () {
        // create two arrays, 1st one holds the current description which we search for in the recipe, the 2nd array is what we're going to replace it with. 
        const unitsLong  = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        //
        // "destructure" the array unitsShort (using the 3 dots ...) then add a couple more elements to it. 
        const units      = [...unitsShort, 'kg', 'g'];
        //
        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform the ingredients into consistent units, ie cup/cups or tablespoon/tbsp....etc they need to be the same. Convert to lower case.
            let ingredient = el.toLowerCase();
            //
            // loop around the ingredients array to convert the units to a standard unit. i = position in the array unit = current element being read.
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // 2. Remove any parentheses.  NOTE - "regular expressions" ALWAYS start with a / and end with a /
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // 3. Parse the ingredients into 1) count, 2) units 3) ingredients themselves.
            //    1st split the words into a new array using split
            const arrIng = ingredient.split(' ');
            //    Then looking through the string, pass each one (el2) into a callback function looking for a match in the short description arrary (unitsShort), if it's found 
            //    then save the index of the array element (into unitIndex) for later use. 
            //    ** NOTE this used to use unitsShort, but now uses units - this is because we've added extra elements to the array to check for (kg, g), we dont swap them or
            //    ** standardise them, as they're already ok, we just need to check for them when we do the search along the string to find the array position of the unit.
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            //
            let objIng;
            //
            if (unitIndex > -1) {
            // ** There is a unit in the array text - ie 2 1/2 cup of sugar
            // We know the position of the unit (its in unitIndex), so from array element position 0 up to and NOT including the position of the unit (unitIndex) save the amount 
            // into a new variable.
            const arrCont = arrIng.slice(0, unitIndex);
            let count;
            //
            if (arrCont.length === 1) {
                // only 1 number (ie 2) so only need the first element. This also handles if the element contains 1-1/2, which EVAL amends to 1.5
                count = eval(arrIng[0].replace('-', '+'));
            } else {
                // more than one number (ie 2 1/2) so need to start from element 0 up to where we find the unit (unitIndex) and join the elements together using a + 
                // then using EVAL we evaluate the string (2 1/2) which return the value of 2.5
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }
            //
            objIng = {
                count,
                unit       : arrIng[unitIndex],
                ingredient : arrIng.slice(unitIndex + 1).join(' ')
            }
              // ** There is no unit but the 1st element in the array IS a number - ie 1 slice of bread
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count      : parseInt(arrIng[0], 10),
                    unit       : '',
                    // we want all the ingredients from position 1 (as position 0 hold the number of units which we dont want) to the end of the array, the following line 
                    // doesn't have/need an end position, we start at position 1, leave the end position empty meaning we go to the end of the array. Then we join all the elements
                    // back together into a single string. 
                    ingredient : arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
            // ** There is no unit and no number in the 1st element - ie salt and pepper
                objIng = {
                    count : 1,
                    unit  : '',
                    ingredient
                }
            }
            //
            //console.log(objIng);
            //
            return objIng;
        });
        this.ingredients = newIngredients;
    }
    //
    // Update the servings and amount of ingredients if '+' or '-' is hit on the screen ...
    updateServings(type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        //
        // ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });
        //
        // update the 'this' amount 
        this.servings = newServings;
    }
}