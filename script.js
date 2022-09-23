const cells = document.querySelectorAll(".cell");

//Iterating each cell when click event happens, only run playerSwitch func & letsPlay func when the cell is empty
cells.forEach((cell)=>{
    cell.addEventListener("click", () => {
        if (cell.classList.contains("circle") === false && cell.classList.contains("cross") === false)
        {
            playerSwitch(cell);
            letsPlay();
        }
    })
})

//Switch Player
let currentPlayer = "X";
const displayCurrentPlayer = document.querySelector(".displayCurrentPlayer")

const playerSwitch = (cell) => {
    if (currentPlayer === "X") {
        cell.classList.add("cross");
        playerX.push(cell);
        displayCurrentPlayer.textContent = "player O's Turn";
        currentPlayer = "O";
    } else if (currentPlayer === "O") {
        cell.classList.add("circle");
        playerO.push(cell);
        displayCurrentPlayer.textContent = "player X's Turn";
        currentPlayer ="X";
    }
    clickAudio.play();
}

//Winning condition
const winningConditions = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]]
];
//1. Setup variables for diff players' selection & use push() to store it.
let playerX = [];
let playerO = [];

//2. Use some(), every() & includes() method to check player's selection against winning condition
const checkPlayerWin = (player) => {
    const win = winningConditions.some((winningCondition)=> {
            return winningCondition.every((winningConditionValue)=>{
                return player.includes(winningConditionValue)
            })
    })
    return win;
}

//3. Created letsPlay function: When someone win or draw
    //a. For the draw, when the board is full (x.length = 5, O.length = 4), check if both player are lose.
    //b. when someone win, bring up the winning msg and play-again button.

//For displaying win or draw msg:
const winningMsg = document.createElement("p");
const playAgainButton = document.createElement("button")
const divResultMsg = document.querySelector(".result-msg")
//For updating scoreboard:
const playerXScore = document.querySelector(".playerXScore")
const playerOScore = document.querySelector(".playerOScore")
let Xscore = 0;
let Oscore = 0;
//All the audio:
const clickAudio = new Audio("audio/clickSound.mp3");
const loseAudio = new Audio("audio/losingSound.wav");
const winAudio = new Audio("audio/winningSound.wav");

//To play the game: what happens when win or draw?
const letsPlay= () => {
    //Draw
    if (playerX.length === 5 && playerO.length === 4) {
        if (checkPlayerWin(playerX) === false && checkPlayerWin(playerO) === false) {
            //Display the draw msg
            winningMsg.textContent = "We both winner!"
            divResultMsg.classList.add("winning-msg");
            divResultMsg.appendChild(winningMsg);
            //Edit the Play Again Button
            playAgainButton.textContent = "Let's play again!"
            divResultMsg.appendChild(playAgainButton);
            //Added audio
            loseAudio.play();
            return;
        }
    }
    //Win
    if (playerX.length >= 3){
        if (checkPlayerWin(playerX)) {
            //Add score
            playerXScore.innerText = ++Xscore;
            winGame("player X");
        } else if (checkPlayerWin(playerO)) {
            //Add score
            playerOScore.innerText = ++Oscore;
            winGame("player O");
        }
    }
} 

//when someone win
const winGame = (winner) => {
    //Display the win or draw msg
    winningMsg.textContent = `${winner} wins!`
    divResultMsg.classList.add("winning-msg");
    divResultMsg.appendChild(winningMsg);
    //Edit the Play Again Button
    playAgainButton.textContent = "Let's play again!"
    divResultMsg.appendChild(playAgainButton);
    //Added audio
    winAudio.play();
}

//Play the game again or Reset the game
playAgainButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.classList.remove("cross", "circle")
    })
    playerX = [];
    playerO = [];
    currentPlayer = "X";
    displayCurrentPlayer.textContent = "player X Starts First"
    winningMsg.remove();
    divResultMsg.classList.remove("winning-msg");
    playAgainButton.remove();
})

//Restarting the game
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", () => {
    document.location.reload();
})

//To mute & unmute the audio
const soundOn = document.querySelector(".soundOn");
let sound = 1;
soundOn.addEventListener("click", (event) => {
    if (sound === 1) {
        soundOn.innerHTML = "<img src='img/mute.png' alt='Mute On'>"
        soundOn.className = "muteOn"
        clickAudio.muted = true;
        loseAudio.muted = true;
        winAudio.muted = true;
        sound = 0;
    } else if (sound === 0) {
        const muteOn = document.querySelector(".muteOn");
        muteOn.innerHTML = "<img src='img/sound.png' alt='Sound On'>"
        muteOn.className = "soundOn"
        clickAudio.muted = false;
        loseAudio.muted = false;
        winAudio.muted = false;
        sound = 1;
    }
})
