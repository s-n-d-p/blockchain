const SHA256 = require("crypto-js/sha256");

const { DIFFICULTY, MINE_RATE } = require('../config');

class Block{
   
    constructor (timestamp, previousHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    toString(){
        return `Block-
        Timestamp       : ${this.timestamp}
        Previous Hash   : ${this.previousHash}
        Hash            : ${this.hash}
        Nonce           : ${this.nonce}
        Difficulty      : ${this.difficulty}
        Data            : ${this.data}`
    }

    static genesis(){ 
        return new this(0,"-----","f1r57-h45h",[],0,DIFFICULTY);
    }

    static mineBlock(previousBlock, data){
        const previousHash = previousBlock.hash;

        let nonce = -1, timestamp, hash, difficulty;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(previousBlock,timestamp);
            hash = Block.hash(timestamp,previousHash,data,nonce,difficulty);
            console.log('nonce: ',nonce);
        } while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, previousHash, hash, data, nonce,difficulty);
    }

    static hash(timestamp, previousHash, data, nonce, difficulty){
        return SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block){
        const {timestamp, previousHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp,previousHash,data,nonce, difficulty);
    }

    static adjustDifficulty(previousBlock, currTime){
        let {difficulty} = previousBlock;
        return (currTime - previousBlock.timestamp < MINE_RATE) ? (difficulty + 1) : (difficulty - 1);
    }
}

module.exports = Block;