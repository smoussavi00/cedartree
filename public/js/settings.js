document.getElementById("upper-return").addEventListener("click", function() {
    window.location.href = "/main";
});

document.getElementById("st-change-button").addEventListener("click", function() {
    window.location.href = "/change";
});

document.getElementById("st-delete-button").addEventListener("click", function() {
    window.location.href = "/delete";
});

document.getElementById("st-signout-button").addEventListener("click", function() {
    fetch('/api/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => { return response.json(); })
    .then(data => {
        if (data.message == "signedout") return window.location.href = "/login";
        else throwerror("error signing out");
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
);