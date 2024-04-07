export default function displayStickers(stickers) {
    stickerGrid.innerHTML = '';
    stickers.forEach(sticker => {
      //main div
      const stickerDiv = document.createElement('div');
      stickerDiv.classList.add('sticker');

      //images
      const img = document.createElement('img');
      img.src = `images/${sticker.image}`; 
      img.alt = `${sticker.image}`;
      stickerDiv.appendChild(img);

      //sticker name
      const name = document.createElement('div');
      name.classList.add('sticker-name');
      name.textContent = `${sticker.name}`
      stickerDiv.appendChild(name);

      //sticker price
      const price = document.createElement('div');
      price.classList.add('sticker-price');
      price.textContent = `${sticker.price}`
      stickerDiv.appendChild(price);
      
      stickerDiv.addEventListener('click', function() {
        navigateToStickerPage(sticker.id);
      });
      stickerGrid.appendChild(stickerDiv);
    });
  }
  
  function navigateToStickerPage(stickerId) {
    window.location.href = `sticker-details.html?id=${stickerId}`;
  }
