const code = document.getElementById("code");
var email;

document.getElementById("verify-button").addEventListener("click", procverify);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') procverify(); });
document.getElementById("verify-form").addEventListener("submit", function(event) { event.preventDefault(); });

document.getElementById("upper-resend").addEventListener("click", procresend);
document.getElementById("upper-create").addEventListener("click", function() {
  window.location.href = "/create";
});

window.onload = async function(){

    await fetch('/api/session')
    .then(response => { return response.json(); })
    .then(data => { email = data.email; if(data.loggedin) window.location.href = "/main"; })
    .catch(error => {console.error('Error fetching session data:', error);});

    document.getElementById("verify-button").innerHTML += email;

};

async function procverify(){

    clearerror();

    var attempt = code.value;

    if (attempt === "") return throwerror("empty field");

    await fetch('/api/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, attempt: attempt, forgot: false })
    })
    .then(response => { return response.json(); })
    .then(data => {
        if(data.message == "goodverify") window.location.href = "/main";
        if(data.message == "badcode") throwerror("invalid code");
        if(data.message == "expired") throwerror("expired - create new account or resend code");
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function procresend() {

    clearerror();

    fetch('/api/resend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, forgot: false })
    })
    .then(() => {throwerror("code resent");})
    .catch((error) => {
        console.error('Error:', error);
    });

}

function throwerror(m) {
    var error = document.getElementById("error");
    error.innerHTML = `<div class="requirement-div" id="requirement-error"> <div class="requirement"> ${m} </div> <div class="ffsq" id="req-error" style="background-color:#d6d5cd"> </div> </div>`;
}

function clearerror() {
    var error = document.getElementById("error");
    error.innerHTML = "";
}