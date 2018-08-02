const SHA256 = require("crypto-js/sha256");

class Block{
   
    constructor (timestamp, previousHash, hash, data){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `Block-
        Timestamp       : ${this.timestamp}
        Previous Hash   : ${this.previousHash}
        Hash            : ${this.hash}
        Data            : ${this.data}`
    }

    static genesis(){ 
        return new this("beginningOfTime","-----","f1r57-h45h",[]);
    }

    static mineBlock(previousBlock, data){
        const timestamp = Date.now();
        const previousHash = previousBlock.hash;
        const hash = Block.hash(timestamp,previousHash,data);

        return new this(timestamp, previousHash, hash, data);
    }

    static hash(timestamp, previousHash, data){
        return SHA256(`${timestamp}${previousHash}${data}`).toString();
    }

    static blockHash(block){
        const {timestamp, previousHash, data} = block;
        return Block.hash(timestamp,previousHash,data);
    }
}

module.exports = Block;