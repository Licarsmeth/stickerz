const webUrl = "https://shop.ashwink.com.np";
export default function displayStickers(stickers) {
  stickerGrid.innerHTML = "";
  stickers.forEach((sticker) => {
    //main div
    const stickerDiv = document.createElement("div");
    stickerDiv.classList.add("sticker");
    //images
    const img = document.createElement("img");
    img.src = `${webUrl}${sticker?.Images?.[0]?.Path ?? ""}`;
    img.alt = `${sticker.image}`;
    stickerDiv.appendChild(img);

    //sticker name
    const name = document.createElement("div");
    name.classList.add("sticker-name");
    name.textContent = `${sticker.Stkr.Name}`;
    stickerDiv.appendChild(name);

    //sticker price
    const price = document.createElement("div");
    price.classList.add("sticker-price");
    price.textContent = `${sticker.Stkr.Price}`;
    stickerDiv.appendChild(price);

    stickerDiv.addEventListener("click", function () {
      navigateToStickerPage(sticker.Stkr.Id);
    });
    stickerGrid.appendChild(stickerDiv);
  });
}

// redirect to the new particular page with the given id.
function navigateToStickerPage(stickerId) {
  window.location.href = `sticker-details.html?id=${stickerId}`;
}
