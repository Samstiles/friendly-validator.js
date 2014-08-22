var chai = require('chai');
var expect = chai.expect;
var validate = require('../friendly-validator.js');

describe('-------------------------\n  Friendly Validator Tests!\n  -------------------------\n', function() {

  /**
   * Test for <1 or >2 parameters
   */
  it('should throw an error due to incorrect # of parameters', function() {
    expect(validate).to.throw("Invalid argument supplied. Friendly Validator expects 1 parameter.");
  });

  /**
   * Test for invalid parameter type
   */
  it('should throw an error due to parameter not being an object/array', function() {
    expect(validate.bind(validate, 1)).to.throw("Invalid argument supplied. Friendly Validator expects data passed to be an Object or an Array.");
  });

  /**
   * Test for malformed validator object of 1 field
   */
  it('should throw an error due to the parameter they passed (ONE OBJECT) being in the wrong object format', function() {
    expect(validate.bind(validate, { someIncorrectProp: '', someOtherIncorrectProp: '' })).to.throw("Invalid argument supplied. Friendly Validator requires the data you're passing in to be in a specific format.");
  });

  /**
   * Test for improper ruleset of 1 field (must be array, a valid rule, etc)
   */
  it('should throw an error due to the ruleset they passed (ONE, OBJECT) being wrong (not a valid array, not a valid rule, etc)', function() {
    expect(validate.bind(validate, { value: '', rules: 5 })).to.throw("Invalid argument supplied. One or all of the objects passed in has an ivalid ruleset. Rulesets must be arrays.");
  });

  /**
   * Test for malformed array of validator objects
   */
  it('should throw an error due to at least one of the objects in the array they passed (MANY, ARRAY) being in the wrong object format', function() {
    var data = [
      { value: '', rules: [] },
      { someIncorrectProp: '', someOtherIncorrectProp: '' }
    ];
    expect(validate.bind(validate, data)).to.throw("Invalid argument supplied. Friendly Validator requires the data you're passing in to be in a specific format.");
  });
  
  /**
  * Test for improper ruleset of array of validator objects
  */
  it('should throw an error due to the one of the rulesets they passed (MANY, ARRAY) being wrong (not a valid array, not a valid rule, etc)', function() {
    var data = [
      { value: '', rules: [] },
      { value: '', rules: 'WTF' }
    ];
    expect(validate.bind(validate, data)).to.throw("Invalid argument supplied. One or all of the objects passed in has an ivalid ruleset. Rulesets must be arrays.");
  });

  /**
   * Opposite as above, test that it DOESN'T throw an error because it is a properly formatted object
   */
  it('should NOT throw an error because the object were passing is in a valid format', function() {
    var err = validate({ value: '', rules: [] });
    expect(err).to.equal(false);
  });

});