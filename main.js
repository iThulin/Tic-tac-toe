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

    const getGamepiece = () => {
        return gamePiece;
    };
    
    return {
        getValues, 
        incrementScore, 
        getScore,
        getGamepiece
    };
};

var gameController = (() => {
    let computer = Player(true, 'Easy', 'O', 0)
    let user = Player(false, 'None', 'X', 0)

    const playerTurn = (index) => {
        const space = gameBoard.getSpace(index);
        if (space == undefined) {
            gameBoard.assignValue(index, user.getGamepiece());
            displayController.updateSpaces();
        }
    }

    return {
        playerTurn
    }
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
    }

    const _init = (() => {
        for (let i = 0; i < visualBoard.length; i++) {
            space = visualBoard[i];
            console.log(space)
            space.addEventListener('click', gameController.playerTurn.bind(space, i));
        }

        // event listener to change computer difficulty

        // event listener to change player's selection to X

        // event listener to change player's selection to O

    })();

    return {
        updateScore,
        updateSpaces
    }
})();

let display = displayController;

