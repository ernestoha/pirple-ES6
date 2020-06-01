"use stric"

const Helpers = {}; //Behavior like a Static Class
Helpers.getFloorsName = function (level, levels) {
    let name = "";
    if (level==0){
        name = "Lobby";
    } else if(level<0){
        name = "Basement #" + (level*-1);
    } else if(level==(levels.Up-1)){
        name = "Penthouse";
    } else { 
        name = "Floor #" + level;
    }
    return name;
};

function Floor(level, name) {//class Floor
    this.Level = level; /* int: -1 or 0, etc... */
    this.Name = name; /* string: Basement */
    this.ButtonPush = false; /* boolean: Available Button DownButtonNamedPushed */
}

function Elevator(name, levels) {//class Elevator
    //Const
    this.Gap = 10; /* how many floors each elevator travel */
    this.TotalWeight = 1500; /* Total Weigth Pounds*/
    this.TotalPassengers = 5; /* Total Passengers to Lift */

    this.Name = name;// = A, B
    //Available Floors for the elevator
    this.Floors = []; //= Object.create(Floor.prototype); //10
    this.setFloors(this.getStartingPoint(), levels);
    this.ActualFloor = this.Floors[0].Level; //Starting from bottom.
    this.Passengers = []; //new Passenger[this.TotalPassengers];/* Passengers */

    this.PassengersLift = 0;
    this.ElevatorWeight = 0;/* Total Weigth Pounds */
    this.TravelTime = 0;/*double */
    
    // this.ToFloor;
    // this.FromFloor;
    this.IsTraveling; //false then is Opened on the ActualFloor
    this.IsGoingUp;    
    
}

Elevator.prototype.EventEmergencyButtonPushed = function() {
    if (this.IsTraveling){
        if (this.IsGoingUp){
            console.log("Opening doors in next Up floor "+(this.ActualFloor+1));
        } else {
            console.log("Opening doors in next Down floor "+(this.ActualFloor-1));
        }
    } else {
        console.log("Opening doors in same floor "+(this.ActualFloor));
    }
};

Elevator.prototype.EventResetButtonPushed = function() {
    this.ResetValues();
    console.log(`Elevator ${this.Name} Working. Floor: ${this.ActualFloor}`);
}

Elevator.prototype.AddPassenger = function(shaft) {
    console.log("CLOSE DOORS.");
    //if (PassengersLift<TotalPassengers || ElevatorWeigth < TotalWeight)
    this.Passengers[this.PassengersLift] = new Passenger(shaft); //.getLevelsTotal()
    this.PassengersLift++;
}

/**
  * Main logic of Elevator Starting Point
  */
Elevator.prototype.getStartingPoint = function() {
    let start = 0; //Elevator start from Lobby
    switch(this.Name) 
    {
        case 'A':
            start = -1; //-1; only 1 level //-1 starting from basement 2
            // start = -2; //-2 starting from basement 2 (previous update levels.Down = 2)
            break;
        case 'B':
            start = 0; //-1 starting from basement 1
            // start = -1; //-1 starting from basement 1 (previous update levels.Down = 2)
            // Floors = new int[10]{-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
            break;
        // default:
            // int start = 0;
            // break;
    }
    return start;
}

Elevator.prototype.setFloors = function(start, levels) {
    // this.Floors = new Floor[levels.getLevelsTotal()-1]; //old
    // Floors[0] = new Floor(1, "e");
    for (let n = 0; n < levels.getLevelsTotal()-1; n++)
    {
        // this.Floors[n] = new Floor(n+start, Helpers.getFloorsName(n+start, levels)); //.getLevelsTotal() OLD
        this.Floors.push(new Floor(n+start, Helpers.getFloorsName(n+start, levels))); //.getLevelsTotal() NEW
    }
}

Elevator.prototype.isValidFloorTo = function(floorTo) {
    if (floorTo>=this.Floors[0].Level && floorTo<=this.Floors[this.Floors.length-1].Level && floorTo!=this.ActualFloor)
        return true;
    else 
        return false;
}

Elevator.prototype.setFloorByPassenger = function(floorTo) {
    if (this.isValidFloorTo(floorTo))
    {
        const direction = (this.ActualFloor>floorTo) ? 'D' : 'U';
        this.Floors[floorTo].ButtonPush = true; // Passenger Inside ELevator Push Button
        this.Passengers[this.PassengersLift-1].FloorTo = floorTo; //Last Passenger is setting the floor, other combinations.... @TODO
        this.Start(floorTo, direction);// after setted the floor to go, start...
        return true;
    }
    else 
    {
        console.log(`  * ERROR!! Invalid Floor to Go <${floorTo}>, check on the 'Elevator ${this.Name}' Panel and try again, or go to a Level near.`);
        return false;
    }
}

Elevator.prototype.GoingUp = function(floorTo) {
    console.log(`  * From: ${this.ActualFloor}, To: ${floorTo}`);
    for (let n = this.ActualFloor+1; n <= floorTo; n++) //levels.getLevelsTotal()-1
    {
        this.TravelTime++;
        console.log(`  *  Up ... Floor = ${n}. Time = ${this.TravelTime} seconds`);
    }
}

Elevator.prototype.GoingDown = function(floorTo) {
    console.log(`  * From: ${this.ActualFloor}, To: ${floorTo}`);
    for (let n = this.ActualFloor-1; n >= floorTo; n--)
    {
        this.TravelTime++;
        console.log(`  *  Down ... Floor = ${n}. Time = ${this.TravelTime} seconds`);
    }
}

Elevator.prototype.Start = function(floorTo, direction) {
    // @TODO read the list of this.Floors[floorTo].ButtonPush = true and go to each one
    if (direction=='U')
        this.GoingUp(floorTo);
    else //D
        this.GoingDown(floorTo);
    this.ActualFloor = floorTo;
    this.ResetValues();
}

Elevator.prototype.Stop = function() {
    this.ResetValues();
}

Elevator.prototype.ResetValues = function() {
    this.TravelTime = 0;
    // this.EleIndex = -1;
    // this.EleShaftPos = -1000;//@TODO
    this.PassengersLift = 0;
    for (let n = 0; n < this.Passengers.length-1; n++)
    {
        this.Passengers[n] = null;//
    }
    for (let n = 0; n < this.Floors.length-1; n++)
    {
        this.Floors[n].ButtonPush = false;
    }
    console.log("************************************************************************");
}

function Shaft(levels, level) {//class Shaft
    Floor.call(this, level, Helpers.getFloorsName(level, levels));
    this.ButtonUp = (level==levels.Up-1) ? false : true; //Available Button Up
    this.ButtonDown = (level==levels.Down*-1) ? false : true; //Available Button Down
    this.ButtonNamedPushed = undefined; /* char: UP or DOWN*/
}
  
Shaft.prototype = Object.create(Floor.prototype); //Class Shaft Inherits from Floor
Shaft.prototype.constructor = Floor;

Shaft.prototype.setButtonNamedPushed = function(letter) {
    if ("UD".includes(letter)){
        this.ButtonNamedPushed = letter;
        this.ButtonPush = true;
    }
}

function Level(up, down) { //class Level
    this.Up = up; /* int */
    this.Down = down; /* int */
}

Level.prototype.getLevelsTotal = function() {
    return this.Up + this.Down;
}

/**
  * stories, up (building floors up), down (building floors down)
  */
function Building(stories, up, down) {//class Building
    //Vars
    this.EleIndex = -1; //Elevator A(1) or B(2)
    this.EleShaftPos = -1000; //Shaft that called Elevator

    this.Stories = stories;
    this.Levels = new Level(up, down); //11, 1
    this.ElevatorA = new Elevator('A', this.Levels);
    this.ElevatorB = new Elevator('B', this.Levels);
    this.ElevatorToUse =  [this.ElevatorA, this.ElevatorB];//new Elevator[2];
    // this.ElevatorToUse[0] = this.ElevatorA;
    // this.ElevatorToUse[1] = this.ElevatorB;

    this.Shafts = [];
    this.setShafts();
}

Building.prototype.setShafts = function() {
    //this.Shafts = new Shaft[Levels.getLevelsTotal()];//old
    // Shafts[0] = new Shafts(1, "e");
    for (let n = 0; n < this.Levels.getLevelsTotal(); n++)
    {
        // this.Shafts[n] = new Shaft(this.Levels, n-1); //.getLevelsTotal() OLD2DELETE
        this.Shafts.push(new Shaft(this.Levels, n-1)); //.getLevelsTotal() NEW!
        // this.Shafts[n].prototype = Shaft.prototype;//testing...
    }
}
/*
 2
 1
 0
-1
*/
Building.prototype.floorsTo = function(ActualFloorX, FloorToX) {
    let n = ActualFloorX;
    let c = 0;
    if (ActualFloorX<FloorToX)
    {    
        while (n < FloorToX)
        {
            c++;
            n++;
            // console.log(n+";c="+c+";");
        }
    } else {
        n = FloorToX;
        while (n < ActualFloorX)
        {
            c++;
            n++;
            // console.log(n+";c="+c+";");
        }
    }
    return c;
    // return n;
}
/*
3
2 Pushed From
1 
0  B
-1  A 
*/
Building.prototype.wichElevatorSendToPushedCall = function() {
    const moveMsg = "MOVE TO A DIFERENT FLOOR";
    console.log(`  * Pushed [From --->'${this.Shafts[this.EleShaftPos].Name}' ${this.Shafts[this.EleShaftPos].Level}]`);
    const distanceA = this.floorsTo(this.ElevatorA.ActualFloor, this.Shafts[this.EleShaftPos].Level);
    const distanceB = this.floorsTo(this.ElevatorB.ActualFloor, this.Shafts[this.EleShaftPos].Level);
    console.log(`  * distanceA ${distanceA}. Actual Floor:${this.ElevatorA.ActualFloor} * `);
    console.log(`  * distanceB ${distanceB}. Actual Floor:${this.ElevatorB.ActualFloor} * `);
    if (this.Shafts[this.EleShaftPos].Level==this.Levels.Down*-1 || this.Shafts[this.EleShaftPos].Level==this.Levels.Up-1){
        if (this.Shafts[this.EleShaftPos].Level==this.Levels.Down*-1){//To bottom Basement 
            console.log(`Using Elevator A. Because Elevator B does not operate on ${this.Levels.Down*-1}. Time ${distanceA} seconds.`);
            this.ElevatorA.TravelTime += distanceA; //Nearest Elevator Traveling
            this.ElevatorA.ActualFloor = this.Shafts[this.EleShaftPos].Level;//Elevator in site
            this.EleIndex = 0;
        } else { //To Penthouse
            console.log(`Using Elevator B. Because Elevator A does not operate on Penthouse. Time ${distanceB} seconds.`);
            this.ElevatorB.TravelTime += distanceB; //Elevator B Traveling
            this.ElevatorB.ActualFloor = this.Shafts[this.EleShaftPos].Level;//Elevator in site
            this.EleIndex = 1;
        }
    } else {
        if (distanceA>distanceB){
            console.log(`${moveMsg}. Using Elevator ${this.ElevatorToUse[0].Name}.. Time ${distanceB} seconds. From ${this.ElevatorB.ActualFloor} To ${this.Shafts[this.EleShaftPos].Level}.`);
            this.ElevatorB.TravelTime += distanceB;
            this.ElevatorB.ActualFloor = this.Shafts[this.EleShaftPos].Level;//Elevator in site
            this.EleIndex = 1;
        } else {
            console.log(`${moveMsg}. Using Elevator ${this.ElevatorToUse[0].Name}.. Time ${distanceA} seconds. From ${this.ElevatorA.ActualFloor} To ${this.Shafts[this.EleShaftPos].Level}.`);
            this.ElevatorA.TravelTime += distanceA;
            this.ElevatorA.ActualFloor = this.Shafts[this.EleShaftPos].Level;//Elevator in site
            this.EleIndex = 0;
        }
    }
    console.log("OPEN DOORS.");
}

Building.prototype.AddPassengerToElevatorSelectedAuto = function() {
    this.ElevatorToUse[this.EleIndex].AddPassenger(this.Shafts[this.EleShaftPos]);
    // Building.ElevatorA.AddPassenger(Building.Shafts[2]); //adding 1 passenger Elevator A from Shaft[1]
}

Building.prototype.setFloorByPassengerESA = function(floorTo) {//Elevator Selected Automatic
    this.ElevatorToUse[this.EleIndex].setFloorByPassenger(floorTo);
    // Building.ElevatorA.setFloorByPassenger(9); // Passenger Inside ELevator Push Button "Floor # 9". Start...
}

Building.prototype.fromNum2ShaftPos = function(value) {
    for (let n = 0; n < this.Shafts.length; n++)  
    {
        if (this.Shafts[n].Level == value)
        {
            return n;
        }
    }
    return -1000;//@TODO
}

Building.prototype.EventButtonPushed = function(direction, value) {
    this.EleShaftPos = this.fromNum2ShaftPos(value);
    this.Shafts[this.EleShaftPos].setButtonNamedPushed('U');
    // console.log(".......---...."+this.Shafts[shaftPos].Level + "-"+this.Shafts[shaftPos].Name);
    //Calling Elevator and Setting to Elevator Actual Floor
    this.wichElevatorSendToPushedCall();
}

Building.prototype.EventUpButtonPushed = function(value) {
    this.EventButtonPushed('U', value);
}

Building.prototype.EventDownButtonPushed = function(value) {
    this.EventButtonPushed('D', value);
}

function Passenger(shaft) {//class Passenger
    this.FloorFrom = shaft.Level;
    this.Weight;
    this.FloorFrom; //Button pushed On Floor Shaft
    this.FloorTo; //Button Pushed On Elevator Panel
}

var app = {};

app.Building = new Building(10, 11, 1);

app.Test001 = function()
{
    app.Building.EventUpButtonPushed(2);//Passenger in Floor [2] press Up Button
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(9); // Passenger Inside ELevator Push Button "Floor # 9". Start...

    console.log("  * -->" + app.Building.ElevatorB.ActualFloor);

    app.Building.EventUpButtonPushed(2);//Passenger in Floor #2 press Down Button
    // Building.ElevatorB.AddPassenger(Building.Shafts[2]); //adding 1 passenger Elevator A from Shaft[1]
    // Building.ElevatorB.setFloorByPassenger(2); // Passenger Inside ELevator Push Button "Lobby". Start...
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(9); // Passenger Inside ELevator Push Button "Floor # 9". Start...

    // Building.EventUpButtonPushed(7);//Passenger in Lobby [1] press Up Button
    // Building.ElevatorA.AddPassenger(Building.Shafts[7]); //adding 1 passenger Elevator A from Shaft[1]
    // Building.ElevatorA.setFloorByPassenger(0); // Passenger Inside ELevator Push Button "Floor # 9". Start...

    app.Building.EventUpButtonPushed(8);//Passenger in Floor #8 press Down Button
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(5);

    app.Building.EventUpButtonPushed(8);//Passenger in Floor #8 press Down Button
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(4);

    app.Building.EventUpButtonPushed(-1);//Passenger in Bassement #1 press Up Button Only ELEVATOR A
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(7);

    app.Building.EventUpButtonPushed(8);//Passenger in Floor #8 press Down Button
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(0);

    app.Building.EventUpButtonPushed(10);//Passenger in Penthouse press Down Button Only ELEVATOR B
    app.Building.AddPassengerToElevatorSelectedAuto();
    app.Building.setFloorByPassengerESA(-1); //Then try to press Bassement -1....


    console.log("  * ----------------------------------------");
    console.log("  * " + app.Building.ElevatorA.Name);
    console.log("  * " + app.Building.ElevatorA.ActualFloor);
    console.log("  * " + app.Building.ElevatorA.Floors[0].Name);
    console.log("  * " + app.Building.ElevatorA.Floors[9].Name);
    console.log("  * " + app.Building.ElevatorA.Floors[10].Name);
    console.log("  * " + "A-Passengers="+app.Building.ElevatorA.PassengersLift);

    console.log("  * " + app.Building.ElevatorB.Name);
    console.log("  * " + app.Building.ElevatorB.ActualFloor);
    console.log("  * " + app.Building.ElevatorB.Floors[0].Name);
    console.log("  * " + app.Building.ElevatorB.Floors[9].Name);
    console.log("  * " + app.Building.ElevatorB.Floors[10].Name);

    console.log("  * " + "-------");
}

//Execute
app.Test001();

console.log(1)