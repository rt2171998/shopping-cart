"use strict";

const firstName = document.getElementById("first-name-input");
const lastName = document.getElementById("last-name-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const password2 = document.getElementById("password-input2");

const signupBtn = document.getElementById("signup-btn");
function generateToken() {
  let line = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let res = "";

  for (let i = 1; i <= 16; i++) {
    res += Math.floor(Math.random() * 10);
    res += line.charAt(i);
  }
  return res;
}
let parsedData = JSON.parse(localStorage.getItem("userData")) || [];
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    firstName.value == `` ||
    lastName.value == `` ||
    email.value == `` ||
    password.value == `` ||
    password2.value == ``
  ) {
    alert("All fields are mandotary!!");
  } else if (password.value.length < 3) {
    alert("password should contain at least 3 character");
  } else if (password.value != password2.value) {
    alert("password and confirm password are not same!!");
  } else {
    var newData = {
      // Add your user data properties here
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      token: generateToken(),
    };

    let duplicateUser = parsedData.some((item) => item.email === newData.email);

    if (duplicateUser) {
      alert("You are already a registered user, please do login!!");
      // return;
    } else {
      parsedData.push(newData);
      localStorage.setItem("userData", JSON.stringify(parsedData));
      localStorage.setItem("presentUser", JSON.stringify(newData));
      window.location.assign("./profile/profile.html");
    }
  }
});
