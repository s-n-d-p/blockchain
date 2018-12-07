class Miner{
    constructor(blockchain, transactionPool, wallet ,p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        const validTransactions = this.transactionPool.validTransactions();
        // include a reward for the miner
        // create a block and solve the puzzle
        // synchronise everyone's chain in the network
        // clear the local transaction pool
        // also tell everyone to do the same
    }
}

module.exports = Miner;