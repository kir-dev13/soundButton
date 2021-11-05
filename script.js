const start = document.querySelector(".start");
const btns = document.querySelectorAll("[note]");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const osc = audioContext.createOscillator();
const noteGainNode = audioContext.createGain();

noteGainNode.connect(audioContext.destination);

osc.type = "triangle";
let freq = null;

const questions = {
    1: 60,
    2: 125,
    3: 250,
    4: 500,
    5: 1000,
    6: 2000,
    7: 4000,
    8: 8000,
    9: 16000,
};
osc.start();

const playSound = () => {
    btns.forEach((item) => removedClasses(item, "green", "red"));
    audioContext.resume();

    freq = questions[getRandomIntInclusive(1, 9)];
    osc.frequency.value = freq;
    osc.connect(noteGainNode);
    setTimeout(() => {
        osc.disconnect(noteGainNode);
    }, 1000);
};

function checkAnswer(e) {
    let note = +e.target.getAttribute("note");
    if (note === freq) {
        e.target.classList.add("green");
    } else {
        e.target.classList.add("red");
    }
}

start.addEventListener("click", playSound);
btns.forEach((item) => item.addEventListener("click", checkAnswer));

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function removedClasses(elem, ...classes) {
    classes.forEach((item) => {
        if (elem.classList.contains(item)) {
            elem.classList.remove(item);
        }
    });
}
