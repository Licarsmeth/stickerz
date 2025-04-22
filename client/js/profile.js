import { handleAdminNav } from "./adjustNav.js";

document.addEventListener("DOMContentLoaded", () => {
  handleAdminNav();
});

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id");

let getUrl = "/api/profile/get";
if (userId) {
  getUrl = `${getUrl}?user_id=${encodeURIComponent(userId)}`;
}

fetch(getUrl)
  .then((res) => res.json())
  .then((profile) => {
    document.getElementById("profile-username").textContent = profile.Username;
    document.getElementById("profile-phone").textContent = profile.PhoneNo;
  });

let historyUrl = "/api/profile/history";
if (userId) {
  historyUrl = `${historyUrl}?user_id=${encodeURIComponent(userId)}`;
}

fetch(historyUrl)
  .then((res) => res.json())
  .then((history) => {
    const tbody = document.getElementById("history-body");
    tbody.innerHTML = "";
    if (Array.isArray(history) && history.length > 0) {
      history.forEach((tx) => {
        const tr = document.createElement("tr");
        // Date, UserId, Price, Item
        const date = new Date(tx.Date).toLocaleString();
        tr.innerHTML = `
              <td>${date}</td>
              <td>${tx.Item || ""}</td>
              <td style="color:var(--orange);font-weight:600;">${
                tx.Price ? "NPR " + tx.Price : ""
              }</td>
            `;
        tbody.appendChild(tr);
      });
    } else {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="3" style="text-align:center;color:var(--orange);">No transactions found.</td>`;
      tbody.appendChild(tr);
    }
  });
