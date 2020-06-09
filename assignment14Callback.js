//Homework Assignment #14: Callbacks and Promises

appC = {}; //Callback

appC.x = 0;
appC.nums = [1000, 100, 34];//Nums to check
appC.time = [];

appC.square = function (num, callback){
    let sq = Math.pow(num, 2);
    console.log(`num${appC.x+1}=${num}. square=${sq}`);
    setTimeout(() => {
        callback(num, appC.prevPrime); //selectPrime
    }, num);
};

appC.squareRoot = function (num, callback){
    let sqr = Math.sqrt(num);
    console.log(`num${appC.x}=${num}. squareRoot=${sqr}`);
    callback(num, appC.printEndTime);
};

appC.isPrime = function(a) {
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

appC.printBeginTime = function() {
    appC.time.push({begin: Date.now()});
    console.log(`timeBegin${appC.time.length}=${appC.time[appC.time.length-1].begin}`);
};

appC.printEndTime = function(callback) {
    const pos = appC.time.length-1;
    appC.time[pos].end = Date.now();
    console.log(`timeEnd${pos+1}=${appC.time[pos].end}. milliseconds=${appC.time[pos].end-appC.time[pos].begin}\n--------------------------\n`);
    callback();
};

appC.prevPrime = function(x, callback) {
    const old_num = x;
    while(!appC.isPrime(--x)){}
    console.log(`num${appC.x}=${old_num}. prime=${x}`);
    callback(appC.checkNums);
    // return x;
};

appC.checkNums = function(callback) {
    if (appC.x<appC.nums.length){
        appC.printBeginTime();
        console.log(`num${appC.x+1}=${appC.nums[appC.x]}`);
        appC.square(appC.nums[appC.x], appC.squareRoot);
    }
    appC.x++;
};

appC.nextPrime = function(x) {
    while(!appC.isPrime(++x)){}
    return x;
};

appC.selectPrime = function(x) {
    const prev = appC.prevPrime(x);
    const next = appC.nextPrime(x);
    return (prev<next) ? prev : next;
};

//Set Numbers
appC.nums = [1000, 100, 4, 3400, 28, 7900, 10];
//Output
appC.checkNums();
