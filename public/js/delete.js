document.getElementById("show-1").addEventListener("click", togglepassw);

document.getElementById("delete-button").addEventListener("click", procdelete);
document.addEventListener('keydown', function(event) { if (event.key === 'Enter') procdelete(); });
document.getElementById("delete-form").addEventListener("submit", function(event) { event.preventDefault(); });

document.getElementById("upper-return").addEventListener("click", function() {
    window.location.href = "/main";
});

document.getElementById("upper-forgot").addEventListener("click", function() {
    window.location.href = "/forgot";
});

function procdelete() {

    clearerror();

    var passw = document.getElementById("passw").value;

    if (passw === "") return throwerror("empty field");

    fetch('/api/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: passw })
    })
    .then(response => { return response.json(); })
    .then(data => {
        if (data.message == "gooddelete") return window.location.href = "/login";
        else if (data.message == "badpassw") return throwerror("invalid password");
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function togglepassw(){
    var passw = document.getElementById("passw");
    if(passw.type == 'password') passw.type = 'text';
    else passw.type = 'password';
}

function throwerror(m) {
    var error = document.getElementById("error");
    error.innerHTML = `<div class="requirement-div" id="requirement-error"> <div class="requirement"> ${m} </div> <div class="ffsq" id="req-error" style="background-color:#d6d5cd"> </div> </div>`;
}

function clearerror() {
    var error = document.getElementById("error");
    error.innerHTML = "";
}

