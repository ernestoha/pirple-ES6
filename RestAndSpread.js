
/**
Spread Operator is unpacking collected elements such as arrays into single elements.
Rest Parameter is collecting all remaining elements into an array.
*/

//When using spread, you are expanding a single variable into more:
var abc = ['a', 'b', 'c'];
var def = ['d', 'e', 'f'];
var alpha = [ ...abc, ...def ];
console.log(alpha)// alpha == ['a', 'b', 'c', 'd', 'e', 'f'];

//When using rest arguments, you are collapsing all remaining arguments of a function into one array:
function sum( first, ...others ) {
    for ( var i = 0; i < others.length; i++ )
        first += others[i];
    return first;
}
console.log(sum(1,2,3,4))// sum(1, 2, 3, 4) == 10;
