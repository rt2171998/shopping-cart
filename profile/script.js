"use strict";

let allAcc = JSON.parse(localStorage.getItem("userData"));
let curAcc = JSON.parse(localStorage.getItem("presentUser"));

const fName = document.getElementById("first-name-input");
const lName = document.getElementById("last-name-input");
const saveBtn = document.getElementById("save-info-btn");

const pass = document.getElementById("old-password");
const newPass = document.getElementById("new-password-input");
const newPass2 = document.getElementById("new-password-input2");
const passBtn = document.getElementById("change-btn");

const logoutBtn = document.getElementById("Logout-btn");

fName.value = curAcc.firstName;
lName.value = curAcc.lastName;
pass.value = curAcc.password;

// // function reName(Name) {}

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let localStorageCurUser = curAcc;

  let position = allAcc.findIndex((item) => {
    return (
      item.firstName === localStorageCurUser.firstName &&
      item.lastName === localStorageCurUser.lastName
    );
  });

  localStorageCurUser.firstName = fName.value;
  localStorageCurUser.lastName = lName.value;
  allAcc.splice(position, 0, localStorageCurUser);
  allAcc.splice(position + 1, 1);
  localStorage.setItem("userData", JSON.stringify(allAcc));
});

passBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let localStorageCurUser = curAcc;

  let position = allAcc.findIndex((item) => {
    return (
      item.firstName === localStorageCurUser.firstName &&
      item.lastName === localStorageCurUser.lastName
    );
  });

  if (
    newPass.value === "" ||
    newPass2.value === "" ||
    newPass.value !== newPass2.value
  ) {
    alert(`Passwords Need To Match`);
    return;
  } else {
    localStorageCurUser.password = newPass.value;
    allAcc.splice(position, 0, localStorageCurUser);
    allAcc.splice(position + 1, 1);
    localStorage.setItem("userData", JSON.stringify(allAcc));
  }
});

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.setItem("presentUser", undefined);
  window.location.assign("../login.html");
});
