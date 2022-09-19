// const cell = document.querySelectorAll(".cell");
// const winningCondition = []

const cell = document.querySelector(".cell")
cell.addEventListener("click", () => {
    cell.innerHTML = "<img src='img/circleSign.png'>";
})
//How to switch player?
//How to stop once I clicked?
    //element.addEventListener("click", listerner, {once:true})
    //the listener will be removed once "click" happened. (not allowed to click 2nd time.)