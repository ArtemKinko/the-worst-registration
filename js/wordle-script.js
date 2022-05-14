document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "якорь";
    let guessedWordCount = 0;

    const keys = document.querySelectorAll(".keyboard-row button");

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const key = target.getAttribute("data-key");

            if (key === "enter") {
                handleSubmitWord()
                return;
            }

            if (key === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(key);
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter)
        if (!isCorrectLetter) return  "rgb(68, 68, 70)";

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);
        if (isCorrectPosition) return "rgb(83, 141, 78)";

        return "rgb(181, 159, 59)";

    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();
        guessedWords[guessedWords.length - 1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = "";
        availableSpace -= 1;
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Слово должно быть длиной 5 символов!");
            return;
        }

        const firstLetterId = guessedWordCount * 5 + 1;
        const currentWord = currentWordArr.join('');
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                const buttonLetterEl = document.getElementById(letter);
                console.log(buttonLetterEl.style.backgroundColor);
                letterEl.classList.add("animate__zoomIn");
                letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`;
                if (buttonLetterEl.style.backgroundColor === "" ||
                    buttonLetterEl.style.backgroundColor === "rgb(181, 159, 59)") {
                    buttonLetterEl.style = `background-color:${tileColor}; border-color:${tileColor}`;
                }
            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Слово разгадано!");
            return;
        }

        if (guessedWords.length === 6) {
            window.alert(`Вы потратили все попытки. Загаданное слово: ${word}. Попробуйте решить еще раз!`);
            return;
        }

        guessedWords.push([]);
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById((String(availableSpace)));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }


});