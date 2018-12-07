const ChainUtil = require('../chain-util');
const {MINING_REWARD} = require('../config')

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = [];
        this.outputs = [];
    }

    update(senderWallet, recipient, amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
        if(amount > senderOutput.amount){
            console.log(`Amount ${amount} exceeds the balance`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount, address: recipient});
        this.signTransaction(senderWallet);
    }

    static transactionWithOutputs(senderWallet, outputs){
        const transaction = new this();
        transaction.outputs.push(...outputs);
        transaction.signTransaction(senderWallet);
        return transaction;
    }

    static newTransaction(senderWallet, recipient, amount){
        if( senderWallet.balance < amount ){
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }
        return Transaction.transactionWithOutputs(
            senderWallet, 
            [
                {amount: senderWallet.balance - amount, address: senderWallet.publicKey },
                {amount, address: recipient}
            ]);
    }

    static rewardTransaction(minerWallet, blockchainWallet){
        return Transaction.transactionWithOutputs(blockchainWallet, [{
            amount: MINING_REWARD, address: minerWallet.publicKey
        }])
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
            transaction.input.address, //<-- Public Key, will be used to sign the transaction.outputs's hash value
            transaction.input.signature, //<-- Signature that was generated earlier while signing the transaction
            ChainUtil.hash(transaction.outputs) //<-- This is the hash value which would be signed again to be verified
        )
    }
}

module.exports = Transaction;