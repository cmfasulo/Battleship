$(document).ready(function() {
  shipLocations();

  //creates a table
  var tableString = makeTable();
  $("table").append(tableString);

  //add torpedos to "torpedoShelf"
  torpedoShelf();

  //assigns actions to player's click
  $("td").on("click", function() {

    if (torpedoCount > 0) {
      playerClick(); //runs playerClick function from Model
      $(this).addClass("miss");
      $("#numTorpedos").text(torpedoCount);
      torpedoShelf();
      $(this).off();
    } else {
      $("#numTorpedos").append(" - SORRY, YOU HAVE LOSSED THIS BATTLE.");
      $("td").off();
    }

  });

  //resets the game
  $("#reset").on("click", function() {
    $("table").empty();
    shipLocations();

    //creates a table
    var tableString = makeTable();
    $("table").append(tableString);

    torpedoCount = 25;
    torpedoShelf();
    $("td").on("click", function() {

      if (torpedoCount > 0) {
        playerClick(); //runs playerClick function from Model
        $(this).addClass("miss"); //adds CSS class 'torpedo'
        $("#numTorpedos").text(torpedoCount); //gives user feedback on torpedo usage
        $("torpedoShelf").remove("<img src='img/torpedo.png' class='torpedoImg'>");
        torpedoShelf();
        $(this).off(); //turns off click functionality once a user has clicked on a box
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
  for (var i = 0; i < 10; i++) {
    tableString += "<tr id='" + i + "'>" //creates opening tag and id for current row
    for (var j = 0; j < 10; j++) {
      tableString += "<td id='" + i + j + "'><div class='content'></div></td>" //adds the current column to the string for the current row; moves onto the next column in the inner "for" loop
    }
    tableString += "</tr>"; //adds a closing tag for the current row; moves onto the next row in the outer "for" loop
  }
  return tableString;
}

function torpedoShelf() {
  $("#torpedoShelf").empty();
  for (var i = 0; i < torpedoCount; i++) {
    $("#torpedoShelf").append("<img src='img/torpedo.png' class='torpedoImg'>");
  }
}

function checkTable(board) {
  //loop through columns (or w/e)
  //loop through rows (or w/e)
  //if (board[row][column] === ship) {
  //$(this).addClass("something-is-here")
  //}
}
