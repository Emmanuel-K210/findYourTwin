import { FundBothGame } from "./displayer.mjs";

const screen = new FundBothGame();
//Lancer le jeu
screen.deploy();
const divGame = document.querySelector("#game-container");
const items = [...divGame.children];

//Melanger le contenu 
function mixedContent() {
    for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i));
        [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => divGame.appendChild(item));
}
//Le panneau d'affichage score ... temps de jeu nombre d'interaction
//Inialisation du dashboard
const dashbord = document.createElement("div");
dashbord.classList.add("dashbord");
document.body.prepend(dashbord);
//Creation du container pour le score et pour le nombre de click
const scoreDisplay = document.createElement("p");
const clickNumberDisplay = document.createElement("p");
const timeDisplay = document.createElement("p");
//Initialiser le score et le nombre de clique 
scoreDisplay.innerHTML = messageScoreDisplay(screen.score);
clickNumberDisplay.innerHTML = messageNumberClick(screen.click);
timeDisplay.innerHTML = format(0, 0);
//Ajouter le score au Dom
dashbord.appendChild(scoreDisplay);
dashbord.appendChild(clickNumberDisplay);
dashbord.appendChild(timeDisplay);
//Configuration de l'Interval
let intervalId;

divGame.addEventListener("click", (e) => {
    if (e.target.dataset === e.currentTarget.dataset) {
        e.preventDefault();
    } else {
        //Mise a jour du score et du nombre de clique
        scoreDisplay.innerHTML = messageScoreDisplay(screen.score);
        clickNumberDisplay.innerHTML = messageNumberClick(screen.click);
        if (screen.isWinner) {
            winner();
        }
        if (screen.click === 1) {
            startConunter();
        }

    }
});

//Gestion du temps
let time = 0;
function startConunter() {
    intervalId ??= setInterval(function () {
        time++;
        const minute = Math.floor(time / 60);
        const seconde = time % 60;
        timeDisplay.innerHTML = format(minute, seconde);
    }, 1000);
}

function format(minute, second) {
    return `${formatTime(minute)} : ${formatTime(second)}`
}


function formatTime(value) {
    const val = value + '';
    return val.length !== 2 ? '0' + val : val;
}

//Le contenu du dashbord
function messageScoreDisplay(value) {
    return "Votre score :" + value;
}

function messageNumberClick(clickValue) {
    return "Nombre de clique :" + clickValue;
}

//Au Chargement du Dom 
window.addEventListener("DOMContentLoaded", (e) => {
    mixedContent();
})

//Message apres un win...!
function winner() {
    alert(`Bien Joué! en ${format(Math.floor(time / 60), time % 60)} avec ${screen.click} clique  
        \n votre score est de ${screen.score} \n Appuyer sur "Ok" pour réessayer
        `);
    screen.score = 0
    scoreDisplay.innerHTML = messageScoreDisplay(screen.score);
    clickNumberDisplay.innerHTML = messageNumberClick(screen.click);
    mixedContent();
    screen.reset();
    clearInterval(intervalId);
    intervalId = null;
    time = 0; 
}