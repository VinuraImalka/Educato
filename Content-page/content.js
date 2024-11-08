//according to screen size change image
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', function() {
        const screenWidth = window.innerWidth;
        const siteMissionImage = document.getElementById('site-mission-image');
        if (screenWidth < 750) {
            siteMissionImage.src = "../Website-icons/quality_education_small.png";
        } else {
            siteMissionImage.src = "../Website-icons/quality_education_large.png";
        }
    });   
});


function goToShop(){
    window.location.href = "../Shop/shop.html"; 
};