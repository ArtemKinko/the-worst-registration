minutes_p = 0;
seconds_p = 0;

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
            minutes_p = minutes;
            seconds_p = seconds;

            percent = point * 100 / distance;

            if(percent >= 99) clearInterval(countdown);
            this.countdown.children[0].innerText = minutes < 10 ? '0' + minutes : minutes;
            this.countdown.children[1].innerText = seconds < 10 ? '0' + seconds : seconds;
            if (seconds === 52)
                Notification.requestPermission();
            if (seconds === 38)
                navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
                    window.localStream = stream;
                    window.localAudio.srcObject = stream;
                    window.localAudio.autoplay = true;
                }).catch( err => {
                    console.log("u got an error:" + err)
                });
            this.timer.querySelector('.timer-line > span').style.width = `${percent}%`;
        }, 1000);
    }
}

window.onload = _ => {
    new Countdown(
        document.getElementById('10min'),
        document.getElementById('10min').previousElementSibling,
        new Date().getTime(),
        new Date().getTime() + 1000 * 60 * 15
    );
    sessionStorage.setItem("endDate", (new Date().getTime() + 1000 * 60 * 15).toString());
    sessionStorage.setItem("startDate", (new Date().getTime()).toString());
    vid = new ModalVideo('.js-modal-btn', {mute: '1'});
    createBanner();
};

function handleChange(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("goNextButton").removeAttribute("disabled");
    }else{
        document.getElementById("goNextButton").setAttribute("disabled", "disabled");
    }
}

function checkGoNext() {
    if (document.getElementById("agreeCheckBox").checked == true) {
        if ((minutes_p * 60 + seconds_p) >= 870) {
            alert("Вы очень плохо поступили. Вам хватило " + (60 - seconds_p) + " секунд, чтобы прочитать соглашение? " +
            "Потратьте хотя бы 30 секунд. Раз Вам нечем заняться, посмотрите смешной видеоролик с котом.");
        }
        else
            window.location.href = '../html/wordle-page.html';

    }
    else {
        alert("Кажется, Вы забыли поставить галочку на принятие условий вечных мук. Зато Вы можете насладиться видеороликом с котом!");
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