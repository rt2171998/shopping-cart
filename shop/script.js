"use strict";
const allFilter = document.querySelector(".allProd");
const menFilter = document.querySelector(".filter-men");
const womenFilter = document.querySelector(".filter-women");
const filters = document.querySelectorAll(".filter");
const searchBar = document.querySelector(".searchBar");
const colorToggle = document.querySelector(".forToggles");
const sizeToggle = document.querySelector(".sizeToggle");
const priceToggle = document.querySelector(".moneyToggle");
const rangeInput = document.getElementById("range");
document.querySelector(".info").innerHTML = "";

let productsArr;
let productsArrComplete;
let cartArr = [];
let cartArrLocal = [];

function randomColor() {
  let arr = ["red", "blue", "black", "white", "green"];
  let i = Math.floor(Math.random() * 5);
  return arr[i];
}

function randomSize() {
  let arr = ["S", "M", "L", "XL"];
  let i = Math.floor(Math.random() * 4);
  return arr[i];
}

function fillShopList(data) {
  return data.map((item) => {
    item.color = [randomColor(), randomColor(), randomColor()];
    item.size = randomSize();
    return item;
  });
}

const menSection = document.querySelector(".Men");
const womenSection = document.querySelector(".Women");

function createShopItems(data) {
  menSection.innerHTML = "";
  womenSection.innerHTML = "";
  data.forEach((item) => {
    if (item.title.includes("Men")) {
      let html = `<div class="item">
                  <img src=${item.image} alt="Item" />
                  <div class="info">
                  <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">${item.size}</div>
                  </div>
                  <div class="colors">
                    Colors:
                    <div class="row">
                      <div class="circle" style="background-color: ${item.color[0]}"></div>
                      <div class="circle" style="background-color: ${item.color[1]}"></div>
                      <div class="circle" style="background-color: ${item.color[2]}"></div>
                    </div>
                  </div>
                  <div class="row">Rating: ${item.rating.rate}</div>
                  </div>
                    <button class="addBtn">Add to Cart</button>
                  </div>`;

      menSection.insertAdjacentHTML("afterbegin", html);
    } else if (
      item.title.includes("Women") &&
      !item.title.includes("Bracelet")
    ) {
      let html = `<div class="item">
                  <img src=${item.image} alt="Item" />
                  <div class="info">
                  <div class="row">
                    <div class="price">$${item.price}</div>
                    <div class="sized">${item.size}</div>
                  </div>
                  <div class="colors">
                    Colors:
                    <div class="row">
                      <div class="circle" style="background-color: ${item.color[0]}"></div>
                      <div class="circle" style="background-color: ${item.color[1]}"></div>
                      <div class="circle" style="background-color: ${item.color[2]}"></div>
                    </div>
                  </div>
                  <div class="row">Rating: ${item.rating.rate}</div>
                  </div>
                    <button class="addBtn">Add to Cart</button>
                  </div>`;

      womenSection.insertAdjacentHTML("afterbegin", html);
    }
  });
}

function cartAdd(data) {
  let price = parseInt(
    data.querySelector(".price").textContent.replace("$", "")
  );
  let cartTotal = cartArr.reduce((acc, item) => {
    return acc + parseInt(item.innerText.split("\n")[0].replace("$", ""));
  }, 0);
  let html = `<div class="row">
  <div class="title">Shirt<span
  ><i
    class="fa fa-minus-circle cancel"
    style="font-size: 18px; color: red; margin-left: 5px"
  ></i
></span></div>
  <div class="price">${price} Rs</div>
  </div>`;
  document.querySelector(".info").insertAdjacentHTML("afterbegin", html);
  document.querySelector(".final-total").textContent = cartTotal;
  console.log(cartArr[0].innerText.split("\n")[0]);
  console.log(cartArr);
  let curtotal = {
    price: cartTotal,
  };
  localStorage.setItem("cartData", JSON.stringify(curtotal));

  document.querySelector(".cancel").addEventListener("click", () => {
    document.querySelector(".cancel").closest(".row").innerHTML = "";
  });
}

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok)
      throw new Error(
        `Problem Getting the Desired Response, ${response.status} Error`
      );
    return response.json();
  })
  .then((data) => {
    productsArr = [...data];
    productsArrComplete = fillShopList(productsArr);

    createShopItems(productsArrComplete);

    allFilter.addEventListener("click", () => {
      filters.forEach((itm) => {
        itm.classList.remove("active");
      });
      createShopItems(productsArrComplete);
      if (!allFilter.classList.contains("active")) {
        allFilter.classList.add("active");
      } else return;
    });

    menFilter.addEventListener("click", () => {
      filters.forEach((itm) => {
        itm.classList.remove("active");
      });
      menFilter.classList.add("active");
      let showMens = data.filter((item) => item.title.includes("Men"));
      createShopItems(showMens);
    });

    womenFilter.addEventListener("click", () => {
      filters.forEach((itm) => {
        itm.classList.remove("active");
      });
      womenFilter.classList.add("active");
      let showWomens = data.filter((item) => item.title.includes("Women"));
      createShopItems(showWomens);
    });

    searchBar.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;

      let forMen = [
        "men",
        "man",
        "men clothes",
        "men cloth",
        "man clothes",
        "man cloth",
        "mans",
        "mens",
      ];
      let forWomen = [
        "women",
        "woman",
        "women clothes",
        "women cloth",
        "woman clothes",
        "woman cloth",
        "womans",
        "womens",
      ];

      let search = this.value.toLowerCase();

      if (forMen.includes(search)) {
        let showMens = data.filter((item) => item.title.includes("Men"));
        createShopItems(showMens);
      } else if (forWomen.includes(search)) {
        let showWomens = data.filter((item) => item.title.includes("Women"));
        createShopItems(showWomens);
      }
    });

    colorToggle.addEventListener("click", (e) => {
      if (!e.target.closest("li")) return;
      const checkboxElement = e.target
        .closest("li")
        .querySelector("input[type='checkbox']");
      const colorInp = checkboxElement.id;

      if (!checkboxElement.checked) {
        createShopItems(productsArrComplete);
      } else if (colorInp === "red") {
        const redArr = productsArrComplete.filter((itm) =>
          itm.color.includes("red")
        );
        createShopItems(redArr);
      } else if (colorInp === "blue") {
        const blueArr = productsArrComplete.filter((itm) =>
          itm.color.includes("blue")
        );
        createShopItems(blueArr);
      } else if (colorInp === "green") {
        const greenArr = productsArrComplete.filter((itm) =>
          itm.color.includes("green")
        );
        createShopItems(greenArr);
      } else if (colorInp === "black") {
        const blackArr = productsArrComplete.filter((itm) =>
          itm.color.includes("black")
        );
        createShopItems(blackArr);
      } else if (colorInp === "white") {
        const whiteArr = productsArrComplete.filter((itm) =>
          itm.color.includes("white")
        );
        createShopItems(whiteArr);
      }
    });

    sizeToggle.addEventListener("click", (e) => {
      if (!e.target.closest("li")) return;
      const checkboxElement = e.target
        .closest("li")
        .querySelector("input[type='checkbox']");
      const sizeInp = checkboxElement.id;
      console.log(sizeInp);

      if (!checkboxElement.checked) {
        createShopItems(productsArrComplete);
      } else if (sizeInp === "s") {
        const sArr = productsArrComplete.filter((itm) => {
          return itm.size === "S";
        });
        createShopItems(sArr);
      } else if (sizeInp === "m") {
        const mArr = productsArrComplete.filter((itm) => {
          return itm.size === "M";
        });
        createShopItems(mArr);
      } else if (sizeInp === "l") {
        const lArr = productsArrComplete.filter((itm) => {
          return itm.size === "L";
        });
        createShopItems(lArr);
      } else if (sizeInp === "xl") {
        const xlArr = productsArrComplete.filter((itm) => {
          return itm.size === "XL";
        });
        createShopItems(xlArr);
      }
    });

    rangeInput.addEventListener("change", (event) => {
      const rangeValue = parseInt(event.target.value);
      if (rangeValue === 0) {
        let zeroArr = productsArrComplete.filter(
          (itm) => Math.floor(itm.rating.rate) === rangeValue
        );
        createShopItems(zeroArr);
      } else if (rangeValue === 1) {
        let oneArr = productsArrComplete.filter(
          (itm) => Math.floor(itm.rating.rate) === rangeValue
        );
        createShopItems(oneArr);
      } else if (rangeValue === 2) {
        let twoArr = productsArrComplete.filter(
          (itm) => Math.floor(itm.rating.rate) === rangeValue
        );
        createShopItems(twoArr);
      } else if (rangeValue === 3) {
        let threeArr = productsArrComplete.filter(
          (itm) => Math.floor(itm.rating.rate) === rangeValue
        );
        createShopItems(threeArr);
      } else if (rangeValue === 4) {
        let fourArr = productsArrComplete.filter(
          (itm) => Math.floor(itm.rating.rate) === rangeValue
        );
        createShopItems(fourArr);
      } else if (rangeValue === 5) {
        let fiveArr = productsArrComplete.filter(
          (itm) => Math.floor(itm.rating.rate) === rangeValue
        );
        createShopItems(fiveArr);
      }
    });

    priceToggle.addEventListener("click", (e) => {
      if (!e.target.closest("li")) return;
      const checkboxElement = e.target
        .closest("li")
        .querySelector("input[type='checkbox']");
      const priceInp = checkboxElement.id;

      if (!checkboxElement.checked) {
        createShopItems(productsArrComplete);
      } else if (priceInp === "0-25") {
        const cheapArr = productsArrComplete.filter((itm) => {
          return itm.price >= 0 && itm.price <= 25;
        });
        createShopItems(cheapArr);
      } else if (priceInp === "25-50") {
        const semicheapArr = productsArrComplete.filter((itm) => {
          return itm.price >= 25 && itm.price <= 50;
        });
        createShopItems(semicheapArr);
      } else if (priceInp === "50-100") {
        const moderateArr = productsArrComplete.filter((itm) => {
          return itm.price >= 50 && itm.price <= 100;
        });
        createShopItems(moderateArr);
      } else if (priceInp === "100on") {
        const richArr = productsArrComplete.filter((itm) => {
          return itm.price >= 100;
        });
        createShopItems(richArr);
      }
    });

    const cartBtn = document.querySelectorAll(".addBtn");
    const cartDisplay = document.querySelector(".cart-container");
    cartBtn.forEach((itm) => {
      itm.addEventListener("click", (e) => {
        cartDisplay.style.display = "block";
        e.stopPropagation();
        let cartwork = e.target.closest(".item");
        cartArr.push(cartwork);
        cartAdd(cartwork);
      });
    });

    document.addEventListener("click", (e) => {
      const isClickedInsideCart = cartDisplay.contains(e.target);
      if (!isClickedInsideCart) {
        cartDisplay.style.display = "none";
      }
    });

    document.querySelector("#checkout-btn").addEventListener("click", () => {
      alert("The items were purchased");
      window.location.href = "../razorpay/index.html";
    });
  })
  .catch((err) => {
    console.error(err);
  });
