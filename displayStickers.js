export default function displayStickers(stickers) {
    stickerGrid.innerHTML = '';
    stickers.forEach(sticker => {
      const stickerDiv = document.createElement('div');
      stickerDiv.classList.add('sticker');
      const img = document.createElement('img');
      img.src = `images/${sticker.image}`; 
      img.alt = `${sticker.image}`;
      stickerDiv.appendChild(img);
      stickerDiv.addEventListener('click', function() {
        navigateToStickerPage(sticker.id);
      });
      stickerGrid.appendChild(stickerDiv);
    });
  }
  
  function navigateToStickerPage(stickerId) {
    window.location.href = `sticker-details.html?id=${stickerId}`;
  }
