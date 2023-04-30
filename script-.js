$(function () {
  const today = dayjs();
  const saveButtons = $("button");
  setItems();

  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", eventHandler);
  }

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

  function getData() {
    const textAreas = $("textarea");
    for (let i = 0; i < textAreas.length; i++) {
      const parentID = textAreas[i].parentElement.id;
      const textAreaData = JSON.parse(localStorage.getItem(parentID));
      if (textAreaData) {
        textAreas[i].value = textAreaData.textAreaKey;
      };
    };
  }

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

  function setCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  setInterval(setItems, 60000);

  function setItems() {
    setColors();
    setCurrentDate();
    getData();
  }
});
