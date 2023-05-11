const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

async function copyDir () {      
      

    await fsPromises.mkdir(path.join(__dirname, 'files-copy') , {recursive: true});

    let copyFiles =  await fsPromises.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}); 
      for(let obj of copyFiles) {
        if (obj.isFile()){
          await fsPromises.rm(path.join(__dirname, 'files-copy', obj.name));
        }        
    }
    let files =  await fsPromises.readdir(path.join(__dirname, 'files'), {withFileTypes: true}); 
      for(let file of files) {
          if (file.isFile()) {              
              let src = path.join(__dirname, 'files', file.name);
              let dest = path.join(__dirname, 'files-copy', file.name);
              fsPromises.copyFile(src, dest)
          }
      }  

};
copyDir();
//message