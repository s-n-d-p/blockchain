const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {
    let data, previousBlock, block;
    beforeEach(()=>{
        data = 'seems good so far';
        previousBlock = Block.mineBlock(Block.genesis(),data);
        block = Block.mineBlock(previousBlock,data);
        //chain of length 3
    });

    it('sets `data` to block data', () => {
        expect(block.data).toEqual(data);
    });
    it('sets `previousHash` to previous block hash', () => {
        expect(block.previousHash).toEqual(previousBlock.hash);
    });
    it('generates hash according to network defined difficulty for the block', () => {
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });
    it('decreases difficulty when blocks are mined at a slow rate', () => {
        // console.log(block.timestamp);
        expect(Block.adjustDifficulty(previousBlock,previousBlock.timestamp + 10000)).toEqual(previousBlock.difficulty - 1);
    });
    it('increases difficulty when blocks are mined at a fast rate', () => {
        expect(Block.adjustDifficulty(previousBlock,previousBlock.timestamp + 1)).toEqual(previousBlock.difficulty + 1);
    });
});