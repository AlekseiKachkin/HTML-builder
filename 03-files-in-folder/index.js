const fsPromises = require('fs/promises');

const path = require('path');
    
(async () => {
    const files =  await fsPromises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}); 
    for(let file of files) {
        if (file.isFile()) {
            const fullFileName = file.name.split('.');
            const fileName = fullFileName[0];
            const fileExtend = fullFileName[1];
            const fileSize = await fsPromises.stat(__dirname, 'secret-folder', `${fullFileName}`);
            console.log(`${fileName} - ${fileExtend} - ${fileSize.size}kb`);
        }
    }
})()


    
    
