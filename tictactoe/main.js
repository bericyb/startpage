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
    this.hoverWin = function () {
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function finalCheck(mark, checkedBoard) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i][j + 1] == mark && checkedBoard[i][j + 2] == mark) {
                rects[i][j].hoverWin();
                rects[i][j + 1].hoverWin();
                rects[i][j + 2].hoverWin();
                return true;
            } else if (i < row - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j] == mark && checkedBoard[i + 2][j] == mark) {
                rects[i][j].hoverWin();
                rects[i + 1][j].hoverWin();
                rects[i + 2][j].hoverWin();
                return true;
            } else if (i < row - 2 && j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j + 1] == mark && checkedBoard[i + 2][j + 2] == mark) {
                // if (mark == "O") {
                //     console.log("WTF");
                // }
                rects[i][j].hoverWin();
                rects[i + 1][j + 1].hoverWin();
                rects[i + 2][j + 2].hoverWin();
                return true;
            } else if (i >= 2 && j <= col - 2 && checkedBoard[i][j] == mark && checkedBoard[i - 1][j + 1] == mark && checkedBoard[i - 2][j + 2] == mark) {
                rects[i][j].hoverWin();
                rects[i - 1][j + 1].hoverWin();
                rects[i - 2][j + 2].hoverWin();
                return true;
            }
        }
    }
    return false;
}

function winCheck(mark, checkedBoard) {
    // console.log(checkedBoard);
    // if (checkedBoard[1][0] == "O" && checkedBoard[1][1] == "O" && checkedBoard[1][2] == "O") {
    //     console.log("Get outta here...");
    // }
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i][j + 1] == mark && checkedBoard[i][j + 2] == mark) {
                return true;
            } else if (i < row - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j] == mark && checkedBoard[i + 2][j] == mark) {
                return true;
            } else if (i < row - 2 && j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j + 1] == mark && checkedBoard[i + 2][j + 2] == mark) {
                // if (mark == "O") {
                //     console.log("WTF");
                // }
                return true;
            } else if (i >= 2 && j <= col - 2 && checkedBoard[i][j] == mark && checkedBoard[i - 1][j + 1] == mark && checkedBoard[i - 2][j + 2] == mark) {
                return true;
            }
        }
    }
    return false;
}

// function gameOver(mark, checkedBoard) {
//     // console.log(checkedBoard);
//     // if (checkedBoard[1][0] == "O" && checkedBoard[1][1] == "O" && checkedBoard[1][2] == "O") {
//     //     console.log("Get outta here...");
//     // }
//     for (var i = 0; i < row; i++) {
//         for (var j = 0; j < col; j++) {
//             if (j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i][j + 1] == mark && checkedBoard[i][j + 2] == mark) {
//                 return [[i,j],[i,j+1],[i,j+2]];
//             } else if (i < row - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j] == mark && checkedBoard[i + 2][j] == mark) {
//                 return [[i,j],[i+1]];
//             } else if (i < row - 2 && j < col - 2 && checkedBoard[i][j] == mark && checkedBoard[i + 1][j + 1] == mark && checkedBoard[i + 2][j + 2] == mark) {
//                 // if (mark == "O") {
//                 //     console.log("WTF");
//                 // }
//                 return true;
//             } else if (i >= 2 && j <= col - 2 && checkedBoard[i][j] == mark && checkedBoard[i - 1][j + 1] == mark && checkedBoard[i - 2][j + 2] == mark) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }


function render() {
    // sconsole.log("RENDER!:");
    canvas = document.getElementById('area');
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 600);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 600);
    // MousePos stuff...
    if (mousePos != null) {
        // console.log("WHATUPPIMPS!");
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
    if (finalCheck("O", board)) {
 
        document.getElementById("turn").innerHTML = "Player Wins!";
        turn = 3;
        try {
            throw new Error("STOP!");
        }
        finally { }
    }
    else if (finalCheck("X", board)) {
        
        document.getElementById("turn").innerHTML = "AI Wins!";
        turn = 3;
        try {
            throw new Error("STOP!");
        }
        finally { }
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
    // console.log(evt);
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
                    console.log("how does this work???");
                    board[i][j] = "O";
                    checker = false;
                    clearBoard();
                    printBoard();
                    grid();
                    // return;
                } if (board[i][j] == "X" && checker) {
                    console.log("how does this work???");
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
        console.log("Expanding!");
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
    if (turn == 1) {
        // player's move
        console.log("Players");
        document.getElementById("turn").innerHTML = "Player's turn";
        canvas.addEventListener("click", marker, false);

    }
    else if (turn == 2) {
        document.getElementById("turn").innerHTML = "NPC's turn";
        NPC();

        // gameOver("X", board)
        // if () {

        // }
    }
    window.requestAnimationFrame(loop);
}

function marker() {
    console.log("Checking a click!");
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (mousePos.x > rects[i][j].x && mousePos.x < rects[i][j].x + rects[i][j].width && mousePos.y > rects[i][j].y && mousePos.y < rects[i][j].y + rects[i][j].height) {
                if (board[i][j] == " " && checker) {
                    console.log("how does this work???");
                    board[i][j] = "O";
                    render();
                    canvas.removeEventListener("click", marker, false);
                    turn = 2;
                    // return;
                } if (board[i][j] == "X" && Playercrossies > 0) {
                    console.log("how does this work???");
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
        console.log("Expanding!");
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
    console.log("In NPC");
    var tempBoard = new Array(row);
    for (var x = 0; x < tempBoard.length; x++) {
        tempBoard[x] = new Array(col);
    }

    for (var x = 0; x < tempBoard.length; x++) {
        for (var y = 0; y < tempBoard[x].length; y++) {
            tempBoard[x][y] = board[x][y];
        }
    }
    nextMove = bestMove(tempBoard, 0);
    console.log(nextMove);
    if (nextMove[0] == -1) {
        addTop(board);
        turn = 1;
    } else if (nextMove[0] == -2) {
        addBottom(board);
        turn = 1;
    } else if (nextMove[0] == -3) {
        addLeft(board);
        turn = 1;
    } else if (nextMove[0] == -4) {
        addRight(board);
        turn = 1;
    } else if (board[nextMove[0]][nextMove[1]] != " ") {
        board[nextMove[0]][nextMove[1]] = "\u25A0";
        NPCcrossies -= 1;
        turn = 1;
    } else {
        board[nextMove[0]][nextMove[1]] = "X";
        turn = 1;
    }
    return;

}

function bestMove(passBoard, depth) {
    // Creating moves.
    var alpha = -Infinity;
    var beta = Infinity;

    var bestScore = -Infinity;
    var move = [];
    for (var z = 0; z < passBoard.length; z++) {
        for (var c = 0; c < passBoard[z].length; c++) {
            if (passBoard[z][c] == " ") {

                passBoard[z][c] = "X";
                let score = tester(passBoard, 0, alpha, beta, false, false);
                passBoard[z][c] = " ";
                console.log(z, c);
                console.log(score);
                if (score > bestScore) {
                    bestScore = score;
                    move = [z, c];
                }
            }
            if (passBoard[z][c] == "O" && NPCcrossies > 0) {

                passBoard[z][c] = "\u25A0";
                NPCcrossies -= 1;
                let score = tester(passBoard, 0, alpha, beta, false, true);
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
    // console.log("test");
    // console.log(passBoard);
    // console.log("Is it here?");
    if (bestScore == -Infinity) {
        console.log("Checking expansions!");
        addTop(passBoard);
        NPCcrossies += 1;
        var score = tester(passBoard, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
        //console.log(score);
        if (score > bestScore) {
            bestScore = score;
            move = [-1];
        }
        NPCcrossies -= 1;
        // console.log("Check shrinkers");
        // console.log(passBoard);
        shrinkTop(passBoard);
        addBottom(passBoard);
        NPCcrossies += 1;
        var score = tester(passBoard, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
        if (score > bestScore) {
            bestScore = score;
            move = [-2];
        }
        NPCcrossies -= 1;
        // console.log("Check shrinkers");
        // console.log(passBoard);
        shrinkBottom(passBoard);
        addLeft(passBoard);
        NPCcrossies += 1;
        var score = tester(passBoard, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
        if (score > bestScore) {
            bestScore = score;
            move = [-3];
        }
        NPCcrossies -= 1;
        // console.log("Check shrinkers");
        // console.log(passBoard);
        shrinkLeft(passBoard);
        addRight(passBoard);
        NPCcrossies += 1;
        var score = tester(passBoard, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
        if (score > bestScore) {
            bestScore = score;
            move = [-4];
        }
        NPCcrossies -= 1;
        // console.log("Check shrinkers");
        // console.log(passBoard);
        shrinkRight(passBoard);
        //console.log(bestScore);
    }
    return move
}

function tester(boardo, depth, alpha, beta, isMax, blockBool) {
    // console.log(depth);
    if (depth > 5) {
        //console.log("Reached depth!");
        return 0;
    }
    else if (winCheck("X", boardo)) {
        return 1000;
    } else if (winCheck("O", boardo)) {
        return (-1000);
    }
    // Check for tie
    else if (blockBool) {
        //console.log("We in here?");
        if (isMax) {
            var maxEval = -Infinity;
            for (var i = 0; i < boardo.length; i++) {
                for (var j = 0; j < boardo[i].length; j++) {
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
            var isBlocked = false;
            addTop(boardo);
            NPCcrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
            NPCcrossies -= 1;
            shrinkTop(boardo);
            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                return maxEval;
            }
            addBottom(boardo);
            NPCcrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
            NPCcrossies -= 1;
            shrinkBottom(boardo);
            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                return maxEval;
            }
            addLeft(boardo);
            NPCcrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
            NPCcrossies -= 1;
            shrinkLeft(boardo);
            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                return maxEval;
            }
            addRight(boardo);
            NPCcrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, false, false) - depth - Playercrossies + NPCcrossies;
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
            var minEval = -Infinity;
            for (var i = 0; i < boardo.length; i++) {
                for (var j = 0; j < boardo[i].length; j++) {
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
            var isBlocked = false;
            addTop(boardo);
            Playercrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, true, isBlocked) + depth - Playercrossies + NPCcrossies;
            Playercrossies -= 1;
            shrinkTop(boardo);
            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                return minEval;
            }
            addBottom(boardo);
            Playercrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, true, false) + depth - Playercrossies + NPCcrossies;
            Playercrossies -= 1;
            shrinkBottom(boardo);
            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                return minEval;
            }
            addLeft(boardo);
            Playercrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, true, false) + depth - Playercrossies + NPCcrossies;
            Playercrossies -= 1;
            shrinkLeft(boardo);
            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                return minEval;
            }
            addRight(boardo);
            Playercrossies += 1;
            var score = tester(boardo, (depth + 1), alpha, beta, true, false) + depth - Playercrossies + NPCcrossies;
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
    //console.log("Do we get here?");
    var counter = 0;
    for (var i = 0; i < boardo.length; i++) {
        for (var j = 0; j < boardo[i].length; j++) {
            if (boardo[i][j] == " ") {
                counter += 1;
            }
        }
    }
    if (counter < 1) {
        return 0;
    }
    if (isMax && counter > 0) {
        //console.log("Thank you");
        var maxEval = -Infinity;
        // list.push(-Infinity);
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
        return maxEval;
    } else if (counter < 1 && isMax) {
        //console.log("Very much");
        var maxEval = -Infinity;
        var isBlocked = false;
        addTop(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false, isBlocked) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkTop(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        addBottom(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false, isBlocked) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkBottom(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        addLeft(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false, isBlocked) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkLeft(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        addRight(boardo);
        NPCcrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, false, isBlocked) - depth - Playercrossies + NPCcrossies;
        NPCcrossies -= 1;
        shrinkRight(boardo);
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
            return maxEval;
        }
        return maxEval;

    } else if (!isMax && counter > 0) {
        //console.log("Wait");
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
        return minEval;
    } else if (!isMax && counter < 1) {
        //console.log("hmmm_");
        var minEval = -Infinity;
        var isBlocked = false;
        addTop(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true, isBlocked) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkTop(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        addBottom(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true, isBlocked) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkBottom(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        addLeft(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true, isBlocked) + depth - Playercrossies + NPCcrossies;
        Playercrossies -= 1;
        shrinkLeft(boardo);
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
            return minEval;
        }
        addRight(boardo);
        Playercrossies += 1;
        var score = tester(boardo, (depth + 1), alpha, beta, true, isBlocked) + depth - Playercrossies + NPCcrossies;
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



// Board Expansion functions
function addTop(altBoard) {
    col = col + 1;
    // console.log("In addTop");
    // console.log(altBoard);
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
    // console.log("In bottom");
    // console.log(altBoard);
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
    // console.log("In right");
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
    // console.log("In left");
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