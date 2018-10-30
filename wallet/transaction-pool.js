class TransactionPool {
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        let transactionWithId = this.transactions.find(tx => tx.id === transaction.id);
        if(transactionWithId){
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else{
            this.transactions.push(transaction);
        }
    }
}

module.exports = TransactionPool;