const cells = document.querySelectorAll(".cell");

//How to stop once I clicked?
    //element.addEventListener("click", listerner, {once:true})
    //the listener will be removed once "click" happened. (not allowed to click 2nd time.)
cells.forEach((cell)=>{
    cell.addEventListener("click", (event) => {
        const cell = event.target;
        playerSwitch(cell);
        letsPlay();
    }, {once:true})
})

//How to switch player?
let currentPlayer = "X";
const displayCurrentPlayer = document.querySelector(".displayCurrentPlayer")
const playerSwitch = (cell) => {
    if (currentPlayer === "X") {
        cell.innerHTML = "<img src='img/crossSign.png'>";
        playerX.push(cell);
        displayCurrentPlayer.textContent = "player O Turns"
        currentPlayer = "O";
    } else if (currentPlayer === "O") {
        cell.innerHTML = "<img src='img/circleSign.png'>";
        playerO.push(cell);
        displayCurrentPlayer.textContent = "player X Turns"
        currentPlayer ="X";
    }
    const clickAudio = new Audio("audio/clickSound.mp3");
    clickAudio.play();
}

//Winning condition
    //0. Setup a winning condition
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
    //1. Setup variables for diff players' selection
    //2. Store players' choice selection using push() method
    //These 2 line of code below keep track of the selection the player chose
    let playerX = []
    let playerO = []
   
    // 3. Use some() method to check player's selection against winning condition
    // const playerXWin = winningConditions.some((winningCondition)=> {
    //     return winningCondition = playerX
        // })

    const checkPlayerWin = (player) => {
        const win = winningConditions.some((winningCondition)=> {
                return winningCondition.every((winningConditionValue)=>{
                  return player.includes(winningConditionValue)
                })
        })
        return win;
    }

    //Draw condition
    //Displaying winning message & drawing message
    //1. when one of the players win, display the win msg -> prolly need to do a win function or if..else?
    //2. Inside the win function or IF..ElSE, can use element.classList.add("winning-msg")
        //a. Added class=".winning-msg" style in CSS for this winning message styling
        //b. For the draw, when the board is full (x.length = 5, O.length = 4), check if both player are lose.
            //If yes, then display the draw msg. 

    const winningMsg = document.createElement("p");
    const playAgainButton = document.createElement("button")
    const divResultMsg = document.querySelector(".result-msg")

    const letsPlay= () => {
        if (playerX.length === 5 && playerO.length === 4) {
            if (checkPlayerWin(playerX) === false && checkPlayerWin(playerO) === false) {
                //Display the win or draw msg
                winningMsg.textContent = "We both winner!"
                divResultMsg.classList.add("winning-msg");
                divResultMsg.appendChild(winningMsg);
                //Edit the Play Again Button
                playAgainButton.textContent = "Let's play again!"
                divResultMsg.appendChild(playAgainButton);
                const loseAudio = new Audio("audio/losingSound.wav");
                loseAudio.play();
                return;
            }
        }
        if (playerX.length >= 3){
            if (checkPlayerWin(playerX)) {
                winningMsg.textContent = "player X win!"
                divResultMsg.classList.add("winning-msg");
                divResultMsg.appendChild(winningMsg);
                //Edit the Play Again Button
                playAgainButton.textContent = "Let's play again!"
                divResultMsg.appendChild(playAgainButton);
                const winAudio = new Audio("audio/winningSound.wav");
                winAudio.play();
            } else if (checkPlayerWin(playerO)) {
                winningMsg.textContent = "player O win!"
                divResultMsg.classList.add("winning-msg");
                divResultMsg.appendChild(winningMsg);
                //Edit the Play Again Button
                playAgainButton.textContent = "Let's play again!"
                divResultMsg.appendChild(playAgainButton);
                const winAudio = new Audio("audio/winningSound.wav");
                winAudio.play();
            }
        }
    } 


//Restarting the game
// const restartButton = document.querySelector(".restart");
//     restartButton.addEventListener("click", () => {
//         document.location.reload();
//     })

playAgainButton.addEventListener("click", () => {
    document.location.reload();
})

// const buttons = document.querySelectorAll("button");
// buttons.forEach((button)=>{
//     button.addEventListener("click", () => {
//         document.location.reload();
//     })
// })
