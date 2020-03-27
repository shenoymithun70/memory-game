var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  console.log(randomNumber);
  var radomChosenColour = buttonColours[randomNumber];
  console.log(radomChosenColour);
  gamePattern.push(radomChosenColour);
  $("#"+radomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(radomChosenColour);
  console.log(gamePattern);
}

$(".btn").click(function(event){
  animatePress(event.target.id);
  playSound(event.target.id);
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function playSound(name){
  var audio1 = new Audio("sounds/"+name+".mp3");
  audio1.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

  }
  $("h1").click(function(event){
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
  });

  $(document).keydown(function(event){
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
  });

  function checkAnswer(currentLevel){
   console.log(currentLevel);
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       if(userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
           nextSequence();
         },1000);
       }
     }
   else{
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
     $("#level-title").text("Press any key to restart or Press here");
     startOver();

   }
 }

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
