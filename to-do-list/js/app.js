/*
 * Frontend Logic for application
 *
 */
//Dependencies
loadScript("helpers", importHelpers); var importHelpers = function() { return helpers; };
loadScript("html", importHtml); var importHtml = function() { return html; };
loadScript("user", importHtml); var importUser = function() { return user; };
loadScript("todo", importHtml); var importTodo = function() { return todo; };

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head    = document.head;
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'js/'+url+'.js';

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var app = {}; // Container for frontend application
var helpers = {}; // Container for helpers functions
var html = {}; // Container for html
var user = {}; // Container for user
var todo = {}; // Container for todo
var toShowDashboard;//setInterval(showDashboardEfect(), 1000 * 3);

// Config
app.config = {
  'seeEhaBtns' : false,
  'user' : {},
  'todoList' : []
};

app.showRoute = function (route, param={}){
    // html.setH1Title(route);
    // document.querySelectorAll("div#content div.page-route").forEach(e => console.log(e));
    // document.querySelectorAll("div#content div.page-route").forEach(e => e.classList[(e.id==route ? 'remove' : 'add')]('display-none'));
    html.renderContent(route);

    // if (route!='home')
    //   html.clearMessageDiv();
    if (param.message && param.message.length>0){
      document.querySelector("div#content div#"+route).append(helpers.addOkDiv(param.message));
      //html.setMenuHeader(true);
    //} else {
    //   html.setMenuHeader();
    }
    if (param.setFocus){
      var form = document.forms[route];
      helpers.setFormFocus(form, param.setFocus);
    }
};

app.routeToHome_onClick = function (){
  app.showRoute('home');
}

app.routeToDashboard_onClick = function (){
  app.showDashboard();
}

app.showDashboard = function (message = "", isOk = true){
    if (user.auth()){
      var route = 'dashboard-form';
      app.showRoute(route);
      todo.getTodos();    
      if (message.length>0){
        // document.getElementById("dash-msg").parentElement.parentElement.append(addOkDiv("User updated."));
        document.getElementById("dash-msg").append((isOk)?helpers.addOkDiv(message):helpers.addErrorDiv(message));
      }
    }
};
  
app.showDashboardEfect = function (){
    clearInterval(toShowDashboard);
    app.config.todoList = JSON.parse(localStorage.getItem(app.config.user.email+"_todo"));
    app.showDashboard();
};

//home - Begin
app.signUp_onClick = function (){
    app.showRoute("sign-up-form", {setFocus : "fname"});
}
  
app.logIn_onClick = function (){
    app.showRoute("log-in-form", {setFocus : "email"});
}
  
app.logOut_onClick = function (){
    app.config.user = {};
    html.clearMessageDiv();
    app.showRoute("home");
}
//home - End

//Sign Up form - Begin
app.fillEhaData1_onClick = function(e){
  e.preventDefault();
  var data = user.getEHAData();
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

app.signUpSubmit_onClick = function (e){
  e.preventDefault();
  var form = document.forms["sign-up-form"];
  if (helpers.validateForm(form)){
    var data = user.model(helpers.getInputVal(form,'fname'), helpers.getInputVal(form,'lname'), helpers.getInputVal(form,'email'), helpers.getInputVal(form,'password'));
    localStorage.setItem(helpers.getInputVal(form,'email'), JSON.stringify(data));
    app.config.user = data;
    // form[0].append(addOkDiv("User "+getInputVal(form,'fname')+" saved."));
    // form.parentNode.parentNode.append(addOkDiv("User "+getInputVal(form,'fname')+" saved."));
    // showRoute('home');
    app.showRoute('loading', {message: "User "+helpers.getInputVal(form,'fname')+" saved... Redirecting to Dashboard..."});// showRoute('home');
    toShowDashboard = setInterval(app.showDashboardEfect, 1000 * 2);
    console.log('Registered new User.');
    form.reset();
  }
}
//Sign Up form - End

//Log In form - Begin
app.fillEhaData2_onClick = function (e){
  e.preventDefault();
  var data = user.getEHAData();
  var form = document.forms["log-in-form"];
  helpers.setInputVal(form, 'email', data.email);
  helpers.setInputVal(form, 'password', data.password);//+"errorPasword");
}

app.logInSubmit_onClick = function (e){
  e.preventDefault();
  var form = document.forms["log-in-form"];
  if (helpers.validateForm(form)){
    // console.log(form);
    var id = helpers.getInputVal(form,'email');
    var pass = helpers.getInputVal(form,'password');
    // console.log(id, pass);
    //var pass = form.querySelector('input[name="password"]').value;
    var data = JSON.parse(localStorage.getItem(id));
    console.log(data);
    if (data!=null){
      form.reset();
      if (pass==data.password){
        app.config.user = data;
        // form[0].append(addOkDiv("Authenticated... Redirecting to Dashboard..."));
        // form.parentNode.parentNode.append(addOkDiv("Authenticated... Redirecting to Dashboard..."));
        app.showRoute('loading', { message: "Authenticated... Redirecting to Dashboard..."});// showRoute('home');
        toShowDashboard = setInterval(app.showDashboardEfect, 1000 * 2);
        console.log('Authenticated');
      } else {
        form.parentNode.append(helpers.addErrorDiv("Incorrect email or password, check and try again."));//Incorrect Password
      }
    } else {
      form.parentNode.append(helpers.addErrorDiv("Incorrect email or password, check and try again."));//Incorrect Email and Password
      // showRoute('home');  
    }
  }
}
//Log In form - End

//Dashboard - Begin
app.createNewTodo_onClick = function (){
  if (user.auth()){
    app.showRoute("todo-create-form", {setFocus : 'title'});
  }
}

app.todoCreateSubmit_onClick = function (e){
  if (user.auth()){
    e.preventDefault();
    var form = document.forms["todo-create-form"];
    if (helpers.validateForm(form, false)){
      var isOk = todo.setTodos(todo.model(helpers.getInputVal(form, 'title'), helpers.isChecked(form, 'done')));
    //   var isOk = todo.setTodos(helpers.getInputVal(form, 'title'), helpers.isChecked(form, 'done'));
      console.log(isOk + ' - Registered new TODO.');
      form.reset();
      app.showDashboard((isOk) ?  'ToDo List Created.' : 'Todo List Duplicated', isOk);
    }
  }
}

app.addTodoList_onClick = function (){
  if (user.auth()){
    console.log(1);
  }
}

app.deleteTodoList_onClick = function (){
  if (user.auth()){
    console.log(3);
  }
}
//Dashboard - End

//Dashboard - Begin Edit Todo
app.saveTodoList_onClick = function (e){
  e.preventDefault();
  if (user.auth()){
    var form = e.path[1];
    if (helpers.validateForm(form, false)){
      var id = helpers.getInputVal(form, 'id');
      var todoItem = todo.model(helpers.getInputVal(form, 'title'), helpers.isChecked(form, 'done'));
      console.log(todoItem);
      // console.log({eee : e});
      // console.log(isChecked(form, 'done'));
      // console.log(getInputVal(form, 'title'));
      // console.log(id);
      // console.log({e0 : todoList, d1: todoList.length});
      var data = [];
      for (var x=0; x<app.config.todoList.length; x++){
        if (id!=x){
          data.push(app.config.todoList[x]); //get a copy of ToDoList without actual val
        }
      }
      if (!helpers.isDuplicated(data, "title", todoItem.title)){
        app.config.todoList[id] = todoItem; //update only the id
        localStorage.setItem(app.config.user.email+"_todo", JSON.stringify(app.config.todoList));//update existing todos
        form.append(helpers.addOkDiv("Saved."));
      } else {
        form.append(helpers.addErrorDiv("Todo List ("+todoItem.title+") Duplicated."));
        helpers.setInputVal(form, 'title', app.config.todoList[id].title);
      }
    } 
  }
};
//Dashboard - End Edit Todo

//Dashboard - User Begin
app.editUser_onClick = function (){
  if (user.auth()){
    app.showRoute("edit-user-form", {setFocus : "fname"});
    // console.log(user);
    var form = document.forms["edit-user-form"];
    for (x in app.config.user){
      // if (getInputVal(form,x)!=undefined)
        helpers.setInputVal(form, x, app.config.user[x]);
    }
  }
};

app.editUserSubmit_onClick = function (e){
  if (user.auth()){
    e.preventDefault();
    var form = document.forms["edit-user-form"];
    if (helpers.validateForm(form)){
      var data = user.model(helpers.getInputVal(form,'fname'), helpers.getInputVal(form,'lname'), app.config.user.email, helpers.getInputVal(form,'password'));
      localStorage.setItem(app.config.user.email, JSON.stringify(data));
      app.config.user = data;
      //form.parentNode.parentNode.append(addOkDiv("User "+getInputVal(form,'fname')+" updated."));
      app.showDashboard('User Updated.');
      console.log('User Updated.');
    }
  }
};
//Dashboard - User End

// Load data on the page
app.loadDataOnPage = function(){
    html.renderContent("home");
//   var bodyClasses = document.querySelector("body").classList;
//   var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;
//   if(primaryClass == 'accountEdit'){
    // app.loadAccountEditPage();
//   }

};

app.importJs = function(){
  helpers = importHelpers();
  html = importHtml();
  user = importUser();
  todo = importTodo();
}

// Init (bootstrapping)
app.init = function(){

  // Import all JS Scripts
  app.importJs();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
//   console.log(html.ping());
//   console.log(helpers.ping());
};
