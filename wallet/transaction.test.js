const Wallet = require('./index');
const Transaction = require('./transaction');

describe('Transaction', () => {
    let transaction, senderWallet, recipient, amount;
    beforeEach(()=>{
        senderWallet = new Wallet();
        recipient = 'r3c1p13n7';
        amount = 50;
        transaction = Transaction.newTransaction(senderWallet,recipient,amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', ()=> {
        expect(transaction.outputs.find(output => output.address === senderWallet.publicKey).amount).toEqual(senderWallet.balance - amount);
    });
    it('outputs the `amount` added to the recipient', ()=> {
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });
    
    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(senderWallet.balance);
    });

    it('validates a valid transaction',()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates a corrupt transaction',()=>{
        transaction.outputs[0].amount = -1;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });

    describe('Transaction with an amount that exceeds the balance',()=>{
        beforeEach(()=>{
            amount = 50000;
            transaction = Transaction.newTransaction(senderWallet,recipient,amount);
        });

        it('does not create the transaction',()=>{
            expect(transaction).toEqual(undefined);
        });
    });
});