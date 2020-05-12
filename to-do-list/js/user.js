/*
 * User
 *
 */

// Container for Users
var user = {};

user.model = function (fname, lname, email, password){
    return data = {
      fname: fname, 
      lname: lname, 
      email: email, 
      password: password
    };
};

user.getEHAData = function (){
  return user.model("Ernesto", "Herrera", "ernestoharias@gmail.com", "123");
};

user.auth = function() { //User Authenticated?
  if (app.config.user.email==undefined){
  //   window.location = '/session/create';
      // app.logUserOut();
      app.logIn_onClick();
      return false;
  } else {
      return true;
  }
}
