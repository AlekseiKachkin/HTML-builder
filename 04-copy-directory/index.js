const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const copyDir = async () => {
    fs.mkdir(path.join(__dirname, 'files-copy') , {recursive: true}, (err) => {
        if (err) throw err;
      });

      const files =  await fsPromises.readdir(path.join(__dirname, 'files'), {withFileTypes: true}); 
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