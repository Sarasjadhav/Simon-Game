let userseq = [];
let gameseq = [];
let buttons = ["btn1", "btn2", "btn3", "btn4"];
let level = 0;
let high_score = 0;
let started = false;
let strbtn = document.querySelector(".main-button");

strbtn.addEventListener("click", function () {
    if (started) {
        // User clicked "Quit The Game" - reset the game
        reset();

    } else {
        // User clicked "Start The Game" - start the game
        console.log("Game is Started");
        started = true;
        strbtn.innerText = "Quit The Game"; // Change button text to "Quit The Game"
        levelup();
    }
});

function levelup() {
    userseq = [];
    level++;
    let h2 = document.querySelector("h2");
    h2.innerText = `Level ${level}`;
    let ranidx = Math.floor(Math.random() * 4);

    let ranval = buttons[ranidx];
    let ranbtn = document.querySelector(`.${ranval}`);
    let ranid = ranbtn.getAttribute("id");

    gameseq.push(ranid);
    Gameflash(ranbtn);
}

function Gameflash(btn) {
    btn.classList.add("Gameflash");
    setTimeout(() => {
        btn.classList.remove("Gameflash");
    }, 250);
}

function Userflash(btn) {
    btn.classList.add("Userflash");
    setTimeout(() => {
        btn.classList.remove("Userflash");
    }, 250);
}

function checksequence(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        let h2 = document.querySelector("h2");
        let variable = level;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
        h2.innerHTML = `Game Over!<br>your score was <b>${variable}</b> Press start button again to start the game`;
    }
}

function btnpress() {
    let btn = this;
    let id = btn.getAttribute("id");
    userseq.push(id);
    Userflash(btn);
    checksequence(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".button");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    if (high_score < level) {
        high_score = level;
        let h2 = document.querySelector(".Highscore");
        h2.innerHTML = `Highest Score = ${level}`;
    }
    level = 0;
    gameseq = [];
    userseq = [];
    started = false; // Allow the game to be started again
    strbtn.innerText = "Start The Game"; // Update button text to prompt starting the game
    let h2 = document.querySelector("h2");
    h2.innerText = "Game Quit! Press start button again to start the game"; // Update quit message
}
