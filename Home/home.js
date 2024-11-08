document.getElementById("learn-more-btn-container").onclick = function() {
    window.location.href = "../Content-page/content.html"; 
};

function redirectToFeature(feature) {
    var featureName = feature.querySelector('h4').textContent.toLowerCase().replace(/\s+/, '-');
    switch (featureName) {
        case 'gallery':
            window.location.href = 'gallery.html';
            break;
        case 'shop':
            window.location.href = 'shop.html';
            break;
        case 'user-profile':
            window.location.href = 'user-profile.html';
            break;
        case 'feedback':
            window.location.href = '../Feedback/feedback.html';
            break;
    }
}

