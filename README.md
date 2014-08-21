###friendly-validator.js
***

A Node.JS validation library using node-validator, but with user-friendly validation error messages.

[Here's a sample validation error sent to my clientside right now in Sails apps](http://puu.sh/b1grW/6233799473.png). Many (most) ORMs all return very "programmer friendly" errors, but not "user friendly" errors.

The goal of this library is:

- to be able to toss some form data (JSON key/value pairs) into a validate() function where you specify some simple rules (isEmail, isPhone, isCreditCard)
- IF there are NO errors: to return false, so we can do the simple and familiar `if (!err)` syntax 
- IF there are errors: to have it return a big list of plain-english errors that you can send back to the clientside, and output immediately, **without** having to write logic to convert "programmer errors" into "user friendly errors".

###Proposed Implementation 1:
***

```javascript
var data = {
  email: 'foo@bar.com',
  password: 'pass1234',
  phone: '5064555555'
};

var err = validate([
  {value: data.email, rule: 'isEmail'},
  {value: data.phone, rule: 'isPhone'},
  {value: data.password, rules: ['minLength(8)', 'maxLength(16)']}
]);
```

Parameters:
- a single, or an array of JSON key/value pair(s) (i.e. some JSON from the client), and a set of rules to check the key/value pair(s) against.

Returns:
- if all of the values passed in pass **all** of their validation rules, `err` will equal `false`.
- if ANY of the values passed in fail their test, a plain english array of `input_that_contains_error/plain_english_error_message` key/value pairs will be returned

Examples of implementation 1
----------------------------

Validate 1 value, which passes
```javascript
var email = 'foo@bar.com';
var err = validate({value: email, rule: 'isEmail'}); // email passes this validation test
console.log(err); // 'false'
// because all values passed all validations, there is no err, continue to next code
```

Validate 1 value, which fails validations... and returns a simple  `{ input_that_contained_error: 'error message' }` for the failed validation rule.
```javascript
var phone = '5064555555';
var err = validate({value: phone, rule: 'isMinLength(25)'}); // phone fails this validation test
console.log(err); // '[{phone: 'Phone must be at least 25 characters long.'}]'
// because it failed the validation, there is no err. So what we get back is a very simple "Heres what input has the error so we know which input to make all red and scary, and heres the error message to show below it explaining what the problem was" input/error JSON object
```

Validate an entire form of data, which all pass validations
```javascript
var phone = '5064555555';
var email = 'foo@bar.com';
var name = 'foo bar';
var agreed_to_terms = true;

var err = validate([
  {value: phone, rules: ['length(10)', 'isNumeric']}, // passes all validations
  {value: email, rules: ['isEmail', 'isUnique']}, // passes all validations
  {value: name, rule: 'minLength(3)'}, // passes validation
  {value: agreed_to_terms, rule: 'isTrue'} // passes validation
]);
console.log(err); // false, all values passed all validations
```

Validate an entire form of data, which all fail validations... and returns a simple array containing a `{ input_that_contained_error: 'error message' }` for every failed validation rule.
```javascript
var phone = 'aaaaf3af4f4fa6g5asg453vesfa';
var email = 'totallyNotAnEmail';
var name = 'hi';
var agreed_to_terms = false;

var err = validate([
  {value: phone, rules: ['length(10)', 'isNumeric']}, // fails all validations
  {value: email, rules: ['isEmail', 'isUnique']}, // fails all validations
  {value: name, rule: 'minLength(3)'}, // fails validation
  {value: agreed_to_terms, rule: 'isTrue'} // fails validation
]);
console.log(err); // see lines below for full output...
// [ {phone: 'Phone must be exactly 10 characters long.'},
//   {phone: 'Phone must only contain numbers.'},
//   {email: 'That isn't a properly formatted email address.'},
//   {email: 'That email is already taken.'},
//   {name: 'Your name must be at least 3 characters long.'},
//   {agreed_to_terms: 'Agreed to Terms must be true.'} ]

// now on the client side, all you do is loop through the returned array, attaching the class of "error" to any inputs whose "name" attribute matches what the server sent back, and you add the actual error message itself just below the input
```





