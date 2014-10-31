/*-----------------------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------------------
 */
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var context;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;
var gameStartMenu;
var playHUD;

var scoreboard;

var speed;
var fast;
var slow;
var med;
/*-----------------------------------------------------------------------------
 * Function Callers- tell functions to activate.
 * ----------------------------------------------------------------------------
 */
gameInitialize();
snakeInitialize();
foodInitialize();
var myspeed = setInterval(gameLoop, 35);
/*-----------------------------------------------------------------------------
 * Functions- tell website what to do and can be used whenever.(these are game ones)
 * ----------------------------------------------------------------------------
 */

function gameInitialize() {
    
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
    
    gameStartMenu = document.getElementById("gameStart");
    gameOverMenu = document.getElementById("gameOver");
    opScreen = document.getElementById("opScreen");
    
 //   centerMenuPosition(gameOverMenu);
    
    document.getElementById("restartButton");
    restartButton.addEventListener("click",gameRestart);
    
    hardButton.addEventListener("click",hardStart);
    medButton.addEventListener("click",medStart);
    easyButton.addEventListener("click",easyStart);
    
    wtcontrol.addEventListener("click",controls);
    ruls.addEventListener("click",rules);
    rezum.addEventListener("click",resume);
    
    
    
    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");
    gmscoreboard = document.getElementById("gmscoreboard");
    
    setState("opScreen");
    
    speed = 35;
}
/*-----------------------------------------------------------------------------
 * Function Caller that repeats the calls.
 * ----------------------------------------------------------------------------
 */

function gameLoop() {
    gameDraw();
    drawScoreboard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}
/*-----------------------------------------------------------------------------
 * Continuation of game Functions
 * ----------------------------------------------------------------------------
 */
function gameDraw() {
    context.fillStyle = "rgb(26,46,145)";
    context.fillRect(0, 0, screenWidth, screenHeight);


}

function gameRestart (){
 

 setState("gameStart");
 hideMenu(gameOverMenu);
 
 }
 
 function hardStart(){
     
     snakeInitialize();
 foodInitialize();
 clearInterval(myspeed);
 clearInterval(fast);
 clearInterval(slow);
 clearInterval(med);
 fast = setInterval(gameLoop, 30);
 setState("PLAY");
 hideMenu(gameStartMenu);
 }
 
 function medStart(){
     
     snakeInitialize();
 foodInitialize();
 clearInterval(myspeed);
 clearInterval(fast);
 clearInterval(slow);
 clearInterval(med);
 med = setInterval(gameLoop, 55);
 setState("PLAY");
 hideMenu(gameStartMenu);
 }
 
 function easyStart(){
     
     snakeInitialize();
 foodInitialize();
 clearInterval(myspeed);
 clearInterval(fast);
 clearInterval(slow);
 clearInterval(med);
 slow = setInterval(gameLoop, 100);
 setState("PLAY");
 hideMenu(gameStartMenu);
 }
 
 function controls() {
     confirm("you are in controls");
 }
 
 function rules() {
     confirm("you are in rules");
 }
 
 function resume() {
     confirm("you are in resume");
 }
/*-----------------------------------------------------------------------------
 * snake Functions
 * ----------------------------------------------------------------------------
 */
function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = 40;
    snakeDirection = "down";
    foodSize = 36;

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }

}



function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "black";    
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
      
    }
}
function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection === "down") {
        snakeHeadY++;
    }
    else if (snakeDirection === "right") {
        snakeHeadX++;
    }
    else if (snakeDirection === "left") {
        snakeHeadX--;
    }
    else if (snakeDirection === "up") {
        snakeHeadY--;
    }

    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);
    
    keyboardHandler(snakeHeadX, snakeHeadY);
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}
/*-------------------------------------------------------------------------
 * Food Functions
 * ------------------------------------------------------------------------
 */
function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "red";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, foodSize, foodSize);
}

function setFoodPosition() {
    var RandomX = Math.floor(Math.random() * screenWidth);
    var RandomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(RandomX / snakeSize);
    food.y = Math.floor(RandomY / snakeSize);
}

/*-------------------------------------------------------------------------
 * Input Functions
 * ------------------------------------------------------------------------
 */

function keyboardHandler(event, snakeHeadX, snakeHeadY) {


    if (event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if (event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }

    if (event.keyCode == "76") {
        console.log("L");
        var cheat = 25;
        for (var index = cheat - 1; index >= 0; index--) {
            snake.push({
                x: snakeHeadX,
                y: snakeHeadY
            });
        }
        snakeLength++;
        ;
        confirm('you are using the lenght hack');


    }


    if (event.keyCode == "80") {
        displayMenu(opScreen);
    }


}

/*-------------------------------------------------------------------------
 * Collision Handling
 * ------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX === food.x && snakeHeadY === food.y) {
        console.log("get it");
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        setFoodPosition();
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0 || snakeHeadY * snakeSize >= screenHeight + 3 || snakeHeadY * snakeSize < 0) {
       setState("gameOver");

    }
    ;
}

function checkSnakeCollisions (snakeHeadX, snakeHeadY) {
    for(var index = 1; index < snake.length; index++){
        if(snakeHeadX == snake[index].x && snakeHeadY == snake[index].y){
            setState("gameOver");
            return;
        }
    } 
}
/*-----------------------------------------------------------------------------
 * gameState Handling
 * ----------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
    showMenu(state);
}

/*-----------------------------------------------------------------------------
 * Menu Functions
 * ----------------------------------------------------------------------------
 */

function displayMenu(menu){
    menu.style.visibility = "visible";
}

function hideMenu(menu){
    menu.style.visibility = "hidden";
}

function showMenu (state) {
    if(state == "gameOver") {
        displayMenu(gameOverMenu);
        gmscoreboard.innerHTML = "Score:" + (snakeLength * 10 - 30);
        hideMenu(playHUD);
    }
    else if(state == "PLAY"){
        displayMenu(playHUD);
    }
    
    if(state == "gameStart") {
        displayMenu(gameStartMenu);
    }
    
    if(state == "opScreen") {
        displayMenu(opScreen);
    }
}

function centerMenuPosition(menu){
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard(){
    scoreboard.innerHTML = "Score:" + (snakeLength * 10 - 30);
}









function restartGame (){
 gameInitialize();
 snakeInitialize();
 foodInitialize();
 setInterval(gameLoop, 10000);
 checkWallCollisons(null);
 }