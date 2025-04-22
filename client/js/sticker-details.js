import { ApiRoutes } from "./ApiRoutes.js";
import { handleAdminNav } from "./adjustNav.js";
const webUrl = "https://shop.ashwink.com.np";
document.addEventListener("DOMContentLoaded", async function () {
  handleAdminNav();
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
    sticker?.Images.forEach((image) => {
      var imgElement = document.createElement("img");
      imgElement.src = `${webUrl}${image?.Path}`;
      imageContainer.appendChild(imgElement);
    });
    document.getElementById("stickerPrice").textContent = sticker.Stkr.Price;
    document.getElementById("stickerDescription").textContent =
      sticker.Stkr.Description;
    document.getElementById("stickerTags").textContent = `#tags: ${
      sticker.Tags?.map((t) => t.Name).join(", ") ?? ""
    }`;

    // Check if user is logged in
    const isLoggedIn = true; // Replace with authentication logic
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
      document.getElementById("cartButton").style.display = "block";

      // Cart button handler
      document
        .getElementById("cartButton")
        .addEventListener("click", async function () {
          try {
            const params = new URLSearchParams({ sticker_id: stickerId });
            const response = await fetch(`${ApiRoutes.AddToCart}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: params.toString(),
            });

            if (!response.ok) throw new Error("Failed to add to cart");

            const result = await response.json();
            if (result.Result === "Success") {
              window.location.href = "/cart.html";
            } else {
              const errorText = await result;
              console.log(errorText);
              throw new Error(result.message || `Failed to add to cart`);
            }
          } catch (error) {
            console.error("Cart error:", error);
            alert(`Error: ${error.message}`);
          }
        });
    }
  } else {
    // Sticker not found
    alert("Sticker not found!");
  }
  // Recommendations sidebar logic
  const recommendationsList = document.getElementById("recommendationsList");
  recommendationsList.innerHTML = "";
  // Get the first tag for recommendations (if any)
  const tag = sticker.Tags?.[0]?.Name;
  if (tag) {
    const recRes = await fetch(
      `${ApiRoutes.SearchStickers}?tag=${encodeURIComponent(tag)}`
    );
    console.log(`stickers from tag are: ${recRes}`);
    if (!recRes.ok) {
      throw new Error(
        `Error while fetching stickers from tag! status: ${recRes.status}`
      );
    }
    const recData = await recRes.json();
    console.log(`stickers from tag in json: ${recData}`);
    // Filter out the current sticker from recommendations
    recData
      .filter((rec) => rec.Stkr?.StickerID !== stickerId)
      .forEach((rec) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = webUrl + (rec.Images?.[0]?.Path || "");
        img.alt = rec.Stkr?.Name || "Recommended Product";
        const span = document.createElement("span");
        span.textContent = rec.Stkr?.Name || "";
        li.appendChild(img);
        li.appendChild(span);
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
          window.location.href = `?id=${rec.Stkr.Id}`;
        });
        recommendationsList.appendChild(li);
      });
  }
});
