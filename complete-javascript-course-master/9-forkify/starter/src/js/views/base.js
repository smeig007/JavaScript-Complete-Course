//
// These are the elements which make up the page bing displayed to the user.
export const elements = {
    searchForm       : document.querySelector('.search'),
    searchInput      : document.querySelector('.search__field'),
    searchRes        : document.querySelector('.results'),
    searchResultList : document.querySelector('.results__list'),
    searchResPages   : document.querySelector('.results__pages'),
    recipe           : document.querySelector('.recipe'),
    shopping         : document.querySelector('.shopping__list'),
    likesMenu        : document.querySelector('.likes__field'),
    likesList        : document.querySelector('.likes__list')

};
//
export const elementStrings = {
    loader : 'loader'
};
//
//
// Code a spinner...pass in the 'parent' so we know where to attach/display the spinner 
export const renderLoader = parent => {
    const loader = `
        <div class = '${elementStrings.loader}'> 
            <svg>
                <use href ="img/icons.svg#icon-cw"> </use>
             </svg>
        </div>
    `;
    // display the loader in whichever part of the screen called it.
    parent.insertAdjacentHTML('afterbegin', loader);
};
//
//
// Remove the loader from which ever element called it, but FIRST you need to go up the tree to the parent which ownes it, then remove it (the child part)...
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
//
//
//
