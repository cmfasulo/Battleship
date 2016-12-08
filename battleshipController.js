$(document).ready(function() {
  makeTable(); //creates a table/board
  placeShips(); //places all ships on "board" in array (battleshipModel.js)
  torpedoShelf(); //add torpedos to "torpedoShelf"

  //assigns actions to player's click
  $("td").on("click", function() {

    if (torpedoCount > 0) {
      playerClick(); //runs playerClick function from Model
      checkHit(board, $(this).attr('id'));
      $("#numTorpedos").text(torpedoCount);
      torpedoShelf();
      $(this).off();
    } else {
      $("#numTorpedos").append(" - SORRY, YOU HAVE LOSSED THIS BATTLE.");
      $("td").off();
    }

  });

  $("#show").on("click", function() {
    showShips();
  });

  //resets the game
  $("#reset").on("click", function() {
    $("table").empty();
    board = createBoard(rows, columns, "O")

    makeTable();
    placeShips();

    torpedoCount = 25;
    torpedoShelf();

    $("td").on("click", function() {

      if (torpedoCount > 0) {
        playerClick(); //runs playerClick function from Model
        checkHit(board, $(this).attr('id'));
        $("#numTorpedos").text(torpedoCount);
        torpedoShelf();
        $(this).off();
      } else {
        $("#numTorpedos").append(" - SORRY, YOU HAVE LOSSED THIS BATTLE.");
        $("td").off();
      }

    });

    $("#numTorpedos").text(torpedoCount);

  });

});

//Creates a function that generates a really long string with entire table HTML
function makeTable() {
  var tableString = "";
  for (var i = 0; i < rows; i++) {
    tableString += "<tr id='" + i + "'>" //creates opening tag and id for current row
    for (var j = 0; j < columns; j++) {
      tableString += "<td id='" + i + j + "'><div class='content'></div></td>" //adds the current column to the string for the current row; moves onto the next column in the inner "for" loop
    }
    tableString += "</tr>"; //adds a closing tag for the current row; moves onto the next row in the outer "for" loop
  }
  // return tableString;
  $("table").append(tableString);
}

function showShips() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $("#" + i.toString() + j.toString()).text(board[i][j])
    }
  }
}

function torpedoShelf() {
  $("#torpedoShelf").empty();
  for (var i = 0; i < torpedoCount; i++) {
    $("#torpedoShelf").append("<img src='img/torpedo.png' class='torpedoImg'>");
  }
}

function checkHit(board, id) {
  var rowNum = parseInt(id.slice(0, 1));
  var columnNum = parseInt(id.slice(1,2));
  console.log(parseInt(board[rowNum][columnNum]));

  if (board[rowNum][columnNum] === 0) {
    $("#" + id).addClass("miss");
  } else {
    $("#" + id).addClass("hit");
  }
}
