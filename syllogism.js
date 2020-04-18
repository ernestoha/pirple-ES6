/**
  * Assignment 03 ES06. Syllogism. 
  */

/**
  * Syllogism 1:
  *  All men are mortal
  *  Socrates is a man.
  *  Therefore, socrates is mortal.
  */
function Man(name, food) { 
    this.name = name;
    this.food = food; 
}

let socrates = new Man("Socrates", "grapes");
let ernesto = new Man("Ernesto", "pizza");
let men = {
    mortal: true, 
    socrates, 
    ernesto 
};
if ((men.mortal === true) && (socrates instanceof Man)) { 
    socrates.mortal = true; 
    console.log("All men are mortal.\nSocrates is a man.\nTherefore, socrates is mortal."); 
}

//console.log( typeof(socrates));
//console.log(socrates instanceof Man);

console.log("----------------------------");

/** 
  * Syllogism 2:
  *  This cake is either vanilla or chocolate.
  *  This cake is not chocolate.
  *  Therefore, this cake is vanilla.
  */
function Cake() {
    let flavorId = Math.floor(Math.random() * Math.floor(10)); // output [0...10]
    this.flavor = (flavorId == 1) ? "chocolate" : "vanilla";  
    // this.ingredients = ingredients;
}

console.log("This cake is either vanilla or chocolate."); 
let randomCake = new Cake(); 
if (randomCake.flavor != "chocolate") { 
    console.log("This cake is not chocolate.");
} else { 
    console.log("This cake is not vanilla.") 
} console.log("Therefore, this cake is " + randomCake.flavor + ".");
