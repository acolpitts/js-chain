const Block  = require('../../blockchain/block');

describe('Block', () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = 'foobar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it('should set the `payload` to match the input', () => {
    expect(block.payload).toEqual(data);
  });

  it('should set the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  })
});