const Wallet = require('./index');
const Transaction = require('./transaction');

describe('Transaction', () => {
    let transaction, senderWallet, recipient, amount, nextAmount, nextRecipient;
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

    describe('transaction with an amount that exceeds the balance',()=>{
        beforeEach(()=>{
            amount = Infinity;
            transaction = Transaction.newTransaction(senderWallet,recipient,amount);
        });

        it('does not create the transaction',()=>{
            expect(transaction).toEqual(undefined);
        });
    });

    describe('updating a transaction',()=>{
        beforeEach(()=>{
            nextAmount = 20;
            nextRecipient = 'n3x7-r3cipi3n7';
            transaction.update(senderWallet,nextRecipient,nextAmount);
        });

        it('senderOutput balance gets updated',()=>{
            expect(transaction.outputs.find(output => output.address === senderWallet.publicKey).amount).toEqual(senderWallet.balance - amount - nextAmount);
        });

        it('includes an output for nextRecipient',()=>{
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount);
        });
    });
});