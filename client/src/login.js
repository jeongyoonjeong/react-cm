const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userid = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:8090/login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userid: userid,
            userpw: password
        })
    }).then((res)=>{
        console.log(res.json);
        window.location.href = "list.html";
    }).catch((err)=>{
        console.log(err)
    });

    this.reset();
});