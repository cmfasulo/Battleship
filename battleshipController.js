$(document).ready(function() {
  shipLocations();

//creates a table
  var tableString = makeTable();
  $("table").append(tableString);

//assigns actions to player's click
  $("td").on("click", function() {
    $(this).addClass("torpedo"); //adds CSS class 'torpedo'
    playerClick(); //runs playerClick function from Model
    $("#feedback").text("You have used " + counter + " torpedo(s)!"); //gives user feedback on torpedo usage
    $(this).off(); //turns off click functionality once a user has clicked on a box
  });

});

//Creates a function that generates a really long string with entire table HTML
function makeTable() {
  var tableString = ""; //create blank string to be populated with all HTML elements
  for (var i = 0; i < 10; i++) { //loops through 10 times to generate table rows
    tableString += "<tr id='" + i + "'>" //creates opening tag and id for current row
    for (var j = 0; j < 10; j++) { //loops through 10 columns (<td>'s) for the current row
      tableString += "<td id='" + i + j + "'></td>" //adds the current column to the string for the current row; moves onto the next column in the inner "for" loop
    }
    tableString += "</tr>"; //adds a closing tag for the current row; moves onto the next row in the outer "for" loop
  }
  return tableString;
}

function checkTable(board) {
  //loop through columns (or w/e)
  //loop through rows (or w/e)
  //if (board[row][column] === ship) {
  //$(this).addClass("something-is-here")
  }
}
