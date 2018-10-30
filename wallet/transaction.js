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
        transaction.signTransaction(senderWallet);

        return transaction;
    }

    signTransaction(senderWallet){
        this.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(this.outputs))
        }
    }

    static verifyTransaction(transaction){
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        )
    }
}

module.exports = Transaction;