//Homework Assignment #14: Callbacks and Promises

appP = {}; //Promise. A better readable code...

appP.x = 0;
appP.nums = [1000, 100, 34];//Nums to check
appP.time = [];

appP.square = function (num){
    let sq = Math.pow(num, 2);
    // console.log(`num${appP.x+1}=${num}. square=${sq}`);
    // const message = `num${appP.x+1}=${num}. square=${sq}`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // callback(num, appP.prevPrime); //selectPrime
            // resolve(message);
            resolve(sq);
        }, num);
    });
};

appP.timeLogger = function (message, time) {//test
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(message);
      }, time);
      if (typeof message !== "string" || typeof time !== "number") {
        reject();
      }
    });
}

appP.squareRoot = function (num){
    let sqr = Math.sqrt(num);
    // console.log(`num${appP.x}=${num}. squareRoot=${sqr}`);
    // callback(num, appP.printEndTime);
    // const message = `num${appP.x+1}=${num}. squareRoot=${sqr}`;
    return new Promise((resolve, reject) => {
        // resolve(message)
        resolve(sqr)
    }); 
};

appP.isPrime = function(a) {
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
};

appP.printBeginTime = function() {
    appP.time.push({begin: Date.now()});
    // console.log(`timeBegin${appP.time.length}=${appP.time[appP.time.length-1].begin}`);
    const message = `timeBegin${appP.time.length}=${appP.time[appP.time.length-1].begin}`;
    return new Promise((resolve, reject) => {
        resolve(message);
    });
};

appP.printEndTime = function(pos) {
    // const pos = appP.time.length-1;
    appP.time[pos].end = Date.now();
    // console.log(`timeEnd${pos+1}=${appP.time[pos].end}. milliseconds=${appP.time[pos].end-appP.time[pos].begin}\n--------------------------\n`);
    const message = `timeEnd${pos+1}=${appP.time[pos].end}. milliseconds=${appP.time[pos].end-appP.time[pos].begin}\n--------------------------\n`;
    return new Promise((resolve, reject) => {
        resolve(message);
    });
    // callback();
};

appP.prevPrime = function(x) {
    const old_num = x;
    while(!appP.isPrime(--x)){}
    // const message = `num${appP.x+1}=${old_num}. prime=${x}`;
    return new Promise((resolve, reject) => {
        // resolve(message);
        resolve(x);
    });
    // console.log(`num${appP.x}=${old_num}. prime=${x}`);
    // callback(appP.checkNums);
    // return x;
};

// appP.checkNums = function(callback) {
//     if (appP.x<appP.nums.length){
//         appP.printBeginTime();
//         console.log(`num${appP.x+1}=${appP.nums[appP.x]}`);
//         appP.square(appP.nums[appP.x], appP.squareRoot);
//     }
//     appP.x++;
// };

appP.nextPrime = function(x) {
    while(!appP.isPrime(++x)){}
    return x;
};

appP.selectPrime = function(x) {
    const prev = appP.prevPrime(x);
    const next = appP.nextPrime(x);
    return (prev<next) ? prev : next;
};


// Set Numbers
appP.nums = [1000, 100, 3000, 10];
//Output
for (let x=0; x<appP.nums.length; x++){
    let num = appP.nums[x];
    appP.printBeginTime()
    .then(msg => {
        console.log(msg)
        return appP.square(num);
    }).then(sq => {
        console.log(`num${x+1}=${num}. square=${sq}`)
        return appP.squareRoot(num);
    }).then(sqrt => {
        console.log(`num${x+1}=${num}. squareRoot=${sqrt}`);
        return appP.prevPrime(num);
    }).then(x1 => {
        console.log(`num${x+1}=${num}. prime=${x1}`);
        return appP.printEndTime(x);
    }).then(msg => {
        console.log(msg);
    }).catch(err => console.log("Error: "+err));
}
