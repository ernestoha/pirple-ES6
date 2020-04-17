/**
 * Assignment 2 Variables and Constants.

  "var" variables can be named in camelCase, can be redeclared in the same scope, do not need to be initialized and once setted can be reassigned. Scope is for the block and the whole function. Old way used to declared variables.

  "let" variables can be named in camelCase, can not be redeclared in the same scope, do not need to be initialized and once setted can be reassigned. Scope is only for the block not for the whole function. Added in ES6 syntax specification.

  "const" variables can be named in UPPERCASE, can not be redeclared, must to be initialized and once setted can not be reassigned. Scope is only for the block not for the whole function. Added in ES6 syntax specification.

 ------------------------------------------------------------------------------------------------------  
| name  | redeclareSameVar | mustBeInitialized | canChange  | blockScoped | wholeFunction | beforeES6  | 
| ------|------------------|-------------------|------------|-------------|---------------|------------| 
| var   | yes              | no                | yes        | yes         | yes           | yes        | 
| let   | no               | no                | yes        | yes         | no            | no         | 
| const | no               | yes               | no         | yes         | no            | no         | 
 ------------------------------------------------------------------------------------------------------
 */

//begin-var-example
var numberX = 1;
if (numberX === 1) {
    var numberX = 2;
    console.log(numberX); // expected output: 2
}
console.log(numberX); // expected output: 2
//end-var-example

//begin-let-example
let numberY = 1;
if (numberY === 1) {
    let numberY = 2;
    console.log(numberY); // expected output: 2
}
console.log(numberY); // expected output: 1
//uncoment this 2 LOC to test redeclare a let variable behavior
  //let numberY = 3;
  //console.log(numberY); // expected output: -- error thrown because 'let numberY' has already been declared
//end-let-example

//begin-const-example
const NUMBER = 31;
try {
    NUMBER = 99; //changing variable data on a CONST variable...
} catch (err) {
    console.log(err); // expected output: TypeError: invalid assignment to const `NUMBER'
}
console.log(NUMBER); // expected output: 31
//end-const-example