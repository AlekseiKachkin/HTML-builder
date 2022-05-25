const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const distDir = path.join(__dirname, 'project-dist')
const assetsSrc = path.join(__dirname, 'assets');
const assetsDst = path.join(distDir, 'assets');
const destStyles = path.join(distDir, 'style.css');
const srcStyles = path.join(__dirname, 'styles');
async function makeDist () {
   fs.mkdir(distDir, {recursive: true}, (err) => {
    if (err) throw err;
  });
} 

async function copyDir(srcDir, destDir) {

    fs.mkdir(destDir, { recursive: true }, (err) => {
        if (err)
            throw err;
    });
    const distFiles = await fsPromises.readdir(destDir, { withFileTypes: true });
    for (let obj of distFiles) { 
        if (obj.isFile()){
            await fsPromises.rm(path.join(destDir, obj.name));
        }       
    }
    
    const copyContent = await fsPromises.readdir(srcDir, { withFileTypes: true })
    for (let obj of copyContent) {
        if (obj.isFile()) {
            fsPromises.copyFile(path.join(srcDir, obj.name), path.join(destDir, obj.name))
        } else if (obj.isDirectory()) {
            let src = path.join(srcDir, obj.name)
            let dest = path.join(destDir, obj.name)
            copyDir(src, dest)
        }
    }

}

async function copyStyles (srcStyles, destStyles) {
    const files =  await fsPromises.readdir(srcStyles, {withFileTypes: true}); 
    for(let file of files) {
        if (file.isFile() && file.name.split('.')[1] === 'css') {  
            const dataStyles = fs.createReadStream(path.join(srcStyles, file.name), 'utf-8');
            dataStyles.on('data', (chunk) => {
                fsPromises.appendFile(destStyles, chunk, 'utf-8');
            });            
        }
    }  
}

makeDist();
copyDir(assetsSrc, assetsDst);
copyStyles (srcStyles, destStyles);
