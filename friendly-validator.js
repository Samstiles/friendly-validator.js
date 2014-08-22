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
   * Throw an error if the data object they passed isn't in the allowed format of { value: '', rules: [] }
   */
  if (!isValidValidatorObject(data))
    throw new Error(invalidArgsMalformedObject);

  /**
   * Utility function to ensure a valid object value/rules pair is supplied
   */
  function isValidValidatorObject(object) {
    var validKeys = _.keys({value: '', rules: ''}).sort();
    var passedKeys;

    if (object instanceof Array) {
      _.each(object, function(item) {
        passedKeys = _.keys(item).sort();

        if (passedKeys !== validKeys)
          return false;
      });
      return true;
    }

    passedKeys = _.keys(object).sort();
    return validKeys === passedKeys;
  }

  /**
   * Primary Validate Function
   */
  (function validate(data) {

    if (data instanceof Array) {
      // do multiple stuff
    } else {

      /**
       * If there are errors, return those. Otherwise, return false.
       */
      return (errors.length > 0) ? errors : false;
    }
  })();
};