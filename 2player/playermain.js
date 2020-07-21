//Call to start game and print msg X will start first
document.gameNum = 0;
const CROSS = 'X';
const KNOTS = 'O';

function startGame() {
  for (var i = 1; i <= 9; i++) {
    clearBox(i);
  }
  document.turn = document.gameNum % 2 ? KNOTS : CROSS;
  document.winner = null;
  setMessage(document.turn + " get's to start")
  document.gameNum++;
}
//Call to print in-game message
function setMessage(msg) {
  document.getElementById("message").innerText = msg;
}
//Call to check is square is empty, else fill square
function nextMove(square) {
  if (document.winner != null) {
    setMessage(document.winner + " already won")
    document.turn = (document.turn == CROSS) ? KNOTS : CROSS;
  } else if (square.innerText == '') {
    square.innerText = document.turn;
    switchTurn();
  } else {
    setMessage("Pick another square");
  }
}
//Call to switch between 'X' and 'O'.
function switchTurn() {
  if (checkforWinner(document.turn)) {
    setMessage("Congrats " + document.turn + " you won!")
    document.winner = document.turn;
  } else if (CheckforTie()) {
    setMessage("It's a Tie, Play Again!")
  } else if (document.turn == CROSS) {
    document.turn = KNOTS;
    setMessage("It's " + document.turn + "'s turn")
  } else {
    document.turn = CROSS;
    setMessage("It's " + document.turn + "'s turn")
  }
}
//Check for winner
function checkforWinner(move) {
  var result = false;
  if (checkRow(1, 2, 3, move) ||
    checkRow(4, 5, 6, move) ||
    checkRow(7, 8, 9, move) ||
    checkRow(1, 4, 7, move) ||
    checkRow(2, 5, 8, move) ||
    checkRow(3, 6, 9, move) ||
    checkRow(1, 5, 9, move) ||
    checkRow(3, 5, 7, move)) {
    result = true;
  }
  return result;
}
//Call to check for timeout
function CheckforTie(move) {
  for (var i = 1; i <= 9; i++) {
    if (getBox(i) == "")
      return false;
  }
  return true;
}
//Call to check if the row is filled
function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}
//Return box contents
function getBox(number) {
  return document.getElementById("s" + number).innerText;
}
//Call to clear contents in box
function clearBox(number) {
  document.getElementById("s" + number).innerText = "";
}