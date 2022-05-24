const fsPromises = require('fs/promises');
const path = require('path');
    
(async () => {
    const files =  await fsPromises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}); 
    for(let file of files) {
        if (file.isFile()) {
            const fullFileName = file.name;
            const fileName = fullFileName.split('.')[0];
            const fileExtend =fullFileName.split('.')[1];
            const fileStats = await fsPromises.stat(path.join(__dirname, 'secret-folder', fullFileName));
            console.log(`${fileName} - ${fileExtend} - ${fileStats.size}b`);
        }
    }
})()


    
    
