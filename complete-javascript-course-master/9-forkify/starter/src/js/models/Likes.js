//
export default class Likes  {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        //
        // Persist the data into localStorage.
        this.persistData();
        //
        return like;
    }
    //
    deleteLike (id, title, author, img) {
        const index = this.likes.findIndex(el => el.id === id);
        // [2, 4, 8]  splice(1,1) returns [4], original array is mutated to become [2,8]
        // [2, 4, 8]  splice(1,2) returns [4,8], original array is mutated to become [2]
        //
        // [2, 4, 8]  slice(1,2) returns [4], original array is mutated to become [2, 4, 8]
        //
        this.likes.splice(index, 1);
        //
        // Persist the data into localStorage.
        this.persistData();
    }
    isLiked (id) {
        // -1 is returned if the id passed in (from the recipe) is not currently liked as it will NOT currently be in the array (likes). FALSE is returned
        // If the id is found in the array, then the index is found and TRUE is returned.
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes () {
        return this.likes.length;
    }
    // Persist data...can only save strings, use JSON.stringify to get the data out of the array into a string. 
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    // Get the already saved likes back out of the localStorage in case the page is refreshed, used JSON.parse to put the strings back INTO an array.
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        // If there any likes pre-saved into the localStorage, then restore them into the 'likes' array to display.
        if (storage) this.likes = storage;
    }
}