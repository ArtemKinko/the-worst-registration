function changeNum() {
    num = document.getElementById("rate").value;
    if (num < 21) {
        document.getElementById("rate").value = 21;
        num = 21;
    }
    document.getElementById("numRate").textContent = num.toString();
}

async function workWithDB() {
    document.getElementById("login").textContent = sessionStorage.getItem("login");
    document.getElementById("email").textContent = sessionStorage.getItem("email");
    document.getElementById("phone").textContent = sessionStorage.getItem("phone");
    document.getElementById("password").textContent = sessionStorage.getItem("password");
    document.getElementById("time").textContent = sessionStorage.getItem("time");

    var url = new URL("http://127.0.0.1:5000/addResult");
    url.searchParams.append('login', sessionStorage.getItem("login"));
    url.searchParams.append('email', sessionStorage.getItem("email"));
    url.searchParams.append('phone', sessionStorage.getItem("phone"));
    url.searchParams.append('password', sessionStorage.getItem("password"));
    url.searchParams.append('time', sessionStorage.getItem("time"));
    let response = "";
    $.get(url, function(data) {
        response = data["ok"];
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    var url = new URL("http://127.0.0.1:5000/getUsers");
    response = "";
    $.get(url, function(data) {
        let table = document.getElementById("tableLeaders");
        response = data["users"];
        for (let i = 0; i < response.length; i++) {
            let tr = document.createElement("tr");
            tr.classList.add("trLow");
            for (let j = 0; j < 5; j++) {
                let th = document.createElement("th");
                th.classList.add("thLow");
                let a = document.createElement("a");
                a.textContent = response[i][j];
                th.appendChild(a);
                tr.appendChild(th);
            }
            table.appendChild(tr);
        }
    });
}

window.onload = _ => {
    workWithDB();
};