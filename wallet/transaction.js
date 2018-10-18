const ChainUtil = require('../chain-util');

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = [];
        this.outputs = [];
    }

    static newTransaction(senderWallet, recipient, amount){
        let transaction = new this();

        if( senderWallet.balance < amount ){
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        transaction.outputs.push(...[
            {amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            {amount, address: recipient}
        ]);

        return transaction;
    }
}

module.exports = Transaction;