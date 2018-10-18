const {INITIAL_BALANCE} = require('../config');
const ChainUtil = require('../chain-util');

class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
            publicKey:  ${this.publicKey.toString().substring(0,40)}
            balance:    ${this.balance}`;
    }
}

module.exports = Wallet;