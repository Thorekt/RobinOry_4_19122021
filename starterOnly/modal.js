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


let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let confirmation = urlParams.get('confirmation');
console.log(queryString);
console.log(urlParams);
console.log(confirmation);
if (confirmation=1){
  displayFormConfirmation();
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

function displayErrorMessage(name) {
  let idMessage = name + "Message";
  element = document.getElementById(idMessage);
  if (element.hasAttribute("hidden")) {
    element.hidden = false;
  }
}

function hideErrorMessage(name) {
  let idMessage = name + "Message";
  element = document.getElementById(idMessage);
  if (!element.hasAttribute("hidden")) {
    element.hidden = true;
  }
}

function displayFormConfirmation(){
  let element = document.getElementById("confirmation");
  element.hidden = false;
  setTimeout(element.hidden = true, 3000);
}

function stringIsValidBirthDate(date) {
  let today = new Date();
  if (today < Date.parse(date)) {
    return false;
  }
  return true;
}

function stringIsMail(string) {
  return string
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function isOneLocationChecked(locationCheckboxs) {
  let isOneChecked = false;
  locationCheckboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      isOneChecked = true;
    }
  });
  return isOneChecked;
}
