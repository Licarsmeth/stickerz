import { ApiRoutes } from "./ApiRoutes.js";

document.addEventListener("DOMContentLoaded", async function () {
  const cartList = document.getElementById("cart-list");
  const cartTotalPrice = document.getElementById("cart-total-price");

  try {
    const response = await fetch(ApiRoutes.GetCartItems, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart items: ${response.status}`);
    }

    const cartItems = await response.json();
    cartList.innerHTML = ""; // Clear existing items

    let total = 0;
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      cartItems.forEach((item) => {
        const name = item.Stkr?.Name;
        const price = Number(item.Stkr?.Price) || 0;
        const imagePath = item.Images?.[0]?.Path;

        total += price;

        const row = document.createElement("tr");

        // Image cell
        const imgTd = document.createElement("td");
        imgTd.className = "cart-td-image";
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = name;
        imgTd.appendChild(img);

        // Name cell
        const nameTd = document.createElement("td");
        nameTd.className = "cart-td-name";
        nameTd.textContent = name;

        // Price cell
        const priceTd = document.createElement("td");
        priceTd.className = "cart-td-price";
        priceTd.textContent = `${price}`;

        row.appendChild(imgTd);
        row.appendChild(nameTd);
        row.appendChild(priceTd);

        cartList.appendChild(row);
      });
    } else {
      // No items in cart
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 3;
      td.style.textAlign = "center";
      td.textContent = "Your cart is empty.";
      row.appendChild(td);
      cartList.appendChild(row);
    }

    cartTotalPrice.textContent = `${total}`;
  } catch (error) {
    cartList.innerHTML = `<tr><td colspan="3" style="color: orange; text-align:center;">No cart items.</td></tr>`;
    cartTotalPrice.textContent = "0";
    console.error(error);
  }

  const checkoutButton = document.querySelector(".checkout");
  checkoutButton.addEventListener("click", async () => {
    try {
      const response = await fetch(ApiRoutes.CheckoutCartItems, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to complete checkout. Please try again.");
    }
  });
});
