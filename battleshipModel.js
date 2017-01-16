// Quantity and lengths of ships
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

// Initialize the number of torpedos at player's disposal
var torpedoCount = 25;

// Initialize a new playing board (psudo-database)
var rows = 10; // number of board rows
var columns = 10; // number of board columns
var fillCharacter = 0;
var board = createBoard(rows, columns, fillCharacter);

// Function to be called when a player clicks a square or enters coordinates
function playerClick() {
  torpedoCount--;
}

// Called at the start of a new game to create and empty playing board on the model side (psudo-database, non-persistent)
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

// Called at the start of a new game to place each ship on the "board"
function placeShips() {
  addShip(carriers, carrierLength);
  addShip(battleships, battleshipLength);
  addShip(cruisers, cruiserLength);
  addShip(destroyers, destroyerLength);
  addShip(submarines, submarineLength);
}

// Iterates through the current board to add ships, checking for valid placement for each added ship
function addShip(ship, shipLength) {
  for (var x = 0; x < ship; x++) { // iterate over the quantity of each ship
    var validPlacement = false;

    // Cycle through the while loop until a valid placement is found
    while (!validPlacement) {
      var orientation = Math.round(Math.random()); //0 = horizontal, 1 = vertical

      // Generate a random starting position for the current ship, takes the ship's length into account to eliminate invalid starting points
      if (orientation === 0) { // horizontal placement
        var rowStart = Math.floor(Math.random()*(rows));
        var columnStart = Math.floor(Math.random()*(columns - shipLength));
      } else { // vertical placement
        var rowStart = Math.floor(Math.random()*(rows - shipLength));
        var columnStart = Math.floor(Math.random()*(columns));
      }

      // Calculate the ending position for the ship
      var rowEnd = rowStart + shipLength;
      var columnEnd = columnStart + shipLength;

      // The below if statements check the immediately surrounding rows and columns. If the starting or ending positions are at the board's edge, the surrounding values are set to equal the current values, as there is no chance of having "touching" ships
      if (rowStart === fillCharacter) {
        var rowBack = rowStart;
      } else {
        var rowBack = rowStart - 1;
      }

      if (rowStart === (rows - 1)) {
        var rowForward = rowStart;
      } else {
        var rowForward = rowStart + 1;
      }

      if (columnStart === fillCharacter) {
        var columnBack = columnStart;
      } else {
        var columnBack = columnStart - 1;
      }

      if (columnStart === (columns - 1)) {
        columnForward = columnStart;
      } else {
        var columnForward = columnStart + 1;
      }

      //The functions below ensure there are no ships currently in the proposed path AND that they are at least one space away from touching another ship. If the placement fails either condition, the functions will return false and the while loop will run again with new orientation and placement. If true, the functions will place the ships on the board.
      if (orientation === 0) {
        validPlacement = placeHorizontal(shipLength, rowStart, columnStart, rowBack, columnBack, rowForward, columnEnd);
      } else {
        validPlacement = placeVertical(shipLength, rowStart, columnStart, rowBack, columnBack, columnForward, rowEnd);
      }
    }
  }
}

// Board is initially populated with 0's, placeHorizontal and placeVertical check for 0's only. Finding a non-zero value will cause the function to return false and a new placement will be generated within the addShip function's while loop
function placeHorizontal(shipLength, rowStart, columnStart, rowBack, columnBack, rowForward, columnEnd) {
  for (var j = columnStart; j < columnEnd; j++) {
    if (board[rowStart][j] != fillCharacter ||
        board[rowStart][columnBack] != fillCharacter  ||
        board[rowStart][columnEnd] != fillCharacter ||
        board[rowBack][j] != fillCharacter ||
        board[rowForward][j] != fillCharacter) {
          console.log("placeHorizontal returned false");
          return false; //current spot is occupied
    }
  }

  for (var j = columnStart; j < (columnStart + shipLength); j++) {
    board[rowStart][j] = shipLength.toString(); // add the ship's length value to each spot it takes up, makes ship recognition/debugging easier. toString assists in displaying moves to player command terminal in the view
  }
  console.log("placeHorizontal returned true");
  return true;
}

function placeVertical(shipLength, rowStart, columnStart, rowBack, columnBack, columnForward, rowEnd) {
  for (var i = rowStart; i < rowEnd; i++) {
    if (board[i][columnStart] != fillCharacter  ||
        board[rowBack][columnStart] != fillCharacter ||
        board[rowEnd][columnStart] != fillCharacter ||
        board[i][columnBack] != fillCharacter ||
        board[i][columnForward] != fillCharacter) {
          console.log("placeVertical returned false");
          return false; //current spot is occupied
    }
  }

  for (var i = rowStart; i < (rowStart + shipLength); i++) {
    board[i][columnStart] = shipLength.toString(); // add the ship's length value to each spot it takes up, makes ship recognition/debugging easier. toString assists in displaying moves to player console/terminal in view
  }
  console.log("placeVertical returned true");
  return true;
}
