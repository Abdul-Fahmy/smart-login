// HTML Elements
const signUpNameInput = document.getElementById("signUpName");
const signUpEmailInput = document.getElementById("signUpEmail");
const signUpPasswordInput = document.getElementById("signUpPassword");
const logInEmailInput = document.getElementById("loginEmail");
const logInPasswordInput = document.getElementById("loginPassword");
const signUpButton = document.querySelector(".signup-btn");
const signUpError = document.getElementById("info");
const loginError = document.getElementById("error");
const logInBtn = document.querySelector(".login-btn");
const logOutBtn = document.querySelector(".logout-btn");
const headingUsername = document.getElementById("username");

// Variables
let signUpUsers = JSON.parse(localStorage.getItem("users")) || [];

let username = localStorage.getItem("username") || "";
if (headingUsername) {
  headingUsername.innerHTML = `Welcome ${username}`;
}

// Regex
let regexName = /^[A-Z][a-z]{2,}$/;
let regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let regexPassword = /^[a-zA-Z0-9]{8,}$/;

// Funcs & Events

// SignUp Funcs
function clearForm() {
  signUpNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPasswordInput.value = "";
}

function isEmpty() {
  if (
    signUpNameInput.value === "" ||
    signUpEmailInput.value === "" ||
    signUpPasswordInput.value === ""
  ) {
    signUpError.innerHTML = `<span class="text-danger m-3"> All inputs is required <span>`;
    return true;
  } else {
    return false;
  }
}

function isEmailExist() {
  for (let i = 0; i < signUpUsers.length; i++) {
    if (
      signUpUsers[i].email.toLowerCase() ===
      signUpEmailInput.value.toLowerCase()
    ) {
      signUpError.innerHTML = `<span class="text-danger m-3"> Email Already Exist <span>`;
      return true;
    }
  }
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    return true;
  } else {
    return false;
  }
}
if (signUpNameInput) {
  signUpNameInput.addEventListener("input", function () {
    if (validate(regexName, signUpNameInput) === true) {
      signUpNameInput.nextElementSibling.classList.add("d-none");

      signUpButton.disabled = false;
    } else {
      signUpNameInput.nextElementSibling.classList.remove("d-none");
      signUpButton.disabled = true;
    }
  });
}
if (signUpEmailInput) {
  signUpEmailInput.addEventListener("input", function () {
    if (validate(regexEmail, signUpEmailInput) === true) {
      signUpEmailInput.nextElementSibling.classList.add("d-none");
      signUpButton.disabled = false;
    } else {
      signUpEmailInput.nextElementSibling.classList.remove("d-none");
      signUpButton.disabled = true;
    }
  });
}
if (signUpPasswordInput) {
  signUpPasswordInput.addEventListener("input", function () {
    if (validate(regexPassword, signUpPasswordInput) === true) {
      signUpPasswordInput.nextElementSibling.classList.add("d-none");
      signUpButton.disabled = false;
    } else {
      signUpPasswordInput.nextElementSibling.classList.remove("d-none");
      signUpButton.disabled = true;
    }
  });
}

function signUp() {
  if (isEmpty() === true) {
    return true;
  }
  if (isEmailExist() === true) {
    return true;
  }
  let signUpInfo = {
    name: signUpNameInput.value,
    email: signUpEmailInput.value,
    password: signUpPasswordInput.value,
  };

  signUpUsers.push(signUpInfo);
  localStorage.setItem("users", JSON.stringify(signUpUsers));
  signUpError.innerHTML = `<span class="text-success m-3"> Success <span>`;
  clearForm();
  window.location.href = "index.html";
}
if (signUpButton) {
  signUpButton.addEventListener("click", signUp);
}

// Login Funcs
function isLoginEmpty() {
  if (logInEmailInput.value === "" || logInPasswordInput.value === "") {
    loginError.innerHTML = `<span class="text-danger m-3"> All inputs is required <span>`;
    return true;
  }
}

function logIn() {
  if (isLoginEmpty() === true) {
    return true;
  }

  let email = logInEmailInput.value;
  let password = logInPasswordInput.value;
  for (let i = 0; i < signUpUsers.length; i++) {
    if (
      signUpUsers[i].email.toLowerCase() === email.toLowerCase() &&
      signUpUsers[i].password.toLowerCase() === password.toLowerCase()
    ) {
      localStorage.setItem("username", signUpUsers[i].name);

      localStorage.setItem("userSign", "signin success");
      window.location.href = "home.html";
    } else {
      loginError.innerHTML = `<span class="text-danger m-3"> incorrect email or password <span>`;
    }
  }
}
if (logInBtn) {
  logInBtn.addEventListener("click", logIn);
}

// LogOut Funcs

function logOut() {
  localStorage.removeItem("username");
  localStorage.removeItem("userSign");
  window.location.href = "index.html";
}
if (logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
}
