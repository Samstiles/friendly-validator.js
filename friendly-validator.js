var validator = require('validator');
var _ = require('lodash');
var errorHash = require('./errorHash.json');

module.exports = function(data) {

  /**
   * Set up error strings
   */
  var errorStrings = {
    "invalidArgsMalformedObject": "Invalid argument supplied. Friendly Validator requires the data you're passing in to be in a specific format.",
    "invalidArgsIncorrectNumber": "Invalid argument supplied. Friendly Validator expects 1 parameter.",
    "invalidArgsIncorrectType": "Invalid argument supplied. Friendly Validator expects data passed to be an Object or an Array.",
    "invalidArgsIncorrectRuleset": "Invalid argument supplied. One or all of the objects passed in has an invalid ruleset. Rulesets must be arrays of at least 1 rule.",
    "invalidArgsRulesetNotAllowed": "Invalid argument supplied. One or all of the objects passed in has a rule that is not in the list of validation rules used in this library. For a list of valid rules, visit https://github.com/latros/friendly-validator.git"
  };

  var validRules = ["isEmail", "isURL", "isFQDN", "isIP", "isAlpha", "isNumeric", "isAlphanumeric",
                    "isBase64", "isHexadecimal", "isHexColor", "isLowercase", "isUppercase",
                    "isInt", "isFloat", "isDate", "isCreditCard", "isISBN", "isMobilePhone",
                    "isJSON", "isAscii", "isMongoId"];

  /**
   * Throw an error if they supplied an incorrect number of arguments
   */
  if (_.size(arguments) !== 1)
    throw new Error(errorStrings.invalidArgsIncorrectNumber);

  /**
   * Throw an error if they did pass a parameter, but it isn't a valid type (object or array)
   * @NOTES: Both Arrays and Objects are instances of Object (yay javascrpt!), so we only need 1 check to cover both.
   */
  if (!(data instanceof Object))
    throw new Error(errorStrings.invalidArgsIncorrectType);

  /**
   * Throw an error if the data object they passed isn't in the allowed format of { value: '', rules: [] }
   */
  if (!isInValidFormat(data))
    throw new Error(errorStrings.invalidArgsMalformedObject);

  /**
   * Throw an error if the ruleset(s) aren't arrays
   */
  if (!hasValidRulesetFormat(data))
    throw new Error(errorStrings.invalidArgsIncorrectRuleset);

  /**
   * Throw an error if the ruleset(s) try and call a validation that is not valid in this library
   */
  console.log('HAS VALID RULES?', hasValidRules(data));
  if (!hasValidRules(data))
    throw new Error(errorStrings.invalidArgsRulesetNotAllowed);

  /**
   * Primary Validate Function
   */
  function validate(data) {
    var err = [];

    console.log('DATA:', data);

    if (data instanceof Array) {
      console.log('ARRAY, DUMMY!');
      return false;
    } else {
      _.each(data.rules, function(rule) {
        if ( !validator[rule](data.value) )
          err.push(generateError(data.value, rule));
      });

      console.log('Err array assembly:', err);

      return (err.length === 0) ? false : err;
    }
  }

  /**
   * Assembly function to take a bad value + rule and return an error object
   */
  function generateError(value, rule) {
    // 
    return errorHash[rule].replace(/%s/g, '"' + value + '"');
  }

  /**
   * Predicate function to ensure a valid object value/rules pair is supplied
   */
  function isInValidFormat(object) {
    var validKeys = _.keys({value: '', rules: ''}).sort();
    var passedKeys;
    var err = false;
    // If they passed in an array, loop through each one, and fail if any of them
    // are malformed.
    if (object instanceof Array) {
      _.each(object, function(item) {
        var itemKeys = _.keys(item).sort();
        if (!itemKeys.equals(validKeys))
          err = true;
      });
      return (err) ? false : true;
    } else {
      // Otherwise, check if the object they passed in is valid.
      passedKeys = _.keys(object).sort();
      return validKeys.equals(passedKeys);
    }
  }

  /**
   * Predicate function to ensure the second key of the object is of type array
   */
  function hasValidRulesetFormat(object) {
    var err = false;
    // If they passed in an array, loop through each one, and fail if any of them
    // are malformed.
    if (object instanceof Array) {
      _.each(object, function(item) {
        if (!(item.rules instanceof Array) || item.rules.length > 0)
          err = true;
      });
      return (err) ? false : true;
    } else {
      // Otherwise, check if the single object they passed in is valid.
      return object.rules instanceof Array && object.rules.length > 0;
    }
  }

  /**
   * Predicate function to ensure the rules passed in exist and are valid rules usable by this library
   */
  function hasValidRules(object) {
    var errors;
    if (object instanceof Array) {
      _.each(object, function(validation) {
        errors.push(_.each(_.difference(validation.rules, validRules)));
      });
    } else {
      errors = _.difference(object.rules, validRules);
    }

    console.log('Obj rules:', object.rules);
    console.log('Valid rules:', validRules);

    console.log('ERRORS:', errors);

    return (errors.length !== 0);
  }

  return validate(data);
};

/**
 * Array prototype function to compare equality of two arrays
 */
Array.prototype.equals = function (array) {
  if (!array)
      return false; 
  if (this.length != array.length)
      return false;
  for (var i = 0, l=this.length; i < l; i++) {
      if (this[i] !== array[i]) {
          return false;
      }
  }
  return true;
};
