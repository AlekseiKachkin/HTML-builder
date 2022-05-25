const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function copyDir (dirName)  {
    fs.mkdir(path.join(__dirname,'project-dist', dirName) , {recursive: true}, (err) => {
        if (err) throw err;
      });
    const srcDir =  await fsPromises.readdir(path.join(__dirname, dirName), {withFileTypes: true}); 
    for(let obj of srcDir) {
        let src = path.join(__dirname,  dirName, obj.name);
        let dest = path.join(__dirname,'project-dist', dirName, obj.name);
        console.log(src);
        if (!obj.isDirectory()) { 
            fsPromises.copyFile(src, dest);
        } else if (obj.isDirectory()) {
            fs.mkdir(path.join(__dirname, dest) , {recursive: true}, (err) => {
                if (err) throw err;
              });        
            let track = `${dirName}/${obj.name}`
            return copyDir(track);
        }
    }  
}

(async () => {
    fs.mkdir(path.join(__dirname, 'project-dist') , {recursive: true}, (err) => {
        if (err) throw err;
      });

      copyDir ('assets');  
})();