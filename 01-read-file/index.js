const fs = require('fs');
const path = require('path');

const text = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let message = '';   
text.on('data', (chunk) => {message = `${message}${chunk}`});
text.on('end', () => console.log(message));
text.on('error', error => console.log('Error', error.message));