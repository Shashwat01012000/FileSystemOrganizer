// helpfn Implementation

function helpfn(){
    console.log(`
          List of commands :- 
          node main.js help
          node main.js tree "dirpath"
          node main.js organize "dirpath" 
    `);
}
module.exports={
     helpKey : helpfn
}