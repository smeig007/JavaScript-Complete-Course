/*export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const ID = 77;
export const getInput = () =>
*/
//
//
import { elements } from './base';
//
export const getInput = () => elements.searchInput.value;
// 
// Clear last entered search text.
export const clearInput = () => {
    elements.searchInput.value = '';
};
//
// Clear last selection list down the left hand side of the screen.
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML   = '';
};
//
export const highlightSelected = id => {
    const resultsArray = Array.from(document.querySelectorAll('.results__link'));
    resultsArray.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};
//
// Title can not be longer than 17 characters, this is so it fits on a single line and not over multiple lines, so 1st check if its < 17, if so nothing to do, else find 
// the last 'whole' word and add 3 dots, if that's more than 17, need to remove this word, add 3 dots and check again if its <17 chars.
//
// Example recipe = " Pasta with tomato and spinach"
// acc : 0 / acc + cur.length = 5 / newTitle = ['Pasta']
// acc : 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
// acc : 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with' 'Tomato']
// acc : 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with' 'Tomato']    - 18 is greater than the limit so can not add the word 'and' into the newTitle, but the loop will continue.
// acc : 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with' 'Tomato'] 
// acc : 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with' 'Tomato']    - 24 is greater than the limit so can not add the word 'spinach' into the newTitle, but the loop will continue.
//
export const limitRecipeTitle  = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        // Split the title using a 'space' or ' ' as the splitting parameter. Using the example above we now have an array (newTitle) which as 5 elements in it - 1 = Pasta,
        // 2 = with, 3 = tomato, 4 = and, 5 = spinach
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                // the accumulator, or counter (acc) starts at 0, we add the lenght of the current word to the accumulator and see if it's less than the limit, if it is we add
                // it to the 'new' title by using the puch command....
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        // return the result
        return `${newTitle.join(' ')}...`;
    } 
    return title;
};
//
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    // Add each recipe to the recipe list, after the last one found, ie 1 exists next recipe is #2, next recipe is #3 etc etc
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};
//
// Private function to create the buttons...
// type = 'prev' or 'next'
// data-<any name you want> is storing the actual page number that's been passed into createButton function for juse later on. See "index/.js" on the event listener for the
// paging button.
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;
//
//
// Private function to render the 'page' buttons...
const renderButtons = (page, numberResults, resultsPerPage) => {
    // math.ceil will round UP to the nearest integer, so 4.8 = 5, 4.4 = 5, 4.1 = 5
    const pages = Math.ceil(numberResults / resultsPerPage);
    let button ;
    //
    if (page === 1 && pages > 1) {
        // display 1 button to go to the next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // diplay forward and backwards buttons
        button = `${createButton(page, 'next')}
                  ${createButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1) {
        // display 1 button to go to previous page
        button = createButton(page, 'prev');
    }
   elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
//
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    // This gives us 10 results per page...
    const start = (page - 1) * resultsPerPage;
    const end   = page * resultsPerPage;
    // Slice extracts but does NOT include the end (so 10 is the end on page 1, however it selects 9...page 2 the end is 20, but 19 is the last one selected)
    recipes.slice(start, end).forEach(renderRecipe);
    // render pagiation buttons
    renderButtons(page, recipes.length, resultsPerPage);
};
//
//
//
