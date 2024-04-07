import stickers from "./stickers.js";
import displayStickers from "./displayStickers.js";

document.addEventListener('DOMContentLoaded', function() {
  displayStickers(stickers);
});

 // Filter stickers based on search input
 document.getElementById('searchBar').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredStickers = stickers.filter(sticker => {
    return sticker.tags.some(tag => tag.toLowerCase().includes(searchTerm));
  });
  displayStickers(filteredStickers);
});
  