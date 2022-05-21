symbols = ['☞', '⌤', '♣', '☂', '⅃', '↯', '❄', '⁂', '☣', '⋮',
    '✏', '⅁', '☯', '☈', '♯', '✡', '↬', '℗', '€', '♫',
    'ℵ', '♘', '☪', '♃', '☏', '⌖', '☉', '⌔', '☭', '♺',
    'ᛒ', '⨷', '⋙', '⅖', '⚤', '✒', '✃', '▥', '∅', '⏏',
    '◓', '⋱', '☃', '⋲', 'ᛃ', 'ᛉ', '◔', '⅝', '✄', '⚘'];

answer = [];
current_index = 0;

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

function createSquares() {
    const gameBoard = document.getElementById("board")

    for (let index = 0; index < 50; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index + 1);
        square.textContent = symbols[index];
        square.addEventListener("click", function(){checkInput(square)}, false);
        gameBoard.appendChild(square);
    }

    email = sessionStorage.getItem("email");
    var url = new URL("http://127.0.0.1:5000/sendEmail");
    url.searchParams.append('email', email);
    $.get(url, function(data) {
        answer = data['picked'];
    })
}

window.onload = _ => {
    new Countdown(
        document.getElementById('10min'),
        document.getElementById('10min').previousElementSibling,
        sessionStorage.getItem("startDate"),
        sessionStorage.getItem("endDate")
    );
    createSquares();
};

function checkInput(button) {
    if (button.textContent === answer[current_index]) {
        button.style.backgroundColor = "#40a645";
        button.classList.add("animate__bounceIn");
        current_index++;
    }
    else {
        button.classList.remove("animate__headShake");
        button.classList.add("animate__headShake");
    }
    if (current_index === 10) {
        alert("Почта подтверждена, продолжаем регистрацию.");
        window.location.href = '../html/phone-page.html';
    }
}