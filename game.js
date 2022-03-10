

alert("This website is not suitable for mobiles and tablets.")

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// detecting the key board press
$(document).keydown(function () {
  if (!started) {
    $("#level-title").html("level " + level);
    nextSequence();
    started = true;
  }
});


// creating the user ClickedPattern
$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);


  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  // checking the last userClickedPattern;
  checkAnswer(userClickedPattern.length - 1);
});


// checking the answer with userChoosenColor with randomChoosenColour
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    // playing the different audio so that user can know what is going on
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    // showing the red background color for 2 seconds so that the user can realize he/she is going wrong
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // showing the heading tag to game over
    $("h1").html("Game Over, Press Any Key to Restart");

    // Restarting the game.
    startOver();
  }
}


// creating a GamePattern
function nextSequence() {
  // reseting userClickedPattern
  userClickedPattern =[];

  // increasing the level by 1 every time the nextSequence is called by the functions
  level++;
  $("#level-title").html("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];

  // pushing the randomChoosenColour to game Pattern
  gamePattern.push(randomChoosenColour);


  // adding animations and sounds.

    // animations
    $("." + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // sounds
    playSound(randomChoosenColour);
}



// playing clicked pattern
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// animating the buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  })
}


// start over function when the game is Over
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
