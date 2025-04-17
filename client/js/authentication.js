// DOM Elements
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const logoutSection = document.getElementById("logout-section");
const usernameDisplay = document.getElementById("username-display");
const logoutButton = document.getElementById("logout-button");
const loginLink = document.getElementById("login-link");
const signupLink = document.getElementById("signup-link");

// Form visibility functions
function showLoginForm() {
  signupForm.style.display = "none";
  logoutSection.style.display = "none";
  loginForm.style.display = "block";
}

function showSignupForm() {
  loginForm.style.display = "none";
  logoutSection.style.display = "none";
  signupForm.style.display = "block";
}

function showLogoutSection(username) {
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  usernameDisplay.textContent = username;
  logoutSection.style.display = "block";
}

// Event listeners
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    console.log("from signup");
    const formData = new FormData(signupForm);
    const response = await fetch("/api/signup", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Signup failed");
    }

    alert("Signup successful!");
    showLoginForm();
  } catch (error) {
    console.error("Signup error:", error);
    alert(`Signup failed: ${error.message}`);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(loginForm);
    const user = formData.get("user");
    const password = formData.get("password");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${user}:${password}`)}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    showLogoutSection(user);
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
});

logoutButton.addEventListener("click", () => {
  // Clear authentication state
  document.execCommand("ClearAuthenticationCache");
  showSignupForm();
  alert("Logged out successfully!");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showLoginForm();
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSignupForm();
});

// Initialize form states
showSignupForm();
