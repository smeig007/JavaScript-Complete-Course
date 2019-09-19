/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//
/////////////////////////////////
// declare variables....
/////////////////////////////////
//
var scores, roundScore, activePlayer, gamePlaying, prevDiceScore0, prevDiceScore1;
//
// Call function to inialise variables...*** NOTE *** + brackets () after a function name means call the function immediately !
init ();
//
//
// use built in method MATH with associate method RAMDOM to ascertain a random number. Then use FLOOR to get the integer value (default is to return a decimal)... This will get a number between 1 and 5...
//dice = Math.floor(Math.random() * 6) + 1;
//
/////////////////////////////////
// DOM Manipulation....
/////////////////////////////////
//
// *** NOTE *** - querySelector manipulates/changes values in elements of the webpage.
//
// move the score on the dice to the current players score, textContent only updates plain text, not HTML...
//
//                  # is a CSS identifier or ID
//
// - Example - document.querySelector('#current-' + activePlayer).textContent = dice;
//
// put some HTML in the seclected element need to use innerHTML method...<em> - emphasize the number in the current score for the active player...
//
// - Example - document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//
//                  . is to select a CLASS in CSS
//
// style   - the style
// display - is the css property
// 'none'  - is the atttribute we want to assign to the property (in this case it'll hide the dice)
//
// - Example - document.querySelector('.dice').style.display = 'none';
//
document.querySelector('.btn-roll').addEventListener('click', function () {
    // Only allow the roll of the dice if flag is still set to true...
    if (gamePlaying) {
        // get a random number
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        // check if 2 sixes in a row have been rolled...on either dice....
        if ((dice0 == 6 && prevDiceScore0 == 6) || (dice1 == 6 && prevDiceScore1 == 6)) {
            // reset the players score
            //console.log('dice 0->' + dice0 + '<-  prev dice ->' + prevDiceScore0 + '<-');
            //console.log('dice 1->' + dice1 + '<-  prev dice ->' + prevDiceScore1 + '<-');
            document.querySelector('#score-' + activePlayer).textContent = "0";
            scores[activePlayer] = 0;
            nextPlayer();
        } else {
            // Save the current dice score to previous score to compare on next roll...
            prevDiceScore0 = dice0;
            prevDiceScore1 = dice1;
            //
            // display the result
            var dice0DOM = document.querySelector('.dice-0');
            dice0DOM.style.display = 'block';
            dice0DOM.src = 'dice-' + dice0 + '.png';
            //
            var dice1DOM = document.querySelector('.dice-1');
            dice1DOM.style.display = 'block';
            dice1DOM.src = 'dice-' + dice1 + '.png';
            //
            // update the 'round' score if the rolled number is NOT a 1
            if (dice0 !== 1 && dice1 !== 1) {
                //Increment score then display it...
                roundScore += dice0 + dice1;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                // Other players turn to roll the dice....
                console.log('dice 0->' + dice0 + '<-');
                console.log('dice 1->' + dice1 + '<-');
                nextPlayer();
            }
        }
    }
});
//
//
document.querySelector('.btn-hold').addEventListener('click', function() {
    // Only allow the roll of the dice if flag is still set to true...
    if (gamePlaying) {
        // Add current score to global score....
        scores[activePlayer] += roundScore;
        //
        // Update user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //
        // Check if player has won the game ? Look at user defined winning-score...
        var winningScoreDOM = document.querySelector('.winning').value;
        console.log('btn-hold - winning score ->' + winningScoreDOM + '<-');
        //
        if (scores[activePlayer] > winningScoreDOM) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !!!';
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // Game won, set state variable to false, game can no longer play.
            gamePlaying = false;
        } else {
            // Other players turn to roll the dice....
            nextPlayer();
        }
    }
});
//
//
function nextPlayer () {
    //Other players turn to roll the dice....using the TERNARY operator...
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDiceScore = 0;
    //
    //Initialise both players scores to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //
    // Change the active players background...using toggle, add if not there, remove if there
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //
    // Change the active players background....simple add or remove....
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    //
    // Hide the dice after a 1 is rolled...
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}
//
// *** NOTE *** - not having brackets () straight after the function name - initialise - means, do not call the function immediately, but only call it on the 'click' of the button.
document.querySelector('.btn-new').addEventListener('click', init);
//
//
// Initialise function...
function init() {
    scores       = [0, 0];
    roundScore   = 0;
    activePlayer = 0;
    //
    prevDiceScore = 0;
    //
    // Set the state variable to true so game can begin and run...
    gamePlaying = true;
    //
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    //
    // Initialise the scores and current scores for player 1 and player 2....
    document.getElementById('score-0').textContent   = '0';
    document.getElementById('score-1').textContent   = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}






























































