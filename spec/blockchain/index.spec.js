const Blockchain = require('../../blockchain/index');
const Block = require('../../blockchain/block');

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('should start with the genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('should add a new block', () => {
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length-1].payload).toEqual(data);
  });

  it('should validate a valid chain', () => {
    bc2.addBlock('foo');

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('should invalidate a chain with a corrupt genesis block', () => {
    bc2.chain[0].payload = 'invalid data';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('should invalidate a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].payload = 'invalid';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  })

  it('should replace the chain with a valid chain', () => {
    bc2.addBlock('goo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).toEqual(bc2.chain);
  });

  it('should not replace the chain with one of less than or equal length', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
