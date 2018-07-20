// Definition of canvas variables
var canvas = document.getElementById("TheBestCanvasInAmerica");
var ctx = canvas.getContext('2d');
var x = canvas.width/2
var y = canvas.height/2

// Definition of ball and direction variables
var radius = 10
var xDir = 1;
var yDir = 1;

// Definition of paddle variables
var paddleWidth = 100;
var paddleHeight = 10;
var paddleX = canvas.width/2 - paddleWidth/2;
var rightPress = false;
var leftPress = false;

// Addition of event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
canvas.addEventListener("mousemove", mouseHandler);

// Definition of brick variables
var brickHeight = 20;
var brickWidth = 50;
var brickGapX = 15;
var brickGapY = 25;
var bricks = [];
var numRows = 3;
var numCols = 11;

// Definition of brick (object) function
function brick(x, y, width, height, outerColor, innerColor, status){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.outerColor = outerColor;
    this.innerColor = innerColor;
    this.status = status;

    this.draw = function(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.innerColor;
        ctx.fill();
        ctx.strokeStyle = this.outerColor;
        ctx.stroke();
        ctx.closePath();
    }
}

// Function that detects key up input
function keyUpHandler(event){
    if (event.keyCode == 39){
        rightPress = false;
    }
    if (event.keyCode == 37){
        leftPress = false;
    }
}

// Function that detects key down input
function keyDownHandler(event){
    if (event.keyCode == 39){
        rightPress = true
    }
    else if (event.keyCode == 37){
        leftPress = true
    }
}

// Function that detects mouse movement
function mouseHandler(event){
    if (paddleWidth/2 < event.clientX && event.clientX < canvas.width - paddleWidth/2 ){
        paddleX = event.clientX - paddleWidth/2
    }
}

// Function that draws the ball for the game
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "#0072DA"
    ctx.fill();
}

// Function that draws the paddle for the game
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000000"
    ctx.fill();
    ctx.closePath();
}

// Alternative method of paddle movement
/* document.addEventListener('keydown', function(keyPress)
    {
    if (event.keyCode == 37){
        moveLeft();
    }
    if (event.keyCode == 39){
        moveRight();
    }
});


function moveLeft(){
    paddleX += -10
}

function moveRight(){
    paddleX += 10
}
*/

function createBricks(){
var brickX = 45,
    brickY = 80;
    
    for (var col = 0; col < numCols; col++){
    bricks[col] = [];
        for (var row = 0; row < numRows; row++){
            bricks[col][row] = new brick(
                col * (brickWidth + brickGapX) + brickX,
                row * (brickHeight + brickGapY) + brickY,
                brickWidth,
                brickHeight,
                "#8b0000",
                "#FF0000",
                1)
        }
    }
}

function drawBricks(){
    for (var col = 0; col < numCols; col++){
        for (var row = 0; row < numRows; row++){
            if (bricks[col][row].status != 0)
            bricks[col][row].draw();
        }
    }
}


// Function that repeats the various embedded functions
function render(){
    // Clears canvas on each render
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // Draws the ball on each render
    drawBall();
    // Ball-Paddle collision detection
    if (y + 2*radius >= canvas.height && x >= paddleX && x <= paddleX + paddleWidth){
        yDir = yDir*yDir*-1;
    }
    else if (y - radius <= 0){
        yDir = -yDir
    }
    
    // Ball-Wall collision detection (Restart)
    if (y + radius > canvas.height || y - radius < 0){
        yDir = -yDir;
        restartGame();
    }
    if (x + radius > canvas.width || x - radius < 0){
        xDir = -xDir
    }

    // Ball-Brick collision detection
    

    // Direction change on ball-wall collision
    x = x + xDir
    y = y + yDir

    // Draws paddle on each render
    drawPaddle();
    // Right/Left movement control
    if (rightPress == true && paddleX + paddleWidth < canvas.width){
        paddleX += 2
    }
    if (leftPress == true && paddleX > 0){
        paddleX += -2
    }

    // Drawing the bricks (objects)
    createBricks();
    drawBricks();
}

// Restarts the game upon alert acknowledgement
function restartGame(){
    x = canvas.width/2
    y = canvas.height/2
    paddleX = canvas.width/2 - paddleWidth/2
    leftPress = rightPress = false

}

// Variable that defines the refresh rate of the game to be 10ms
var myGame = setInterval(render, 5);
