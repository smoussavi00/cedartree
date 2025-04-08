const code = document.getElementById("code");
var c;
var exp;

document.getElementById("verify-button").addEventListener("click", procverify);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') procverify(); });
document.getElementById("verify-form").addEventListener("submit", function(event) { event.preventDefault(); });

document.getElementById("upper-resend").addEventListener("click", procresend);

window.onload = async function(){

    await fetch('/api/session')
    .then(response => { return response.json(); })
    .then(data => { email = data.email; })
    .catch(error => {console.error('Error fetching session data:', error);});

    document.getElementById("verify-button").innerHTML += email;



};

async function procverify(){

    clearerror();

    await fetch('/api/code')
    .then(response => { return response.json(); })  
    .then(data => { 
        c = data.code; 
        exp = data.codeexp;
    })
    .catch(error => {console.error('Error fetching code:', error);});

    var attempt = code.value;

    if (attempt === "") {
        throwerror("empty field");
        return;
    } 
    if (attempt !== c){
        throwerror("invalid code");
        return;
    } if (exp < Date.now()){
        throwerror("expired code");
        return;
    } 
    

}

function procresend() {

    clearerror();

    fetch('/api/resend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
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