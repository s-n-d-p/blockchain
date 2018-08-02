const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain',()=>{
    let blockchain;
    beforeEach(()=>{
        blockchain = new Blockchain();
    });

    it('sets first block as genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block at end',()=>{
        const data = 'foo';
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });
});