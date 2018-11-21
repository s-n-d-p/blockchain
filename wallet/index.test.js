const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('Wallet', ()=>{
    let wallet, tp;

    beforeEach(()=>{
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('creating a transaction', ()=>{
        let transaction, recipient, sendAmount;

        beforeEach(()=>{
            sendAmount = 50;
            recipient = 'random-address';
            transaction = wallet.createTransaction(recipient, sendAmount, tp);
        });

        describe('and doing the same transaction', ()=>{
            
            let tx;

            beforeEach(()=>{
                transaction = wallet.createTransaction(recipient, sendAmount, tp);
            })

            it('subtracts `sendAmount` 2 times from wallet balance',()=>{
                expect(transaction.outputs.find(tx => tx.address === wallet.publicKey).amount).toEqual(wallet.balance - 2*sendAmount);
            });

            it('adds one more transaction, similar to the first transaction',()=>{
                expect(transaction.outputs.filter(tx => tx.address === recipient).map(tx => tx.amount)).toEqual([sendAmount, sendAmount]);
            })
        });
    });
});