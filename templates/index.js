function hide(name){
    const el = document.querySelector(name);
    el.textContent = "";
    el.style.display = "none";
}
function showError(msg){
    const sentence = document.querySelector(".error-message");
    if (sentence){
        hide(".error-message");
    }
    sentence.textContent = msg;
    sentence.style.display = "block";
    setTimeout(function(){
        hide(".error-message");
    }, 3000);
}

function showSuccess(msg){
    const sentence = document.querySelector(".success-message");
    if (sentence){
        hide(".success-message");
    }
    sentence.textContent = msg;
    sentence.style.display = "block";
    setTimeout(function(){
        hide(".success-message");
    }, 3000);
}
