var userPlayListPushed = [];
var userPlayListClicked = [];
var computerPlayList = [];


// ------------------------         Listeners push and click
// clicked button Listener
$($("button").slice(1)).click(function (event){
    // BUTTONS FLASH
    var flash = $(this)
    var initBackgroundColor = $(this).css("backgroundColor");
    var initBorderColor = $(this).css("borderColor");
    
    $(this).css("backgroundColor", "white");
    $(this).css("borderColor", initBackgroundColor);

    setTimeout(function(){
        flash.css("backgroundColor", initBackgroundColor);
        flash.css("borderColor", initBorderColor);
    }, 100);

    // Sounds
    makeSound((event.currentTarget).id)
    
    // Save pattern  
    var clickedButton = (event.currentTarget).id
    userPlayListClicked.push(clickedButton)
    var index = userPlayListClicked.indexOf(clickedButton) // get the index of clicked button (you could use list[-1] or list.length)
    

    if (clickedButton!==computerPlayList[index]) {
        playFailSound();
        setTimeout(function(){
            alert("Game Over");
        }, 300);
        $($("button")[0]).text("Replay?")
    }  
    else {
        if (userPlayListClicked.length===computerPlayList.length) {
            setTimeout(function(){
                computerPlay();
                // console.log("Le script a bien attendu que le joueur finisse de jouer pour continuer");
            }, 1000)
        } 
    }    
});

// Pushed button listener
$(document).keydown(function(event){
    // BUTTONS FLASH
    var currentButton = pressButton(event.key); // get the button associated to the event.
    var initBackgroundColor = $(currentButton).css("backgroundColor");
    var initBorderColor = $(currentButton).css("borderColor");
    $(currentButton).css("backgroundColor", "white");
    $(currentButton).css("borderColor", initBackgroundColor);
    setTimeout(function(){
        $(currentButton).css("backgroundColor", initBackgroundColor);
        $(currentButton).css("borderColor", initBorderColor);
    }, 100);

    // Sounds
    makeSound(event.key);

    // Saving events
    userPlayListPushed.push(currentButton.id)
    var index = userPlayListPushed.indexOf(currentButton.id)
    
    if (currentButton.id!==computerPlayList[index]) {
        playFailSound();
        setTimeout(function(){
            alert("Game Over");
        }, 300);
        $($("button")[0]).text("Replay?")
    }
    else {
        if (userPlayListPushed.length===computerPlayList.length){
            setTimeout(function(){
                computerPlay();
                // console.log("Le script a bien attendu que le joueur finisse de jouer pour continuer")
            }, 1000)
        }
    }
    

});

// ------------------------         Start Game
$($("button")[0]).click(function (){
    computerPlayList = [];
    userPlayListPushed = [];
    userPlayListClicked = [];
    computerPlay();
  });

// ------------------------         Pattern to follow
function computerPlay() {
    $($("button")[0]).text("Level " + (computerPlayList.length+1));
    // Random number to select random button
    var i = Math.floor(Math.random()*4) +1; // --> gives a random number between 0 and 3
    computerPlayList.push($("button")[i].id) // here you can use id or innerHTML..
    
    
    for (index=0; index<computerPlayList.length;index++) { // Loop on all elements of computerPlayList
        let k = index; // let permet de déclarer la variable k, elle reste inchangée à l'intérieur d'un même "scope".
        console.log(k)
        console.log(index)

        setTimeout(function(){
            // Button flash 
            console.log(k) // grace au "let" le k n'est pas écrasé à chaque nouvelle boucle comme c'est le cas pour index.
            console.log(index)
            var currentButton = $("#" + computerPlayList[k]) // get the button associated to the event. ici utiliser k et pas index .... ?
            var initBackgroundColor = $(currentButton).css("backgroundColor");
            var initBorderColor = $(currentButton).css("borderColor");
            $(currentButton).css("backgroundColor", "white");
            $(currentButton).css("borderColor", initBackgroundColor);
            
            // Sounds
            makeSound(computerPlayList[k]); // Attention ici il faut utiliser k et pas index .... !!! (mais je ne sais pas pourquoi!)
            
            setTimeout(function(){
                $(currentButton).css("backgroundColor", initBackgroundColor);
                $(currentButton).css("borderColor", initBorderColor);
            }, 100); 
        }, 700*(k+1));
        
    };
    userPlayListClicked = [];
    userPlayListPushed = [];
    
  };

// ------------------------         Tool Functions
function playFailSound() {
    var wrong = new Audio("sounds/1wrong.wav");
          wrong.play();
    return true
  };

function makeSound(key) {
    switch (key) {
      case "green":     
      case "ArrowUp": 
        var Do_ = new Audio("sounds/do.wav");
        Do_.play();
        break;
  
      case "red":
      case "ArrowRight":
        var re = new Audio("sounds/re.wav");
        re.play();
        break;

      case "blue":
      case "ArrowDown":
        var si = new Audio('sounds/si.wav');
        si.play();
        break;

      case "yellow":
      case "ArrowLeft":
        var do_o = new Audio('sounds/do-octave.wav');
        do_o.play();
        break;

      default: console.log(key);
  
    }
  };

function pressButton(key){
    switch (key) {
        case "ArrowUp":
            var buttonUp = $("button")[1];
            return buttonUp;
        case "ArrowRight":
            var buttonRight = $("button")[2];
            return buttonRight;

        case "ArrowDown":
            var buttonDown = $("button")[4];
            return buttonDown;
        
        case "ArrowLeft":
            var buttonLeft = $("button")[3];
            return buttonLeft;

    
        default:
            break;
    }
};

// ------------------------         GAME

