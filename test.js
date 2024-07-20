import assert from 'assert';
import {Province, sampleProvinceData} from './province.js';
import { hasUncaughtExceptionCaptureCallback } from 'process';

describe('province', function() {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData());
    assert.equal(asia.shortfall, 5);
  })
  it('profit', function() {
    const asia = new Province(sampleProvinceData());
    // assert.equal(actual, expected);
    assert.equal(asia.profit, 230);
  })
})