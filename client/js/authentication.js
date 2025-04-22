import { handleAdminNav } from "./adjustNav.js";

document.addEventListener("DOMContentLoaded", () => {
    handleAdminNav();
  });

const divs = [
  document.getElementById("login-div"),
  document.getElementById("signup-div"),
  document.getElementById("logout-div"),
];

function showForm(div) {
  divs.forEach((d) => {
    d.style.display = "none";
  });
  document.getElementById(div).style.display = "block";
}

function showLogoutSection(username) {
  showForm("logout-div");
  const uname = document.getElementById("username-display");
  uname.textContent = username;
}

function login(user, pw, xhr) {
  if (xhr === undefined) {
    xhr = new XMLHttpRequest();
  }
  xhr.open("POST", "/api/login", false, user, pw);
  xhr.send();
  if (xhr.status == 200) {
    return true;
  }
  return false;
}
// Event listeners
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(signupForm);
    const response = await fetch("/api/signup", {
      method: "POST",
      body: new URLSearchParams(formData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Signup failed");
    }

    alert("Signup successful!");
    showForm("login-div");
  } catch (error) {
    console.error("Signup error:", error);
    alert(`Signup failed: ${error.message}`);
  }
});

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const user = formData.get("user");
  const password = formData.get("password");
  var xhr = new XMLHttpRequest();
  if (login(user, password, xhr)) {
    showLogoutSection(user);
    return;
  }
  console.error("Login error:", xhr.response);
  alert("couldn't login");
});
const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", () => {
  login("deadbeef", "deadbeef");
  showForm("login-div");
});

const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showForm("login-div");
});

const signupLink = document.getElementById("signup-link");
signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  showForm("signup-div");
});

// Initialize form states
showForm("signup-div");
