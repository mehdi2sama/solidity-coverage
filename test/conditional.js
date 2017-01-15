const solc = require('solc');
const path = require('path');
const getInstrumentedVersion = require('./../instrumentSolidity.js');
const util = require('./util/util.js');
const CoverageMap = require('./../coverageMap');
const vm = require('./util/vm');
const assert = require('assert');

describe('conditional statements', function(){

  const filePath = path.resolve('./test.sol');
  const pathPrefix = './';

  it('should cover a conditional that reaches the consequent (same-line)', (done) => {
    const contract = util.getCode('conditional/sameline-consequent.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);
    
    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [1, 0]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });

  it('should cover a conditional that reaches the alternate (same-line)', (done) => {
    const contract = util.getCode('conditional/sameline-alternate.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);

    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [0, 1]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });

  it('should cover a conditional that reaches the consequent (multi-line)', (done) => {
    const contract = util.getCode('conditional/multiline-consequent.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);

    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [1, 0]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });

  it('should cover a conditional that reaches the alternate (multi-line)', (done) => {
    const contract = util.getCode('conditional/multiline-alternate.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);

    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [0, 1]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });

  it('should cover a DeclarativeExpression assignment by conditional that reaches the alternate', (done) => {
    const contract = util.getCode('conditional/declarative-exp-assignment-alternate.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);

    // Runs bool z = (x) ? false : true;
    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [0, 1]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });

  it('should cover an Identifier assignment by conditional that reaches the alternate', (done) => {
    const contract = util.getCode('conditional/identifier-assignment-alternate.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);

    // Runs z = (x) ? false : true;
    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1, 8: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [0, 1]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1, 4: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });

  // Solcover has trouble with this case. The conditional coverage strategy relies on being able to 
  // reference the left-hand variable before its value is assigned. Solidity doesn't allow this for 'var'. 
  
  /*it('should cover a variable delcaration assignment by conditional that reaches the alternate', (done) => {
    const contract = util.getCode('conditional/variable-decl-assignment-alternate.sol');
    const info = getInstrumentedVersion(contract, filePath, true);
    const coverage = new CoverageMap();
    coverage.addContract(info, filePath);
    // Runs var z = (x) ? y = false : y = false;
    vm.execute(info.contract, 'a', []).then(events => {
      const mapping = coverage.generate(events, pathPrefix);
      assert.deepEqual(mapping[filePath].l, {5: 1, 6: 1, 7: 1});
      assert.deepEqual(mapping[filePath].b, {'1': [0, 1]});
      assert.deepEqual(mapping[filePath].s, {1: 1, 2: 1, 3: 1});
      assert.deepEqual(mapping[filePath].f, {1: 1});
      done();
    }).catch(done);
  });*/
})