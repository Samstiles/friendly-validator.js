var chai = require('chai');
var expect = chai.expect;
var validate = require('../friendly-validator.js');

describe('-------------------------\n  Friendly Validator Tests!\n  -------------------------\n', function() {

  /**
   * Test for <1 or >2 parameters
   */
  it('should throw an error due to incorrect # of parameters', function() {
    expect(validate).to.throw();
  });

  /**
   * Test for invalid parameter type
   */
  it('should throw an error due to parameter not being an object/array', function() {
    expect(validate.bind(validate, 1)).to.throw();
  });

  /**
   * Test for malformed validator object (needs to be "{ value: '', rules: [] }" )
   */
  it('should throw an error due to the parameter they passed being in the wrong object format', function() {
    expect(validate.bind(validate, { someIncorrectProp: '', someOtherIncorrectProp: '' })).to.throw();
  });

  /**
   * Opposite as above, test that it DOESN'T throw an error because it is a properly formatted object
   */
  it('should NOT throw an error because the object were passing is valid', function() {
    expect(validate.bind(validate, { value: '', rules: [] })).to.equal(false);
  });

});