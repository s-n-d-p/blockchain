const Blockchain = require('./blockchain');

bc = new Blockchain(); 

let start_time = new Date();
for(let i = 0; i < 10; i++){
    console.log(bc.addBlock(`foo${i}`).toString());
}
console.log(`Time taken for 10 blocks: ${new Date() - start_time} ms`);