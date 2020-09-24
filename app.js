/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying;


function init(){
    // set the game State

    isGamePlaying = true;

    // Initializing scores
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById("score-0").textContent="0";
    document.getElementById("score-1").textContent="0";
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";

    // hiding the dice
    document.querySelector(".dice").style.display = "none";

    // Initializing Player Names
    document.querySelector("#name-0").textContent="Player 1";
    document.querySelector("#name-1").textContent="Player 2";


    // Removing the WInner CLASS
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    // Removing acitve class if any
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    // Adding active class to the active player
    document.querySelector(".player-0-panel").classList.add("active");
    
}


// console.log(dice);


// document.querySelector("#current-"+activePlayer).textContent = dice;

init() ;



document.querySelector(".btn-roll").addEventListener('click',function(){ 
    if (isGamePlaying)    {
        // 1. Random Number
        
        var dice = Math.floor(Math.random()*6) + 1;
        
        // 2. Display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-"+dice+".png";
        
        
        // 3.  Update the round Score if hold button is clicked or if the rolled number is not 1
        if (dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector("#current-"+activePlayer).textContent = roundScore;    
        }
        else{
            // Next Player
            nextPlayer();
            
        }
    }
});

function nextPlayer(){
    var diceDOM = document.querySelector(".dice");
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;  
    document.querySelector("#current-0").textContent = roundScore;    
    document.querySelector("#current-1").textContent = roundScore;    
           
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    diceDOM.style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click",function(){

    
    if(isGamePlaying){
        
        scores[activePlayer]+=roundScore;

        //2. Update the UI
        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];
        

        //3. Check if the player won the game
        if(scores[activePlayer]>=100){
            document.querySelector("#name-"+activePlayer).textContent="Winner!";
            document.querySelector(".dice").style.display="none";
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            isGamePlaying = false;
            
        }
        else{
            // Next player
            nextPlayer();
        }
    }
    
});


document.querySelector(".btn-new").addEventListener("click",init);

function closeModal(){
    var modal = document.querySelector("#myModal");
    modal.style.display="none";
}

document.querySelector("#close").addEventListener("click", closeModal);

document.onkeydown = function(evt){
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        closeModal();
    }
}

document.addEventListener("click",closeModal);