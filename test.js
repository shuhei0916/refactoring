import assert from 'assert';
import { describe } from 'node:test';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('HoHo', () => {
  it ('hoge hoge', () => {
    assert.equal(0, 1);
  })

})