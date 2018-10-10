Multhithreaded - Blockchain
===========================

Installation (Linux):

(Prerequisite: Node.js and NPM )
1) git clone https://github.com/sndp487/multithreaded_blockchain.git
2) cd multithreaded_blockchain && npm install 

a) To start a blockchain node in development mode, use:

    npm run dev 

b) To start a blockchain node in development mode on specific ports, use:

    HTTP_PORT=<HTTP_PORT> P2P_PORT=<P2P_PORT> PEERS=ws://localhost:PEER1_PORT,ws://localhost:PEER2_PORT npm run dev

c) To start a blockchain node in production mode replace 'dev' with 'start' in the above commands.

d) To run the tests, use:

    npm run test

