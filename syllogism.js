/**
 * Assignment 04 ES06. Functions.
 */

/**
 * Syllogism 1:
 *  All men are mortal
 *  Socrates is a man.
 *  Therefore, socrates is mortal.
 */

//Function
function isMortal(man) {
  if (typeof(man) === "string") {
    return true;
  } else {
    return false;
  }
}

//Vars
const man = "Socrates";
const mortal = isMortal(man);
const xtraText = (mortal ? " " : " not ");

//Output
console.log("All men are mortal.\n" + man + " " + "is" + xtraText + "a man.\nTherefore," + " " + man + " " + "is" + xtraText + "mortal.");

console.log("----------------------------");

/**
 * Syllogism 2:
 *  This cake is either vanilla or chocolate.
 *  This cake is not chocolate.
 *  Therefore, this cake is vanilla.
 */

//Function
function getFlavor(cakes, isChocolate) {
  let flavor = cakes[isChocolate ? 0 : 1];
  return flavor;
}

//Vars
const cakes = [
   "chocolate",
   "vanilla"
];
const chocolate = false;
const flavor = getFlavor(cakes, chocolate);

//Output
console.log("This cake is either" + " " + cakes[0] + " " + "or" + " " + cakes[1] + ".");
console.log("This cake is not" + " " + cakes[+chocolate] + ".");
console.log("Therefore, this cake is " + flavor + ".");
