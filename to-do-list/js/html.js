/*
 * Helpers
 *
 */

// Container for Html
var html = {};

html.ping = function(){
    console.log("pong - 123");
    // /helpers.epa();
    return 11;
};

html.setMenuHeader = function (removeAll = false){
    var logIn = document.getElementById("log-in").parentElement;
    var signUp = document.getElementById("sign-up").parentElement;
    var editUser = document.getElementById("edit-user").parentElement;
    var logOut = document.getElementById("log-out").parentElement;
    // if (document.getElementById("loading").className.indexOf("display-none")>-1){
    // if (document.getElementById("loading").classList.contains("display-none")){
    if (!removeAll){
      if (app.config.user.email!=undefined){
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
};
  
html.headerNew = function () {
    var body = '';
    body +='<div id="header-content" class="flex-center">';
    body +='<header>';
    body +='    <div id="header-left-side">';
    body +='        <div class="v-center">';
    body +='            <div id="logo">';
    body +='                <a name="route-to-home" href="#">ToDo List</a>';
    body +='            </div>';
    body +='        </div>';
    body +='    </div>';
    body +='    <div id="header-right-side">';
    body +='        <div class="v-center">';
    body += (app.config.user.email!=undefined) ? '<button id="edit-user" class="btn-edit">Account Settings</button>' : '<button id="sign-up" class="btn-add">Sign Up</button>';
    body +='        </div>';
    body +='        <div class="v-center">';
    body += (app.config.user.email!=undefined) ? '<button id="log-out" class="btn-log">Log Out</button>' : '<button id="log-in" class="btn-log">Log In</button>';
    body +='        </div>';
    body +='    </div>';
    body +='</header>';
    body +='</div>';
    return body;
};

html.header = function () {
    var body = '';
    body +='<div id="header-content" class="flex-center">';
    body +='<header>';
    body +='    <div id="header-left-side">';
    body +='        <div class="v-center">';
    body +='            <div id="logo">';
    body +='                <a name="route-to-home" href="#">ToDo List</a>';
    body +='            </div>';
    body +='        </div>';
    body +='    </div>';
    body +='    <div id="header-right-side">';
    body +='        <div class="v-center">';
    body +='            <button id="sign-up" class="btn-add">Sign Up</button>';
    body +='        </div>';
    body +='        <div class="v-center">';
    body +='            <button id="log-in" class="btn-log">Log In</button>';
    body +='        </div>';
    body +='        <div class="v-center display-none">';
    body +='            <button id="edit-user" class="btn-edit">Account Settings</button>';
    body +='        </div>';
    body +='        <div class="v-center display-none">';
    body +='            <button id="log-out" class="btn-log">Log Out</button>';
    body +='        </div>';
    body +='    </div>';
    body +='</header>';
    body +='</div>';
    return body;
};

html.renderContent = function (route){
    var body = '';
    body += html.headerNew();
    body += '<div id="content">';
    body += '  <h1 id="h1-title">ToDo List</h1>';
    body += '  <div class="v-center" id="dash-msg"></div>';
    body += eval('html.'+helpers.camelize(route))();
    body += '</div>';
    document.querySelector('body').innerHTML = body;
    html.setH1Title(route);
    // if (route!='home')
        // html.clearMessageDiv();
    if (!app.config.seeEhaBtns){
        document.querySelectorAll("button.fill-eha-data").forEach(e => e.parentNode.removeChild(e)); //Delete eha buttons
    }
    helpers.bindAll();
    // return body;
};

html.setH1Title = function (route){
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
};

html.clearMessageDiv = function () {
    document.querySelectorAll("div.error").forEach(e => e.parentNode.removeChild(e)); //Delete div.error
    document.querySelectorAll("div.success").forEach(e => e.parentNode.removeChild(e)); //Delete div.success
};

html.home = function (){
    var body = '';
    body += '  <div id="home" class="page-route v-center">';
    body += '      <p>Simple "to-do list" application, using client-side HTML, CSS, and Javascript only. This application store its data using localStorage only, and not connect to any external APIs, backends, databases etc. </p>';
    body += '      <a name="route-to-dashboard" class="button" href="#">See Dashboard</a>';
    body += '  </div>';
    return body;
};

html.loading = function (){
    var body = '';
    body += '  <div id="loading" class="page-route v-center">';
    body += '  </div>';
    return body;
};
  
html.signUpForm = function (){
    var body = '';
    body += '  <div id="sign-up-form" class="page-route v-center">';
    body += '      <div class="form-row-group">';
    body += '          <a name="route-to-home" class="button" href="#" title="Back"><-</a>';
    body += '      </div>';
    body += '      <form name="sign-up-form" action="#">';
    body += '          <div class="form-row-group">';
    body += '              <label for="fname">First Name</label>';
    body += '              <input type="text" name="fname" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="lname">Last Name</label>';
    body += '              <input type="text" name="lname" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="email">Email</label>';
    body += '              <input type="email" name="email" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="password">Password</label>';
    body += '              <input type="password" name="password" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <input type="checkbox" name="terms" />';
    body += '              <span class="text-small">';
    body += '                  I agree to the <a href="#" >Terms Use</a>.';
    body += '              </span>';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <input id="sign-up-submit" type="submit" value="Submit" />';
    body += '              <button id="fill-eha-data1" class="fill-eha-data">EHA DATA</button>';
    body += '          </div>';
    body += '      </form> ';
    body += '  </div>';
    return body;
};
  
html.logInForm = function (){
    var body = '';
    body += '  <div id="log-in-form" class="page-route v-center">';
    body += '      <div class="form-row-group">';
    body += '          <a name="route-to-home" class="button" href="#" title="Back"><-</a>';
    body += '      </div>';
    body += '      <form name="log-in-form" action="#">';
    body += '          <div class="form-row-group">';
    body += '              <label for="email">Email</label>';
    body += '              <input type="email" name="email" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="password">Password</label>';
    body += '              <input type="password" name="password" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <input id="log-in-submit" type="submit" value="Submit" />';
    body += '              <button id="fill-eha-data2" class="fill-eha-data">EHA DATA</button>';
    body += '          </div>';
    body += '      </form> ';
    body += '  </div>';
    return body;
};
  
html.dashboardForm = function (){
    var body = '';
    body += '  <div id="dashboard-form" class="page-route v-center">';
    body += '      <div class="form-row-group">';
    body += '          <a name="create-new-todo" class="button btn-add" href="#" title="Create New">Create New</a>';
    body += '      </div>';
    body += '      <div class="form-row-group" id="todo-titles">';
    body += '      </div>';
    body += '  </div>';
    return body;
};
  
html.todoCreateForm = function (){
    var body = '';
    body += '  <div id="todo-create-form" class="page-route v-center">';
    body += '      <div class="form-row-group">';
    body += '          <a name="route-to-dashboard" class="button" href="#" title="Back"><-</a>';
    body += '      </div>';
    body += '      <form name="todo-create-form" action="#">';
    body += '          <div class="form-row-group">';
    body += '              <label for="title">Title</label>';
    body += '              <input type="text" name="title" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="title">Done</label>';
    body += '              <input type="checkbox" name="done" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <input id="todo-create-submit" type="submit" value="Submit" />';
    body += '          </div>';
    body += '      </form>';
    body += '  </div>';
    return body;
};
  
html.editUserForm = function (){
    var body = '';
    body += '  <div id="edit-user-form" class="page-route v-center">';
    body += '      <div class="form-row-group">';
    body += '          <a name="route-to-dashboard" class="button" href="#" title="Back"><-</a>';
    body += '      </div>';
    body += '      <form name="edit-user-form" action="#">';
    body += '          <div class="form-row-group">';
    body += '              <label for="email">Email</label>';
    body += '              <input type="email" name="email" autocomplete="off" disabled />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="fname">First Name</label>';
    body += '              <input type="text" name="fname" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="lname">Last Name</label>';
    body += '              <input type="text" name="lname" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <label for="password">Password</label>';
    body += '              <input type="password" name="password" autocomplete="off" />';
    body += '          </div>';
    body += '          <div class="form-row-group">';
    body += '              <input id="edit-user-submit" type="submit" value="Save" />';
    body += '          </div>';
    body += '      </form> ';
    body += '  </div>';
    return body;
};
  
html.footer = function (){
    var body = '';
    body += '<footer>';
    body += '  <div id="page-footer" class="v-center">';
    body += '      ernestoharias@gmail.com 2020';
    body += '  </div>';
    body += '</footer>';
    return body;
};