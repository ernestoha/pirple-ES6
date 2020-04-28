/**
 * Tic-Tac-Toe Javascript
 */

var toPlay = "";
var board = [];
var winner = "";

window.addEventListener('DOMContentLoaded', initJs);

function initJs(){
  bindClick();
  setGame();
}

function setGame(){
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  toPlay = "X";
  var rectangleAll = document.querySelectorAll("div.rectangle");
  for (var i = 0; i < rectangleAll.length; i++) {
      rectangleAll[i].innerHTML = "";
  }
}

function bindClick(){
  var rectangleAll = document.querySelectorAll("div.rectangle");//ALL  
  console.log(rectangleAll);
  // rectangleGroupAll.addEventListener("click", played);
  console.log("Here are the rectangle IDs");
  for (var i = 0; i < rectangleAll.length; i++) {// for all browsers and ES versions
      console.log(rectangleAll[i]);
      rectangleAll[i].addEventListener("click", played);
      // rectangleAll[i].innerHTML = i + 1;
  }
}

function played(event){
  console.log("-ID ->" + event.path[0].attributes["id-"].value.slice(-1));
  var id = (event.path[0].attributes["id-"].value.slice(-1))-1;
  if(!board[id]){ //If the value is 0
      board[id] = toPlay;
      console.log(board);
      //console.log("-ID ->" + event.attributes["id-"].value);
      event.path[0].innerHTML = toPlay;
      if (checkIfWin()){
          //alert(toPlay + " has won!" );
          alertAndReset(toPlay + " has won!");
      } else {
          if (isCatGame()){
              alertAndReset("Cats game!");
          } else {
              toPlay = (toPlay=="X") ? "O" : "X";
          }
      }
  }
}

function alertAndReset(message){
  timer = setTimeout(() => {
  alert(message);
  setGame();
  }, 10); //to see the last played
}

function isCatGame(){
  return board.every(function(item) {return !!item;}); //check if board has falsy values 
}

function checkIfWin(){
    /* 
    0 1 2 
    3 4 5
    6 7 8
    */
    if ((board[0]==board[1] && board[0]==board[2]) && (board[0] && board[2])) //012
      return true;
    if ((board[3]==board[4] && board[3]==board[5]) && (board[3] && board[5])) //345
      return true;
    if ((board[6]==board[7] && board[6]==board[8]) && (board[6] && board[8])) //678
      return true;
    if ((board[0]==board[3] && board[0]==board[6]) && (board[0] && board[6])) //036
      return true;
    if ((board[1]==board[4] && board[1]==board[7]) && (board[1] && board[7])) //147
      return true;
    if ((board[2]==board[5] && board[2]==board[8]) && (board[2] && board[8])) //258
      return true;
    if ((board[0]==board[4] && board[0]==board[8]) && (board[0] && board[8])) //048
      return true;
    if ((board[2]==board[4] && board[2]==board[6]) && (board[2] && board[6])) //246
      return true;
    return false;
}