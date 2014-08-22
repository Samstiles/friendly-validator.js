var validator = require('validator');
var _ = require('lodash');

module.exports = function(data) {

  console.log('\n\n');

  /**
   * Set up potential return options, error strings
   */
  var errors = [];
  var invalidArgsMalformedObject = "Invalid argument supplied. Friendly Validator requires the data you're passing in to be of format";
  var invalidArgsIncorrectNumber = "Invalid argument supplied. Friendly Validator expects 1 parameter.";
  var invalidArgsIncorrectType = "Invalid argument supplied. Friendly Validator expects data passed to be an Object or an Array.";

  /**
   * Primary Validate Functions
   */
  function validate(object) {

    if (object instanceof Array) {
      // do multiple stuff
    } else {

      /**
       * Throw an error if the data object they passed isn't in the allowed format of { value: '', rules: [] }
       */
      if (!isValidValidatorObject(object))
        throw new Error(invalidArgMalformedObject);

      // do single stuff
    }
  }

  /**
   * Utility function to ensure a valid object value/rules pair is supplied
   */
  function isValidValidatorObject(object) {
    var validKeys = _.keys({value: '', rules: ''}).sort();
    var passedKeys = _.keys(object).sort();
    console.log('Valid Keys: ', validKeys);
    console.log('Passed keys: ', passedKeys);
    return validKeys === passedKeys;
  }

  /**
   * Throw an error if they supplied an incorrect number of arguments
   */
  if (_.size(arguments) !== 1)
    throw new Error(invalidArgsIncorrectNumber);

  /**
   * Throw an error if they did pass a parameter, but it isn't a valid type (object or array)
   * @NOTES: Both Arrays and Objects are instances of Object, so we only need 1 check to cover both.
   */
  if (!(data instanceof Object))
    throw new Error(invalidArgsIncorrectType);

  /**
   * Main if/else to handle the validation
   */
  if (data instanceof Array) {
    // many!
  } else if (data instanceof Object) {
    validateOne(data);
  }

  /**
   * If there are errors, return those. Otherwise, return false.
   */
  return (errors.length > 0) ? errors : false;
};