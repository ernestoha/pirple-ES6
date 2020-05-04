/**
 * ToDo List Javascript
 */

var seeEhaBtns = false;
var toShowDashboard;//setInterval(showDashboardEfect(), 1000 * 3);
var user = {}; //JSON.parse(localStorage.getItem("ernestoharias@gmail.com"));
var todoList = []; //JSON.parse(localStorage.getItem("ernestoharias@gmail.com_todo"));

window.addEventListener('DOMContentLoaded', initJs);

function initJs(){
  if (!seeEhaBtns){
    document.querySelectorAll("button.fill-eha-data").forEach(e => e.parentNode.removeChild(e)); //Delete eha buttons
  }
  bindAll();
}

function setH1Title(route){
  var title = "ToDo List";
  switch(route){ //hi-title
    case 'home': title = "Home"; break;
    case 'sign-up-form': title = "Sign Up"; break;
    case 'log-in-form': title = "Log In"; break;
    case 'dashboard-form': title = "Dashboard ToDo List"; break;
    case 'todo-create-form': title = "Add ToDo Item"; break;
    case 'edit-user-form': title = "Account Settings"; break;
  }
  document.getElementById("h1-title").innerHTML = title;
}

function bindAll(){
  bindClick("div#logo a", "name");
  bindClick("button");
  bindClick("input[type='submit']");
  bindClick("a.button", "name");
}

function bindClick(objAll, field="id"){
  objAll = document.querySelectorAll(objAll);
  for (var i = 0; i < objAll.length; i++) {// for all browsers and ES versions
    // console.log(objAll[i]);
    objAll[i].addEventListener("click", eval(camelize(objAll[i][field])+"_onClick")); //the same id name is the JS function name+_onClick (names from kebab-case to camelCase)
    // objAll[i].addEventListener("click", eval(camelize(objAll[i].id)+"_onClick")); //the same id name is the JS function name+_onClick (names from kebab-case to camelCase)
  }
}

function camelize(str) {
  var arr = str.split('-');
  var capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item);
  return capital.join("");
}

function clearMessageDiv() {
  document.querySelectorAll("div.error").forEach(e => e.parentNode.removeChild(e)); //Delete div.error
  document.querySelectorAll("div.success").forEach(e => e.parentNode.removeChild(e)); //Delete div.success
}

function isChecked(form, name) {
  return form.querySelector('input[name="'+name+'"]').checked;
}

function getInputVal(form, name) {
  return form.querySelector('input[name="'+name+'"]').value;
}

function setInputVal(form, name, value) {
  form.querySelector('input[name="'+name+'"]').value = value;
}

function setFormFocus(form, name) {
  form.querySelector('input[name="'+name+'"]').focus();
}

function routeToHome_onClick(){
  showRoute('home');
}

function routeToDashboard_onClick(){
  showDashboard();
}

function isDuplicated(data, field, value) {
  var results = data.filter(function(key) {
      return key[field] == value; 
  });
  return (results.length>0) ? true : false;
}

function setMenuHeader(removeAll = false){
  var logIn = document.getElementById("log-in").parentElement;
  var signUp = document.getElementById("sign-up").parentElement;
  var editUser = document.getElementById("edit-user").parentElement;
  var logOut = document.getElementById("log-out").parentElement;
  // if (document.getElementById("loading").className.indexOf("display-none")>-1){
  // if (document.getElementById("loading").classList.contains("display-none")){
  if (!removeAll){
    if (user.email!=undefined){
      logIn.classList.add('display-none');
      signUp.classList.add('display-none');
      editUser.classList.remove('display-none');
      logOut.classList.remove('display-none');
    } else {
      logIn.classList.remove('display-none');
      signUp.classList.remove('display-none');
      editUser.classList.add('display-none');
      logOut.classList.add('display-none');
    }
  } else {
    logIn.classList.add('display-none');
    signUp.classList.add('display-none');
    editUser.classList.add('display-none');
    logOut.classList.add('display-none');
  }
  // document.querySelectorAll("div#header-right-side").forEach(e => e.classList[(e.id==route ? 'remove' : 'add')]('display-none'));
}

/**
 * 
 * @param {*} route 
 * @param {*} param
 */
function showRoute(route, param={}){
  setH1Title(route);
  // document.querySelectorAll("div#content div.page-route").forEach(e => console.log(e));
  document.querySelectorAll("div#content div.page-route").forEach(e => e.classList[(e.id==route ? 'remove' : 'add')]('display-none'));
  if (route!='home')
    clearMessageDiv();
  if (param.message && param.message.length>0){
    document.querySelector("div#content div#"+route).append(addOkDiv(param.message));
    setMenuHeader(true);
  } else {
    setMenuHeader();
  }
  if (param.setFocus){
    var form = document.forms[route];
    setFormFocus(form, param.setFocus);
  }
}

function userModel(fname, lname, email, password){
  return data = {
    fname: fname, 
    lname: lname, 
    email: email, 
    password: password
  };
}

function todoModel(title, done){
  return data = {
    title: title,
    done: done,
    created: Date.now()
  };
}

function validateForm(form, checkCheckBox = true){
  var isOk = true;
  clearMessageDiv();
  for (var i = 0; i < form.length; i++) {
    // console.log("--",form[i]);
    if (form[i].type!="checkbox"){
      if (form[i].name && form[i].name.length>0){
        if (form[i].value.trim() == ""){
          isOk = false;
          form[i].parentElement.append(addErrorDiv());
        }
      }
    } else {
      if(checkCheckBox && !form[i].checked){
        isOk = false;
        form[i].parentElement.append(addErrorDiv("You must check the checkbox."));
      }
    }
  }
  return isOk;
}

function addErrorDiv(message = "This field can not be empty."){
  return addDiv(message, "error");
}

function addOkDiv(message = "Ok"){
  return addDiv(message, "success");
}

function addDiv(message, className){
  var div = document.createElement("DIV"); // Create a <div> element
  div.innerHTML = message;                 //"This field can not be empty"; // Insert text
  div.className = className;               // Set Css class
  return div;
}

function addCheckBox(name, checked=false){
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = checked;
  checkbox.name = name;
  return checkbox;
}

function addInput(name, value, type = "text"){
  var input = document.createElement('INPUT');
  input.name = name;
  input.type = type;
  input.value = value;
  // input.classList.add(className[x]);
  // for (var x=0; x<className.length; x++)
    // input.classList.add(className[x]);
  return input;
}

function addSubmit(name, text, className){
  var btn = document.createElement('INPUT');
  btn.name = name+"-"+className[0];
  btn.type = "submit";
  btn.value = text;
  // btn.classList.add(className[x]);
  for (var x=0; x<className.length; x++)
    btn.classList.add(className[x]);
  return btn;
}

function addButton(name, text, className){
  var btn = document.createElement('BUTTON');
  btn.name = name+"-"+className[0];
  btn.type = "button";
  btn.textContent = text;
  // btn.classList.add(className[x]);
  for (var x=0; x<className.length; x++)
    btn.classList.add(className[x]);
  return btn;
}

function getEHAData(){
  return userModel("Ernesto", "Herrera", "ernestoharias@gmail.com", "123");
}

function userAuth(){
  if (user.email==undefined){
    logIn_onClick();
    return false;
  } else {
    return true;
  }
}

function showDashboard(message = "", isOk = true){
  if (userAuth()){
    var route = 'dashboard-form';
    showRoute(route);
    getTodos();    
    if (message.length>0){
      // document.getElementById("dash-msg").parentElement.parentElement.append(addOkDiv("User updated."));
      document.getElementById("dash-msg").append((isOk)?addOkDiv(message):addErrorDiv(message));
    }
  }
}

function showDashboardEfect(){
  clearInterval(toShowDashboard);
  todoList = JSON.parse(localStorage.getItem(user.email+"_todo"));
  showDashboard();
}

//home - Begin
function signUp_onClick(){
  showRoute("sign-up-form", {setFocus : "fname"});
}

function logIn_onClick(){
  showRoute("log-in-form", {setFocus : "email"});
}

function logOut_onClick(){
  user = {};
  clearMessageDiv();
  showRoute("home");
}
//home - End

//Sign Up form - Begin
function fillEhaData1_onClick(e){
  e.preventDefault();
  var data = getEHAData();
  var form = document.forms["sign-up-form"];
  for (var i = 0; i < form.length; i++) {
    if (form[i].type!="checkbox"){
      if (form[i].name && form[i].name.length>0){
        if (form[i].value.trim() == ""){
          form[i].value = data[form[i].name];
        }
      }
    } else {
      if(!form[i].checked){
        form[i].checked = true;
      }
    }
  }
}

function signUpSubmit_onClick(e){
  e.preventDefault();
  var form = document.forms["sign-up-form"];
  if (validateForm(form)){
    var data = userModel(getInputVal(form,'fname'), getInputVal(form,'lname'), getInputVal(form,'email'), getInputVal(form,'password'));
    localStorage.setItem(getInputVal(form,'email'), JSON.stringify(data));
    user = data;
    // form[0].append(addOkDiv("User "+getInputVal(form,'fname')+" saved."));
    // form.parentNode.parentNode.append(addOkDiv("User "+getInputVal(form,'fname')+" saved."));
    // showRoute('home');
    showRoute('loading', {message: "User "+getInputVal(form,'fname')+" saved... Redirecting to Dashboard..."});// showRoute('home');
    toShowDashboard = setInterval(showDashboardEfect, 1000 * 2);
    console.log('Registered new User.');
    form.reset();
  }
}
//Sign Up form - End

//Log In form - Begin
function fillEhaData2_onClick(e){
  e.preventDefault();
  var data = getEHAData();
  var form = document.forms["log-in-form"];
  setInputVal(form, 'email', data.email);
  setInputVal(form, 'password', data.password);//+"errorPasword");
}

function logInSubmit_onClick(e){
  e.preventDefault();
  var form = document.forms["log-in-form"];
  if (validateForm(form)){
    // console.log(form);
    var id = getInputVal(form,'email');
    var pass = getInputVal(form,'password');
    // console.log(id, pass);
    //var pass = form.querySelector('input[name="password"]').value;
    var data = JSON.parse(localStorage.getItem(id));
    console.log(data);
    if (data!=null){
      form.reset();
      if (pass==data.password){
        user = data;
        // form[0].append(addOkDiv("Authenticated... Redirecting to Dashboard..."));
        // form.parentNode.parentNode.append(addOkDiv("Authenticated... Redirecting to Dashboard..."));
        showRoute('loading', { message: "Authenticated... Redirecting to Dashboard..."});// showRoute('home');
        toShowDashboard = setInterval(showDashboardEfect, 1000 * 2);
        console.log('Authenticated');
      } else {
        form.parentNode.append(addErrorDiv("Incorrect email or password, check and try again."));//Incorrect Password
      }
    } else {
      form.parentNode.append(addErrorDiv("Incorrect email or password, check and try again."));//Incorrect Email and Password
      // showRoute('home');  
    }
  }
}
//Log In form - End

//Dashboard - Begin
function createNewTodo_onClick(){
  if (userAuth()){
    showRoute("todo-create-form", {setFocus : 'title'});
  }
}

function todoCreateSubmit_onClick(e){
  if (userAuth()){
    e.preventDefault();
    var form = document.forms["todo-create-form"];
    if (validateForm(form, false)){
      var isOk = setTodos(todoModel(getInputVal(form, 'title'), isChecked(form, 'done')));
      console.log(isOk + ' - Registered new TODO.');
      form.reset();
      showDashboard((isOk) ?  'ToDo List Created.' : 'Todo List Duplicated', isOk);
    }
  }
}

function addTodoList_onClick(){
  if (userAuth()){
    console.log(1);
  }
}

function deleteTodoList_onClick(){
  if (userAuth()){
    console.log(3);
  }
}

function getTodos(){
  if (userAuth()){
    var data = todoList; //JSON.parse(localStorage.getItem(user.email+"_todo"));
    console.log(data);
    var div = document.getElementById("todo-titles");
    div.innerHTML = "";
    if (data==null){
      console.log("no-data");
    } else {
      var ulData=document.createElement("UL");
      ulData.classList.add("list");
      for (var i=0; i<data.length; i++){
        var listViewItem=document.createElement('LI');
        var form=document.createElement("FORM");
        form.name="edit-todo-form";
        form.classList.add("edit-todo-form");
        // listViewItem.appendChild(addButton("add", "+", ["todo-list", "btn-add"]));
        // form.appendChild(addButton("edit", "edit", ["todo-list", "btn-edit"]));
        form.appendChild(addSubmit("save", "save", ["todo-list", "btn-add"]));
        // form.appendChild(addSubmit("delete", "del", ["todo-list", "btn-delete"]));
        form.appendChild(addCheckBox("done", data[i].done));
        form.appendChild(addInput("title", data[i].title));
        form.appendChild(addInput("id", i, "hidden"));
        // form.appendChild(addDiv(data[i].title, 'todo-list'));
        // listViewItem.appendChild(document.createTextNode(data[i].title));
        listViewItem.appendChild(form);
        ulData.appendChild(listViewItem);
      }
      div.appendChild(ulData);
      // bindClick("button.todo-list", "name");
      bindClick("input[type='submit'].todo-list", "name");
    }
  }
}

function setTodos(todoItem){
  if (userAuth()){
    // var data = JSON.parse(localStorage.getItem("ernestoharias@gmail.com_todo"));
    var data = todoList;//JSON.parse(localStorage.getItem(user.email+"_todo"));
    if (data==null){
      var todo = [];
      todo.push(todoItem);
      localStorage.setItem(user.email+"_todo", JSON.stringify(todo));//add new todo
      todoList = todo;
      return true;
    } else {
      if (!isDuplicated(data, "title", todoItem.title)){
        data.push(todoItem);
        localStorage.setItem(user.email+"_todo", JSON.stringify(data));//update existing todos
        todoList = data;
        return true;
      } else {
        return false;
      }
    }
  }
}
//Dashboard - End

//Dashboard - Begin Edit Todo
function saveTodoList_onClick(e){
  e.preventDefault();
  if (userAuth()){
    var form = e.path[1];
    if (validateForm(form, false)){
      var id = getInputVal(form, 'id');
      var todoItem = todoModel(getInputVal(form, 'title'), isChecked(form, 'done'));
      // console.log({eee : e});
      // console.log(isChecked(form, 'done'));
      // console.log(getInputVal(form, 'title'));
      // console.log(id);
      // console.log({e0 : todoList, d1: todoList.length});
      var data = [];
      for (var x=0; x<todoList.length; x++){
        if (id!=x){
          data.push(todoList[x]); //get a copy of ToDoList without actual val
        }
      }
      if (!isDuplicated(data, "title", todoItem.title)){
        todoList[id] = todoItem; //update only the id
        localStorage.setItem(user.email+"_todo", JSON.stringify(todoList));//update existing todos
        form.append(addOkDiv("Saved."));
      } else {
        form.append(addErrorDiv("Todo List ("+todoItem.title+") Duplicated."));
        setInputVal(form, 'title', todoList[id].title);
      }
    } 
  }
}
//Dashboard - End Edit Todo

//Dashboard - User Begin
function editUser_onClick(){
  if (userAuth()){
    showRoute("edit-user-form", {setFocus : "fname"});
    // console.log(user);
    var form = document.forms["edit-user-form"];
    for (x in user){
      // if (getInputVal(form,x)!=undefined)
        setInputVal(form, x, user[x]);
    }
  }
}

function editUserSubmit_onClick(e){
  if (userAuth()){
    e.preventDefault();
    var form = document.forms["edit-user-form"];
    if (validateForm(form)){
      var data = userModel(getInputVal(form,'fname'), getInputVal(form,'lname'), user.email, getInputVal(form,'password'));
      localStorage.setItem(user.email, JSON.stringify(data));
      user = data;
      //form.parentNode.parentNode.append(addOkDiv("User "+getInputVal(form,'fname')+" updated."));
      showDashboard('User Updated.');
      console.log('User Updated.');
    }
  }
}
//Dashboard - User End

// The following snippet accesses the current domain's local Storage object and adds a data item to it using Storage.setItem().

// localStorage.setItem('myCat', 'Tom');
// The syntax for reading the localStorage item is as follows:

// var cat = localStorage.getItem('myCat');
// The syntax for removing the localStorage item is as follows:

// localStorage.removeItem('myCat');
// The syntax for removing all the localStorage items is as follows:

// // Clear all items
// localStorage.clear()