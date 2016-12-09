$(document).ready(function() {
  initialize();
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
      $("#consoleText").append("SORRY, YOU HAVE LOST THIS BATTLE");
      $("td").off();
    }

  });

  $("#consoleInput").keypress(function (e) {
    if (e.which == 13) {
      if (torpedoCount > 0) {
        checkHit(board, $(this).val());
        $("#numTorpedos").text(torpedoCount);
        torpedoShelf();
        $("#" + $(this).val()).off();
      } else {
        $("#consoleText").append("SORRY, YOU HAVE LOST THIS BATTLE");
        $("td").off();
      }

      $(this).val('');
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
        $("#consoleText").append("SORRY, YOU HAVE LOST THIS BATTLE");
        $("td").off();
      }

    });

    $("#numTorpedos").text(torpedoCount);

  });

});

function initialize() {
  $("#str1").toggle();
  $("#str2").toggle();
  $("#str3").toggle();
  $("#str4").toggle();
  $("#str5").toggle();
  $("#str6").toggle();
  $("#str7").toggle();

  $("#str1").delay(1000).fadeToggle(1);
  $("#str2").delay(2000).fadeToggle(1);
  $("#str3").delay(3000).fadeToggle(1);
  $("#str4").delay(4000).fadeToggle(1);
  $("#str5").delay(5000).fadeToggle(1);
  $("#str6").delay(6000).fadeToggle(1);
  $("#str7").delay(7000).fadeToggle(1);
}

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
    $("#consoleText").append("Sector: " + id + " = MISS<br>");
  } else {
    $("#" + id).addClass("hit");
    $("#consoleText").append("Sector: " + id + " = HIT<br>");
  }
}
