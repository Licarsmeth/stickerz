import { ApiRoutes } from "./ApiRoutes.js";

// import { ApiRoutes } from "./ApiRoutes";
document.addEventListener("DOMContentLoaded", async () => {
  const fetchUsers = async () => {
    try {
      const response = await fetch(ApiRoutes.GetAllUsers, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        // },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      populateUserTable(data);
      updateUserStats(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to load user data");
    }
  };

  const populateUserTable = (users) => {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.Id}</td>
        <td>${user.Username}</td>
        <td class="account-type ${user.Mode.toLowerCase()}">
          ${user.Mode.charAt(0).toUpperCase() + user.Mode.slice(1)}
        </td>
        <td>
          <button class="view-btn" data-userid="${user.Id}">View</button>
        </td>
      `;

      tbody.appendChild(row);
    });

    tbody.addEventListener("click", async (event) => {
      if (event.target.classList.contains("view-btn")) {
        const userId = event.target.dataset.userid;

        try {
          const response = await fetch(`/api/profile/get?user_id=${userId}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Redirect to profile page with user ID
          window.location.href = `profile.html`;
        } catch (error) {
          console.error("Profile fetch error:", error);
          alert("Failed to load user profile");
        }
      }
    });
  };

  const updateUserStats = (users) => {
    document.getElementById("totalUsers").textContent = users.length;
    document.getElementById("adminUsers").textContent = users.filter(
      (u) => u.Mode === "admin"
    ).length;
    document.getElementById("normalUsers").textContent = users.filter(
      (u) => u.Mode != "admin"
    ).length;
  };

  document
    .getElementById("refreshUsersBtn")
    .addEventListener("click", fetchUsers);

  // Initial load
  fetchUsers();
});
