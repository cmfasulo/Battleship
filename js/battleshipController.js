$(document).ready(function() {
  initialize(); // starts command terminal "loading" animation
  makeTable(); // creates a table/board
  placeShips(); // places all ships on "board" in array (battleshipModel.js)
  torpedoShelf(); // add torpedo images to "torpedoShelf"

  // assigns actions to player's click
  $("td").on("click", function() {

    // if there are still torpedos remaining, check for hit and update torpedo count
    if (torpedoCount > 0) {
      playerClick(); // runs playerClick function from Model
      checkHit(board, $(this).attr('id'));
      $("#numTorpedos").text(torpedoCount);
      torpedoShelf(); // remove a torpedo image from the "shelf"
      $(this).off();
    } else {
      $("#consoleText").append("SORRY, YOU HAVE LOST THIS BATTLE");
      $("td").off();
    }

  });

  // allow player to enter position coordinates in the psudo-terminal
  $("#consoleInput").keypress(function (e) {
    if (e.which == 13) {
      if ($(this).val() === "show") {
        showShips();
        $("#consoleText").append("Cheater.");
      } else if (torpedoCount > 0) {
        playerClick();
        checkHit(board, $(this).val());
        $("#numTorpedos").text(torpedoCount);
        torpedoShelf();
        $("#" + $(this).val()).off();
      } else {
        $("#consoleText").append("SORRY, YOU HAVE LOST THIS BATTLE");
        $("td").off();
      }

      $(this).val(''); // clear input field after each submit
    }
  });

  // debugging button to show all ships on the board
  $("#show").on("click", function() {
    showShips();
  });

  // resets the game
  $("#newGame").on("click", function() {
    $("table").empty();
    $("#consoleText").empty();

    initialize();
    makeTable();

    board = createBoard(rows, columns, fillCharacter);
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
        $("#consoleText").animate({ scrollTop: $("#consoleText").height() }, "slow");
        $("td").off();
      }

    });

    $("#numTorpedos").text(torpedoCount);

  });

});

// creates text animations for the command terminal window
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
    tableString += "<tr id='" + String.fromCharCode(65 + i) + "'>" //creates opening tag and id for current row
    for (var j = 0; j < columns; j++) {
      tableString += "<td class='tdStart' id='" + String.fromCharCode(65 + i) + j + "'><div class='content'></div></td>" //adds the current column to the string for the current row; moves onto the next column in the inner "for" loop
    }
    tableString += "</tr>"; //adds a closing tag for the current row; moves onto the next row in the outer "for" loop
  }
  // return tableString;
  $("table").append(tableString);
}

// debugging function to show ships on the board
function showShips() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $("#" + String.fromCharCode(65 + i) + j.toString()).text(board[i][j]);
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
  // check for valid input: 2 characeters, at least one case-insensitive letter, one number
  if (id.length != 2 || !id.match(/[a-j]/i) || !id.slice(1,2).match(/[0-9]/)) {
    $("#consoleText").append("Invalid Coordinate: '" + id + "'. Enter row (letter: A-J), followed by column (number: 0-9). i.e. 'C4'.<br><br>");
    $("#consoleText").animate({ scrollTop: $("#consoleText").height() }, "slow");
  } else {
    var rowNum = id.slice(0, 1).toUpperCase().charCodeAt(0) - 65; //convert letter to corresponding board row number
    var columnNum = parseInt(id.slice(1,2));
    var selectId = "#" + id.slice(0, 1).toUpperCase() + columnNum;
    console.log(parseInt(board[rowNum][columnNum]));

    if (board[rowNum][columnNum] === 0) { // miss
      $(selectId).addClass("miss");
      $("#consoleText").append("Sector: " + id + " = MISS<br>");
      $("#consoleText").animate({ scrollTop: $("#consoleText").height() }, "slow");
    } else {
      $(selectId).addClass("hit"); // hit
      $("#consoleText").append("Sector: " + id + " = HIT<br>");
      $("#consoleText").animate({ scrollTop: $("#consoleText").height() }, "slow");
    }
  }
}
