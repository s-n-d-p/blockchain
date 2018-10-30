const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction Pool', () => {
    let txPool, tx, wallet;
    beforeEach(() => {
        txPool = new TransactionPool();
        wallet = new Wallet();
        tx = Transaction.newTransaction(wallet,'r4nd-4ddr',50);
        txPool.updateOrAddTransaction(tx);
    });

    it('adds transaction to the pool', () => {
        expect(txPool.transactions.find(t => t.id === tx.id)).toEqual(tx);
    });

    it('updates transaction in the pool', () => {
        const olderTx = JSON.stringify(tx);
        tx.update(wallet, 'someoneElse', 100);
        txPool.updateOrAddTransaction(tx);
        const newTx = JSON.stringify(txPool.transactions.find(t => t.id == tx.id));
        expect(olderTx).not.toEqual(newTx);
    });
});