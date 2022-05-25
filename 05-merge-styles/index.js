const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

(async () => {   
    fsPromises.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', 'utf-8',);
          
    const files =  await fsPromises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});    
    for(let file of files) {
        if (file.isFile() && file.name.split('.')[1] === 'css') {           
            let src = path.join(__dirname, 'styles', file.name);
            let dest = path.join(__dirname, 'project-dist', 'bundle.css');
            const dataStyles = fs.createReadStream(src, 'utf-8');
            dataStyles.on('data', (chunk) => {
                fsPromises.appendFile(dest, chunk, 'utf-8')
            });            
        }
    }  
})()