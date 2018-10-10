const SHA256 = require("crypto-js/sha256");

const { DIFFICULTY } = require('../config');

class Block{
   
    constructor (timestamp, previousHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString(){
        return `Block-
        Timestamp       : ${this.timestamp}
        Previous Hash   : ${this.previousHash}
        Hash            : ${this.hash}
        Nonce           : ${this.nonce}
        Data            : ${this.data}`
    }

    static genesis(){ 
        return new this("beginningOfTime","-----","f1r57-h45h",[],0);
    }

    static mineBlock(previousBlock, data){
        const previousHash = previousBlock.hash;

        let nonce = -1, timestamp, hash;
        do{
            nonce++;
            console.log('nonce',nonce);
            timestamp = Date.now();
            hash = Block.hash(timestamp,previousHash,data,nonce);
        } while(hash.substring(0,DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this(timestamp, previousHash, hash, data, nonce);
    }

    static hash(timestamp, previousHash, data, nonce){
        return SHA256(`${timestamp}${previousHash}${data}${nonce}`).toString();
    }

    static blockHash(block){
        const {timestamp, previousHash, data, nonce} = block;
        return Block.hash(timestamp,previousHash,data,nonce);
    }
}

module.exports = Block;