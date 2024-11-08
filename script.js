updateNavBar(false);
// Function to update the navigation bar after the user logs in
function updateNavBar(isLoggedIn) {
    const homeActions = document.getElementById('home-actions');
    if (isLoggedIn) {
        // Add user actions for logged-in users
        homeActions.innerHTML = `
        <img id="cart-icon" src="../Website-icons/cart.png" alt="cart-icon">
        <a href="user.html"><img class="user-img" id="user-icon" src="../Website-icons/user.png" alt="user-profile"></a>
        `;
    }
}

// Get the current URL of the page
const currentUrl = window.location.href;
const navLinks = document.querySelectorAll('.nav-bar div a');
const sideLinks = document.querySelectorAll('.side-bar div a');
[...navLinks, ...sideLinks].forEach(link => {
    if (link.href === currentUrl) {
        link.parentElement.classList.add('active');
    }
});

// Add scroll event listener to window
document.addEventListener('scroll', () => {
const header = document.querySelector('.header');
if (window.scrollY > 0) {
    header.classList.add('shadow'); 
    } else {
    header.classList.remove('shadow'); 
    }
});


function showSideBar(){
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.display = 'flex'; 
}

function closeSideBar(){
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.display = 'none'; 
}

//close side bar if window is more than 840
window.onload = function() {
    window.addEventListener('resize', function() {
        const screenWidth = window.innerWidth;
        if (screenWidth > 840) {
            closeSideBar();
        }
    });
};