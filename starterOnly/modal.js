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
  let checkboxs = [];
  formData.forEach(element => {
    element.querySelectorAll("input").forEach(input => {
      if (input.name != "location") {
        let isValid = isValidInput(input);
        if (!isValid) {
          isFormValid = false;
        }
      } else {
        checkboxs.push(input);
      }
    });
  });

  if (!isOneLocationChecked(checkboxs)){
    isFormValid = false;
  }

  return isFormValid;
}

function isValidInput(input) {
  if ((input.id == "first" || input.id == "last") && input.value.length < 2) {
    return false;
  }
  if (input.id == "quantity" && input.value.match(/^[0-9]+$/) == null) {
    return false;
  }

  if (input.id == "email" && (!stringIsMail(input.value) && input.value.length == 0 )){
    return false;
  }
  if (input.id == "checkbox1" && input.checked == false) {
    return false;
  }



  return true;
}

function stringIsMail(string){
  return string
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function isOneLocationChecked(checkboxs){
  let isOneChecked = false;
  checkboxs.forEach(checkbox => {
    if(checkbox.checked){
      isOneChecked = true;
    }
  });
  return isOneChecked;
}