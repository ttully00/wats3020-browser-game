//  Created a class called `Player` and `constructor()`called `token` and should set `this.token` as a property of the class.
class Player {
  constructor(token) {
    this.token = token;
  }
}

// Tic Tac Toe Game Class
//  Set up `this.player1` and `this.player2` properties.
//  Set new Player class instances.
//  Set the "token" to anything that corresponds to a Glyphicon
// icon name 'remove-sign', 'unchecked'
class TicTacToe {
  constructor() {

    this.player1 = new Player('remove-sign');
    this.player2 = new Player('unchecked');


    // Properties that will be used to track game process

    this.currentPlayer = null;

    this.gameStatus = null;

    this.winner = null;

    this.moveCount = 0;

    this.start.Prompt = document.querySelector('#start-prompt');

    this.movePrompt = document.querySelector('#move-prompt');

    this.currentPlayerToken = document.querySelector('#player-token');

    this.gameboard = document.querySelector('#gameboard');

    this.winScreen = document.querySelector('#win-screen');

    this.winnerToken = document.querySelector('#winner-token');

    this.drawScreen = document.querySelector('#draw-screen');

    // Initialized an Array representing the starting state of the game board.

    this.gameState = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    // Array of Win States

    this.winStates = [
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0]
      ]
    ];
  }

  // `checkForWinner()` 

  checkForWinner() {
    console.log('Checking for winner.');
    for (let condition of this.winStates) {
      let winningCondition = true;
      for (let position of condition) {
        if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
          winningCondition = false;
        }
      }
      if (winningCondition) {
        console.log('We have a winner!');
        console.log(`Condition is: ${condition}`);
        this.gameStatus = 'won';
        this.winner = this.currentPlayer;


        let winEvent = new Event('win');

        document.dispatchEvent(winEvent);

        return true; // Return a value to stop processing the additional move count check.
      }
    }
    this.moveCount++;
    console.log(`Reviewed move ${this.moveCount}.`)
    if (this.moveCount >= 9) {
      console.log(`This game is a draw at ${this.moveCount} moves.`);
      this.gameStatus = 'draw';

      let drawEvent = new Event('draw');
      document.dispatchEvent(drawEvent);
    }
  }

  //  Recording moves in the `this.gameState` property.

  recordMove(event) {
    console.log('Recording move.');

    let tileX = event.target.dataset.x;

    let tileY = event.target.dataset.y;

    this.gameState[tileX][tileY] = this.currentPlayer.token;

    event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`);

  }

  // Switching between players.

  switchPlayer() {
    console.log('Switching Player.');

    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }

    this.currentPlayerToken.setAttribute('class', 'glyphicon glyphicon-${this.currentPlayer.token}');
  }
  setUpTileListeners() {
    console.log('Setting up Tile Listeners.');

    let tileElements = document.querySelectorAll('.tile');

    for (let tile of tileElements) {
      tile.addEventListener('click', handleMove);
    }
  }

  // End of the game displays for a win.

  showWinScreen() {
    console.log('Now showing win screen');
    this.winScreen.setAttribute('class', 'show');


    this.winnerToken.setAttribute('class', `glyphicon ${this.winner.token}`);
  }

  // Displays the end game screen for a Draw.

  showDrawScreen() {

    this.drawScreen.setAttribute('class', 'show');
  }
  setUpBoard() {
    console.log('Setting up gameboard.');
    this.gameboard.innerHTML = '';

    for (let i = 0; i < 3; i++) {
      let newRow = document.createElement('div');

      newRow.setAttribute('class', 'row');

      for (let j = 0; j < 3; j++) {
        let newCol = document.createElement('div');

        newCol.setAttribute('class', 'col-xs-3');

        let newTile = document.createElement('span');

        newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign')

        newTile.dataset.x = i;

        newTile.dataset.y = j;

        newCol.appendChild(newTile);

        newRow.appendChild(newCol);

      } // Second `for` loop should ends here.

      this.gameboard.appendChild(newRow);

    } // first `for` loop should end here.

    this.setUpTileListeners();

  }

  // Initializes the `this.movePrompt` element.
  initializeMovePrompt() {

    console.log('Initializing move prompt');

    this.startPrompt.setAttribute('class', 'hidden');

    this.movePrompt.setAttribute('class', '');

    this.currentPlayer = this.player1;

    this.currentPlayerToken.setAttribute('class', 'glyphicon glyphicon-${this.currentPlayer.token}');

  }

  // Creates a new game.

  start() {

    console.log('Starting game');

    this.setUpBoard();

    this.initializeMovePrompt();
  }
} // End of the Tic Tac Toe Class definition.

// Controls the game so players can successfull play.

let game;
console.log('game code starting.');
document.addEventListener('DOMContentLoaded', function(event) {

  console.log('DOM Content has loaded');

  let startButton = document.querySelector('#start-Button');




  game = new TicTacToe();

  game.start();


}); // End of the "DOMContentLoaded" event listener here.


document.addEventListener('win', function(event) {
  console.log('Detected win event.');
  game.showWinScreen();
}); // End of the "win" event listener.



document.addEventListener('draw', function(event) {
  console.log('Detected draw event.');
  game.showDrawScreen();
}); //  End of the "draw" event listener.


// External function for event listeners provided for you.
function handleMove(event) {
  console.log('Handling Player move.');
  // Record the move for the current player.
  game.recordMove(event);

  // Check to see if the last move was a winning move.
  game.checkForWinner();

  // Rotate players.
  game.switchPlayer();
}