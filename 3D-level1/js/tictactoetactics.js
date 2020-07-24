
var won = false;
var playermode = "O";
var currentPlayer = playermode;
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
    j: '',
    k: '',
    l: '',
    m: '',
    n: '',
    o: '',
    p: '',
    q: '',
    r: '',
    s: '',
    t: '',
    u: '',
    v: '',
    w: '',
    x: '',
    y: '',
    z: '',
};

var planes = {
    red: {
        N: "purple",
        S: "orange",
        W: "blue",
        E: "green"
    },
    orange: {
        N: "red",
        S: "yellow",
        W: "blue",
        E: "green"
    },
    yellow: {
        N: "orange",
        S: "purple",
        W: "blue",
        E: "green"
    },
    purple: {
        N: "yellow",
        S: "red",
        W: "green",
        E: "blue"
    },
    green: {
        N: "red",
        S: "yellow",
        W: "orange",
        E: "purple"
    },
    blue: {
        N: "red",
        S: "yellow",
        W: "purple",
        E: "orange"
    }
};

var startGame = function() {
    won = false;
    currentPlayer = playermode;
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
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
        p: '',
        q: '',
        r: '',
        s: '',
        t: '',
        u: '',
        v: '',
        w: '',
        x: '',
        y: '',
        z: '',
    };
    boardCenterPlaneA = [
        bS.a, bS.b, bS.c, // A, B, C Center Side/Plane
        bS.d, bS.e, bS.f, // D, E ,F
        bS.g, bS.h, bS.i // G, H, I
    ];
    console.log(boardCenterPlaneA[0]);
    boardRightPlaneB = [
        bS.c, bS.j, bS.k, // C, J, K Right Side/Plane
        bS.f, bS.l, bS.m, // F, L ,M
        bS.i, bS.n, bS.o // I, N, O
    ];

    boardBackPlaneC = [
        bS.u, bS.t, bS.o, // U, T, O Back Rear Side/Plane
        bS.s, bS.r, bS.m, // S, R ,M
        bS.q, bS.p, bS.k //  Q, P, K
    ];

    boardLeftPlaneD = [
        bS.q, bS.v, bS.a, // Q, V, A Left Side/Plane
        bS.s, bS.w, bS.d, // S, W ,D
        bS.u, bS.x, bS.g // U, X, G
    ];

    boardTopPlaneE = [
        bS.q, bS.p, bS.k, // Q, P, K Up Top Side/Plane
        bS.v, bS.z, bS.j, // V, Z ,J
        bS.a, bS.b, bS.c // A, B, C
    ];

    boardDownPlaneF = [
        bS.g, bS.h, bS.i, // G, H, I Down Bottom Side/Plane
        bS.x, bS.y, bS.n, // X, Y ,N
        bS.u, bS.t, bS.o // U, T, O
    ];
    if (currentPlayer == "O") {
        move();
    }

};


// Move
var move = function(cellIndex) {
    if (gameWon()) {
        won = true;
        return;
    } else {
        if (currentPlayer === "O") {
            console.log("here");
            bestMove();
            currentPlayer = "X";
        } else {
            currentPlayer = "O";
            setTimeout(move, 2000);
        }
    }
};

//Click Action
$('#board').delegate('td', 'click', function() {
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

//board to refer key of bS board
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
    },
    {
        0: 'c',
        1: 'j',
        2: 'k',
        3: 'f',
        4: 'l',
        5: 'm',
        6: 'i',
        7: 'n',
        8: 'o'
    },
    {
        0: 'u',
        1: 't',
        2: 'o',
        3: 's',
        4: 'r',
        5: 'm',
        6: 'q',
        7: 'p',
        8: 'k'
    },
    {
        0: 'q',
        1: 'v',
        2: 'a',
        3: 's',
        4: 'w',
        5: 'd',
        6: 'u',
        7: 'x',
        8: 'g'
    },
    {
        0: 'q',
        1: 'p',
        2: 'k',
        3: 'v',
        4: 'z',
        5: 'j',
        6: 'a',
        7: 'b',
        8: 'c'
    },
    {
        0: 'g',
        1: 'h',
        2: 'i',
        3: 'x',
        4: 'y',
        5: 'n',
        6: 'u',
        7: 't',
        8: 'o'
    }
];
//no of planes to check
const noOfPlane = 6;
//array to maintain the board need to display on AI move
var toDisplayRef = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F"};


//funtional array to get plane using index
function getBoard(index) {
    switch (index) {
        case 0:
            return boardCenterPlaneA;
        case 1:
            return boardRightPlaneB;
        case 2:
            return boardBackPlaneC;
        case 3:
            return boardLeftPlaneD;
        case 4:
            return boardTopPlaneE;
        case 5:
            return boardDownPlaneF;
    }
}

//AI move main funtion
function bestMove() {
    // AI to make its turn
    let fbestScore = -Infinity;
    let fbsfinder=Infinity;
    let board;
    var bsfinder;
    var bestScore = -Infinity;

    //check won
    for (let j = 0; j < noOfPlane; j++) {
        board = getBoard(j);
        for (let i = 0; i < 9; i++) {
            // Is the spot available
            if (board[i] == "") {
                board[i] = "O";
                if (gameWon() == true) {
                    fbsfinder = refBoard[j][i];
                    console.log(fbsfinder);
                    bS[fbsfinder] = "O";
                    refreshBoard();
                    won = gameWon();
                    playJumpSound();
                    render();
                    displayPlane(toDisplayRef[j]); 
                    return;
                } else {
                    board[i] = "";
                }
            }
        }
    }
    //check loss
    for (let j = 0; j < noOfPlane; j++) {
        console.log("Check loss");
        board = getBoard(j);
        for (let m = 0; m < 9; m++) {
            // Is the spot available
            if (board[m] == "") {
                board[m] = "X";
                if (gameWon() == true) {
                    fbsfinder = refBoard[j][m];
                    console.log(fbsfinder);
                    bS[fbsfinder] = "O";
                    refreshBoard();
                    playJumpSound();
                    currentPlayer = "X";
                    render();
                    displayPlane(toDisplayRef[j]); 
                    return;
                } else {
                    board[m] = "";
                }
            }
        }
    }
   
     var idxDisplay;
      for (let j = 0; j < noOfPlane; j++) {
        board = getBoard(j);
        for (let m = 0; m < 9; m++) {
            // Is the spot available
            if (board[m] == "") { 
             fbsfinder=refBoard[j][m];
             idxDisplay = j;
             break; 
           }
     }
     if(fbsfinder!=Infinity)
      break;
    }
    console.log(fbsfinder);
    bS[fbsfinder] = "O";
    refreshBoard();
    if (gameWon()) {
        won = true;
        render();
        displayPlane(toDisplayRef[idxDisplay]);
        return;
    }
    playJumpSound();
    currentPlayer = "X";
    render();
    displayPlane(toDisplayRef[idxDisplay]);
    return;
}




//funtion to translate letter to colour used in displayPlane function
function translateLetterToColor(letter) {
    switch (letter) {
        case "A":
            return "orange";
        case "B":
            return "green";
        case "C":
            return "purple";
        case "D":
            return "blue";
        case "E":
            return "red";
        case "F":
            return "yellow";
    }
}
//funtion to translate colour to letter used in displayPlane function
function translateColorToLetter(color) {
    switch (color) {
        case "orange":
            return "A";
        case "green":
            return "B";
        case "purple":
            return "C";
        case "blue":
            return "D";
        case "red":
            return "E";
        case "yellow":
            return "F";
    }
}


//Game Win Condition 3 in a Row on any given board
var gameWon = function() {
    for (let i=0;i<noOfPlane;i++){
    	const board=getBoard(i);
    	const isPlaneWon = ((board[0] === board[1]) && (board[0] === board[2]) && board[0] !== "") ||
            			   ((board[3] === board[4]) && (board[3] === board[5]) && board[3] !== "") ||
            			   ((board[6] === board[7]) && (board[6] === board[8]) && board[6] !== "") ||
            			   ((board[0] === board[3]) && (board[0] === board[6]) && board[0] !== "") ||
            			   ((board[1] === board[4]) && (board[1] === board[7]) && board[1] !== "") ||
            			   ((board[2] === board[5]) && (board[2] === board[8]) && board[2] !== "") ||
            			   ((board[0] === board[4]) && (board[0] === board[8]) && board[0] !== "") ||
            			   ((board[2] === board[4]) && (board[2] === board[6]) && board[2] !== "");
        if(isPlaneWon) return true;
    }
    return false;
};



       
//check tie
var isTie = function(board) {

    if ((board[0] !== "") && (board[1] !== "") && (board[2] !== "") && (board[3] !== "") &&
        (board[4] !== "") && (board[5] !== "") && (board[6] !== "") && (board[7] !== "") &&
        (board[8] !== ""))
        return true;
    else
        return false;
}



//Render updates and changes Board
var render = function() {
    var $turnEl = $("#turn")
    var $winnerEl = $("#winner");

    $turnEl.text(currentPlayer);
    renderboard();
    if (!won) {
        $winnerEl.text("X vs O");
    } else {
        $winnerEl.text(currentPlayer + " wins");
        playWinSound();
    }
};

//to refresh board according to changed values
function refreshBoard() {
    boardCenterPlaneA = [
        bS.a, bS.b, bS.c, bS.d, bS.e, bS.f, bS.g, bS.h, bS.i
    ];
    boardRightPlaneB = [
        bS.c, bS.j, bS.k, bS.f, bS.l, bS.m, bS.i, bS.n, bS.o
    ];
    boardBackPlaneC = [
        bS.u, bS.t, bS.o, bS.s, bS.r, bS.m, bS.q, bS.p, bS.k
    ];
    boardLeftPlaneD = [
        bS.q, bS.v, bS.a, bS.s, bS.w, bS.d, bS.u, bS.x, bS.g
    ];
    boardTopPlaneE = [
        bS.q, bS.p, bS.k, bS.v, bS.z, bS.j, bS.a, bS.b, bS.c
    ];
    boardDownPlaneF = [
        bS.g, bS.h, bS.i, bS.x, bS.y, bS.n, bS.u, bS.t, bS.o
    ];
    console.log(boardCenterPlaneA, boardRightPlaneB, boardBackPlaneC,
        boardLeftPlaneD, boardTopPlaneE, boardDownPlaneF)
    renderboard();
}


//render the changes on HTML table
var renderboard = function() {
    $("#cellA0a").text(boardCenterPlaneA[0]);
    $("#cellA1b").text(boardCenterPlaneA[1]);
    $("#cellA2c").text(boardCenterPlaneA[2]);
    $("#cellA3d").text(boardCenterPlaneA[3]);
    $("#cellA4e").text(boardCenterPlaneA[4]);
    $("#cellA5f").text(boardCenterPlaneA[5]);
    $("#cellA6g").text(boardCenterPlaneA[6]);
    $("#cellA7h").text(boardCenterPlaneA[7]);
    $("#cellA8i").text(boardCenterPlaneA[8]);

    $("#cellB0c").text(boardRightPlaneB[0]);
    $("#cellB1j").text(boardRightPlaneB[1]);
    $("#cellB2k").text(boardRightPlaneB[2]);
    $("#cellB3f").text(boardRightPlaneB[3]);
    $("#cellB4l").text(boardRightPlaneB[4]);
    $("#cellB5m").text(boardRightPlaneB[5]);
    $("#cellB6i").text(boardRightPlaneB[6]);
    $("#cellB7n").text(boardRightPlaneB[7]);
    $("#cellB8o").text(boardRightPlaneB[8]);

    $("#cellC0u").text(boardBackPlaneC[0]);
    $("#cellC1t").text(boardBackPlaneC[1]);
    $("#cellC2o").text(boardBackPlaneC[2]);
    $("#cellC3s").text(boardBackPlaneC[3]);
    $("#cellC4r").text(boardBackPlaneC[4]);
    $("#cellC5m").text(boardBackPlaneC[5]);
    $("#cellC6q").text(boardBackPlaneC[6]);
    $("#cellC7p").text(boardBackPlaneC[7]);
    $("#cellC8k").text(boardBackPlaneC[8]);

    $("#cellD0q").text(boardLeftPlaneD[0]);
    $("#cellD1v").text(boardLeftPlaneD[1]);
    $("#cellD2a").text(boardLeftPlaneD[2]);
    $("#cellD3s").text(boardLeftPlaneD[3]);
    $("#cellD4w").text(boardLeftPlaneD[4]);
    $("#cellD5d").text(boardLeftPlaneD[5]);
    $("#cellD6u").text(boardLeftPlaneD[6]);
    $("#cellD7x").text(boardLeftPlaneD[7]);
    $("#cellD8g").text(boardLeftPlaneD[8]);

    $("#cellE0q").text(boardTopPlaneE[0]);
    $("#cellE1p").text(boardTopPlaneE[1]);
    $("#cellE2k").text(boardTopPlaneE[2]);
    $("#cellE3v").text(boardTopPlaneE[3]);
    $("#cellE4z").text(boardTopPlaneE[4]);
    $("#cellE5j").text(boardTopPlaneE[5]);
    $("#cellE6a").text(boardTopPlaneE[6]);
    $("#cellE7b").text(boardTopPlaneE[7]);
    $("#cellE8c").text(boardTopPlaneE[8]);

    $("#cellF0g").text(boardDownPlaneF[0]);
    $("#cellF1h").text(boardDownPlaneF[1]);
    $("#cellF2i").text(boardDownPlaneF[2]);
    $("#cellF3x").text(boardDownPlaneF[3]);
    $("#cellF4y").text(boardDownPlaneF[4]);
    $("#cellF5n").text(boardDownPlaneF[5]);
    $("#cellF6u").text(boardDownPlaneF[6]);
    $("#cellF7t").text(boardDownPlaneF[7]);
    $("#cellF8o").text(boardDownPlaneF[8]);
}

//Board Plane Action/Buttons
function displayPlane(planeLetter) {
    currentPlane = planeLetter;

    $("#boardTopPlaneE").css("display", "none");
    $("#boardDownPlaneF").css("display", "none");
    $("#boardLeftPlaneD").css("display", "none");
    $("#boardBackPlaneC").css("display", "none");
    $("#boardRightPlaneB").css("display", "none");
    $("#boardCenterPlaneA").css("display", "none");

    if (planeLetter === "A") {
        $("#boardCenterPlaneA").css("display", "table");
    } else if (planeLetter === "B") {
        $("#boardRightPlaneB").css("display", "table");
    } else if (planeLetter === "C") {
        $("#boardBackPlaneC").css("display", "table");
    } else if (planeLetter === "D") {
        $("#boardLeftPlaneD").css("display", "table");
    } else if (planeLetter === "E") {
        $("#boardTopPlaneE").css("display", "table");
    } else if (planeLetter === "F") {
        $("#boardDownPlaneF").css("display", "table");
    }
}

//start buttom
$("#startButton").click(function() {
    startGame();
    render();
});
//restart buttom
$("#restartButton").click(function() {
    startGame();
    render();
});

//other buttom

$("#orangeButton").click(function() {
    displayPlane("A");
});

$("#greenButton").click(function() {
    displayPlane("B");
});

$("#purpleButton").click(function() {
    displayPlane("C");
});

$("#blueButton").click(function() {
    displayPlane("D");
});

$("#redButton").click(function() {
    displayPlane("E");
});

$("#yellowButton").click(function() {
    displayPlane("F");
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

//Keyboard Mapping/Control Logic
$("body").on("keydown", function(evt) {
    var planeColor = translateLetterToColor(currentPlane);
    var moveDirection;

    switch (evt.keyCode) {
        case 87: // W
            console.log("FlipNorth");
            moveDirection = "N";
            break;
        case 83: // S
            console.log("FlipSouth");
            moveDirection = "S";
            break;
        case 65: // A
            console.log("FlipWest");
            moveDirection = "W";
            break;
        case 68: // D
            console.log("FlipEast");
            moveDirection = "E";
            break;
        case 81: // Q
            console.log("RotateCounter");
            return;
        case 69: // E
            console.log("RotateClock");
            return;
        default:
            return;
    }




    //Color Letter Board Translate
    var goToColor = planes[planeColor][moveDirection];
    var goToLetter = translateColorToLetter(goToColor);
    displayPlane(goToLetter);
});