//Class and Inheritance

function Vehicle(make, model, year, weight) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.needsMaintenance = false;
    this.tripsSinceMaintenance = 0;
}

Vehicle.prototype.consoleLog = function() {
    console.log(`make ${make}`);
}

function Cars(make, model, year, weight) {
    Vehicle.call(this, make, model, year, weight);
    this.isDriving = false;
}
  
Cars.prototype = Object.create(Vehicle.prototype);
Cars.prototype.constructor = Cars;

Cars.prototype.Drive = function() {
    this.isDriving = true;
}

Cars.prototype.Stop = function() {
    this.isDriving = false;
    this.tripsSinceMaintenance++;
    if (this.tripsSinceMaintenance>=100)
        this.needsMaintenance = true;
}

Cars.prototype.Repair = function() {
    this.tripsSinceMaintenance = 0;
    this.needsMaintenance = false;
}

Cars.prototype.WriteProperties = function() {
    console.log(`---------------------${this.model}-BEGIN---------------------`);
    console.log(`Make: ${this.make}. Year: ${this.year}. Weight: ${this.weight}`);
    console.log(`NeedsMaintenance: ${this.needsMaintenance}. TripsSinceMaintenance: ${this.tripsSinceMaintenance}`);
    console.log(`----------------------${this.model}-END----------------------\n`);
}

function Planes(make, model, year, weight) {
    Vehicle.call(this, make, model, year, weight);
    this.isDriving = false;
}
  
Planes.prototype = Object.create(Vehicle.prototype);
Planes.prototype.constructor = Cars;

Planes.prototype.Drive = function() {
    if (!this.needsMaintenance)
        this.isDriving = true;
    else
        console.log("Can't fly until it's repaired");
}

Planes.prototype.Stop = Cars.prototype.Stop;
Planes.prototype.Repair = Cars.prototype.Repair;
Planes.prototype.WriteProperties = Cars.prototype.WriteProperties;

//-----------------------------------------------------------------------

//Vars
const Mirai = new Cars("Toyota", "Mirai", 3030, 4075.11);
const Malibu = new Cars("Chevrolet", "Malibu", 3031, 3223.22);
const Mirage = new Cars("Mitsubishi", "Mirage", 3032, 2128.33);
Mirai.WriteProperties();
Malibu.WriteProperties();
Mirage.WriteProperties();

Mirai.tripsSinceMaintenance = 30;
Malibu.tripsSinceMaintenance = 99;
Mirage.tripsSinceMaintenance = 10;

Mirai.Drive();
Malibu.Drive();
Mirage.Drive();

Mirai.Stop();
Malibu.Stop();
Mirage.Stop();

Mirai.WriteProperties();
Malibu.WriteProperties();
Mirage.WriteProperties();

Malibu.Repair();
Malibu.WriteProperties();

const B737 = new Planes("Boeing", "B737", 3034, 40000.44);
B737.WriteProperties();

B737.tripsSinceMaintenance = 98;

B737.Drive(); 
B737.Stop(); //99
B737.Drive(); 
B737.Stop(); //100 Maintenance

B737.Drive(); //Can't fly until it's repaired.