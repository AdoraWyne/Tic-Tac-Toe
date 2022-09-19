const cells = document.querySelectorAll(".cell");
const winningCondition = []
const restartButton = document.querySelector("button")

cells.forEach((cell)=>{
    cell.addEventListener("click", ()=> {
        cell.innerHTML = "<img src='img/circleSign.png'>";
        const audio = new Audio("audio/clickSound.mp3");
        audio.play();
    }, {once: true})
})



//How to switch player?
//Winning condition
//Displaying winning message
//Restarting the game
// restartButton.addEventListener("click", () => {
    
// })

//Partly Done
//How to stop once I clicked?
    //element.addEventListener("click", listerner, {once:true})
    //the listener will be removed once "click" happened. (not allowed to click 2nd time.)