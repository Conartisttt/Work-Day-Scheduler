// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const today = dayjs();
  console.log(today);

  setColors();
  setCurrentDate();
  getData();

  const saveButtons = $("button"); 
  console.log(saveButtons);

  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", eventHandler);
  }

  function eventHandler(e) {
    $(this);
    console.log(this);
    const textArea = $(this).prev();
    console.log(textArea);
    const textAreaVal = textArea.val();
    console.log(textAreaVal);
    const parentElID = $(this).parent().attr('id');
    console.log(parentElID);

    const textAreaObj = {
      textAreaKey: textAreaVal
    };
    localStorage.setItem(parentElID, JSON.stringify(textAreaObj));
  }

  function getData() {
    const textAreas = $("textarea"); 
    console.log(textAreas);
    for (let i = 0; i < textAreas.length; i++) {
      console.log(textAreas[i]);
      const parentID = textAreas[i].parentElement.id;
      console.log(parentID);
      const textAreaData = JSON.parse(localStorage.getItem(parentID));
      if (textAreaData) {
        textAreas[i].value = textAreaData.textAreaKey;
      };
    };
  }


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

  function setColors() {
    const currentHour = dayjs().hour()
    console.log(currentHour);
    const hourDivs = $(".time-block");
    console.log(hourDivs);

    for (let i = 0; i < hourDivs.length; i++) {
      const hourDivsId = hourDivs[i].getAttribute('id');
      console.log(hourDivsId);
      const hourDivsHour = hourDivsId.slice(5, 7);
      console.log(hourDivsHour);
      if (currentHour == hourDivsHour) {
        hourDivs[i].classList.add("present");
        hourDivs[i].classList.remove("past", "future");
      } else if (currentHour > hourDivsHour) {
        hourDivs[i].classList.add("past");
        hourDivs[i].classList.remove("present", "future");
      } else {
        hourDivs[i].classList.add("future");
        hourDivs[i].classList.remove("present", "past");
      }

    }
  }

  function setCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    console.log(currentDate);
    $("#currentDay").text(currentDate);

  }

  setInterval(setItems, 60000);

  function setItems() {
    setColors();
    setCurrentDate();
    getData();
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
