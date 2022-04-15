function treefn(dirpath){
    // let destinationPath;
    let fs = require("fs");
    let path = require("path");

    if(dirpath == undefined){
        treehelper(process.cwd(), "");
        return;
    }else{
        let doesExist = fs.existsSync(dirpath);
        if(doesExist){
          treehelper(dirpath, "");
        }else{
           console.log("please input correct directory Path");   
        }        
    }    
}

function treehelper(dirpath, indent){
    let fs = require("fs");
    let path = require("path");
    // identify that it is file or folder 
    let isfile = fs.lstatSync(dirpath).isFile();
    if(isfile == true){
        let fileName = path.basename(dirpath);
        console.log(indent+"|──" + fileName);
    }else{
        let dirName=path.basename(dirpath);
        console.log(indent + "└──"+ dirName);
        let childrens=fs.readdirSync(dirpath);
        for(let i=0;i<childrens.length;i++){
            let childPath=path.join(dirpath,childrens[i]);
            treehelper(childPath,indent+"\t");
        }
    }
}

module.exports={
    treeKey : treefn
}