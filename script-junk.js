let textfields = document.querySelectorAll("textarea");
console.log(textfields);

  //I don't know where or how to add this but:
for(let i=0; i<textfields.length; i++) {
  //this definitely doesn't work because these are inside other functions...i want to global scope. But also won't work becasue Identifier id relates to the save button clicked... 
  //but this is what I want to do essentially.
if (currentHour == identifierID) {
  textfields[i].classList.remove("past", "future");
  textfields[i].classList.add("present");
  if (currentHour > identiferID) {
    textfields[i].classList.remove("present");
    textfields[i].classList.add("past");
  } else {
    textfields[i].classList.add("future");
  }
  }
};


//all crap

    // let savedData = {
    //   textLocation : identifier,
    //   textInput : 
    // }
    

  textBox = document.getElementsByTagName("textarea");
  console.log(textBox);

  for(i=0; i<textBox.length; i++) {
    console.log(textBox.text[i]);
  }