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
var board = createBoard(rows, columns, "O"); //createBoard(rows, columns, fillCharacter)

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
  //(x,y) --> origin (0,0) is top left cell
  var rowStart = 0;
  var columnStart = 0;
  var validPlacement = false;

  shipNumLoop:
  for (var x = 0; x < ship; x++) {
    shipPlacementLoop:
    while (validPlacement === false) {
      var orientation = Math.round(Math.random()); //0 = horizontal, 1 = vertical

      if (orientation === 0) { //horizontal placement
        rowStart = Math.floor(Math.random()*(rows));
        columnStart = Math.floor(Math.random()*(columns - shipLength));

        var endRow = rowStart + shipLength;
        var endColumn = columnStart + shipLength;

        if (rowStart === 0) {
          var backRow = rowStart;
        } else {
          var backRow = rowStart - 1;
        }

        if (rowStart === (rows - 1)) {
          var forwardRow = rowStart;
        } else {
          var forwardRow = rowStart + 1;
        }

        if (columnStart === 0) {
          var backColumn = columnStart;
        } else {
          var backColumn = columnStart - 1;
        }

        if (columnStart === (columns - 1)) {
          forwardColumn = columnStart;
        } else {
          var forwardColumn = columnStart + 1;
        }

        //The loop below ensures there are no ships currently in the proposed path. If a ship is detected already in a spot in the proposed path, the validHorizontalloop will be broken and validPlacement remains false. The do/while loop will run again with new orientation and placement.
        validHorizontalLoop:
        for (var j = columnStart; j < endColumn; j++) {
          if (board[rowStart][j] === "O" &&
              board[rowStart][backColumn] === "O"  &&
              board[rowStart][endColumn] === "O" &&
              board[backRow][j] === "O" &&
              board[forwardRow][j] === "O") {
            validPlacement = true; //current spot IS NOT occupied
          } else {
            validPlacement = false; //current spot IS occupied
            break validHorizontalLoop;
          }
        }

        //place ship on board if it passes the spot-checking loop above
        if (validPlacement == true) {
          for (var j = columnStart; j < (columnStart + shipLength); j++) {
            board[rowStart][j] = shipLength.toString() + ":" + x.toString();
            console.log()
          }
        }
      }
      else { //vertical placement
        rowStart = Math.floor(Math.random()*(rows - shipLength));
        columnStart = Math.floor(Math.random()*(columns));

        var endRow = rowStart + shipLength;
        var endColumn = columnStart + shipLength;

        if (rowStart === 0) {
          var backRow = rowStart;
        } else {
          var backRow = rowStart - 1;
        }

        if (rowStart === (rows - 1)) {
          var forwardRow = rowStart;
        } else {
          var forwardRow = rowStart + 1;
        }

        if (columnStart === 0) {
          var backColumn = columnStart;
        } else {
          var backColumn = columnStart - 1;
        }

        if (columnStart === (columns - 1)) {
          forwardColumn = columnStart;
        } else {
          var forwardColumn = columnStart + 1;
        }

        validVerticalLoop:
        for (var i = rowStart; i < endRow; i++) {
          if (board[i][columnStart] === "O"  &&
              board[backRow][columnStart] === "O" &&
              board[(endRow)][columnStart] === "O" &&
              board[i][backColumn] === "O" &&
              board[i][forwardColumn] === "O") {
            validPlacement = true; //current spot IS NOT occupied
          } else {
            validPlacement = false; //current spot IS occupied
            break validVerticalLoop;
          }
        }

        if (validPlacement == true) {
          for (var i = rowStart; i < (rowStart + shipLength); i++) {
            board[i][columnStart] = shipLength.toString() + ":" + x.toString();
          }
        }
      }
    }
    validPlacement = false;
  }
}

// function checkBoard(position) {
//   var rowNum = parseInt(position.slice(0,1));
//   var colNum = parseInt(position.slice(1,2));
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[i].length; j++) {
//       if (board[rowNum][colNum] === ship) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
// }
