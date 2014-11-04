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
var myspeed = setInterval(gameLoop, 20);
var draw = setInterval(snakeDraw, 10);
/*-----------------------------------------------------------------------------
 * Functions- tell website what to do and can be used whenever.(these are game ones)
 * ----------------------------------------------------------------------------
 */

function gameInitialize() {

    var canvas = document.getElementById("an-screen");
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth - 200;
    screenHeight = window.innerHeight - 100;

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

    setState("PLAY");

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
        
        foodDraw();
        
    }
}
/*-----------------------------------------------------------------------------
 * Continuation of game Functions
 * ----------------------------------------------------------------------------
 */
function gameDraw() {
    
var img = new Image();
  img.onload = function(){
    context.drawImage(img,0, 0, screenWidth, screenHeight);
    
  };
  img.src = 'data:image/jpeg;base64,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';
  
}


function gameRestart() {

location.href = 'index.html';
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

function anstart() {
    confirm("Annaconda mode unlocked");
            difficulty = "ann";
            clearInterval(myspeed);
            clearInterval(fast);
            clearInterval(slow);
            clearInterval(med);
            clearInterval(annocanda);
            annocanda = setInterval(gameLoop, 1000);
}
/*-----------------------------------------------------------------------------
 * snake Functions
 * ----------------------------------------------------------------------------
 */
function snakeInitialize() {
    snake = [];
    snakeLength = 3;
    snakeSize = screenWidth / 40;
    snakeDirection = "down";
    foodSize = screenWidth / 40;

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
        context.strokeStyle = "white";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
       
        
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
        else if (age == "anaconda" && play == "true") {
            confirm("Annaconda mode unlocked");
            difficulty = "ann";
            clearInterval(myspeed);
            clearInterval(fast);
            clearInterval(slow);
            clearInterval(med);
            clearInterval(annocanda);
            annocanda = setInterval(gameLoop, 1000);
            location.href = 'anaconda.html';
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

