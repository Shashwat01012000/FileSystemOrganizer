#!/usr/bin/env node
let inputArray = process.argv.slice(2);
// console.log(inputArray);
// input what is expected -->
// node main.js help
// node main.js tree "dirpath"
// node main.js organize "dirpath"

let command = inputArray[0];
let fs = require("fs");
let path = require("path");
let helpObj = require("./Commands/help");
let organizeObj = require("./Commands/organize");
let treeObj = require("./Commands/tree");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch (command){
    case "help":
        helpObj.helpKey();
        break;
    case "tree":
        treeObj.treeKey(inputArray[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArray[1]);
        break;
    default:
        console.log("Please input a Valid Command Or Use --help-- command to know all valid commands");            
}



