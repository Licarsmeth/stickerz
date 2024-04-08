import { ApiRoutes } from "./ApiRoutes.js";
const webUrl = "http://ashwink.com.np:6969";
document.addEventListener("DOMContentLoaded", async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stickerId = urlParams.get("id");

  // Find the sticker with the given ID
  const res = await fetch(ApiRoutes.GetSticker + `?sticker_id=${stickerId}`);
  const sticker = await res.json();

  if (sticker) {
    // Display sticker details
    document.querySelector(".container h1").textContent = sticker.Stkr.Name;

    const imageContainer = document.getElementById("stickerImageContainer");
    console.log(sticker.Images);
    sticker?.Images.forEach(image => {
      var imgElement = document.createElement("img");
      imgElement.src = `${webUrl}${image?.Path}`;
      imageContainer.appendChild(imgElement);
    })
    document.getElementById("stickerPrice").textContent = sticker.Stkr.Price;
    document.getElementById("stickerDescription").textContent =
      sticker.Stkr.Description;
    document.getElementById("stickerTags").textContent = `#tags: ${
      sticker.Tags?.map((t) => t.Name).join(", ") ?? ""
    }`;

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
          alert(`Message 986847584 typing ` + stickerId);
        });
    }
  } else {
    // Sticker not found
    alert("Sticker not found!");
  }
});
