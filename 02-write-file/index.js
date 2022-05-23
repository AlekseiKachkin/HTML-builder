
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
stdout.write(`Hello! I'm Alex! Write your text in console and i save it in file "the_best_message.txt"\n`);
const wrStream = fs.createWriteStream( path.join( __dirname, 'the_best_message.txt' ));
stdin.on('data', (chunk) => {    
    wrStream.write(`${chunk}`, err => {
        if (err) throw error;
    });
});

process.on('close', () => {
    process.exit();
})

process.on('SIGINT', () => {
    process.exit();
})

process.on('exit', code => {
    if (!code ) {
        console.log('\nProcess writing have finished successfully! All the best!')
    } else {
        console.log(`Oops! You have left to write  "${code}" in file!`);
    }
})