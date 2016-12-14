//Quantity and lengths of ships
var carriers = 1;
var carrierLength = 5;

var battleships = 2;
var battleshipLength = 4;

var cruisers = 2;
var cruiserLength = 3;

var destroyers = 2;
var destroyerLength = 2;

var submarines = 1;
var submarineLength = 1;

var torpedoCount = 25;

var rows = 10;
var columns = 10;
var board = createBoard(rows, columns, 0); //createBoard(rows, columns, fillCharacter)

//creates a function to be called when a user clicks a square
function playerClick() {
  torpedoCount--;
}

function createBoard(rows, columns, fillCharacter) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    var rowArray = [];
    for (var j = 0; j < columns; j++) {
      rowArray.push(fillCharacter);
    }
    matrix.push(rowArray);
  }
  return matrix;
}

function placeShips() {
  addShip(carriers, carrierLength);
  addShip(battleships, battleshipLength);
  addShip(cruisers, cruiserLength);
  addShip(destroyers, destroyerLength);
  addShip(submarines, submarineLength);
}

function addShip(ship, shipLength) {
  for (var x = 0; x < ship; x++) {
    var validPlacement = false;

    while (!validPlacement) {
      var orientation = Math.round(Math.random()); //0 = horizontal, 1 = vertical

      if (orientation === 0) {
        var rowStart = Math.floor(Math.random()*(rows));
        var columnStart = Math.floor(Math.random()*(columns - shipLength));
      } else {
        var rowStart = Math.floor(Math.random()*(rows - shipLength));
        var columnStart = Math.floor(Math.random()*(columns));
      }


      var rowEnd = rowStart + shipLength;
      var columnEnd = columnStart + shipLength;

      if (rowStart === 0) {
        var rowBack = rowStart;
      } else {
        var rowBack = rowStart - 1;
      }

      if (rowStart === (rows - 1)) {
        var rowForward = rowStart;
      } else {
        var rowForward = rowStart + 1;
      }

      if (columnStart === 0) {
        var columnBack = columnStart;
      } else {
        var columnBack = columnStart - 1;
      }

      if (columnStart === (columns - 1)) {
        columnForward = columnStart;
      } else {
        var columnForward = columnStart + 1;
      }

      //The functions below ensure there are no ships currently in the proposed path. If a ship is detected already in a spot in the proposed path, the functions will return false and the while loop will run again with new orientation and placement. If true, the functions will place the ships on the board.
      if (orientation === 0) {
        validPlacement = placeHorizontal(shipLength, rowStart, columnStart, rowBack, columnBack, rowForward, columnEnd);
      } else {
        validPlacement = placeVertical(shipLength, rowStart, columnStart, rowBack, columnBack, columnForward, rowEnd);
      }
    }
  }
}

function placeHorizontal(shipLength, rowStart, columnStart, rowBack, columnBack, rowForward, columnEnd) {
  for (var j = columnStart; j < columnEnd; j++) {
    if (board[rowStart][j] != 0 ||
        board[rowStart][columnBack] != 0  ||
        board[rowStart][columnEnd] != 0 ||
        board[rowBack][j] != 0 ||
        board[rowForward][j] != 0) {
          console.log("placeHorizontal returned false");
          return false; //current spot is occupied
    }
  }

  for (var j = columnStart; j < (columnStart + shipLength); j++) {
    board[rowStart][j] = shipLength.toString();
  }
  console.log("placeHorizontal returned true");
  return true;
}

function placeVertical(shipLength, rowStart, columnStart, rowBack, columnBack, columnForward, rowEnd) {
  for (var i = rowStart; i < rowEnd; i++) {
    if (board[i][columnStart] != 0  ||
        board[rowBack][columnStart] != 0 ||
        board[rowEnd][columnStart] != 0 ||
        board[i][columnBack] != 0 ||
        board[i][columnForward] != 0) {
          console.log("placeVertical returned false");
          return false; //current spot is occupied
    }
  }

  for (var i = rowStart; i < (rowStart + shipLength); i++) {
    board[i][columnStart] = shipLength;
  }
  console.log("placeVertical returned true");
  return true;
}
