// const apiUrl = "http://ashwink.com.np";
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    token = btoa(username + ":" + password);
    try {
      const response = await fetch("https://shop.ashwink.com.np/api/login", {
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }

      console.log(await response.body);
      window.location.href = "/index.html"; // Redirect to dashboard on successful login
      return;
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
});
