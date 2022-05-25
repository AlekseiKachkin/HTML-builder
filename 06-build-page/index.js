const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const distDir = path.join(__dirname, 'project-dist')
const assetsSrc = path.join(__dirname, 'assets');
const assetsDst = path.join(distDir, 'assets');
const destStyles = path.join(distDir, 'style.css');
const srcStyles = path.join(__dirname, 'styles');
const srcHTML = path.join(__dirname, 'template.html');
const srcComponents = path.join(__dirname, 'components');
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

async function bundleStyles (srcStyles, destStyles) {
    fsPromises.writeFile(destStyles, '', 'utf-8',);
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

async function bundleHTML (srcHTML, srcComponents, destHTML) {
    const htmlFile = await fsPromises.readFile(srcHTML);

    let htmlContent = htmlFile.toString();   
    const components = await fsPromises.readdir(srcComponents, {withFileTypes: true});
    for (let file of components) {
        if (file.isFile() && file.name.split('.')[1] === 'html') {
            let fileName = file.name.split('.')[0];            
            let fileContent = (await fsPromises.readFile(path.join(srcComponents, file.name), 'utf-8')).toString();            
            let placeChange = `{{${fileName}}}`;            
            htmlContent = htmlContent.replace(placeChange, fileContent)
        }
    }

    fsPromises.writeFile(path.join(destHTML, 'index.html'), htmlContent, 'utf-8');
}

makeDist();
copyDir(assetsSrc, assetsDst);
bundleStyles (srcStyles, destStyles);
bundleHTML (srcHTML, srcComponents, distDir)