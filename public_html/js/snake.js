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

var difficulty;
var play;
var da;
var annocanda;
var Score;

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
    rulScreen = document.getElementById("rulScreen");
    conScreen = document.getElementById("conScreen");
    //   centerMenuPosition(gameOverMenu);

    document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    hardButton.addEventListener("click", hardStart);
    medButton.addEventListener("click", medStart);
    easyButton.addEventListener("click", easyStart);

    wtcontrol.addEventListener("click", controls);
    ruls.addEventListener("click", rules);
    backop.addEventListener("click", back);
    rezum.addEventListener("click", resume);
    backcon.addEventListener("click", backcont);
    controlstrt.addEventListener("click", controlstart);
    rulestrt.addEventListener("click", rulestart);

    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");
    gmscoreboard = document.getElementById("gmscoreboard");

    setState("gameStart");

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

function gameRestart() {


    setState("gameStart");
    hideMenu(gameOverMenu);

}

/*-----------------------------------------------------------------------------
 * Difficulties
 * ----------------------------------------------------------------------------
 */

function hardStart() {

    snakeInitialize();
    foodInitialize();
    clearInterval(myspeed);
    clearInterval(fast);
    clearInterval(slow);
    clearInterval(med);
    clearInterval(annocanda);
    fast = setInterval(gameLoop, 30);
    setState("PLAY");
    hideMenu(gameStartMenu);
    difficulty = "hard";
}

function medStart() {

    snakeInitialize();
    foodInitialize();
    clearInterval(myspeed);
    clearInterval(fast);
    clearInterval(slow);
    clearInterval(med);
    clearInterval(annocanda);
    med = setInterval(gameLoop, 55);
    setState("PLAY");
    hideMenu(gameStartMenu);
    difficulty = "medium";
}

function easyStart() {

    snakeInitialize();
    foodInitialize();
    clearInterval(myspeed);
    clearInterval(fast);
    clearInterval(slow);
    clearInterval(med);
    clearInterval(annocanda);
    slow = setInterval(gameLoop, 75);
    setState("PLAY");
    hideMenu(gameStartMenu);
    difficulty = "easy";
}

/*-----------------------------------------------------------------------------
 *Options Screen/Pause Screen 
 * ----------------------------------------------------------------------------
 */

function controls() {
    hideMenu(opScreen);
    displayMenu(conScreen);
    da = "no";
}

function rules() {
    hideMenu(opScreen);
    displayMenu(rulScreen);
    da = "no";
}

function resume() {
    hideMenu(opScreen);
    if (difficulty == "easy") {
        slow = setInterval(gameLoop, 75);
    }
    else if (difficulty == "hard") {
        fast = setInterval(gameLoop, 30);
    }
    else if (difficulty == "medium") {
        med = setInterval(gameLoop, 55);
    }
    else if (difficulty == "ann{") {

    }
}

function back() {
    hideMenu(rulScreen);

    if (da == "yes") {
        displayMenu(gameStartMenu);
    }

    if (da == "no") {
        displayMenu(opScreen);
    }
}

function backcont() {
    hideMenu(conScreen);

    if (da == "yes") {
        displayMenu(gameStartMenu);
    }

    if (da == "no") {
        displayMenu(opScreen);
    }
}
function controlstart() {
    hideMenu(gameStartMenu);
    displayMenu(conScreen);
    da = "yes";
}

function rulestart() {
    hideMenu(gameStartMenu);
    displayMenu(rulScreen);
    da = "yes";
}
/*-----------------------------------------------------------------------------
 * snake Functions
 * ----------------------------------------------------------------------------
 */
function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = 30;
    snakeDirection = "down";
    foodSize = 30;

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

    if (event.keyCode == "76" && play == "true") {
        var age = prompt("whats yor cheat code?");

        /*-----------------------------------------------------------------------------
         * Cheat Codes
         * ----------------------------------------------------------------------------
         */

        if (age == "snaklong" && play == "true") {

            var cheat = 25;
            for (var index = cheat - 1; index >= 0; index--) {
                snake.push({
                    x: snakeHeadX,
                    y: snakeHeadY
                });
            }
            snakeLength + 25;
        }
        else if (age == "superlongsnak" && play == "true") {
            var cheat1 = 100;
            for (var index = cheat1 - 1; index >= 0; index--) {
                snake.push({
                    x: snakeHeadX,
                    y: snakeHeadY
                });
            }
            snakeLength + 25;
        }
        else if (age == "amazscore" && play == "true") {
            snakeLength === 1000;
        }
        else if (age == "annaconda" && play == "true") {
            confirm("Annaconda mode unlocked");
            difficulty = "ann";
            clearInterval(myspeed);
            clearInterval(fast);
            clearInterval(slow);
            clearInterval(med);
            clearInterval(annocanda);
            annocanda = setInterval(gameLoop, 10);
        }
        else {
            confirm("Code is invalid");
        }




    }
    /*-----------------------------------------------------------------------------
     * Pause Screen
     * ----------------------------------------------------------------------------
     */

    if (event.keyCode == "80" && play == "true") {
        displayMenu(opScreen);
        clearInterval(myspeed);
        clearInterval(fast);
        clearInterval(slow);
        clearInterval(med);
        clearInterval(annocanda);
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

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
    for (var index = 1; index < snake.length; index++) {
        if (snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
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

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "gameOver") {
        displayMenu(gameOverMenu);
        gmscoreboard.innerHTML = "Score:" + (snakeLength * 10 - 30);
        hideMenu(playHUD);
        play = "false";
    }
    else if (state == "PLAY") {
        displayMenu(playHUD);
        play = "true";
    }

    if (state == "gameStart") {
        displayMenu(gameStartMenu);
        play = "false";
    }

    if (state == "opScreen") {
        displayMenu(opScreen);
        play = "false";
    }

    if (state == "rulScreen") {
        displayMenu(rulScreen);
        play = "false";
    }

    if (state == "conScreen") {
        displayMenu(conScreen);
        play = "false";
    }
}
function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

/*-----------------------------------------------------------------------------
 * Score Board
 * ----------------------------------------------------------------------------
 */

function drawScoreboard() {
    Score = "Score:" + (snakeLength * 10 - 30);
    scoreboard.innerHTML = Score;
}








/*-----------------------------------------------------------------------------
 * function restartGame() {
 *       gameInitialize();
 *       snakeInitialize();
 *       foodInitialize();
 *       setInterval(gameLoop, 10000);
 *       checkWallCollisons(null);
 *  }
 *
 * 
 * ----------------------------------------------------------------------------
 */