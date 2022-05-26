numbers = [[0, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 1,
           1, 0, 0, 1,
           1, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0],
           [0, 0, 1, 0,
           0, 1, 1, 0,
           0, 0, 1, 0,
           0, 0, 1, 0,
           0, 0, 1, 0,
           0, 0, 1, 0,
           0, 0, 1, 0],
           [0, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 1,
           0, 0, 1, 0,
           0, 1, 0, 0,
           1, 0, 0, 0,
           1, 1, 1, 1],
           [0, 1, 1, 0,
           1, 0, 0, 1,
           0, 0, 0, 1,
           0, 0, 1, 0,
           0, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0],
           [1, 0, 0, 0,
           1, 0, 1, 0,
           1, 0, 1, 0,
           1, 1, 1, 1,
           0, 0, 1, 0,
           0, 0, 1, 0,
           0, 0, 1, 0],
           [1, 1, 1, 1,
           1, 0, 0, 0,
           1, 0, 0, 0,
           1, 1, 1, 0,
           0, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0],
           [0, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 0,
           1, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0],
           [1, 1, 1, 1,
           1, 0, 0, 1,
           0, 0, 0, 1,
           0, 0, 1, 0,
           0, 0, 1, 0,
           0, 1, 0, 0,
           0, 1, 0, 0],
           [0, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0],
           [0, 1, 1, 0,
           1, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 1,
           0, 0, 0, 1,
           1, 0, 0, 1,
           0, 1, 1, 0]];

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
    const gameContainer = document.getElementById("board-container");

    for (let num = 0; num < 10; num++) {
        let board = document.createElement("div");
        board.classList.add("board");
        for (let index = 0; index < 28; index++) {
            let square = document.createElement("input");
            square.setAttribute("type", "checkbox");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.addEventListener("click", function(){check_squares(square)}, false);
            square.setAttribute("id", num.toString() + "/" + index.toString());
            board.appendChild(square);
        }
        gameContainer.appendChild(board);
    }
}

window.onload = _ => {
    new Countdown(
        document.getElementById('10min'),
        document.getElementById('10min').previousElementSibling,
        sessionStorage.getItem("startDate"),
        sessionStorage.getItem("endDate")
    );
    createSquares();
    createBanner();
};

function check_same(current, numbers) {
    for (let i = 0; i < current.length; i++)
        if (current[i] !== numbers[i])
            return false;
    return true;
}

function check_squares(button) {
    button_index = button.id.split("/")[0];
    buttons = document.getElementsByClassName("square");
    current_symbols = [];
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id.split("/")[0] === button_index)
            if (buttons[i].checked === true)
                current_symbols.push(1);
            else
                current_symbols.push(0);
    }
    phone = document.getElementById("phone");
    for (let i = 0; i < numbers.length; i++) {
        if (check_same(current_symbols, numbers[i])) {
            phone.textContent = phone.textContent.substring(0, button_index * 2) + i.toString() + phone.textContent.substring(button_index * 2 + 1, phone.textContent.length);
            return;
        }
    }
    phone.textContent = phone.textContent.substring(0, button_index * 2) + "_" + phone.textContent.substring(button_index * 2 + 1,  phone.textContent.length);
}

function confirm() {
    phone = document.getElementById("phone").textContent.split(" ").join('');
    if (phone.includes("_"))
        alert("Заполнены не все поля номера.");
    else {
        sessionStorage.setItem("phone", phone);
        window.location.href = '../html/password-page.html';
    }
}

async function createBanner() {
    await new Promise(resolve => setTimeout(resolve, 10000));
    banner = document.getElementById("banner");
    banner.hidden = false;
    banner.classList.add("animate__slideInDown");
}

function closeBanner() {
    banner = document.getElementById("banner");
    banner.classList.add("animate__slideOutUp");
}