const email = document.getElementById('email');
var emailval;
var mode = "forgot";

document.getElementById("forgot-button").addEventListener("click", procforgot);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') if(mode == 'forgot') procforgot(); else procverify();});
document.getElementById("forgot-form").addEventListener("submit", function(event) { event.preventDefault(); });

document.getElementById("upper-return").addEventListener("click", function() {
    window.location.href = "/login";
});

async function procforgot() {

    clearerror();
    
    emailval = email.value;
    if (emailval.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

        await fetch('/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailval})
        })
        .then(response => { return response.json(); })
        .then(async data => {

            if (data.message == "goodforgot") {
                await fetch('/snip/forgotverify.html')
                .then(response => response.text())
                .then(html => {
                  document.getElementById("forgot-form").innerHTML = html;
                });
                verifyeventst();
                mode = "forgotverify";
            }
            if (data.message == "bademail") throwerror("email not found");
            if (data.message == "unverified"){
                document.getElementById("upper-right").innerHTML = '<p class="upper-item" id="upper-return-2"> verify </p> <p class="upper-item upper-dash"> — </p> <p class="upper-item" id="upper-return"> return to login </p>';
                document.getElementById("upper-return-2").addEventListener("click", function() {
                    window.location.href = "/verify";
                });
                throwerror("email not verified");
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });

    } else throwerror("invalid email");
}

async function procverify(){

    clearerror();

    var attempt = document.getElementById("code").value;

    if (attempt === "") return throwerror("empty field");

    fetch('/api/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailval, attempt: attempt, forgot: true })
    })
    .then(response => { return response.json(); })
    .then(data => {
        if (data.message == "goodverify") {
            //INFUNCTIONAL
        }
        if (data.message == "badcode") throwerror("invalid code");
        if (data.message == "expired") throwerror("expired - resend code");
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

async function procresend(){

    clearerror();

    fetch('/api/resend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailval, forgot: true })
    })
    .then(() => {throwerror("code resent");})
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

function verifyeventst(){

    document.getElementById("verify-button").innerHTML += emailval;
    document.getElementById("upper-right").innerHTML = '<p class="upper-item" id="upper-return-2"> resend code </p> <p class="upper-item upper-dash"> — </p> <p class="upper-item" id="upper-return"> return to login </p>';

    document.getElementById("verify-button").addEventListener("click", procverify);

    document.getElementById("upper-return-2").addEventListener("click", procresend);
    
}

function throwerror(m) {
    var error = document.getElementById("error");
    error.innerHTML = `<div class="requirement-div" id="requirement-error"> <div class="requirement"> ${m} </div> <div class="ffsq" id="req-error" style="background-color:#d6d5cd"> </div> </div>`;
}

function clearerror() {
    var error = document.getElementById("error");
    error.innerHTML = "";
}

