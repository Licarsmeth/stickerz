const navContent = document.querySelectorAll("nav div a");
const navParent = document.querySelector("nav div");

export function redefineNav(remove, add) {
  // Nodelist to array
  const navItems = Array.from(navContent);

  // Remove elements
  navItems.forEach((page) => {
    const pageName = page.textContent.toLowerCase();
    if (remove.some((r) => pageName === r.toLowerCase())) {
      navParent.removeChild(page);
    }
  });

  // Add new elements
  add.forEach((page) => {
    const newPage = document.createElement("a");
    newPage.href = `${page.toLowerCase()}.html`;
    newPage.textContent =
      page.charAt(0).toUpperCase() + page.slice(1).toLowerCase();
    navParent.appendChild(newPage);
  });
}

export async function handleAdminNav() {
  try {
    // Fetch the user profile
    const res = await fetch("/api/profile/get", { credentials: "include" });
    if (!res.ok) throw new Error("Not logged in");
    const user = await res.json();

    // Show admin nav only if user is admin
    if (user.Mode && user.Mode.toLowerCase() === "admin") {
      document.getElementById("admin-nav").style.display = "inline-block";
      document.getElementById("upload-nav").style.display = "inline-block";
    } else {
      document.getElementById("admin-nav").style.display = "none";
      document.getElementById("upload-nav").style.display = "none";
    }
  } catch (e) {
    // Not logged in: hide admin and upload
    document.getElementById("admin-nav").style.display = "none";
    document.getElementById("upload-nav").style.display = "none";
  }
}
