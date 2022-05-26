// Click grey rectangles representing doors in order to change the rooms.


// Each element (except 0) of the external array defines one room.
// The room number == index of the array.
// The consecutive elements of internal arrays represent:
//    - Four directions (0 West, 1 North, 2 East, 3 South)
//    - and 4 - the room name.
// Direction value == 0 means no entry.
//                   >0 means the room number the door leads to.
var rooms = [
    0,
    [0, 0, 2, 8, "6"],
    [1, 0, 0, 9, "A"],
    [0, 0, 4, 10, "I"],
    [3, 0, 5, 0, "-"],
    [4, 0, 0, 12, "O"],
    [0, 0, 7, 13, "3"],
    [6, 0, 0, 14, "P"],

    [0, 1, 0, 15, "@"],
    [0, 2, 10, 16, "1"],
    [9, 3, 0, 17, "B"],
    [0, 0, 12, 18, "W"],
    [11, 5, 0, 19, "H"],
    [0, 6, 14, 20, "9"],
    [13, 7, 0, 0, "G"],

    [0, 8, 16, 0, "N"],
    [15, 9, 0, 23, "Q"],
    [0, 10, 18, 24, "V"],
    [17, 11, 0, 25, "~"],
    [0, 12, 20, 0, "E"],
    [19, 13, 21, 27, "X"],
    [20, 0, 0, 28, "F"],

    [0, 0, 23, 0, "8"],
    [22, 16, 0, 30, "S"],
    [0, 17, 25, 0, "L"],
    [24, 18, 26, 0, "<"],
    [25, 0, 27, 33, "."],
    [26, 20, 0, 0, "D"],
    [0, 21, 0, 35, "Y"],

    [0, 0, 30, 36, "M"],
    [29, 23, 31, 37, "U"],
    [30, 0, 32, 38, "2"],
    [31, 0, 33, 0, "K"],
    [32, 26, 0, 40, "T"],
    [0, 0, 35, 41, "4"],
    [34, 28, 0, 0, "Z"],

    [0, 29, 37, 0, "J"],
    [36, 30, 0, 0, "0"],
    [0, 31, 39, 0, "R"],
    [38, 0, 0, 0, "5"],
    [0, 33, 41, 0, "_"],
    [40, 34, 42, 0, "C"],
    [41, 0, 0, 0, "7"],
];
var room = 18;   // the room we're currently in.
                // Initially room 18, the Entrance.

// Based on global arguments:
//    - rooms[] (definitions of all rooms)
//    - room (current room number)
// identifies the open and closed doors and sets
// their HTML tag colors accordingly.
function drawRoom() {
    // Display the room name
    document.getElementById("roomNameConst").textContent = rooms[room][4];
    //alert(document.getElementById("roomName"));
    // Loop through the doors (WNES) of current room
    // and set their colors according to rooms[] array.
    for (x = 0; x <= 3; x++)
        document.getElementById("door" + x).style["background-color"] = rooms[room][x] ? "#bbbbbb" : "#424242";
}

// Based on the current room number (global)
// and on the required direction (an argument)
// changes the current room number.
// The function is called by HTML tags' onClick properties.
function goDirection(direction) {
    if (rooms[room][direction] > 0) {
        room = rooms[room][direction];
        drawRoom();
    }
}

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

window.onload = _ => {
    new Countdown(
        document.getElementById('10min'),
        document.getElementById('10min').previousElementSibling,
        sessionStorage.getItem("startDate"),
        sessionStorage.getItem("endDate")
    );
};

function showHideMap(button) {
    map = document.getElementsByTagName("img")[0];
    map.style.top = "-10%";
    map.style.left = "5%";
    if (map.classList.contains("animate__rollIn")) {
        map.classList.remove("animate__rollIn");
        map.classList.add("animate__rollOut");
        button.textContent = "Открыть карту";
    }
    else {
        map.classList.remove("animate__rollOut");
        map.classList.add("animate__rollIn");
        button.textContent = "Закрыть карту";
    }
}

function addSymbol() {
    symbol = document.getElementById("roomName").textContent;
    field = document.getElementById("email");
    if (symbol === "~")
        return;
    if (symbol === "<") {
        if (field.textContent.length === 1) {
            field.textContent = "..."
            return;
        }
        if (field.textContent.length > 0)
            field.textContent = field.textContent.substring(0, (field.textContent.length - 1));
        return;
    }
    symbol = symbol.toLowerCase();
    if (field.textContent === "...") {
        field.textContent = symbol;
    }
    else
        field.textContent += symbol;
}

function verify() {
    email = document.getElementById("email").textContent;
    indexEt = email.indexOf('@');
    indexDot = email.indexOf('.', indexEt);
    if (indexDot !== -1) {
        sessionStorage.setItem("email", email);
        window.location.href = '../html/confirm-email-page.html';
    }
    else
        alert("Почта имеет некорректный вид. Вы уверены, что ввели ее правильно?");
}

function addMail() {
    email = document.getElementById("email").textContent += "@mail.ru";
}

function addGMail() {
    email = document.getElementById("email").textContent += "@gmail.com";
}

function addYMail() {
    email = document.getElementById("email").textContent += "@yandex.ru";
}