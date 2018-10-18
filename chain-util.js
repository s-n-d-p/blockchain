const EC = require("elliptic").ec;
const ec = new EC('secp256k1'); 
// Standards of Efficient Cryptography, Prime, 256 bits, Koblitz, 1 - First implementation
const uuidV1 = require('uuid/v1');

class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair();
    }
    static id(){
        return uuidV1();
    }
}

module.exports = ChainUtil;
