const email = document.getElementById('email');

document.getElementById("forgot-button").addEventListener("click", procforgot);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') procforgot(); });
document.getElementById("forgot-form").addEventListener("submit", function(event) { event.preventDefault(); });

document.getElementById("upper-return").addEventListener("click", function() {
    window.location.href = "/login";
    // INFUNCTIONAL
    // IF SIGNEDIN REDIRECT TO MAIN
});

function procforgot() {

    clearerror();
    var emailval = email.value;
    if (emailval.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        // FUNCTIONALITY DOES NOT EXIST YET -- PROCESS EMAIL IF IT EXISTS THEN SEND CODE 
        if(email_is_in_db) window.location.href = "/verify";
    } else throwerror("invalid email");
}

function throwerror(m) {
    var error = document.getElementById("error");
    error.innerHTML = `<div class="requirement-div" id="requirement-error"> <div class="requirement"> ${m} </div> <div class="ffsq" id="req-error" style="background-color:#d6d5cd"> </div> </div>`;
}

function clearerror() {
    var error = document.getElementById("error");
    error.innerHTML = "";
}