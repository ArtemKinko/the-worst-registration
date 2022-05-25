picked_password = "";
current_phase = 0;
current_pass = "";
current_word = "";
ready_to_click = 0;

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createPasswords() {
    let select = document.getElementById("select");
    let letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
    '!', '@', '#', '$', '%', '^', '&', "*", '-', '_',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    for (let word = 0; word < 200; word++) {
        let password = "";
        for (let i = 0; i < 8; i++) {
            let index = getRandomInt(letters.length);
            let letter = letters[index];
            if (getRandomInt(2) === 1)
                letter = letter.toUpperCase();
            password += letter;
        }
        let option = document.createElement("option");
        option.setAttribute("value", password);
        option.textContent = password;
        select.appendChild(option);
    }
}

window.onload = _ => {
    new Countdown(
        document.getElementById('10min'),
        document.getElementById('10min').previousElementSibling,
        sessionStorage.getItem("startDate"),
        sessionStorage.getItem("endDate")
    );
    createPasswords();
};

function changeTask() {
    document.getElementById("title").textContent = "9. Подтвердите пароль.";
    document.getElementById("titleInfo").textContent = "Последний шаг. Сыграйте в 'Саймон говорит', последовательно выбрав буквы пароля.";
    document.getElementById("selection").hidden = true;
    document.getElementById("keyboard-container").hidden = false;
}

async function showPhase() {
    ready_to_click = 0;
    document.getElementById("watchClick").textContent = "Запоминайте";
    for (let i = 0; i < current_pass.length; i++) {
        letter = current_pass.substring(i, i+1).toLowerCase();
        buttons = document.getElementsByTagName("button");
        for (let b = 0; b < buttons.length; b++) {
            if (buttons[b].textContent === letter) {
                buttons[b].classList.add("animate__pulse");
                buttons[b].style.backgroundColor = "#D787AB";
                await new Promise(resolve => setTimeout(resolve, 700));
                buttons[b].style.backgroundColor = "white";
                await new Promise(resolve => setTimeout(resolve, 100));
                buttons[b].classList.remove("animate__pulse");
            }
        }
    }
    ready_to_click = 1;
    document.getElementById("watchClick").textContent = "Нажимайте";
}

async function clickedButton(button) {
    if (ready_to_click) {
        letter = button.textContent;
        current_word += letter;
        if (current_pass.indexOf(current_word) !== -1) {
            button.style.backgroundColor = "#87d7a3";
            button.classList.add("animate__pulse");
            await new Promise(resolve => setTimeout(resolve, 700));
            button.classList.remove("animate__pulse");
            button.style.backgroundColor = "white";
            if (current_word.length === current_phase) {
                if (current_phase === 8) {
                    alert("Регистрация окончена! Перенаправляем к таблице лидеров");
                    sessionStorage.setItem("password", picked_password);
                    window.location.href = '../html/leaderboard-page.html';
                }
                current_phase++;
                current_word = "";
                document.getElementById("phase").textContent = current_phase.toString() + "/8";
                newPhase();
            }
        }
        else {
            current_word = "";
            alert("Вы ошиблись в следующей букве. Попробуйте этот раунд заново.");
            newPhase();
        }
    }
}

function newPhase() {
    current_pass = picked_password.substring(0, current_phase);
    showPhase();
}

function startGame() {
    document.getElementById("startGame").hidden = true;
    picked_password = document.getElementById("select").value.toLowerCase();
    current_phase = 1;
    document.getElementById("phase").textContent = "1/8";
    newPhase();
}