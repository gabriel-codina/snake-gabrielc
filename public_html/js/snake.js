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

/*-----------------------------------------------------------------------------
 * Function Callers- tell functions to activate.
 * ----------------------------------------------------------------------------
 */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 100);
/*-----------------------------------------------------------------------------
 * Functions- tell website what to do and can be used whenever.(these are game ones)
 * ----------------------------------------------------------------------------
 */

function gameInitialize(){
    confirm('Click ok if you want to start');
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
   
   document.addEventListener("keydown", keyboardHandler);
}
/*-----------------------------------------------------------------------------
 * Function Caller that repeats the calls.
 * ----------------------------------------------------------------------------
 */

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}
/*-----------------------------------------------------------------------------
 * Continuation of game Functions
 * ----------------------------------------------------------------------------
 */
function gameDraw() {
    context.fillStyle = "rgb(26,46,145)";
    context.fillRect(0, 0, screenWidth, screenHeight);
    
    
}
/*-----------------------------------------------------------------------------
 * snake Functions
 * ----------------------------------------------------------------------------
 */
function snakeInitialize(){
    snake = [];
    snakeLength = 5;
    snakeSize = 60;
    snakeDirection = "down";
    foodSize = 60;
    
    for (var index = snakeLength - 1; index >= 0; index--){
    snake.push({
        x: index,
        y: 0
    });
}
    
}



function snakeDraw(){
    for (var index = 0; index < snake.length; index++){
        context.fillStyle = "black";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}
function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if(snakeDirection === "down") {
        snakeHeadY++;
    }
    else if(snakeDirection === "right") {
        snakeHeadX++;
    }
    else if(snakeDirection === "left") {
        snakeHeadX--;
    }
    else if(snakeDirection === "up") {
        snakeHeadY--;
    }
    
   checkFoodCollisions(snakeHeadX, snakeHeadY);
   checkWallCollisions(snakeHeadX, snakeHeadY);
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
    function foodInitialize(){
        food = {
            x: 0,
            y: 0
        };
        setFoodPosition();                          
    }
    
    function foodDraw(){
        context.fillStyle = "red";
        context.fillRect(food.x * snakeSize, food.y * snakeSize, foodSize, foodSize);
    }
    
    function setFoodPosition(){ 
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
        
        
        if(event.keyCode == "39" && snakeDirection != "left") {
            snakeDirection = "right";
        }        
        else if(event.keyCode == "37" && snakeDirection != "right") {
            snakeDirection = "left";
        }       
        else if(event.keyCode == "38" && snakeDirection != "down") {
            snakeDirection = "up";
        }
        else if(event.keyCode == "40" && snakeDirection != "up") {
            snakeDirection = "down";
        }
        
        if(event.keyCode == "76") {
            console.log("L");
            var cheat = 25;
            for (var index = cheat - 1; index >= 0; index--){
    snake.push({
        x: snakeHeadX,
        y: snakeHeadY
    });
}
           snakeLength++;;
           confirm('you are using the lenght hack');
        
            
        }
        
          
        if(event.keyCode == "80") {
            confirm('PAUSE');
        }   
        
        
        }
   
    /*-------------------------------------------------------------------------
     * Collision Handling
     * ------------------------------------------------------------------------
     */
    
    function checkFoodCollisions (snakeHeadX, snakeHeadY) {
        if(snakeHeadX === food.x && snakeHeadY === food.y){
            console.log("get it");
            snake.push({
                x: 0,
                y: 0
            });
            snakeLength++;
            setFoodPosition();
        }
    }
    
    function checkWallCollisions (snakeHeadX, snakeHeadY) {
        if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0 ||snakeHeadY * snakeSize >= screenHeight+3 || snakeHeadY * snakeSize < 0) {
            console.log("Wall Collision");
            confirm('You Dead');
            restartGame();

        };
    }
    
    function restartGame (){
        gameInitialize();
        snakeInitialize();
foodInitialize();
setInterval(gameLoop, 10000);
checkWallCollisons(null);
    }    