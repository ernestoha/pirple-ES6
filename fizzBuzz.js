/**
* Assignment 06 ES06. Loops.
*/

//Function
function isPrime(a){
 x = false;
 i = 2;
 if (a==i)
   return true;
 while (i<a){
   if (a%i == 0){
    x = false;
    break;
   } else {
    x = true;
    i++;
   }
 }
 return x;
}

//Vars
for (let n=1; n<101; n++){
    if (isPrime(n))
        console.log(n+" Prime")
    else if (n % 3 == 0 && n % 5 == 0)
        console.log(n+" FizzBuzz")
    else if (n % 3 == 0)
       	console.log(n+" Fizz")
    else if (n % 5 == 0)
      	 console.log(n+" Buzz")
    else
        console.log(n)
}
