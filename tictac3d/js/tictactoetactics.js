var won = false;
var currentPlayer = "O";
var currentPlane = "A";

var bS = {
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: '',
  g: '',
  h: '',
  i: '',
};

//for bS finder
var refBoard = [{
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
  8: 'i'
}];

function bestMove() {
  // AI to make its turn
  let fbestScore = -Infinity;       //final best score
  let fbsfinder;                    //final bS finder
  var bsfinder;                     //temp bS finder      
  var bestScore = -Infinity;        //temp bS score

  var board = BoardA;
  for (let i = 0; i < 9; i++) {
    // Is the spot available
    if (board[i] == "") {

      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bsfinder = refBoard[0][i];
      }
    }
  }
  if (bestScore > fbestScore) {
    fbestScore = bestScore;
    fbsfinder = bsfinder;
  }

  //final move
  bS[fbsfinder] = "O";
  refreshBoard();
  if (gameWon()) {
    won = true;
    render();
    return;
  }
  playJumpSound();
  currentPlayer = "X";
  render();
}

//minimax algo
function minimax(board, depth, isMaximizing) {
  let result1 = gameWon();
  let result2 = tieA();
  if (result1 !== false || result2 != false) {
    if (result1 != false && isMaximizing)
      return -1;
    else if (result1 != false && !(isMaximizing))
      return 1;
    else
      return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] == "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        if (score > bestScore)
          bestScore = score;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] == "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        if (score < bestScore)
          bestScore = score;
      }
    }
    return bestScore;
  }
}

//to start the game
var startGame = function () {
  won = false;
  currentPlayer = "O";
  bS = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
    h: '',
    i: '',
  };
  BoardA = [
    bS.a, bS.b, bS.c, // A, B, C Center Side/Plane
    bS.d, bS.e, bS.f, // D, E ,F
    bS.g, bS.h, bS.i // G, H, I
  ];
  console.log(BoardA[0]);

  if (currentPlayer == "O") {
    move();
  }

};


// Move
var move = function (cellIndex) {
  if (gameWon()) {
    won = true;
    return;
  } else {
    if (currentPlayer === "O") {
      bestMove();
      currentPlayer = "X";
    } else {
      currentPlayer = "O";
      setTimeout(move, 2000);
    }
  }
};

//Click Action
$('#board').delegate('td', 'click', function () {
  var findKeyName = $(this).attr('id').slice(-1);
  if (bS[findKeyName] === '' && !won && currentPlayer == "X") {
    bS[findKeyName] = currentPlayer;
    refreshBoard();
    move();
    playJumpSound();
    render();
  } else {
    $("#turn").text("try again");
    playErrorSound();
  };
});

//Game Win Condition 3 in a Row on any given board
var gameWon = function () {
  if (
    ((BoardA[0] === BoardA[1]) && (BoardA[0] === BoardA[2]) && BoardA[0] !== "") ||
    ((BoardA[3] === BoardA[4]) && (BoardA[3] === BoardA[5]) && BoardA[3] !== "") ||
    ((BoardA[6] === BoardA[7]) && (BoardA[6] === BoardA[8]) && BoardA[6] !== "") ||
    ((BoardA[0] === BoardA[3]) && (BoardA[0] === BoardA[6]) && BoardA[0] !== "") ||
    ((BoardA[1] === BoardA[4]) && (BoardA[1] === BoardA[7]) && BoardA[1] !== "") ||
    ((BoardA[2] === BoardA[5]) && (BoardA[2] === BoardA[8]) && BoardA[2] !== "") ||
    ((BoardA[0] === BoardA[4]) && (BoardA[0] === BoardA[8]) && BoardA[0] !== "") ||
    ((BoardA[2] === BoardA[4]) && (BoardA[2] === BoardA[6]) && BoardA[2] !== "")

  ) {
    return true;
  } else {
    return false;
  }
};

//to check tie
var tieA = function () {
  if ((BoardA[0] !== "") && (BoardA[1] !== "") && (BoardA[2] !== "") && (BoardA[3] !== "") &&
    (BoardA[4] !== "") && (BoardA[5] !== "") && (BoardA[6] !== "") && (BoardA[7] !== "") &&
    (BoardA[8] !== ""))
    return true;
  else
    return false;
}

//Render updates and changes Board
var render = function () {
  var $turnEl = $("#turn")
  var $winnerEl = $("#winner");

  $turnEl.text(currentPlayer);
  renderboard();
  var isTie = tieA();
  if (!won && isTie) {
    $winnerEl.text("Tie!!");
  } else if (won) {
    $winnerEl.text(currentPlayer + " wins");
    playWinSound();
  } else {
    $winnerEl.text("X vs O");
  }
};

//to refresh board
function refreshBoard() {
  BoardA = [
    bS.a, bS.b, bS.c, bS.d, bS.e, bS.f, bS.g, bS.h, bS.i
  ];

  console.log(BoardA);
  renderboard();
}

//to render the board
var renderboard = function () {
  $("#cellA0a").text(BoardA[0]);
  $("#cellA1b").text(BoardA[1]);
  $("#cellA2c").text(BoardA[2]);
  $("#cellA3d").text(BoardA[3]);
  $("#cellA4e").text(BoardA[4]);
  $("#cellA5f").text(BoardA[5]);
  $("#cellA6g").text(BoardA[6]);
  $("#cellA7h").text(BoardA[7]);
  $("#cellA8i").text(BoardA[8]);
}

//restart button
$("#restartButton").click(function () {
  startGame();
  render();
});

//Audio FX
var jump = $("#jump")[0];
var error = $("#error")[0];
var win = $("#win")[0];

function playJumpSound() {
  jump.play();
}

function playErrorSound() {
  error.play();
}

function playWinSound() {
  win.play();
}