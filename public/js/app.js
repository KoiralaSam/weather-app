console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const dynamicUrl = "http://localhost:3000/weather?address=" + search.value;

  fetch(dynamicUrl).then((response) => {
    messageOne.textContent = "Loading...";
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
