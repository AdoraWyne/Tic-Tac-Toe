const cells = document.querySelectorAll(".cell");

cells.forEach((cell)=>{
    cell.addEventListener("click", (event) => {
        const cell = event.target;
        playerSwitch(cell);
        letsPlay();
    }, {once:true})
})

//How to switch player?
let currentPlayer = "X";
const playerSwitch = (cell) => {
    if (currentPlayer === "X") {
        cell.innerHTML = "<img src='img/crossSign.png'>";
        playerX.push(cell);
        currentPlayer = "O";
    } else if (currentPlayer === "O") {
        cell.innerHTML = "<img src='img/circleSign.png'>";
        playerO.push(cell);
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

    const winningMsg = document.createElement("p");
    const divResultMsg = document.querySelector(".result-msg")

    const letsPlay= () => {
        if (playerX.length >= 3) {
            if (checkPlayerWin(playerX)) {
                winningMsg.textContent = "playerX win!"
                divResultMsg.classList.remove("result-msg");
                divResultMsg.classList.add("winning-msg");
                divResultMsg.appendChild(winningMsg);
                const winAudio = new Audio("audio/winningSound.wav");
                winAudio.play();
            } else if (checkPlayerWin(playerO)) {
                winningMsg.textContent = "playerO win!"
                divResultMsg.classList.remove("result-msg");
                divResultMsg.classList.add("winning-msg");
                divResultMsg.appendChild(winningMsg);
                const winAudio = new Audio("audio/winningSound.wav");
                winAudio.play();
            } 
        } 
    }


//Draw condition
//Displaying winning message & drawing message
    //1. when one of the players win, display the win msg -> prolly need to do a win function or if..else?
    //2. Inside the win function or IF..ElSE, can use element.classList.add("winning-msg")
        //a. added class=".winning-msg" style in CSS for this winning message styling

//Restarting the game
// const restartButton = document.querySelector("button");
// const restart = () => {
//     restartButton.addEventListener("click", (event) => {
//         playerX = []
//         playerO = []
//         cells.innerHTML = ""
//     })
// }


//Partly Done
//How to stop once I clicked?
    //element.addEventListener("click", listerner, {once:true})
    //the listener will be removed once "click" happened. (not allowed to click 2nd time.)