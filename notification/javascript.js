/**
 * Set Alarm Javascript and Notificacion Api
 */

var app = {};
app.alarm = [];
app.count = 0;

app.initJs = function(){
  app.bindClick();
}

app.bindClick = function (){
  const btnTimer = document.getElementById("btnTimer");
  btnTimer.addEventListener("click", app.setAlarm);
}

app.AlarmModel = function(id, time){
  return {id, time : new Date(time).getTime()};
  // return {id, time : new Date(time).getTime()+id};//test
}

// Update the count down every 1 second
app.startTimer = function (alarm) {
  app.alarm[app.alarm.length-1].interval = 
  setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    var distance = alarm.time - now;

      // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Display the result in the element with id="demo"
    document.getElementById("timer"+alarm.id).innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      app.showNotification(alarm.id)
    }
  }, 1000);
}

app.setAlarm = function (e){
  e.preventDefault();
  if (Notification.permission === 'granted'){
      // app.showNotification();
      const form = document.forms["newAlarm"];
      // console.log(form);
      if (form.datetime.value.length>0){
        const newAlarm = app.AlarmModel(++app.count, form.datetime.value);
        app.alarm.push(newAlarm);
        app.refreshAlarmList(newAlarm);
        app.startTimer(newAlarm);
        console.log(app.alarm);
      } else {
        console.error("Set a DateTime.");
      }
  } else if(Notification.permission !== 'denied') {
      Notification.requestPermission().then( permission => {
          console.log(permission);
          if (permission === 'granted'){
            app.setAlarm(e);
          }
      });
  }
}

app.refreshAlarmList = function(newAlarm){
  const {id, time} = newAlarm;
  const data = `
  <div>
     <form name="delAlarm" >
      <button type="submit" name="deleteAlarm">X</button>
      <span>Id: ${id}. Time: ${time}.</span>
      <span id="timer${id}"></span>
      <input type="hidden" name="id" value="${id}" />
     </form>
  </div>
  `;
  document.getElementById("alarmList").innerHTML += data;
  const btnDel = document.getElementById("alarmList").getElementsByTagName("button");
  for(let x=0; x<btnDel.length; x++){
    btnDel[x].addEventListener("click", app.deleteAlarm);
  }
}

app.getAlarmArrayPos = function(id){
  for(let x=0; x<app.alarm.length; x++){
    console.log(app.alarm[x].id);
    if (app.alarm[x].id == id){
      return x;   
    }
  }
  return undefined;
}

app.deleteAlarm = function (e){
  e.preventDefault();
  const form = document.forms["delAlarm"];
  console.log("Deleting id "+form.id.value);
  for(let x=0; x<app.alarm.length; x++){
    console.log(app.alarm[x].id);
    if (app.alarm[x].id == form.id.value){
      clearInterval(app.alarm[x].interval);
      console.log("Alarm Canceled "+app.alarm[x].id);
      app.alarm.splice(x, 1);
      break;    
    }
  }
  form.remove();
}

app.showNotification = function(id){
  clearInterval(app.alarm[app.getAlarmArrayPos(id)].interval);
  const notification = new Notification("Alarm", {body: "Ready" + id});
  console.log({body: "Ready" + id});
}

window.addEventListener('DOMContentLoaded', app.initJs);