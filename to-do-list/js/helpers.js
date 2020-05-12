/*
 * Helpers
 *
 */

// Container for Helpers
var helpers = {};

helpers.ping = function () {
    console.log({html_ping: html.ping()});
    return 111;
};
  
helpers.camelize = function (str) {
    var arr = str.split('-');
    var capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item);
    return capital.join("");
}

helpers.addDiv = function (message, className) {
    var div = document.createElement("DIV"); // Create a <div> element
    div.innerHTML = message;                 //"This field can not be empty"; // Insert text
    div.className = className;               // Set Css class
    div.style.display = 'block';
    return div;
};

helpers.addForm = function (name, className) {
    className = className == undefined ? name : className;
    var form = document.createElement("FORM");
    form.name = name;
    form.classList.add(className);
    return form;
};

helpers.addInput = function (name, value, type = "text"){
    var input = document.createElement('INPUT');
    input.name = name;
    input.type = type;
    input.value = value;
    // input.classList.add(className[x]);
    // for (var x=0; x<className.length; x++)
      // input.classList.add(className[x]);
    return input;
};

helpers.addCheckBox = function (name, checked=false){
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = checked;
    checkbox.name = name;
    return checkbox;
};

helpers.getInputVal = function(form, name) {
    return form.querySelector('input[name="'+name+'"]').value;
};

helpers.isChecked = function(form, name) {
    return form.querySelector('input[name="'+name+'"]').checked;
};

helpers.setInputVal = function(form, name, value) {
    form.querySelector('input[name="'+name+'"]').value = value;
};
  
helpers.setFormFocus = function(form, name) {
    form.querySelector('input[name="'+name+'"]').focus();
};

  
helpers.bindClick = function(objAll, objName, field="id", node = "document"){
    objAll = document.querySelectorAll(objAll);
    for (var i = 0; i < objAll.length; i++) {// for all browsers and ES versions
      // console.log(objAll[i]);
      objAll[i].addEventListener("click", eval(objName + '.' + helpers.camelize(objAll[i][field])+"_onClick")); //the same id name is the JS function name+_onClick (names from kebab-case to camelCase)
      // objAll[i].addEventListener("click", eval(camelize(objAll[i].id)+"_onClick")); //the same id name is the JS function name+_onClick (names from kebab-case to camelCase)
      
    }
};

helpers.bindAll = function (){
    helpers.bindClick("div#logo a", "app", "name");
    helpers.bindClick("button", "app");
    helpers.bindClick("input[type='submit']", "app");
    helpers.bindClick("a.button", "app", "name");
};

helpers.isDuplicated = function (data, field, value) {
    var results = data.filter(function(key) {
        return key[field] == value; 
    });
    return (results.length>0) ? true : false;
};

helpers.addErrorDiv = function (message = "This field can not be empty."){
    return helpers.addDiv(message, "error");
};
  
helpers.addOkDiv = function (message = "Ok"){
    return helpers.addDiv(message, "success");
};

helpers.addSubmit = function (name, text, className){
    var btn = document.createElement('INPUT');
    btn.name = name+"-"+className[0];
    btn.type = "submit";
    btn.value = text;
    // btn.classList.add(className[x]);
    for (var x=0; x<className.length; x++)
      btn.classList.add(className[x]);
    return btn;
};
  
helpers.addButton = function (name, text, className){
    var btn = document.createElement('BUTTON');
    btn.name = name+"-"+className[0];
    btn.type = "button";
    btn.textContent = text;
    // btn.classList.add(className[x]);
    for (var x=0; x<className.length; x++)
      btn.classList.add(className[x]);
    return btn;
};

helpers.validateForm = function (form, checkCheckBox = true){
    var isOk = true;
    html.clearMessageDiv();
    for (var i = 0; i < form.length; i++) {
      // console.log("--",form[i]);
      if (form[i].type!="checkbox"){
        if (form[i].name && form[i].name.length>0){
          if (form[i].value.trim() == ""){
            isOk = false;
            form[i].parentElement.append(helpers.addErrorDiv());
          }
        }
      } else {
        if(checkCheckBox && !form[i].checked){
          isOk = false;
          form[i].parentElement.append(helpers.addErrorDiv("You must check the checkbox."));
        }
      }
    }
    return isOk;
};
