/* A module is just a file containing lines of JavaScript code.
A library uses one or many modules to provide a set of features.
A package is a downloadable, versioned library. Think of someone putting it in a box 
and shipping it to you, so you can import it and use it in combination with your own code. */


// Imports
import chalk, { Chalk } from 'chalk'; // chalk it's a package. We installed it using npm.
import fs from 'fs'; // fs it's a library native from Node.js. Its allows our code to interact with the computer files. 


// Get patterns from an text using regular expressions

function getLinks(text) {

    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g
    const capture = [...text.matchAll(regex)];
    const results = capture.map(item =>

        ({ [item[1]]: item[2] })

        /* here, we want to get item[1] as a propertie and assign item[2] as the value of this propertie 
        So, we have to put item[1] inside brackets []. Other problem is that {} to create the obj can be
        interpred by JS as the initial statement of a function. So we put all statement inside a parethesys */
    )

    return results.length != 0 ? results : `There is no link in the archive`;
}

// get an file - async/await:

async function readFile(path) {
    const encoding = 'utf-8';    
    try {
        const myPromise = await fs.promises.readFile(path, encoding); //await X charge, then assign it to myPromise
        return getLinks(myPromise);
    } catch(err) {
        error(err)       
    }
}

function error(err){
    
    if (err.code==='ENOENT') {
        console.log(chalk.red(`No such file or directory: ${err.path}`));
    } else {
        console.log(chalk.red(`Error reading file`, err.message));
        
    } 
}

export {readFile, error};






// **********************************************************************************
// ********** The code bellow it's an example of using .then() **********************
// **********************************************************************************


/* 

function error (err){
    console.log(err);
    throw new Error(chalk.red("Whoops! Error cause -> ", err ));
}

function readFile(path){
    const encoding = 'utf-8';
    let myPromise = fs.promises.readFile(path, encoding);
    console.log(myPromise);

    myPromise
        .then((result) => {console.log(result)
    })
        .catch(error);
} 

readFile('./archives/texto.md') */