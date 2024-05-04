const boxs = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");


let currentPlayer;
let gridGame;
const winningPoition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//let's create a function to initilised the game
function initGame() {
    currentPlayer = "X";
    gridGame = ["", "", "", "", "", "", "", "", ""];
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
    //UI pr empty krna hoga jb new game btn pr click hoga

    boxs.forEach((box, index) => {
        box.innerText = "";
        boxs[index].style.pointerEvents = "all";
        //initialise box properties again
       box.classList = `box box${index+1}`; 
    })
}

initGame();

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI update 
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

function handleClick(index) {
    if (gridGame[index] === "") {
        boxs[index].innerText = currentPlayer;
        gridGame[index] = currentPlayer;
        boxs[index].style.pointerEvents = "none";
        // swap the term
        swapTurn();
        //check any one win the match
        checkGameOver();

    }

}


boxs.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);

function checkGameOver() {
    let answer = "";
    winningPoition.forEach((positions) => {
        //all 3 boxes should be non-empty and exactly same in value
        if ((gridGame[positions[0]] !== "" || gridGame[positions[1]] !== "" || gridGame[positions[2]]) !== "" &&
            (gridGame[positions[0]] === gridGame[positions[1]]) && (gridGame[positions[1]] === gridGame[positions[2]])) {
            // check if winner is X
            // if(gridGame[positions[0]] === "X"){
            //     answer = "X";
            // }else{
            //     answer = "O";
            // }
             gridGame[positions[0]] === "X" ? answer = "X" : answer = "O";

            // disable pointer events
            boxs.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            //now we know X/O is a winner
            boxs[positions[0]].classList.add("win");
            boxs[positions[1]].classList.add("win");
            boxs[positions[2]].classList.add("win");

        }
    });
    //if we hava a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player-${answer}`;
        newGamebtn.classList.add("active");
        


        return;
    }
    // let's checks there is tie
    let fillcount = 0;
    gridGame.forEach((box) => {
        if (box !== "")
            fillcount++;
    });
    //board is filled and game is tie
    if (fillcount === 9) {
        gameInfo.innerText = `Game Tie!`;
        newGamebtn.classList.add("active");
    }
}