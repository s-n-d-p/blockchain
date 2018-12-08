const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner{
    constructor(blockchain, transactionPool, wallet ,p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        // collect valid transactions from the pool 
        const validTransactions = this.transactionPool.validTransactions();
        // include a reward for the miner
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
        // create a block and do the mining
        const block = this.blockchain.addBlock(validTransactions);
        // synchronise everyone's chain in the network
        this.p2pServer.syncChain();
        // clear the local transaction pool
        this.transactionPool.clear();
        // also tell everyone to do the same
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

module.exports = Miner;