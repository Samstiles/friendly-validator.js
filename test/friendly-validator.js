var chai = require('chai');
var expect = chai.expect;
var validate = require('../friendly-validator.js');

describe('-------------------------\n  Friendly Validator Formatting/Misuse Tests!\n  -------------------------\n', function() {

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

});

describe('-------------------------\n  Friendly Validator Test Tests!\n  -------------------------\n', function() {

  /**
   * Rule Test #1: isEmail
   */
  it('should pass isEmail test', function() {
   var data = { value: 'foo@bar.com', rules: ['isEmail'] };
   var err = validate(data);
   expect(err).to.equal(false);
  });

  it('should fail isEmail test', function() {
   var data = { value: 'foofoo', rules: ['isEmail'] };
   var err = validate(data);
   expect(err[0]).to.equal('"foofoo" is not a valid email address.');
  });

  /**
   * Rule Test #2: isURL
   */
  it('should pass isURL test', function() {
    var data = { value: 'https://google.ca/', rules: ['isURL'] };
    var err = validate(data);
    expect(err).to.equal(false);
  });

  it('should fail isURL test', function() {
    var data = { value: 'asdfasdf', rules: ['isURL'] };
    var err = validate(data);
    expect(err[0]).to.equal('"asdfasdf" is not in valid URL format.');
  });

  /**
   * Rule Test #3: isFQDN
   */
  // it('should pass isFQDN test', function() {
  //   var data = { value: 'https://google.ca/', rules: ['isFQDN'] };
  //   var err = validate(data);
  //   expect(err).to.equal(false);
  // });

  // it('should fail isFQDN test', function() {
  //   var data = { value: 'google.ca', rules: ['isFQDN'] };
  //   var err = validate(data);
  //   expect(err[0]).to.equal("Your mom");
  // });

  /**
   * Rule Test #4: isIP
   */
  it('should pass isIP test', function() {
    var data = { value: '192.168.1.2', rules: ['isIP'] };
    var err = validate(data);
    expect(err).to.equal(false);
  });

  it('should fail isIP test', function() {
    var data = { value: '53246274547', rules: ['isIP'] };
    var err = validate(data);
    expect(err[0]).to.equal('"53246274547" is not in valid IP Address format.');
  });

  // /**
  //  * Rule Test #5: isAlpha
  //  */
  it('should pass isAlpha test', function() {
    var data = { value: 'asdfasdf', rules: ['isAlpha'] };
    var err = validate(data);
    expect(err).to.equal(false);
  });

  it('should fail isAlpha test', function() {
    var data = { value: '5a5asd5ads6sfdy87d', rules: ['isAlpha'] };
    var err = validate(data);
    expect(err[0]).to.equal('"5a5asd5ads6sfdy87d" contains non-alpha characters.');
  });

  // /**
  //  * Rule Test #6: isNumeric
  //  */
  it('should pass isNumeric test', function() {
    var data = { value: '506346346245646845263', rules: ['isNumeric'] };
    var err = validate(data);
    expect(err).to.equal(false);
  });

  it('should fail isNumeric test', function() {
    var data = { value: 'fasdjkgsdygkadygetg9drygy5go4', rules: ['isNumeric'] };
    var err = validate(data);
    expect(err[0]).to.equal('"fasdjkgsdygkadygetg9drygy5go4" contains non-numeric characters.');
  });

  // /**
  //  * Rule Test #7: isAlphanumeric
  //  */
  // it('should pass isAlphanumeric test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isAlphanumeric test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #8: isHexadecimal
  //  */
  // it('should pass isHexadecimal test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isHexadecimal test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #9: isHexColor
  //  */
  // it('should pass isHexColor test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isHexColor test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #10: isLowercase
  //  */
  // it('should pass isLowercase test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isLowercase test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #11: isUppercase
  //  */
  // it('should pass isUppercase test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isUppercase test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #12: isInt
  //  */
  // it('should pass isInt test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isInt test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #13: isFloat
  //  */
  // it('should pass isFloat test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isFloat test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #14: isDate
  //  */
  // it('should pass isDate test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isDate test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #15: isCreditCard
  //  */
  // it('should pass isCreditCard test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isCreditCard test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #16: isISBN
  //  */
  // it('should pass isISBN test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isISBN test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #17: isMobilePhone
  //  */
  // it('should pass isMobilePhone test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isMobilePhone test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #18: isJSON
  //  */
  // it('should pass isJSON test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isJSON test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #19: isAscii
  //  */
  // it('should pass isAscii test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isAscii test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // /**
  //  * Rule Test #20: isMongoId
  //  */
  // it('should pass isMongoId test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });

  // it('should fail isMongoId test', function() {
  //   var data = { value: '', rules: [''] };
  //   var err = validate(data);
  //   expect().to.equal();
  // });
  
  it('should pass a big ass fancy test', function() {
    var data = [{ value: '506-476-1666'                        , rules: ['isMobilePhone'] },
                { value: 'samstil.es'                          , rules: ['isURL'] },
                { value: 'https://google.ca/'                  , rules: ['isFQDN'] },
                { value: 'sam@phasesolutions.ca'               , rules: ['isEmail'] },
                { value: 'leahbelyea@gmail.com'                , rules: ['isEmail'] },
                { value: '3758 5044 8291 7034'                 , rules: ['isCreditCard'] },
                { value: 'asdfljhgsdfgjkasflhau'               , rules: ['isAlpha'] },
                { value: 'Samuel Stiles'                       , rules: ['isAlphanumeric'] },
                { value: '534623934562345624625252354'         , rules: ['isNumeric'] },
                { value: 'ISBN 0-14-020652-3'                  , rules: ['isISBN'] },
                { value: '507f191e810c19729de860ea'            , rules: ['isMongoId'] },
                { value: '_!_!+f-fad=FA./,;[a8dsy 35'          , rules: ['isAscii'] },
                { value: '{ "key_one": "value", "key_two": 5 }', rules: ['isJSON'] },
                { value: 'February 1st, 2015'                  , rules: ['isDate'] },
                { value: 5                                     , rules: ['isInt'] },
                { value: 5.46                                  , rules: ['isFloat'] },
                { value: 'all lowercase'                       , rules: ['isLowercase'] },
                { value: 'ALL UPPERCASE'                       , rules: ['isUppercase'] },
                { value: '#FFFFFF'                             , rules: ['isHexColor'] }];
    var err = validate(data);
    expect(err).to.equal(false);
  });
});