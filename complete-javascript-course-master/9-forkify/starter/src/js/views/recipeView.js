//
import { elements } from './base';
//
import { Fraction } from 'fractional';
//
//
export  const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};
//
// Make the quantities fractions
const formatCount = count => {
    if (count) {
        // examples - count = 2.5  ---> 2 1/2
        //          - count = 0.5  ---> 1/2
        // We going to destructure the object (count) (and define two variables, int and dec) by using the square brackets.
        // once the two variables (int,dec) are set, they're now strings we need them back as integers, so using map we create an new array, then use 
        // parseInt, with base 10 as the numbering format. 
        //
        // Sometimes we end up with weird long numbers being passed into "formatCount" like 0.333333333333 or 17.666666666666 etc. the FRACTION function
        // cant handle these, so we need to ROUND the number to 4 decimal places. MATH.ROUND only returns an integer. So the work around for this is 
        // to multiply the amount by 10000 (because we want 4 decimal places (so 3 decimal places would be 1000)), then divide by 10000.
        const newCount = Math.round(count * 1000) / 10000;
        //
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));
        //
        if (!dec) return newCount;
        //
        if (int === 0) {  // ie it's 0.5
            const frac = new Fraction(newCount);
            return `${frac.numerator}/${frac.denominator}`;
        } else {          // ie is it 2.5, so 2.5 - 2 = 0.5
            const frac = new Fraction(newCount - int);
            return `${int} ${frac.numerator}/${frac.denominator}`;
        }
    }
    return '?';
};
//
const createIngredient = ingredient => `
    <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="${ingredient.unit}">g</span>
        ${ingredient.ingredient}
    </div>
    </li>
`;
//
//
export const renderRecipe = (recipe, isLiked) => {
    //console.log(recipe.ingredients);
    // Populate a temperal string....
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
        </div>
        
        <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

        </div>
        
        <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')};             
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    //console.log(elements.recipe);
    //
    // Render the results (elements is defined in "base.js").
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
//
//
// Display the updated servings and ingredients, if either + or - has been clicked on
export const updateServingsIngredients = recipe => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    //
    // update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};




