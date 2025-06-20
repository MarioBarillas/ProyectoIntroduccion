const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")

let gameover = false
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High score: ${highScore}`;

function changeFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    document.getElementById("gameOverPopup").style.display = "flex";
    //location.reload();
}

function restartGame() {
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } 
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    //initgame();
}

const initgame = () => {
    if(gameover) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"><</div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore<
        localStorage.setItem("high-score")
        scoreElement.innerHTML = `score: ${score}`;

        highScoreElement.innerHTML = `High score: ${highScore}`;
    }
    
    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }  


    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <=0 || snakeY > 30){
       gameover = true;
    }

    for(let i = 0;  i < snakeBody.length; i++){
        //htmlMarkup += `<div class="food" style="grid-area: ${foodX} / ${foodY}"></div>`;
         htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if( i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameover = true;
        }
    playBoard.innerHTML = htmlMarkup;
}
}

changeFoodPosition();
//initgame();
setIntervalId = setInterval(initgame, 125);
document.addEventListener("keydown", changeDirection);