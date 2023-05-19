#!/usr/bin/env node

// CLI means COMMAND-LINE INTERFACE; A command-line interface (CLI) is a text-based user interface (UI) used to 
// run programs, manage computer files and interact with the computer. Command-line interfaces are also called 
// command-line user interfaces, console user interfaces and character user interfaces.

import chalk from 'chalk';
import fs from 'fs';
import { readFile, error } from './index.js';
import checkList from './http-check.js';


let commandLineArgs = process.argv // process.argv returns an array which contains the whole command-line invocation

async function showLinks(check, list, id=''){
    
    if (check) {
        console.log(
            chalk.yellow('Links checked from:'),
            id,
            await checkList(list)
        )

    } else {
    
    console.log(
        chalk.yellow('Links from:'),
        id,
        list
    
    )}
}

async function linksList(args){
    
    const path = args[2];
    const check = args[3] === '--check';

    try{        
        if (fs.lstatSync(path).isFile()){
            const list = await readFile(args[2])        
            showLinks(check, list, args[2])
        }else if (fs.lstatSync(path).isDirectory()){
            const files = await fs.promises.readdir(path)
            files.forEach(async (fileName) => {
                const list = await readFile(`${path}/${fileName}`)
                showLinks(check, list, fileName)
                
            })
        }
    }catch(err){
        error(err)
    }
}

linksList(commandLineArgs)

