// Global app controller
/*
import string from './models/Search';
//
//import {add, multiply, ID} from './views/searchViews';
//
// The imported functions MUST be named the same as the exported function - however thay can be renamed (bit like SQL) as follows...
//import {add as a, multiply as m, ID} from './views/searchViews';
//
// Or you import "everything" from the other script as follows...
import * as searchView from './views/searchViews';
//
console.log(`Using imported functions....${searchView.add(searchView.ID, 2)} and ${searchView.multiply(5, 2)}. Also the string ${string}.`);
*/
//
//
// START OF THE FORKIFY APP.....
//
//  https://www.food2fork.com/api/search
// API Key for food2fork - 2c99696aa96f0a0dcd199393fe08b817
//
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchViews';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
//
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - shopping list object
 * - liked recipies
 */
const state = {};
//
//
// SEARCH CONTROLLER...
//
// Asyncronous functions ALWAYS return a PROMISE !
const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();
    //const query = 'pizza';
    //console.log(query);
    // 
    if (query) {
            // 2) New search object AND add it to state.
            state.search = new Search(query);
            //
            // 3) Prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);
            //
            try {
                // 4) Search for recipes
                await state.search.getResults();
                //
                // 5) Renders results on UI
                clearLoader();
                //console.log('I am before the call to render results');
                searchView.renderResults(state.search.result);
                //console.log('Ater the call to render results');
            } catch (error) {
                alert('Error within Search controller');
                clearLoader();
                }
    }
}
// Add an event listener on the "submit" button....
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // stop the page reloading.
    controlSearch();
});
//
// Add event listeners for thr paging buttons
elements.searchResPages.addEventListener('click', e => {
    const butt = e.target.closest('.btn-inline');
        if (butt) {
        // get the page number we want to go to...
        const goToPage = parseInt(butt.dataset.goto, 10);
        // clear the page before we display the new data...
        searchView.clearResults();
        // display the new data + the new buttons...
        searchView.renderResults(state.search.result, goToPage);
    }
});
//
//
// RECIPE CONTROLLER...
//
const controlRecipe = async () => {
    // get the recipe id from the url, which is after the # in the url, hence using the .hash to get it. Just need to remove the # from the string.
    const id = window.location.hash.replace('#', '');
    // check there's a recipe id first...
    if (id) {
        // prepare UI for any change
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //
        // highlight the selected search item
        if (state.search) searchView.highlightSelected(id);
        //
        // highlight selected search item - if id has been selected.
        searchView.highlightSelected(id);
        //
        // create new recipe object, using the 'state' object and passing in the id we've just got from the URL
        state.recipe = new Recipe(id);
        //
        try {
            // get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //
            // calculate servings and timings
            state.recipe.calcTime();
            state.recipe.calcServings();
            //
            // render recipe
            //console.log(state.recipe);      
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
            //
        } catch (error) {
            console.log(error);
            alert('Error processing recipe');
        }
   };
};
// 
/* See if the recipe has changed, thus the hash number will also change.
window.addEventListener('hashchange', controlRecipe);
//
// See if the page has been reloaded
window.addEventListener('load', controlRecipe);
*/
// add the same event listener to two different events, so taking the above two events, which both call controlRecipe, this makes it even simpler...
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
//
//
// List controller...
//
const controlList = () => {
    // create/initialise a new list, if one doesn't already exist.
    if (!state.list) state.list = new List();
    //
    // add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        //
        console.log(item);
        //
        listView.renderItem(item);
    });
}
//
//
// Like controller...
//
const controlLike = () => {
 if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    // User has NOT liked this recipe, yet
    if (!state.likes.isLiked(currentID)) {
        // Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle on/off the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);
        console.log(state.likes);
    // User HAS already liked this recipe
    } else {
        // Delete like from state
        state.likes.deleteLike(currentID);
        // Toggle on/off the like button
        likesView.toggleLikeBtn(false);
        // Delete like from UI list
        likesView.deleteLike(currentID);
        console.log(state.likes);
    }
    // hide/show the likes icon (heart in the top right).
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
//
//
window.addEventListener('load', () => {
    state.likes = new Likes();
    // Restore any previously liked recipes from the localStorage.
    state.likes.readStorage();
    // Toggle like menu buttons.
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    // Render existing likes 
    state.likes.likes.forEach(like => likesView.renderLike(like));
});
//
//
// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    // handle delete button
    if(e.target.matches('.shopping__delete. .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        //
        // delete from UI
        listView.deleteItem(id);
    // Handle count update
    } else if (e.target.matches('shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }

});
//
//  handle button clicks 
elements.recipe.addEventListener('click', e => {
    // the asterix * means any child (universal selector inside the parent element).
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button has been clicked. Only if the current servings are greater than 1, or we get negative servings
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button has been clicked.
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) { 
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // like controller
        controlLike();
    }
});
//

