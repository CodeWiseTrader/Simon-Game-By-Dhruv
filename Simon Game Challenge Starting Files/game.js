var buttonColours = ["red", "yellow", "blue", "green"]

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// todo: detection of key pressed
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

// todo: handler function |> click ///
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}); // * Clicked button in console 

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};

// ! random function ///
function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("level " + level);

    // todo: random selector
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // todo: the flash effect
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // todo: play the sound
    /* var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play(); */
    playSound(randomChosenColour);

    /*    $("div").click(function (e) {
           var userChosenColour = e.target.id;
           //console.log(userChosenColour);
           userClickedPattern.push(userChosenColour);
       }); */ // ? Clicked button in console

    /*     $("div[type='button']").click(function (e) {
            var userChosenColour = e.target.id;
            // console.log(userChosenColour);
            userClickedPattern.push(userChosenColour);
            //console.log(userClickedPattern);
        }) */ // ? Clicked button in console
};

// todo: Play sound on click
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

// todo: Animation on click
function animatePress(currentColor) {

    // adding class
    $("#" + currentColor).addClass("pressed");

    // remove class at 0.1s
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};


/* $(document).keypress(function (event) {
        console.log(event.key);
        nextSequence();
    }

); */ // ? shows the key you pressed in console