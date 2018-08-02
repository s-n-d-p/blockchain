const Block = require('./block');

describe('Block', () => {
    let data, previousBlock, block;
    beforeEach(()=>{
        data = 'seems good so far';
        previousBlock = Block.genesis();
        block = Block.mineBlock(previousBlock,data);
    });

    it('sets `data` to block data', () => {
        expect(block.data).toEqual(data);
    });
    it('sets `previousHash` to previous block hash', () => {
        expect(block.previousHash).toEqual(previousBlock.hash);
    });
});