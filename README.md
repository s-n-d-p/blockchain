Multhithreaded - Blockchain
===========================

Installation (Linux):

(Prerequisite: Node.js and NPM )
1) git clone https://github.com/sndp487/multithreaded_blockchain.git
2) cd multithreaded_blockchain 
3) npm install 
4) npm install --dev 

a) To start a blockchain node in development mode, use:

    npm run dev 

b) To start a blockchain node in production mode, use:

    npm run start     

c) To start a blockchain node in development mode on specific ports, use:

    HTTP_PORT=<HTTP_PORT> P2P_PORT=<P2P_PORT> PEERS=ws://localhost:PEER1_PORT,ws://localhost:PEER2_PORT npm run dev

d) To start a blockchain node in production mode on specific ports, use:

    HTTP_PORT=<HTTP_PORT> P2P_PORT=<P2P_PORT> PEERS=ws://localhost:PEER1_PORT,ws://localhost:PEER2_PORT npm run start

e) To run the tests, use:

    npm run test
    npm run dev-test

