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
});