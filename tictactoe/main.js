// Game Settings

var row = 3;
var col = 3;
var x = 600;
var y = 600;
var onOff = 1;
var padding = 50;
var Playercrossies = 1;
var checker = true;
// AI values
var NPCcrossies = 1;
var mousePos;
var winner;
var saver = 0;

// Creating empty 2D arrays for the Gameboard and hover Rectangles.
board = new Array(row);
rects = new Array(row);
for (var i = 0; i < board.length; i++) {
    board[i] = new Array(col);
}
for (var i = 0; i < rects.length; i++) {
    rects[i] = new Array(row);
}
// Initializing the Gameboard to be blank.
for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
        board[i][j] = " ";
        rects[i][j] = new rect(2, 2, 2, 2);
    }
}



function rect(x, y, width, height) {
    var gx = Math.ceil(500 / (col));
    var gy = Math.ceil(500 / (row));
    this.width = gy - 2 * (gy / 10);
    this.height = gx - 2 * (gx / 10);
    this.x = x + gy / 10;
    this.y = y + gx / 10;
    this.hoverEmpty = function () {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.hoverFull = function () {
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.win = function () {
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function winCheck(mark, checkedBoard) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i][j + 1] == mark && checkedBoard[i][j + 2] == mark) {
                return true;
            } else if (i < row - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j] == mark && checkedBoard[i + 2][j] == mark) {
                return true;
            } else if (i < row - 2 && j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j + 1] == mark && checkedBoard[i + 2][j + 2] == mark) {
                return true;
            } else if (i >= 2 && j <= col - 2 && checkedBoard[i][j] == mark && checkedBoard[i - 1][j + 1] == mark && checkedBoard[i - 2][j + 2] == mark) {
                return true;
            }
        }
    }
    return false;
}

function gameOver(mark, checkedBoard) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i][j + 1] == mark && checkedBoard[i][j + 2] == mark) {
                return [[i, j], [i, j + 1], [i, j + 2]];
            } else if (i < row - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j] == mark && checkedBoard[i + 2][j] == mark) {
                return [[i, j], [i + 1, j], [i + 2, j]];
            } else if (i < row - 2 && j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j + 1] == mark && checkedBoard[i + 2][j + 2] == mark) {
                return [[i, j], [i + 1, j + 1], [i + 2, j + 2]];
            } else if (i >= 2 && j <= col - 2 && checkedBoard[i][j] == mark && checkedBoard[i - 1][j + 1] == mark && checkedBoard[i - 2][j + 2] == mark) {
                return [[i, j], [i - 1, j + 1], [i - 2, j + 2]];
            }
        }
    }
    return undefined;
}


function render() {
    // s("RENDER!:");
    canvas = document.getElementById('area');
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 600);

    // MousePos stuff...
    if (mousePos != null) {
        // ("WHATUPPIMPS!");
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (mousePos.x > rects[i][j].x && mousePos.x < rects[i][j].x + rects[i][j].width && mousePos.y > rects[i][j].y && mousePos.y < rects[i][j].y + rects[i][j].height) {
                    if (board[i][j] == " ") { rects[i][j].hoverEmpty(); }
                    if (board[i][j] == "X" && Playercrossies > 0) { rects[i][j].hoverFull(); }
                }
            }
        }
        if (mousePos.x > 0 && mousePos.x < 60 && mousePos.y > 0 && mousePos.y < 600) {
            // Right Triangle
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(0, 600 / 2);
            ctx.lineTo(40, 600 / 2 + 50);
            ctx.lineTo(40, 600 / 2 - 50);
            ctx.closePath();
            ctx.fill();
        } else if (mousePos.x < 600 && mousePos.x > 560 && mousePos.y > 0 && mousePos.y < 600) {
            // Left Triangle
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(600, 600 / 2);
            ctx.lineTo(560, 600 / 2 + 50);
            ctx.lineTo(560, 600 / 2 - 50);
            ctx.closePath();
            ctx.fill();
        } else if (mousePos.x > 0 && mousePos.x < 600 && mousePos.y > 0 && mousePos.y < 60) {
            // Top Triangle
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(600 / 2, 0);
            ctx.lineTo(600 / 2 + 50, 40);
            ctx.lineTo(600 / 2 - 50, 40);
            ctx.closePath();
            ctx.fill();
        } else if (mousePos.x > 0 && mousePos.x < 600 && mousePos.y > 560 && mousePos.y < 600) {
            // Bottom Triangle
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(600 / 2, 600);
            ctx.lineTo(600 / 2 + 50, 560);
            ctx.lineTo(600 / 2 - 50, 560);
            ctx.closePath();
            ctx.fill();
        }
    }
    var gx = Math.ceil(500 / (col));
    var gy = Math.ceil(500 / (row));
    var fontFamily = "bold " + (gy / 2) + "px monospace";
    ctx.font = fontFamily;
    ctx.fontWeight = 9000;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            ctx.fillText(board[i][j], ((gy) / 2 + padding) + gy * i, ((gx / 2 + padding) + gx * j) + (gx / 5));
            // Make hover rectangles!
            rects[i][j] = (new rect((gy * i) + padding, (gx * j) + padding));
        }
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    // Drawing columns
    for (var i = 1; i < row; i++) {
        ctx.moveTo(gy * i + padding, padding);
        ctx.lineTo(gy * i + padding, y - padding);
    }
    ctx.closePath();
    ctx.stroke();
    // Drawing rows
    ctx.beginPath();
    for (var j = 1; j < col; j++) {
        ctx.moveTo(padding, gx * j + padding);
        ctx.lineTo(x - padding, gx * j + padding);
    }
    ctx.closePath();
    ctx.stroke();
}

function getMousePos(canvas, evt) {
    // (evt);
    var square = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - square.left,
        y: evt.clientY - square.top
    };
}

function clicker(event) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (mousePos.x > rects[i][j].x && mousePos.x < rects[i][j].x + rects[i][j].width && mousePos.y > rects[i][j].y && mousePos.y < rects[i][j].y + rects[i][j].height) {
                if (board[i][j] == " " && checker) {
                    ("how does this work???");
                    board[i][j] = "O";
                    checker = false;
                    clearBoard();
                    printBoard();
                    grid();
                    // return;
                } if (board[i][j] == "X" && checker) {
                    ("how does this work???");
                    board[i][j] = "\u25A0";
                    Playercrossies -= 1;
                    checker = false;
                    clearBoard();
                    printBoard();
                    grid();
                    // return;
                }
                printBoard();
            }
        }
    }
    if (mousePos.x < 600 && mousePos.x > 560 && mousePos.y > 0 && mousePos.y < 600) {
        if (checker) {
            addRight(board);
        }
        ("Expanding!");
        checker = false;
        clearBoard();
        printBoard();
        grid();
        // return;
    } else if (mousePos.x > 0 && mousePos.x < 60 && mousePos.y > 0 && mousePos.y < 600) {
        if (checker) {
            addLeft(board);
        }
        checker = false;
        clearBoard();
        printBoard();
        grid();
        // return;
    } else if (mousePos.x > 0 && mousePos.x < 600 && mousePos.y > 0 && mousePos.y < 60) {
        if (checker) {
            addTop(board);
        }
        checker = false;
        clearBoard();
        printBoard();
        grid();
        // return;
    } else if (mousePos.x > 0 && mousePos.x < 600 && mousePos.y > 560 && mousePos.y < 600) {
        if (checker) {
            addBottom(board);
        }
        checker = false;
        clearBoard();
        printBoard();
        grid();
        // return;
    }
}
// Starting of the game
function startGame() {
    ctx = document.getElementById('area').getContext("2d");
    render();
    canvas.addEventListener("mousemove", function (evt) { mousePos = getMousePos(canvas, evt); });
    document.getElementById("turn").innerHTML = "Welcome to TIX-TAX-TOX! Instructions are below";
    // turn = Math.floor(Math.random() * 2);
    turn = 1;
    loop();
}

// window.requestAnimationFrame(loop);

function loop() {
    //var ctx = document.getElementById('canvas').getContext("2d");
    render();
    var playerString = "Player Blockers<br> " + Playercrossies.toString();
    var NPCString = "AI Blockers<br> " + NPCcrossies.toString();
    document.getElementById("Playercrossies").innerHTML = playerString;
    document.getElementById("NPCcrossies").innerHTML = NPCString;
    if (turn == 1) {
        // player's move
        canvas.addEventListener("click", marker, false);
        winner = gameOver("O", board);
        if (winner != undefined) {
            // Player wins!
            document.getElementById("turn").innerHTML = "Player Wins!";
            for (var i = 0; i < winner.length; i++) {
                board[winner[i][0]][winner[i][1]] = "#";
            }
            turn == 3;
            // break;
        }
    }
    else if (turn == 2) {
        NPC();
        winner = gameOver("X", board);
        if (winner != undefined) {
            // NPCWINS!
            document.getElementById("turn").innerHTML = "AI wins!";
            for (var i = 0; i < winner.length; i++) {
                board[winner[i][0]][winner[i][1]] = "#";
            }
            turn == 3;
            // break;
        }
    }
    else if (turn == 3) {

    }
    window.requestAnimationFrame(loop);
}

function marker() {
    ("Checking a click!");
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (mousePos.x > rects[i][j].x && mousePos.x < rects[i][j].x + rects[i][j].width && mousePos.y > rects[i][j].y && mousePos.y < rects[i][j].y + rects[i][j].height) {
                if (board[i][j] == " " && checker) {
                    ("how does this work???");
                    board[i][j] = "O";
                    render();
                    canvas.removeEventListener("click", marker, false);
                    turn = 2;
                    // return;
                } if (board[i][j] == "X" && Playercrossies > 0) {
                    ("how does this work???");
                    board[i][j] = "\u25A0";
                    render();
                    Playercrossies -= 1;
                    canvas.removeEventListener("click", marker, false);
                    turn = 2;
                    // return;
                }
            }
        }
    }
    if (mousePos.x < 600 && mousePos.x > 560 && mousePos.y > 0 && mousePos.y < 600) {
        ("Expanding!");
        if (checker) {
            addRight(board);
            Playercrossies += 1;
            render();
            canvas.removeEventListener("click", marker, false);
            turn = 2;
        }
        // return;
    } else if (mousePos.x > 0 && mousePos.x < 60 && mousePos.y > 0 && mousePos.y < 600) {
        if (checker) {
            addLeft(board);
            Playercrossies += 1;
            render();
            canvas.removeEventListener("click", marker, false);
            turn = 2;
        }
        // return;
    } else if (mousePos.x > 0 && mousePos.x < 600 && mousePos.y > 0 && mousePos.y < 60) {
        if (checker) {
            addTop(board);
            Playercrossies += 1;
            render();
            canvas.removeEventListener("click", marker, false);
            turn = 2;
        }
        // return;
    } else if (mousePos.x > 0 && mousePos.x < 600 && mousePos.y > 560 && mousePos.y < 600) {
        if (checker) {
            addBottom(board);
            Playercrossies += 1;
            render();
            canvas.removeEventListener("click", marker, false);
            turn = 2;
        }
        // return;
    }
}




function NPC() {
    ("# of NPCcrossies", NPCcrossies);
    ("In NPC");
    nextMove = bestMove(board);
    (nextMove);
    (saver);
    if (nextMove.length == 3) {
        saver = nextMove[3];
    }
    else if (saver != 0 && saver != undefined) {
        nextMove[0] = saver;
        saver = 0;
    }
    if (nextMove[0] == -1) {
        addTop(board);
        NPCcrossies++;
        turn = 1;
    } else if (nextMove[0] == -2) {
        addBottom(board);
        NPCcrossies++;
        turn = 1;
    } else if (nextMove[0] == -3) {
        addLeft(board);
        NPCcrossies++;
        turn = 1;
    } else if (nextMove[0] == -4) {
        addRight(board);
        NPCcrossies++;
        turn = 1;
    } else if (board[nextMove[0]][nextMove[1]] != " ") {
        board[nextMove[0]][nextMove[1]] = "\u25A0";
        NPCcrossies--;
        turn = 1;
    } else {
        board[nextMove[0]][nextMove[1]] = "X";
        turn = 1;
    }
    return;

}

function bestMove(passBoard) {
    // Creating moves.
    ("In bestMove!");
    var counter = 0;
    var bestScore = -Infinity;
    var move = [];
    for (var i = 0; i < passBoard.length; i++) {
        for (var j = 0; j < passBoard[i].length; j++) {
            if (passBoard[i][j] != " ") {
                counter++;
            }
        }
    }
    if (counter >= row * col - 3) {
        ("Checking expansions!");
        move = ExTest(passBoard, 0, alpha, beta, false);
        if (move[2] > bestScore) {
            bestScore = move[2];
        }
    }
    console.log("Best score from ExTester", bestScore);

    var alpha = -Infinity;
    var beta = Infinity;



    for (var z = 0; z < passBoard.length; z++) {
        for (var c = 0; c < passBoard[z].length; c++) {
            if (passBoard[z][c] == " ") {
                passBoard[z][c] = "X";
                let score = tester(passBoard, 0, alpha, beta, false);
                passBoard[z][c] = " ";
                console.log(z, c);
                console.log(score);
                if (score > bestScore) {
                    bestScore = score;
                    move = [z, c];
                }
            }
            else if (passBoard[z][c] == "O" && NPCcrossies > 0) {
                passBoard[z][c] = "\u25A0";
                NPCcrossies -= 1;
                let score = tester(passBoard, 0, alpha, beta, false);
                NPCcrossies += 1;
                passBoard[z][c] = "O";
                console.log(z, c);
                console.log(score);
                if (score > bestScore) {
                    bestScore = score;
                    move = [z, c];
                }
            }
        }
    }
    console.log("Final move: ", move);
    return move
}




function ExTest(boardo, depth, alpha, beta, bool1) {
    ("In ExTest!");
    move = [];
    var bestScore = -Infinity;
    addTop(boardo);
    ("New Test!");
    for (var z = 0; z < boardo.length; z++) {
        for (var c = 1; c < boardo[z].length; c++) {
            if (boardo[z][c] == "O" && NPCcrossies > 0) {
                (z, c);
                boardo[z][c] = "\u25A0";
                // ("This is the input for it", board[2][1]);
                var eval = altTester(boardo, depth, alpha, beta, bool1);
                (eval);
                boardo[z][c] = "O";
                if (eval > bestScore) {
                    bestScore = eval;
                    move = [z, c - 1, bestScore];
                }
            }
        }
    }
    shrinkTop(boardo);
    addBottom(boardo);
    ("NewTest!");
    ("Old bestScore is...", bestScore);
    for (var z = 0; z < boardo.length; z++) {
        for (var c = 0; c < boardo[z].length - 1; c++) {
            if (boardo[z][c] == "O" && NPCcrossies > 0) {
                boardo[z][c] = "\u25A0";
                var eval = altTester(boardo, depth, alpha, beta, bool1);
                (eval);
                (z, c);
                boardo[z][c] = "O";
                if (eval > bestScore) {
                    bestScore = eval;
                    move = [z, c, bestScore];
                }
            }
        }
    }
    shrinkBottom(boardo);
    addLeft(boardo);
    ("NewTest!");
    ("Old bestScore is...", bestScore);
    for (var z = 1; z < boardo.length; z++) {
        for (var c = 0; c < boardo[z].length; c++) {
            if (boardo[z][c] == "O" && NPCcrossies > 0) {
                boardo[z][c] = "\u25A0";
                var eval = altTester(boardo, depth, alpha, beta, bool1);
                (eval);
                (z, c);
                boardo[z][c] = "O";
                if (eval > bestScore) {
                    bestScore = eval;
                    move = [z - 1, c, bestScore];
                }
            }
        }
    }
    shrinkLeft(boardo);
    addRight(boardo);
    ("NewTest!");
    ("Old bestScore is...", bestScore);
    for (var z = 0; z < boardo.length; z++) {
        for (var c = 0; c < boardo[z].length; c++) {
            if (boardo[z][c] == "O" && NPCcrossies > 0) {
                boardo[z][c] = "\u25A0";
                var eval = altTester(boardo, depth, alpha, beta, bool1);
                (eval);
                (z, c);
                boardo[z][c] = "O";
                if (eval > bestScore) {
                    bestScore = eval;
                    move = [z, c, bestScore];
                }
            }
        }
    }
    shrinkRight(boardo);
    ("Final bestScore in ExTest", bestScore);

    // maxEval = -Infinity;
    addTop(boardo);
    NPCcrossies += 1;
    var score = altTester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
    NPCcrossies -= 1;
    shrinkTop(boardo);
    if (score > bestScore) {
        bestScore = score;
        move = [-1, 0, bestScore];
    }
    ("New score? Top", bestScore);
    addBottom(boardo);
    NPCcrossies += 1;
    var score = altTester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
    NPCcrossies -= 1;
    shrinkBottom(boardo);
    if (score > bestScore) {
        bestScore = score;
        move = [-2, 0, bestScore];
    }
    ("New score? Bottom", bestScore);
    addLeft(boardo);
    NPCcrossies += 1;
    var score = altTester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
    NPCcrossies -= 1;
    shrinkLeft(boardo);
    if (score > bestScore) {
        bestScore = score;
        move = [-3, 0, bestScore];
    }
    ("New score? Left", bestScore);
    addRight(boardo);
    NPCcrossies += 1;
    var score = altTester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
    NPCcrossies -= 1;
    shrinkRight(boardo);
    if (score > bestScore) {
        bestScore = score;
        move = [-4, 0, bestScore];
    }
    ("New score? Right", bestScore);
    return move;
}








function Expander(boardo, depth, alpha, beta, isMax) {
    if (isMax && NPCcrossies > 0) {
        var bestScore = -Infinity;
        addTop(boardo);
        for (var z = 0; z < boardo.length; z++) {
            for (var c = 1; c < boardo[z].length; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, false);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval > bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkTop(boardo);
        addBottom(boardo);
        for (var z = 0; z < boardo.length; z++) {
            for (var c = 0; c < boardo[z].length - 1; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, false);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval > bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkBottom(boardo);
        addLeft(boardo);
        for (var z = 1; z < boardo.length; z++) {
            for (var c = 0; c < boardo[z].length; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, false);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval > bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkLeft(boardo);
        addRight(boardo);
        for (var z = 0; z < boardo.length - 1; z++) {
            for (var c = 0; c < boardo[z].length; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, false);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval > bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkRight(boardo);
        return bestScore;
    }
    else if (!isMax && Playercrossies > 0) {
        // ("inExpander");
        var bestScore = Infinity;
        addTop(boardo);
        for (var z = 0; z < boardo.length; z++) {
            for (var c = 1; c < boardo[z].length; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, true);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval < bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkTop(boardo);
        addBottom(boardo);
        for (var z = 0; z < boardo.length; z++) {
            for (var c = 0; c < boardo[z].length - 1; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, true);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval < bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkBottom(boardo);
        addLeft(boardo);
        for (var z = 1; z < boardo.length; z++) {
            for (var c = 0; c < boardo[z].length; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, (depth + 1), alpha, beta, true);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval < bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkLeft(boardo);
        addRight(boardo);
        for (var z = 0; z < boardo.length - 1; z++) {
            for (var c = 0; c < boardo[z].length; c++) {
                if (boardo[z][c] == "O") {
                    boardo[z][c] = "\u25A0";
                    var eval = altTester(boardo, depth + 1, alpha, beta, true);
                    // (eval);
                    // (z, c);
                    boardo[z][c] = "O";
                    if (eval < bestScore) {
                        bestScore = eval;
                    }
                }
            }
        }
        shrinkRight(boardo);
        return bestScore;
    }
    else if (isMax) {
        maxEval = -Infinity;
        addTop(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkTop(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        addBottom(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkBottom(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        addLeft(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkLeft(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        addRight(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkRight(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        return maxEval;
    }
    else if (!isMax) {
        minEval = -Infinity;
        addTop(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkTop(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        addBottom(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkBottom(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        addLeft(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkLeft(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        addRight(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkRight(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        return minEval;
    }
}


function tester(boardo, depth, alpha, beta, isMax) {
    if (depth > 6) {
        return 0;
    } else if (winCheck("X", boardo)) {
        return 1000;
    } else if (winCheck("O", boardo)) {
        return (-1000);
    }


    var counter = 0;
    for (var i = 0; i < boardo.length; i++) {
        for (var j = 0; j < boardo[i].length; j++) {
            if (boardo[i][j] != " ") {
                counter++;
            }
        }
    }
    if (counter == row * col) {
        // Board is full. Consider Expansion
        maxEval = Expander(boardo, (depth + 1), alpha, beta, isMax);
        // (maxEval);
        return maxEval;
    }
    else if (isMax) {
        var maxEval = -Infinity;
        for (var i = 0; i < boardo.length; i++) {
            for (var j = 0; j < boardo[i].length; j++) {
                if (boardo[i][j] == " ") {
                    boardo[i][j] = "X";
                    var score = tester(boardo, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
                    boardo[i][j] = " ";
                    maxEval = Math.max(maxEval, score);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
                if (boardo[i][j] == "O" && NPCcrossies > 0) {
                    boardo[i][j] = "\u25A0";
                    NPCcrossies -= 1;
                    var score = tester(boardo, (depth + 1), alpha, beta, false, true) - depth - Playercrossies + NPCcrossies;
                    NPCcrossies += 1;
                    boardo[i][j] = "O";
                    maxEval = Math.max(maxEval, score);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        if (maxEval == -Infinity) {
            return depth;
        }
        return maxEval;
    }
    else if (!isMax) {
        var minEval = Infinity;
        for (var i = 0; i < boardo.length; i++) {
            for (var j = 0; j < boardo[i].length; j++) {
                if (boardo[i][j] == " ") {
                    boardo[i][j] = "O";
                    var score = tester(boardo, (depth + 1), alpha, beta, true, false) + depth - Playercrossies + NPCcrossies;
                    boardo[i][j] = " ";
                    minEval = Math.min(minEval, score);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
                if (boardo[i][j] == "X" && Playercrossies > 0) {
                    boardo[i][j] = "\u25A0";
                    Playercrossies -= 1;
                    var score = tester(boardo, (depth + 1), alpha, beta, true, true) + depth - Playercrossies + NPCcrossies;
                    Playercrossies += 1;
                    boardo[i][j] = "X";
                    minEval = Math.min(minEval, score);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }

        if (minEval == Infinity) {
            return -depth;
        }
        return minEval;
    }
}

function altTester(boardo, depth, alpha, beta, isMax) {
    if (depth > 6) {
        return 0;
    } else if (winCheck("X", boardo)) {
        return 1000;
    } else if (winCheck("O", boardo)) {
        return -1000;
    }

    if (isMax) {
        var maxEval = -Infinity;
        for (var i = 0; i < boardo.length; i++) {
            for (var j = 0; j < boardo[i].length; j++) {
                if (boardo[i][j] == " ") {
                    boardo[i][j] = "X";
                    // if (winCheck("X", boardo)) {
                    //     score = 1000;
                    // }
                    // else {
                    //     score = 0;
                    // }
                    var score = altTester(boardo, (depth + 1), alpha, beta, false) - depth - Playercrossies + NPCcrossies;
                    boardo[i][j] = " ";
                    maxEval = Math.max(maxEval, score);
                }
            }
        }
        return maxEval;
    }
    else if (!isMax) {
        var minEval = Infinity;
        // (boardo, "Whaat?");
        for (var i = 0; i < boardo.length; i++) {
            for (var j = 0; j < boardo[i].length; j++) {
                // (i,j);
                if (boardo[i][j] == " ") {
                    boardo[i][j] = "O";
                    //(boardo[2][1]);
                    // if (winCheck("O", boardo)) {
                    //     score = -1000;
                    //     if (boardo[2][1] == "\u25A0") {
                    //         ("IWANTTODIE");
                    //         // print();
                    //     }
                    // }
                    // else {
                    //     ("WHATTHEFUCK");
                    //     score = 0;
                    // }
                    var score = altTester(boardo, (depth + 1), alpha, beta, true) + depth - Playercrossies + NPCcrossies;
                    // (score);
                    boardo[i][j] = " ";
                    minEval = Math.min(minEval, score);
                }
            }
        }
        return minEval;
    }
}

// Board Expansion functions
function addTop(altBoard) {
    col = col + 1;
    // ("In addTop");
    // (altBoard);
    for (var i = 0; i < row; i++) {
        altBoard[i].unshift(" ");
        rects[i].unshift(new rect(2, 2, 2, 2));
    }
    return;
}

function shrinkTop(altBoard) {
    col = col - 1;
    for (var i = 0; i < row; i++) {
        altBoard[i].shift();
    }
    return;
}

function addBottom(altBoard) {
    col = col + 1;
    // ("In bottom");
    // (altBoard);
    for (var i = 0; i < row; i++) {
        altBoard[i].push(" ");
        rects[i].push(new rect(2, 2, 2, 2));
    }
    return;
}

function shrinkBottom(altBoard) {
    col = col - 1;
    for (var i = 0; i < row; i++) {
        altBoard[i].pop();
    }
    return;
}

function addRight(altBoard) {
    // ("In right");
    row = row + 1;
    altBoard.push(new Array(col));
    rects.push(new Array(col));
    for (var i = 0; i < col; i++) {
        altBoard[row - 1][i] = " ";
        rects[row - 1][i] = new rect(2, 2, 2, 2);
    }
    return;
}

function shrinkRight(altBoard) {

    row = row - 1;
    altBoard.pop();
    rects.pop();
    return;
}

function addLeft(altBoard) {
    row = row + 1;
    // ("In left");
    altBoard.unshift(new Array(col));
    rects.unshift(new Array(col));
    for (var i = 0; i < col; i++) {
        altBoard[0][i] = " ";
        rects[0][i] = new rect(2, 2, 2, 2);
    }
    return;
}

function shrinkLeft(altBoard) {
    row = row - 1;
    altBoard.shift();
    rects.shift();
    return;
}
