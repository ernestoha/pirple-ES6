/**
* Assignment 10 ES06. Destructing
* Destructuring: ES6 feature to unpack properties from objects or values from arrays into distinct variables.
*/

var object01 = {name: "chocolate", qty: 3, topping: "vanilla"};
var {name, qty, topping} = object01;
console.log("----------------Object-Begin---------------");
console.log(name);
console.log(qty);
console.log(topping);
console.log("-----------------Object-End----------------");

var array01 = ["Hi", "How", "Are", "You"];
var [salute, ...expression] = array01;
console.log("----------------Array-Begin----------------");
console.log(salute);
console.log(expression); // console.log(...expression);
console.log("-----------------Array-End-----------------");
