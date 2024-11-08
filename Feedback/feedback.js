//if agegroup is selected dispatch a input
function checkAgeGroup(ageGroup){
    let radioButton = ageGroup.querySelector(`input[type="radio"]`);
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event('input'));
}

const form = document.getElementById('feedback-form');
const progress = document.getElementById('form-progress');
const progressLabel = document.getElementById('progress-label');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email')
const ageGroups = document.querySelectorAll('input[name="age-group"]');
const sourceInput = document.getElementById('source');
const ratings = document.querySelectorAll('input[name="rating"]');
const choices = document.querySelectorAll('input[name="user-choice"]');

let isNameProgressUpdated = false;
let isEmailProgressUpdated = false;
let isAgeGroupProgressUpdated = false;
let isSourceProgressUpdated = false;
let isRatingProgressUpdated = false;
let isChoiceProgressUpdated = false;

//text based validation
function textInputValidate(inputField, validationFunction, progressStatus) {
    if (!validationFunction()) {
        inputField.focus();
        if (progressStatus) {
            progress.value--;
            progressStatus = false;
        }
    } else {
        if (!progressStatus) {
            progress.value++;
            progressStatus = true;
        }
    }
    return progressStatus;
}

//radio based validation
function radioInputValidate(progressStatus) {
    if(!progressStatus){
        progress.value++;
        progressStatus = true;
    }
    return progressStatus;
}

//when value enter to nameinput run this
nameInput.addEventListener('input', function() {
    isNameProgressUpdated = textInputValidate(nameInput, nameValidation, isNameProgressUpdated);
    console.log("5"+isNameProgressUpdated);
});

//when value enter to emailinput run this
emailInput.addEventListener('input', function() {
    isEmailProgressUpdated = textInputValidate(emailInput, emailValidation, isEmailProgressUpdated);
});

//when one of age group is checked run this
ageGroups.forEach(ageGroup => {
    ageGroup.addEventListener('input', function() {
        isAgeGroupProgressUpdated = radioInputValidate(isAgeGroupProgressUpdated);
    });
});

//when one of source is selected run this
sourceInput.addEventListener('input', function() {
    if(!sourceValidation()){
        sourceInput.focus();
    }else{
        if(!isSourceProgressUpdated){
            progress.value++;
            isSourceProgressUpdated = true;
        }
    }
});

//when one of source selected other display textarea 
document.getElementById('source').addEventListener('change', function() {
    const source = this.value;
    const otherMethod = document.getElementById('other-method');

    if (source === 'other') {
        otherMethod.style.display = 'flex';
    }else{
        otherMethod.style.display = 'none';
    }
});

//when one of ratings is checked run this
ratings.forEach(star => {
    star.addEventListener('input', function() {
        isRatingProgressUpdated = radioInputValidate(isRatingProgressUpdated);
    });  
});

//when one of choices is checked run this
choices.forEach(choice => {
    choice.addEventListener('input', function() {
        isChoiceProgressUpdated = radioInputValidate(isChoiceProgressUpdated);
    });     
});

//for every field run this
const fields = document.querySelectorAll('#name, #email, input[name="age-group"], #source, input[name="rating"], input[name="user-choice"]');
fields.forEach(field => {
    field.addEventListener('input', updateProgressBar);
});

function updateProgressBar() {
    const currentProgress = parseInt(progress.value);
    let remainingFields = 6 - currentProgress;
    if(remainingFields > 0){
        progressLabel.innerHTML = `${remainingFields} more fields are reqired to submit the feedback.`;
    }else{
        progressLabel.innerHTML = `Feedback form is complete. Ready to submit.`;
    }
}

//validate all the field of form
function validateFeedbackForm() {
    let isFormVaild = false;
    if(!nameValidation()){
        document.getElementById('name').focus();
    }else if(!emailValidation()){
        document.getElementById('email').focus();
    }else if(!ageGroupValidation()){
        document.querySelector('input[name="age-group"]:first-of-type').focus();
    }else if(!sourceValidation()){
        sourceInput.focus();
    }else if(!ratingValidation()){
        document.getElementById('review').focus();
    }else if(!suggestionValidation()){
        document.getElementById('suggestion').focus();
    }else if(!reviewValidation()){
        document.getElementById('review').focus();
    }else if(!userChoiceValidation()){
        document.querySelector('input[name="user-choice"]:first-of-type').focus();
    }else{
        isFormVaild = true;
    } 
    return isFormVaild;
}

function nameValidation() {
    const name = nameInput.value.trim();
    const errorDisplay = form.querySelector('.name-error');
    let isNameVaild = false;
    if (name === '') {
        errorDisplay.innerText = 'Please enter your full name.';
    }else if (/[^a-zA-Z\s]/.test(name)) {
        errorDisplay.innerText = 'Name should not contain numbers or special characters.';
    }else if (name.length < 10) {
        errorDisplay.innerText = 'Name should exceed 10 characters.';
    }else if (name.length > 60) {
        errorDisplay.innerText = 'Name should not exceed 60 characters.';
    }else {
        errorDisplay.innerText = '';
        isNameVaild = true;
    }
    return isNameVaild;
}

function emailValidation() {
    const email = emailInput.value.trim();
    const errorDisplay = form.querySelector('.email-error');
    let isEmailVaild = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errorDisplay.innerText = 'Please enter your email.';
    } else if (email.length > 255) {
        errorDisplay.innerText = 'Email should not exceed 60 characters.';
    }else if (!(emailRegex.test(email))) {
        errorDisplay.innerText = 'Please enter a valid email address (e.g.: name@gmail.com).';
    }else {
        errorDisplay.innerText = '';
        isEmailVaild = true;
    }
    return isEmailVaild;
}

function ageGroupValidation() {
    const errorDisplay = form.querySelector('.age-group-error');
    let ageGroupChecked = false;
    ageGroups.forEach(group => {
        if (group.checked) {
            ageGroupChecked = true;
        }
    });
    if (!ageGroupChecked) {
        errorDisplay.innerText = 'Please select an age group.';
    } else {
        errorDisplay.innerText = '';
    }
    return ageGroupChecked;
}

function sourceValidation() {
    const source = sourceInput.value.trim();
    const otherMethod = document.getElementById('other-method').value.trim();
    const errorDisplay = form.querySelector('.source-error');
    let isSourceValid = false;

    if (source === '') {
        errorDisplay.innerText = 'Please select how you found our site.';
    }else if(source === 'other'){
        if (otherMethod.length > 150) {
            errorDisplay.innerText = 'Other method should not exceed 150 characters.';
        }else{
            isSourceValid = true;
        }
    } else {
        errorDisplay.innerText = '';
        isSourceValid = true;
    }

    return isSourceValid;
}

function ratingValidation() {
    const errorDisplay = document.querySelector('.rating-error');
    let ratingChecked = false;
    ratings.forEach(star => {
        if (star.checked) {
            ratingChecked = true;
        }
    });
    if (!ratingChecked) {
        errorDisplay.innerText = 'Please select a rating.';
    } else {
        errorDisplay.innerText = '';
    }
    return ratingChecked;
}

function reviewValidation() {
    const review = document.getElementById('review').value.trim();
    const errorDisplay = form.querySelector('.review-error');
    let isReviewVaild = false;
    if (review.length > 200) {
        errorDisplay.innerText = 'Review should not exceed 200 characters.';
    }else {
        errorDisplay.innerText = '';
        isReviewVaild = true;
    }
    return isReviewVaild;
}

function suggestionValidation() {
    const suggestion = document.getElementById('suggestion').value.trim();
    const errorDisplay = form.querySelector('.suggestion-error');
    let isSuggestionVaild = false;
    if (suggestion.length > 150) {
        errorDisplay.innerText = 'Suggestion should not exceed 150 characters.';
    }else {
        errorDisplay.innerText = '';
        isSuggestionVaild =  true;
    }
    return isSuggestionVaild;
}

function userChoiceValidation() {
    const errorDisplay = form.querySelector('.user-choice-error');
    let isUserChoicesSelected = false;
    choices.forEach(choice => {
        if (choice.checked) {
            isUserChoicesSelected = true;
        }
    });
    if (!isUserChoicesSelected) {
        errorDisplay.innerText = 'Please select a choice.';
    } else {
        errorDisplay.innerText = '';
    }
    return isUserChoicesSelected;
}

function previewFeedback() {
    const previewBtn = document.getElementById('preview-btn');
    const editBtn = document.getElementById('edit-btn');
    const feedbackContainer = document.querySelector('#feedback-form');
    // Zoom out the feedback container
    feedbackContainer.style.transform = 'scale(0.8)';
    previewBtn.style.display = 'none';
    editBtn.style.display = 'inline';
    document.getElementById('name').focus();
}

function editFeedback() {
    const previewBtn = document.getElementById('preview-btn');
    const editBtn = document.getElementById('edit-btn');
    const feedbackContainer = document.querySelector('#feedback-form');
    // Zoom in the feedback container
    feedbackContainer.style.transform = 'scale(1)';
    previewBtn.style.display = 'inline';
    editBtn.style.display = 'none';
    document.getElementById('name').focus();
}

function resetValues(){
    document.getElementById('name').focus();
    progress.value = 0;
    isNameProgressUpdated = false;
    isEmailProgressUpdated = false;
    isAgeGroupProgressUpdated = false;
    isSourceProgressUpdated = false;
    isRatingProgressUpdated = false;
    isChoiceProgressUpdated = false;
    document.getElementById('other-method').style.display = 'none';
    progressLabel.innerHTML = ``;
}

//when user submit prevent dafault submit and run sendEmail
form.addEventListener('submit', event => {
    event.preventDefault();
    if(validateFeedbackForm()){
        let age;
        ageGroups.forEach(group => {
            if (group.checked) {
                age = group.value;
            }
        });
        let userRating;
        ratings.forEach(star => {
            if (star.checked) {
                userRating = star.value;
            }
        });
        let userChoice
        choices.forEach(choice => {
            if (choice.checked) {
                userChoice = choice.value;
            }
        });
        sendEmail(age,userRating,userChoice);
    }
});
    


function sendEmail(age,userRating,userChoice){
    let feedback = "Full name - "+ nameInput.value.trim() +
                    "<br/>Email - "+emailInput.value.trim() +
                    "<br/>Age - "+ age +
                    "<br/>Source - "+sourceInput.value.trim() +
                    "<br/>Rating - "+userRating+" star <br/> "+
                    "Review - "+document.getElementById('review').value.trim() +
                    "<br/>Suggestion - "+document.getElementById('suggestion').value.trim() +
                    "<br/>does  "+nameInput.value.trim()+" recomend our site to osthers - "+userChoice;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "vinura.20222258@iit.ac.lk",
        Password : "0D5450E17C31AEF93229D4D407DDCEF8A899",
        To : 'vinuraimalka01@gmail.com',
        From : "vinura.20222258@iit.ac.lk",
        Subject : "Feedback for educato website",
        Body : feedback
    }).then(
        message => {
            if(message =="OK"){
                Swal.fire({
                    title: 'Success!',
                    text: 'Feedback successfully submited',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                return true;
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Error while submitting Feedback',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                return false;
            }
        }
    );

    
}
