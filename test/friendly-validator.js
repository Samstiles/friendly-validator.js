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
    expect(validate.bind(validate, { value: '', rules: 5 })).to.throw("Invalid argument supplied. One or all of the objects passed in has an invalid ruleset. Rulesets must be arrays of at least 1 rule.");
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
   * Test to see if the rule passed in is even recognized by the library
   */
  it('should fail to validate because the rule being passed is not recognized by the library', function() {
    var data = [
      { value: 'foo@foo.com', rules: ['isTotallyNotARule'] }
    ];
    expect(validate.bind(validate, data)).to.throw("Invalid argument supplied. One or all of the objects passed in has a rule that is not in the list of validation rules used in this library. For a list of valid rules, visit https://github.com/latros/friendly-validator.git");
  });
  
  /**
  * Test for improper ruleset of array of validator objects
  */
  it('should throw an error due to the one of the rulesets they passed (MANY, ARRAY) being wrong (not a valid array)', function() {
    var data = [
      { value: '', rules: [] },
      { value: '', rules: ['isEmail'] }
    ];
    expect(validate.bind(validate, data)).to.throw("Invalid argument supplied. One or all of the objects passed in has an invalid ruleset. Rulesets must be arrays of at least 1 rule.");
  });

  /**
   * Test to see if email rule works on valid data
   */
  it('should successfully validate the email address `foo@bar.com` and thus err should equal false', function() {
    var data = { value: 'foo@bar.com', rules: ['isEmail'] };
    var err = validate(data);
    expect(err).to.equal(false);
  });

  /**
   * Test to see if email rule FAILS on invalid data
   */
  it('should fail to validate email address `foofoo` and thus err should be the error string for email failing validation', function() {
    var data = { value: 'foofoo', rules: ['isEmail'] };
    var err = validate(data);
    expect(err[0]).to.equal('"foofoo" is not a valid email address.');
  });

});