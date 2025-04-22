const webUrl = "https://shop.ashwink.com.np";
export default function displayStickers(stickers) {
  stickerGrid.innerHTML = "";
  stickers.forEach((sticker) => {
    const stickerDiv = document.createElement("div");
    stickerDiv.classList.add("sticker", "card-shadow"); // Added shadow class

    // Image container with hover effect
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("sticker-img-container");

    const img = document.createElement("img");
    img.src = `${webUrl}${sticker?.Images?.[0]?.Path ?? ""}`;
    img.alt = `${sticker.image}`;
    img.classList.add("sticker-image"); // Added class for styling
    imgContainer.appendChild(img);
    stickerDiv.appendChild(imgContainer);

    // Text container
    const textContainer = document.createElement("div");
    textContainer.classList.add("sticker-text-container");

    const name = document.createElement("div");
    name.classList.add("sticker-name", "text-truncate"); // Added truncation class
    name.textContent = sticker.Stkr.Name;
    name.title = sticker.Stkr.Name; // Tooltip for full name
    textContainer.appendChild(name);

    const price = document.createElement("div");
    price.classList.add("sticker-price", "price-tag");
    price.textContent = `${sticker.Stkr.Price}`;
    textContainer.appendChild(price);

    stickerDiv.appendChild(textContainer);

    // Hover animation
    stickerDiv.addEventListener("mouseenter", () => {
      stickerDiv.style.transform = "translateY(-5px)";
    });

    stickerDiv.addEventListener("mouseleave", () => {
      stickerDiv.style.transform = "translateY(0)";
    });

    stickerDiv.addEventListener("click", () => {
      navigateToStickerPage(sticker.Stkr.Id);
    });

    stickerGrid.appendChild(stickerDiv);
  });
}

// redirect to the new particular page with the given id.
function navigateToStickerPage(stickerId) {
  window.location.href = `sticker-details.html?id=${stickerId}`;
}
