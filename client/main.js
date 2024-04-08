import displayStickers from "./displayStickers.js";
import { ApiRoutes } from "./ApiRoutes.js";

let stickers = []

document.addEventListener('DOMContentLoaded', async function() {
  const res = await fetch(`${ApiRoutes.Stickers}`);
  stickers = await res.json();
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
  