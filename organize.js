// organize Implementation
let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizefn(dirpath){
    // console.log("organize command is Implemented",dirpath);

    // tasks
    // input directory path is given  
    let destinationPath;

    if(dirpath == undefined){
        destinationPath = process.cwd();
        return;
    }else{
        // 1) create a folder ---> organized
        let doesExist = fs.existsSync(dirpath);
        if(doesExist){
            destinationPath = path.join(dirpath , "Organize_file");
            if(fs.existsSync(destinationPath) == false){
                fs.mkdirSync(destinationPath);
            }
            
        }else{
           console.log("please input correct directory Path");   
        }
        organizehelper(dirpath,destinationPath);
    }
}       
    
function organizehelper(src,dest){
         // src --> source --> directory path
         // dest --> path of --> organized folder
         // 2) sort the files inside the unorganized folder
       let filenames = fs.readdirSync(src);
       for(let i=0;i<filenames.length;i++){
           let EachfileAddress = path.join(src , filenames[i]); 
           let isFile = fs.lstatSync(EachfileAddress).isFile();
           if(isFile){
              let category = getcategory(filenames[i]);
              // 3) copy and past the content sorted in the unorganized folder to organized folder
              sendfiles(EachfileAddress,dest,category); 
            }
       }     
    }

function getcategory(filename){
        let ext = path.extname(filename);
        ext = ext.slice(1);
        // console.log(ext);
        for(let type in types){
            let currtypearr = types[type]; 
            for(let i=0;i<currtypearr.length;i++){
                if(currtypearr[i] == ext){
                    return type;
                }
            }
        }
        return "Others";
    }

function sendfiles(srcFilepath,dest,category){
        
        let categorypath = path.join(dest,category);
        if(fs.existsSync(categorypath) == false){
            fs.mkdirSync(categorypath);
        }else{
            let fileName = path.basename(srcFilepath);
            let destFilepath = path.join(categorypath,fileName);
            fs.copyFileSync(srcFilepath,destFilepath);
            console.log(fileName, "copied to -->" ,category);
            // 4) delete all the contents from unorganised folder except organized folder.
            fs.unlinkSync(srcFilepath);
        }
    }

    module.exports={
        organizeKey : organizefn
    }