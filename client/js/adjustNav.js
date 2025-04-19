const navContent = document.querySelectorAll("nav div a");
const navParent = document.querySelector("nav div");

export function redefineNav(remove, add) {
    // Nodelist to array
    const navItems = Array.from(navContent);
    
    // Remove elements
    navItems.forEach(page => {
        const pageName = page.textContent.toLowerCase();
        if(remove.some(r => pageName === r.toLowerCase())) {
            navParent.removeChild(page);
        }
    });

    // Add new elements
    add.forEach(page => {
        const newPage = document.createElement("a");
        newPage.href = `${page.toLowerCase()}.html`;
        newPage.textContent = page.charAt(0).toUpperCase() + page.slice(1).toLowerCase();
        navParent.appendChild(newPage);
    });
}

