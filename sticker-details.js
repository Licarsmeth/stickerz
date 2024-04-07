import stickers from "./stickers.js";
document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stickerId = urlParams.get("id");

  // Find the sticker with the given ID
  const sticker = stickers.find((s) => s.id === parseInt(stickerId));

  if (sticker) {
    // Display sticker details
    document.querySelector(".container h1").textContent = sticker.name;
    document.getElementById("stickerImage").src = `images/${sticker.image}`;
    document.getElementById("stickerPrice").textContent = sticker.price;
    document.getElementById("stickerDescription").textContent =
      sticker.description;
    document.getElementById(
      "stickerTags"
    ).textContent = `#tags: ${sticker.tags}`;

    // Check if user is logged in
    const isLoggedIn = true; // Replace with your authentication logic
    if (!isLoggedIn) {
      document.getElementById("loginPrompt").style.display = "flex";
      document.getElementById("loginPrompt").style.gap = "1rem";
      document.getElementById("buyButton").style.display = "none";
      document
        .getElementById("loginButton")
        .addEventListener("click", function () {
          // Redirect to login page or display login modal
          alert("Please log in to buy this sticker.");
        });
    } else {
      document.getElementById("loginPrompt").style.display = "none";
      document.getElementById("buyButton").style.display = "block";
      // Add event listener for buy button click
      document
        .getElementById("buyButton")
        .addEventListener("click", function () {
          // Implement buy functionality here
          alert("Sticker purchased!");
        });
    }
  } else {
    // Sticker not found
    alert("Sticker not found!");
  }
});
