function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
close.forEach((span) => span.addEventListener("click", closeModal));

//call the confirmation message when "confirmation" is in GET query
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let confirmation = urlParams.get("confirmation");
if (confirmation == 1) {
  displayFormConfirmationMessage();
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// check if form is valid
function validate() {
  let isFormValid = true;
  let locationCheckboxs = [];
  formData.forEach((element) => {
    element.querySelectorAll("input").forEach((input) => {
      if (input.name != "location") {
        let isValid = isValidInput(input);
        if (!isValid) {
          isFormValid = false;
        }
      } else {
        locationCheckboxs.push(input);
      }
    });
  });

  if (!isOneLocationChecked(locationCheckboxs)) {
    isFormValid = false;
    displayErrorMessage("location");
  } else {
    hideErrorMessage("location");
  }
  return isFormValid;
}

//check for each fields in form if they meet the requirement
function isValidInput(input) {
  if (
    (input.id == "first" || input.id == "last") &&
    input.value.length < input.minLength
  ) {
    displayErrorMessage(input.id);
    return false;
  } else if (input.id == "first" || input.id == "last") {
    hideErrorMessage(input.id);
  }
  if (
    input.id == "birthdate" &&
    (!stringIsValidBirthDate(input.value) || input.value.length == 0)
  ) {
    displayErrorMessage(input.id);
    return false;
  } else if (input.id == "birthdate") {
    hideErrorMessage(input.id);
  }
  if (input.id == "quantity" && input.value.match(/^[0-9]+$/) == null) {
    displayErrorMessage(input.id);
    return false;
  } else if (input.id == "quantity") {
    hideErrorMessage(input.id);
  }
  if (
    input.id == "email" &&
    !stringIsMail(input.value) &&
    input.value.length == 0
  ) {
    displayErrorMessage(input.id);
    return false;
  } else if (input.id == "email") {
    hideErrorMessage(input.id);
  }
  if (input.id == "checkbox1" && input.checked == false) {
    displayErrorMessage(input.id);
    return false;
  } else if (input.id == "checkbox1") {
    hideErrorMessage(input.id);
  }
  return true;
}

//check if the timestamp in string is a valid date
function stringIsValidBirthDate(date) {
  let today = new Date();
  if (today < Date.parse(date)) {
    return false;
  }
  return true;
}

//take a string
//check if the string is a mail
function stringIsMail(string) {
  return string
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

//take an array with all location field in parametter
//check if atleast one location is checked
function isOneLocationChecked(locationCheckboxs) {
  let isOneChecked = false;
  locationCheckboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      isOneChecked = true;
    }
  });
  return isOneChecked;
}

//take a string who is a field name in parametter
//display the error message corresponding to the name
function displayErrorMessage(name) {
  let idMessage = name + "Message";
  element = document.getElementById(idMessage);
  if (element.hasAttribute("hidden")) {
    element.hidden = false;
  }
}

//take a string who is a field name in parametter
//hide the error message corresponding to the name
function hideErrorMessage(name) {
  let idMessage = name + "Message";
  element = document.getElementById(idMessage);
  if (!element.hasAttribute("hidden")) {
    element.hidden = true;
  }
}

//display the form confirmation message and hide it after time
function displayFormConfirmationMessage() {
  document.getElementById("confirmationMessage").hidden = false;
  setTimeout(function () {
    hideFormConfirmationMessage();
  }, 3000);
}

//hide the form confirmation message
function hideFormConfirmationMessage() {
  document.getElementById("confirmationMessage").hidden = true;
}
