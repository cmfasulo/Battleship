var board = [[], [], [], [], [], [], [], [], [], []];
var ship = 1;
var torpedoCount = 25;

//creates a function to be called when a user clicks a square
function playerClick() {
  torpedoCount--;
}

function shipLocations() {
  //populates entire previously empty board with X in all squares
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      board[i][j] = "X";
    }
  }

  //parse through entire board to check for number of ships (ship = 1)
  var numShips = 0;

  while (numShips < 4) {
    numShips = 0;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === ship)
        numShips += 1;
      }
    }

    row = Math.floor(Math.random()*10);
    column = Math.floor(Math.random()*10);

    if (board[row][column] != ship) {
      board[row][column] = ship;
    }
    console.log(numShips);
  }
}

function checkBoard(position) {
  var rowNum = parseInt(position.slice(0,1));
  var colNum = parseInt(position.slice(1,2));
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[rowNum][colNum] === ship) {
        return true;
      } else {
        return false;
      }
    }
  }
}
