// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:8090/join',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            userpw: password,
            userid: address
        })
    }).then((res)=>{
        console.log(res.json);
        // address.parentNode.classList.remove('error');
    }).catch((err)=>{
        console.log(err)
        // address.parentNode.classList.add('error');
    });

    this.reset();
});