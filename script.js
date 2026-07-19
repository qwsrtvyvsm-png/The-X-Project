const year = document.querySelector("#year");
const welcomeButton = document.querySelector("#welcome-button");
const welcomeMessage = document.querySelector("#welcome-message");

year.textContent = new Date().getFullYear();

welcomeButton.addEventListener("click", () => {
  welcomeMessage.textContent = "Thanks for visiting!";
});
