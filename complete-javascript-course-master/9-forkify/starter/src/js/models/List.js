//
import uniqid from 'uniqid';
//
export default class List {
    constructor() {
        this.items = [];
    }
    addItem (count, unit, ingredient) {
        //
        //console.log(count, unit, ingredient);
        //
        const item = {
            id : uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        //
        //console.log(this.items);
        //
        return item;
    }
    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        // [2, 4, 8]  splice(1,1) returns [4], original array is mutated to become [2,8]
        // [2, 4, 8]  splice(1,2) returns [4,8], original array is mutated to become [2]
        //
        // [2, 4, 8]  slice(1,2) returns [4], original array is mutated to become [2, 4, 8]
        //
        this.items.splice(index, 1);
    }
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}