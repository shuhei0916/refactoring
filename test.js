import assert from 'assert';
import {Province, sampleProvinceData} from './province.js';
import { hasUncaughtExceptionCaptureCallback } from 'process';

describe('province', function() {
  let asia;
  beforeEach(function() {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', function() {
    assert.equal(asia.shortfall, 5);
  });
  it('profit', function() {
    assert.equal(asia.profit, 230);
  });
  it('change production', function() {
    asia.producers[0].production = 20;
    assert.equal(asia.shortfall, -6);
    assert.equal(asia.profit, 292);
  })
});