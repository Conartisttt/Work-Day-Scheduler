//Dynmaically create HTML
for (i = 8; i < 19; i++) {
  const divContainer = document.getElementById("divcontainer")
  console.log(divContainer);
  const divBlock = document.createElement("div");
  divBlock.setAttribute("id", "hour-" + i);
  divBlock.classList.add("row", "time-block", "past");
  divContainer.appendChild(divBlock);
  const divHour = document.createElement("div");
  divHour.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
  let time = i;
  let ampm = "AM";
  if (time > 12) {
    time = time - 12;
    ampm = "PM";
  } if (time == 12) {
    ampm = "PM";
  }
  divHour.innerHTML = time + ampm;
  divBlock.appendChild(divHour);
  const tArea = document.createElement("textarea");
  tArea.classList.add("col-8", "col-md-10", "description");
  tArea.setAttribute("rows", "3");
  divBlock.appendChild(tArea);
  const saveButton = document.createElement("button");
  saveButton.classList.add("btn", "saveBtn", "col-2", "col-md-1");
  saveButton.setAttribute("aria-label", "save");
  divBlock.appendChild(saveButton);
  const iArea = document.createElement("i");
  iArea.classList.add("fas", "fa-save");
  iArea.setAttribute("aria-hidden", "true");
  saveButton.appendChild(iArea);
}

$(function () {
  const today = dayjs();
  const saveButtons = $("button");
  setItems();

  //add event listener to all buttons
  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", eventHandler);
  }

  //target which button was clicked and save content to local storage
  function eventHandler(e) {
    $(this);
    const textArea = $(this).prev();
    const textAreaVal = textArea.val();
    const parentElID = $(this).parent().attr('id');

    const textAreaObj = {
      textAreaKey: textAreaVal
    };

    localStorage.setItem(parentElID, JSON.stringify(textAreaObj));
  }

  //retrieve data from local storage and set to values to text areas
  function getData() {
    const cDiv = $(".time-block");
    const ctArea = cDiv.find("textarea");

    for(let i=0; i<ctArea.length; i++){
      const cDivId = cDiv[i].id;
      console.log(cDivId);
      ctAreaValue = JSON.parse(localStorage.getItem(cDivId));
      console.log(ctAreaValue);


      if(ctAreaValue){
        ctArea[i].value = ctAreaValue.textAreaKey;
      };
    };
  }

  //set colors of divs based on current hour
  function setColors() {
    const currentHour = dayjs().hour();
    const hourDivs = $(".time-block");

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
      };
    };
  }

  //set current date at top of screen
  function setCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text("Today's date is " + currentDate);
  }

  //call setItems function every minute to update colors of divs, current date at top of screen, and data in local storage
  setInterval(setItems, 60000);

  function setItems() {
    setColors();
    setCurrentDate();
    getData();
  }
});
