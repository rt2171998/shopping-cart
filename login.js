const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");

let curUser;

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value == `` || password.value == ``) {
    alert("All Feilds are mandotary!!");
  } else {
    const z = JSON.parse(localStorage.getItem("userData"));
    console.log(z);
    let localData = z;
    if (!z) return;
    if (
      localData.find((itm) => itm.email == email.value) &&
      localData.find((itm) => itm.password == password.value)
    ) {
      curUser = localData.find(
        (itm) => itm.email == email.value && itm.password == password.value
      );
      localStorage.setItem("presentUser", JSON.stringify(curUser));
      const link = document.createElement("a");
      link.href = "./shop/index.html";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      alert("You are not a registered user! please do, Signup first!!");
    }
  }
});
