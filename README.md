D-Coin
======

Installation:

(Prerequisite: Node.js and NPM )
1) git clone https://github.com/s-n-d-p/blockchain.git
2) cd multithreaded_blockchain 
3) npm install 
4) npm install --dev 

a) To start a blockchain node in development mode, use:

    npm run dev 

b) To start a blockchain node in production mode, use:

    npm run start     

c) To start a blockchain node in development mode on specific ports, use:

    export HTTP_PORT=<HTTP_PORT> 
    export P2P_PORT=<P2P_PORT> 
    export PEERS=ws://localhost:PEER1_PORT,ws://localhost:PEER2_PORT 
    npm run dev

d) To run the tests, use:

    npm run test

