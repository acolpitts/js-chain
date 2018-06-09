const SHA256 = require('crypto-js/sha256');

class Block {

  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.payload = data;
  }

  toString() {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0, 10)}
      Hash     : ${this.hash.substring(0, 10)}
      Payload  : ${this.payload}`;
  }

  static genesis() {
    return new this('Genesis time', '-----', 'f1r57-h45h', [])
  }

  static mineBlock(lastBlock, payload) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.hash(timestamp, lastHash, payload);

    return new this(timestamp, lastHash, hash, payload);
  }

  static hash(timestamp, lastHash, payload) {
    return SHA256(`${timestamp}${lastHash}${payload}`).toString()
  }

  static blockHash(block) {
    const { timestamp, lastHash, payload } = block;
    return Block.hash(timestamp, lastHash, payload)
  }
}

module.exports = Block;