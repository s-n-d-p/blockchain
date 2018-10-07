const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain',()=>{
    let blockchain, blockchain1;
    beforeEach(()=>{
        blockchain = new Blockchain();
        blockchain1 = new Blockchain();
    });

    it('sets first block as genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block at end',()=>{
        const data = 'foo';
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });

    it('validates a chain with valid single block i.e. genesis block', () => {
        expect(blockchain.isValidChain(blockchain1.chain)).toBe(true);
    });

    it('invalidates a chain with invalid genesis block',()=>{
        blockchain1.chain[0].data = 'Corrupted data';
        expect(blockchain.isValidChain(blockchain1.chain)).toBe(false);
    });

    it('invalidates a chain with some block invalid',()=>{
        blockchain1.addBlock('foo');
        blockchain1.chain[1].data = 'Not foo';
        expect(blockchain.isValidChain(blockchain1.chain)).toBe(false);
    });

    it('does not replace with smaller or equal sized chain',()=>{
        blockchain.addBlock('some data');
        blockchain1.addBlock('some other data');
        blockchain.replaceChain(blockchain1.chain);
        expect(blockchain.chain).not.toEqual(blockchain1.chain);
    });

    it('does replace with a longer sized chain',()=>{
        blockchain1.addBlock('some other data');
        blockchain.replaceChain(blockchain1.chain);
        expect(blockchain.chain).toEqual(blockchain1.chain);
    });
});