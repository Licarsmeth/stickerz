const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const logoutSection = document.getElementById("logout-section");
const usernameDisplay = document.getElementById("username-display");

const signupUser = document.getElementById("signup-user");
const signupPassword = document.getElementById("signup-password");
const signupPhone = document.getElementById("signup-phone");
const signupButton = document.getElementById("signup-button");

const loginUser = document.getElementById("login-user");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");

const logoutButton = document.getElementById("logout-button");

const loginLink = document.getElementById("login-link");
const signupLink = document.getElementById("signup-link");

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

// Event listeners for switching between forms
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showLoginForm();
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSignupForm();
});

// Function to encode credentials for Basic Auth
function base64Encode(username, password) {
  const credentials = `${username}:${password}`;
  const encodedCredentials = btoa(credentials);
  return encodedCredentials;
}

// Sign-up event
signupButton.addEventListener("click", async () => {
  const user = signupUser.value;
  const password = signupPassword.value;
  const phone_no = signupPhone.value;

  const formData = new FormData();
  formData.append("user", user);
  formData.append("password", password);
  formData.append("phone_no", phone_no);

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      alert("Sign up successful!");
      showLoginForm(); // Redirect to login after successful signup
    } else {
      const errorData = await response.json();
      alert(`Sign up failed: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Sign up error:", error);
    alert("An error occurred during sign up.");
  }
});

// Login event
loginButton.addEventListener("click", async () => {
  const user = loginUser.value;
  const password = loginPassword.value;

  const encodedCredentials = base64Encode(user, password);

  try {
    const response = await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    if (response.ok) {
      alert("Login successful!");
      showLogoutSection(user); // Show the logout section
    } else {
      alert("Login failed. Invalid username or password.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
});

// Logout event
logoutButton.addEventListener("click", () => {
  // Clear credentials (This is browser-dependent and might not fully work)
  document.execCommand("ClearAuthenticationCache");

  // Clear username display and show the signup form
  usernameDisplay.textContent = "";
  showSignupForm();

  alert("Logged out successfully!");
});

// Initially show the signup form
showSignupForm();
