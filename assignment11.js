/**
  * Homework #11: Exceptions. reverseJsonArray
  */

var app = {};

// Parse a JSON string to an object in all cases, without throwing
app.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    // console.log(e);
    return {};
  }
};

//Reverse Array Version 1
app.reverseJsonArrayV1 = function(jsonString){
    console.log(jsonString);
    // var jsonData = JSON.parse(jsonString);
    var jsonObj = app.parseJsonToObject(jsonString); //Parse JsonString
    // console.log(jsonObj);
    if (Object.keys(jsonObj).length){
      // console.log(jsonObj.data);
      jsonObj.data = jsonObj.data.reverse();//Reverse Array
      return JSON.stringify(jsonObj); //jsonObj to String
    }else{
      return false;
    }
};

//Reverse Array Version 2
app.reverseJsonArrayV2 = function(arrayString){
  console.log(arrayString);
  // var jsonData = JSON.parse(arrayString);
  var jsonObj = app.parseJsonToObject(arrayString); //Parse JsonString
  // console.log(jsonObj);
  if (Object.keys(jsonObj).length){
    // console.log(jsonObj.data);
    return jsonObj.reverse();//Reverse and return Array
  }else{
    return false;
  }
};

console.log("------------V1-BEGIN-----------");

var array1 = '{ "data" : ["a","b","c"] }';
var array1reverse = (app.reverseJsonArrayV1(array1));
console.log(array1reverse);

console.log("-------------------------------");

var array2 = '{ "data" : [1, 2, 3, 4, 5, 6] }';
var array2reverse = (app.reverseJsonArrayV1(array2));
console.log(array2reverse);

console.log("-------------------------------");

var array3 = '{ "data : SYNTAX_ERROR1, 2, 3] }';
var array3reverse = (app.reverseJsonArrayV1(array3));
console.log(array3reverse);

console.log("-------------V1-END------------\n\n");


console.log("------------V2-BEGIN-----------");

var array1 = '["a","b","c"]';
var array1reverse = (app.reverseJsonArrayV2(array1));
console.log(array1reverse);

console.log("-".repeat(31));

var array2 = 123;
var array2reverse = (app.reverseJsonArrayV2(array2));
console.log(array2reverse);

console.log("-".repeat(31));

var array3 = '[1, 2, 3, 4, 5, 6, 7]';
var array3reverse = (app.reverseJsonArrayV2(array3));
console.log(array3reverse);

console.log("-------------V2-END------------");