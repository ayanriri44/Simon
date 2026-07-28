let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highest = 0;

let h2 = document.querySelector("#press");
let high = document.querySelector("#high");

let highestScore = Number(localStorage.getItem("highestScore")) || 0;


document.addEventListener("keypress", function () {
    if(started == false) {
        started = true;
        
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    playSound();
    btnFlash(randBtn);
}


function checkAns(idx) {

    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length == userSeq.length) {
            setTimeout(levelUp(), 1000);
        }
    } else {
        wrongClick();
        if(level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        } 
        h2.innerHTML = `Game Over! Your Score : <b>${level}</b> <br>Press Any Key To Start Again`;
        high.innerHTML = `Highest Score : ${highestScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 200);
        reset();
    }
}


function btnPress() {
    let btn = this;
    btnFlash(btn);
    playSound();

    btnColor = btn.getAttribute("id");
    userSeq.push(btnColor);
    checkAns(userSeq.length-1);
}


let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


let clickSound = new Audio("sounds/click.mp3");
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

let gameOver = new Audio("sounds/wrong.mp3");
function wrongClick() {
    gameOver.currentTime = 0;
    gameOver.play();
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}