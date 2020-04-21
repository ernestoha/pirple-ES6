/**
 * Assignment 05 ES06. Switch Statements.
 */
//Function
function timeAdder(value1, label1, value2, label2) {
  if ((isValid(value1, label1)) && (isValid(value2, label2))) {
    //if ((label1 == label2) || (label1.slice(0, -1) == label2) || (label1 == label2.slice(0, -1))){
    //if ((getScale(label1))===(getScale(label2)))
    if ((getScale(label1)) !== (getScale(label2)))
    { //Same labels
      // value3 = value1 + value2;
      // label3 = getPlural(label1);
      //} else { // different labels
      if (label1Bigger(label1, label2)) {
        value1 = convert2MinimumScale(value1, label1, label2);
      } else {
        value2 = convert2MinimumScale(value2, label2, label1);
      }
    }
    let value3 = value1 + value2;
    let label3 = getPlural(label1Bigger(label1, label2) ? label2 : label1);
    return round2Scale(value3, label3);
  } else {
    return false; //incorrect format
  }
}

function getPlural(label) {
  let plural = label;
  switch (label) {
    case "second":
    case "minute":
    case "hour":
    case "day":
      plural += 's';
      break;
  }
  return plural;
}

function isValid(value, label) {
  let validation = false;
  switch (label) {
    case "seconds":
    case "minutes":
    case "hours":
    case "days":
      return (value > 1) ? true : false;
      // break;
    case "second":
    case "minute":
    case "hour":
    case "day":
      return (value == 1) ? true : false;
      // break;
    default:
      return false;
  }
  return validation;
}

function label1Bigger(label1, label2) {
  return (getScale(label1) > getScale(label2)) ? true : false;
}

function getScale(label) {
  let scale = false;
  switch (getPlural(label)) {
    case "seconds":
      scale = 1;
      break;
    case "minutes":
      scale = 2;
      break;
    case "hours":
      scale = 3;
      break;
    case "days":
      scale = 4;
      break;
  }
  return scale;
}

function getScaleName(key, value) {
  let name = "";
  switch (key) {
    case 1:
      name = "second";
      break;
    case 2:
      name = "minute";
      break;
    case 3:
      name = "hour";
      break;
    case 4:
      name = "day";
      break;
  }
  return (value > 1) ? getPlural(name) : name;
}

function getScaleValue(key) {
  let scale = false;
  switch (key) { //label
    case 1: //"seconds":
      scale = 60;
      break;
    case 2: //"minutes":
      scale = 60;
      break;
    case 3: //"hours":
      scale = 24;
      break;
    case 4: //"days":
      scale = 1;
      break;
  }
  return scale;
}

function convert2MinimumScale(value, labelBig, labelSmall) {
  const small = getScale(labelSmall);
  const big = getScale(labelBig);
  let mult = 1;
  //console.log("small = " + small);
  //console.log("big = " + big);
  for (let x = small; x < big; x++) {
    mult *= getScaleValue(x);
    //console.log("__"+mult);
  }
  return value * mult;
}

function getNextScale() {
  return false;
}

function round2Scale(value3, label3) {
  const small = getScale(label3);
  //const big = getScale(labelBig);
  let mult = 1;
  let x = small;
  let res = [];
  //console.log("label3="+label3 +". value3="+value3);
  let value2check = 0;
  let valueTemp = value3;
  while (x < 4) { // 4  is the bigger scale
    mult *= getScaleValue(x);
    value2check = valueTemp / mult;
    if (Number.isInteger(value2check)) {
      value3 = value2check;
      label3 = getScaleName(x + 1, value3);
    }
    x++;
  }
  return [value3, label3];
}

//Vars
const call1 = timeAdder(2, "minutes", 3, "minutes");
const call2 = timeAdder(1, "hour", 2, "minutes");
const call3 = timeAdder("test", "hour", 3, "days");
const call4 = timeAdder(1, "hour", 1, "hour");
const call5 = timeAdder(4, "minutes", 60, "seconds");
const call6 = timeAdder(2, "minutes", 1, "second");
const call7 = timeAdder(23, "hours", 1, "hour");
const call8 = timeAdder(6600, "minutes", 36000, "seconds");

//Output
console.log("call1: " + call1);
console.log("call2: " + call2);
console.log("call3: " + call3);
console.log("call4: " + call4);
console.log("call5: " + call5);
console.log("call6: " + call6);
console.log("call7: " + call7);
console.log("call8: " + call8);