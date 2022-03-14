function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalForm = document.querySelector(".modal-form");
const modalConfirm = document.querySelector(".modal-confirm");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeForm = document.querySelectorAll(".closeForm");
const closeConfirmation = document.querySelectorAll(".closeConfirmation");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeForm.forEach((span) => span.addEventListener("click", closeModal));
// close modal confirmation event
closeConfirmation.forEach((span) =>
  span.addEventListener("click", closeConfirmationModal)
);

//call the confirmation message when "confirmation" is in GET query
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let confirmation = urlParams.get("confirmation");
if (confirmation == 1) {
  launchConfirmationModal();
}

// launch modal form
function launchModal() {
  modalForm.style.display = "block";
}

// close modal form
function closeModal() {
  modalForm.style.display = "none";
}

// launch modal Confirmation
function launchConfirmationModal() {
  modalConfirm.style.display = "block";
}

// close modal Confirmation
function closeConfirmationModal() {
  modalConfirm.style.display = "none";
}

// check if form is valid
function validate() {
  let isFormValid = true;
  let locationCheckboxs = [];
  formData.forEach((element) => {
    element.querySelectorAll("input").forEach((input) => {
      if (input.name != "location") {
        //check all input, avoiding location input
        let isValid = isValidInput(input);
        if (!isValid) {
          isFormValid = false;
        }
      } else {
        locationCheckboxs.push(input);
      }
    });
  });
//check location input
  if (!isOneLocationChecked(locationCheckboxs)) {
    isFormValid = false;
    displayErrorMessage("location");
  } else {
    hideErrorMessage("location");
  }
  return isFormValid;
}

//check for each fields in form if they meet the requirement, don't check
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

//take a string who is a field id in parametter
//display the error message corresponding to the id
function displayErrorMessage(idInput) {
  let idMessage = idInput + "Message";
  element = document.getElementById(idMessage);
  if (element.hasAttribute("hidden")) {
    element.hidden = false;
  }
}

//take a string who is a field id in parametter
//hide the error message corresponding to the id
function hideErrorMessage(idInput) {
  let idMessage = idInput + "Message";
  element = document.getElementById(idMessage);
  if (!element.hasAttribute("hidden")) {
    element.hidden = true;
  }
}
