const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction Pool', () => {
    let txPool, tx, wallet;
    beforeEach(() => {
        txPool = new TransactionPool();
        wallet = new Wallet();
        tx = wallet.createTransaction('r4nd-4ddr',50,txPool);
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

    describe('mixing valid and corrupt transactions',()=>{
        let validTransactions;

        beforeEach(()=>{
            validTransactions = [...txPool.transactions];
            for(let i = 0; i < 6; i++){
                wallet = new Wallet();
                tx = wallet.createTransaction('r4nd-4dr3ss',150,txPool);
                if(~i&1){
                    tx.input.amount = 999999;
                } else{
                    validTransactions.push(tx);
                }
            }
        });

        it('shows a difference between valid and corrupt transactions', ()=>{
            expect(JSON.stringify(txPool.transactions)).not.toEqual(JSON.stringify(validTransactions));
        });

        it('grabs valid transactions',()=>{
            expect(txPool.validTransactions()).toEqual(validTransactions);
        });
    });
});