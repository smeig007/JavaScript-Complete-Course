//
//export default '- I am an exported string.';
//
// ** NOTE =  "axios" is a popular HTTP request libary....now need to IMPORT the package...
import axios from 'axios';
//
// import from the configuration file
import { proxy, myKey } from '../config';
//
//
// Define a new class, MUST always have a constructor ! 
export default class Search {
    constructor(query) {
        this.query = query;
    }
    // this is an asyncronous method within this class (which is called Search).
    async getResults() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${myKey}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (errorMsg) {
                alert(errorMsg);
        }
        
    }
}
//
//
