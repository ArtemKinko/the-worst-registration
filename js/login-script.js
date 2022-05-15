$(document).ready(function(){
    $(document).mousemove(function(event){
        $("#light").css({"top": event.pageY - 250, "left": event.pageX - 250});
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Countdown {
    constructor(timer, countdown, from, to) {
        this.timer      = timer;
        this.countdown  = countdown;
        this.start      = from;
        this.finish     = to;
        this.run();
    }

    run() {
        let distance = this.finish - this.start,
            days, hours, minutes, seconds,
            percent;

        let countdown = setInterval(_ => {
            let point = new Date().getTime() - this.start,
                localDistance = this.finish - new Date().getTime();

            days = Math.max(0, Math.floor(localDistance / (1000 * 60 * 60 * 24)));
            hours = Math.max(0, Math.floor((localDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            minutes = Math.max(0, Math.floor((localDistance % (1000 * 60 * 60)) / (1000 * 60)));
            seconds = Math.max(0, Math.floor((localDistance % (1000 * 60)) / 1000));

            percent = point * 100 / distance;

            if(percent >= 99) clearInterval(countdown);
            this.countdown.children[0].innerText = minutes < 10 ? '0' + minutes : minutes;
            this.countdown.children[1].innerText = seconds < 10 ? '0' + seconds : seconds;
            this.timer.querySelector('.timer-line > span').style.width = `${percent}%`;
        }, 1000);
    }
}

async function flash() {
    body = document.body;
    await new Promise(resolve => setTimeout(resolve, 500));
    let light = document.getElementById("light");
    light.hidden = true;
    let shadowButtons = document.getElementsByClassName("shadowButton");
    for (var i = 0; i < shadowButtons.length; i++) {
        shadowButtons.item(i).hidden = true;
    }
    shuffleButtons();
    body.style.backgroundColor = "#FFF";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#EEE";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#DDD";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#CCC";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#BBB";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#AAA";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#999";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#888";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#777";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#666";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#555";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#444";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#333";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#222";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#111";
    await new Promise(resolve => setTimeout(resolve, 30));
    body.style.backgroundColor = "#000";
    light.hidden = false;
    for (var i = 0; i < shadowButtons.length; i++) {
        shadowButtons.item(i).hidden = false;
    }
}

function flashbang() {
    var audio = new Audio('../mp3/flashbang.mp3');
    audio.play();
    flash();
}

function shuffleButtons() {
    let shadowButtons = document.getElementsByClassName("shadowButton");
    for (var i = 0; i < shadowButtons.length; i++) {
        shadowButtons.item(i).style.top = getRandomInt(600).toString() + "px";
        shadowButtons.item(i).style.left = getRandomInt(600).toString() + "px";
    }
}

async function intensiveFlash() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        flashbang();
    }
}

window.onload = _ => {
    new Countdown(
        document.getElementById('10min'),
        document.getElementById('10min').previousElementSibling,
        sessionStorage.getItem("startDate"),
        sessionStorage.getItem("endDate")
    );

    shuffleButtons();
    intensiveFlash();
};

function addNewLetter(button) {
    flashbang();
    login = document.getElementById("login");
    if (button.textContent === "подтвердить") {
        if (login.textContent.length >= 10)
            window.location.href = '../html/email-page.html';
        else {
            alert("Ваш логин меньше 10 символов. Ловите гранату!");
            return;
        }
    }
    if (button.textContent=== "стереть логин") {
        login.textContent = "...";
        return;
    }
    if (login.textContent === "...")
        login.textContent = button.textContent.toUpperCase();
    else
        login.textContent += button.textContent.toUpperCase();
}