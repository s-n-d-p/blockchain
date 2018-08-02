const Block = require('./block');

class Blockchain{
    
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length - 1],data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(this.chain[0])) return false;

        for(let i = 1; i < chain.length; i++){
            const block = chain[i];
            const previousBlock = chain[i-1];
            if((block.previousHash !== previousBlock.hash) || (block.hash !== Block.blockHash(block))) return false;
        }

        return true;
    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log('Received chain length is not greeater than existing chain.');
            return;
        } else if(!this.isValidChain(newChain)){
            console.log('Received chain is invalid');
            return;
        } else{
            console.log('Replacing the current chain with received chain.');
            this.chain = newChain;
        }
    }
}

module.exports = Blockchain;