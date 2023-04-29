// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () { //this is a call to jQuery to ensure that the code isn't run until the browser has finished rendering all elements in the html.
 
  const saveButton = document.querySelectorAll("button"); //this stores all save buttons into an element (add query selector to this)
  let today = dayjs(); //this will return todays date
  let currentHour = today.format('h'); //this will return the current hour number
  console.log(currentHour);

  eachHour = $(".time-block");
  console.log(eachHour);


  //Add event listener to each save button on page and call eventHandler
  for (let i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener("click", eventHandler);
  }

  function eventHandler(identiferID) {
    let identifier = $(this).parent().attr('id'); //this will return the id of the parent that the save button is in
    console.log(identifier);
    identiferID = identifier.slice(5, 7); // this will return the hour # based on the id that was clicked...not very helpful here but I did a thing
    console.log(identiferID);

    let textArea = $(this).prev(); //This will return the <textarea> of the save button that was clicked...but not its value.
    console.log(textArea);

  }

  console.log(saveButton);


let hour8 = $("#hour-8").children().eq(1);
console.log(hour8); //this traverses into the text area for hour 8.. experiment..idk



  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?



  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?






  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //


  // code to display the current date in the header of the page - upates every 100 miliseconds.
  //TODO: fix it not displaying right away.
  setInterval(function () {
    $('#currentDay').text("Today's Date is " + today.format('MMM D, YYYY'));
  }, 100);

});
