const gameBoard = (() => {
    // controls the board state, adds values when called by the player controller,
    //clears the game board.
    let board = new Array(9).fill(' ');

    function getState() {
        console.log(`Board State: 
            \n${board[0]} | ${board[1]} | ${board[2]}
            \n${board[3]} | ${board[4]} | ${board[5]}
            \n${board[6]} | ${board[7]} | ${board[8]}`)
    };

    const getSpace = (index) => {
        board[index]
    }

    function assignValue(index, value) {
        board[index] = value;
        getState()
    };

    const getValue = (index) => {
        return board[index]
    }

    function clear() {
        for (let i = 0; i < board.length; i++) {
            board[i] = ' ';
        }
        getState()
    };
    
    return {
        getState,
        getSpace,
        assignValue,
        getValue,
        clear
    };
})();

const Player = (computerPlayer, difficulty, gamePiece, score) => {
    const getValues = () => {
        console.log(`Computer: ${computerPlayer}
        \nDifficulty: ${difficulty}
        \nGame Piece: ${gamePiece}
        \nScore: ${score}`)
    };

    const incrementScore = () => {
        score += 1
        display.updateScore();
    };

    const getScore = () => {return score}

    const getGamePiece = () => {
        return gamePiece;
    };
    
    return {
        getValues, 
        incrementScore, 
        getScore,
        getGamePiece
    };
};

var gameController = ((index) => {
    let computer = Player(true, 'Easy', 'O', 0)
    let user = Player(false, 'None', 'X', 0)
    const space = gameBoard.getSpace(index);

    const playerTurn = (index) => {
        if (space == undefined) {
            gameBoard.assignValue(index, user.getGamePiece());
            displayController.updateSpaces();
        };
    };

    const checkForWinner = () => {
        let consecutiveX = 0;
        let consecutiveO = 0;

        const winningSets = [[0, 1, 2],
                             [3, 4, 5], 
                             [6, 7, 8], 
                             [0, 3, 6], 
                             [1, 4, 7], 
                             [2, 5, 8], 
                             [0, 4, 8], 
                             [2, 4, 6]]

        // iterate over winning sets to determine if they are full of X or O
        for (let i = 0; i < winningSets.length; i++) {
            for (let j = 0; j < 3; j++) {
                let spaceValue = gameBoard.getValue(winningSets[i][j])
                console.log(spaceValue)
                if (spaceValue == "X") consecutiveX++;
                if (spaceValue == "O") consecutiveO++;
            }
            console.log (`X's: ${consecutiveX}, O's: ${consecutiveO}`)
            if (consecutiveX == 3)  {
                console.log('X wins');
                return true
            }
            else if (consecutiveO == 3) {
                console.log('O wins');
                return true;
            }
            else {
                consecutiveX = 0;
                consecutiveO = 0;
            };
        };
    };

    return {
        playerTurn,
        checkForWinner
    };
})();

var displayController = (() => {
    const visualBoard = Array.from(document.querySelectorAll('button.space'));
    let playerScore = document.getElementById('playerScore');
    let computerScore = document.getElementById('computerScore');

    const updateScore = () => {
        playerScore.textContent = `${user.getScore()}`
        computerScore.textContent = `${computer.getScore()}`;
    };

    const updateSpaces = () => {
        for (let i = 0; i < visualBoard.length; i++) {
            visualBoard[i].textContent = gameBoard.getValue(i);
        }
        gameController.checkForWinner();
    };

    const _init = (() => {
        for (let i = 0; i < visualBoard.length; i++) {
            space = visualBoard[i];
            console.log(space)
            space.addEventListener('click', gameController.playerTurn.bind(space, i));
        };

        // event listener to change computer difficulty

        // event listener to change player's selection to X

        // event listener to change player's selection to O

    })();

    return {
        updateScore,
        updateSpaces
    };
})();

let display = displayController;

