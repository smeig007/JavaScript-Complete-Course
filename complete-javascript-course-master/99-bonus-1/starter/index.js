// need to get a node package for being able to read a file in a file system (fs for short), this is a file system module
const fs   = require('fs');
// use node package to help create our server
const http = require('http');
// use node package so we can check the url later on which get entered by the user
const url  = require('url');
//
//
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const lapTopData = JSON.parse(json);
//
// create a temp server on our machine for when a page is called. 
const server = http.createServer((req, res) => {
    console.log('server accessed.....');
    //
    // the entered url is stored in the 'req' being passed into the function 
    const pathName = url.parse(req.url, true).pathname;
    // find the id of the url 
    const id = url.parse(req.url, true).query.id;
    //
    // PRODUCT OVERVIEW
    // check what the url is pointing to, so we can go to the correct page, either products is part of the url or it's empty - STILL got to the products page
    if (pathName === '/products' || pathName === '/') {
        // write an html header, 200 = successful
        res.writeHead(200, {'Content-type': 'text/html'});
        //
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutPut = data;
            // the 'originalHtml' is currently stored in 'data'   
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardsOutput = lapTopData.map(el =>replaceTemplate(data, el)).join('');
                overviewOutPut    = overviewOutPut.replace('{%CARDS%}', cardsOutput);
                res.end(overviewOutPut);
            });
        });
    } 
    // LAPTOP
    else if (pathName === '/laptop' && id < lapTopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        // move the contents of template-laptop.html into the variable 'data'
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = lapTopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    } 
    // IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        });
    }

    // PAGE NOT FOUND
    else {
        // write an html header 404 = unsuccessful (failed).
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('Page Not Found');
    }
});
//
// Need to listen on a specific port, on "localhost" ie the machine the code is running on, this is IP address 127.0.0.1
server.listen(1337, '127.0.0.1', () => {
    console.log('server is listening....');
});
//
//
function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
};