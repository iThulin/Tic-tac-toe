const gameBoard = (() => {
    // controls the board state, adds values when called by the player controller,
    //clears the game board.
    let board = new Array(9).fill(' ');

    function getState() {
        console.log(`Board State: 
            \n${board[0]} | ${board[1]} | ${board[2]}
            \n${board[3]} | ${board[4]} | ${board[5]}
            \n${board[6]} | ${board[7]} | ${board[8]}\n `)
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
        getState();
        displayController.updateSpaces();
        displayController.clearWinningMoves();
    };

    const exportBoard = () => {
        return board
    }
    
    return {
        getState,
        getSpace,
        assignValue,
        getValue,
        clear,
        exportBoard
    };
})();

const Player = (computerPlayer, difficulty, gamePiece, score) => {
    const getValues = () => {
        console.log(`Computer: ${computerPlayer}
        \nDifficulty: ${difficulty}
        \nGame Piece: ${gamePiece}`)
    };

    const incrementScore = () => {
        score += 1
        displayController.updateScore();
    };

    const getScore = () => {return score}

    const setGamePiece = (selection) => {
        gamePiece = selection
    }

    const getGamePiece = () => {return gamePiece};
    
    return {
        getValues, 
        incrementScore, 
        getScore,
        setGamePiece,
        getGamePiece
    };
};

var aiController = (() => {
    let aiBoard = gameBoard.exportBoard();
    let possibleMoves = [];

    const updateBoardState = () => {
        aiBoard = gameBoard.exportBoard();
        possibleMoves = [];
        for (let i = 0; i < 9; i++) {
            if (aiBoard[i] == ' ') possibleMoves.push(i);
        }
        console.log(`Possible moves: ${possibleMoves}`);
        return possibleMoves;
    }

    const selectRandomMove = () => {
        updateBoardState();
        let computerMove = possibleMoves[Math.floor((Math.random() * possibleMoves.length))];
        console.log(`Computer's move: ${computerMove}`);
        return computerMove
    }

    return {
        updateBoardState,
        selectRandomMove
    };
})();

var gameController = (() => {
    let computer = Player(true, 'Easy', 'O')
    let user = Player(false, 'None', 'X')
    let playerScore = 0;
    let computerScore = 0;

    const computerTurn = () => {
        gameBoard.assignValue(aiController.selectRandomMove(), computer.getGamePiece())
        displayController.updateSpaces();
    };

    const playerTurn = (index) => {
        console.log(`Player's move: ${index}`)
        gameBoard.assignValue(index, user.getGamePiece());
        displayController.updateSpaces();
    };

    const playRound = (index) => {
        console.log(`Index: ${index}`)

        if (user.getGamePiece() == 'X'){
            if (gameBoard.getValue(index) == ' ') {
                playerTurn(index);
                if (checkForWinner() == false) {
                    computerTurn()
                    checkForWinner()
                }
                //computerTurn();
                //if (checkForWinner() == true) return
            }
            else console.log("Please select a valid square.")
        };
        if (user.getGamePiece() == 'O') {
            if (index == 'first') {
               computerTurn();
            };

            if (gameBoard.getValue(index) == ' ') {
                computerTurn();
                if (checkForWinner() == false) {
                    playerTurn(index)
                    checkForWinner()
                }
            }
            else console.log("Please select a valid square.");
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
                if (spaceValue == "X") consecutiveX++;
                if (spaceValue == "O") consecutiveO++;
            }
            //console.log (`Set: [${winningSets[i]}], X: ${consecutiveX}, O: ${consecutiveO}`)
            if (consecutiveX == 3)  {
                console.log(`Winning Set: [${winningSets[i]}]`)
                displayController.showWinningMoves(winningSets[i]);
                displayController.lockButtons();
                gameController.scoreGame('X');
                return 
            }
            if (consecutiveO == 3) {
                displayController.showWinningMoves(winningSets[i]);
                displayController.lockButtons();
                gameController.scoreGame('O');
                return
            }
            else {
                consecutiveX = 0;
                consecutiveO = 0;
            };
        };
        return false
    };

    const setGamePiece = (player, selection) => {
        if (player == 'user') {
        user.setGamePiece(selection)
        user.getValues();
        gameBoard.clear();
        displayController.unlockButtons();
        }
        if (player == 'computer') {
            computer.setGamePiece(selection);
            //computer.getValues();
        }
    }

    const scoreGame = (winningPiece) => {
        console.log(`Player Piece: ${user.getGamePiece()} Winning Piece: ${winningPiece}`)
        if (user.getGamePiece() == winningPiece) {
            playerScore += 1;
            console.log(`playerScore: ${playerScore}`)
            displayController.updateScore();
        }
        if (computer.getGamePiece() == winningPiece) {
            computerScore += 1;
            console.log(`computerScore: ${computerScore}`)
            displayController.updateScore();
        }
    }

    const returnPlayerScore = () => {
        return playerScore
    };

    const returnComputerScore = () => {
        return computerScore
    };

    return {
        playRound,
        checkForWinner,
        setGamePiece,
        computerTurn,
        playerTurn, 
        scoreGame, 
        returnPlayerScore,
        returnComputerScore
    };
})();

var displayController = (() => {
    const visualBoard = Array.from(document.querySelectorAll('button.space'));
    let xButton = document.getElementById('X');
    let oButton = document.getElementById('O');

    const updateScore = () => {
        document.getElementById('playerScore').textContent = `${gameController.returnPlayerScore()}`;
        document.getElementById('computerScore').textContent = `${gameController.returnComputerScore()}`;
    };

    const updateSpaces = () => {
        for (let i = 0; i < visualBoard.length; i++) {
            visualBoard[i].textContent = gameBoard.getValue(i);
        }
    };

    const updateButtons = (buttonPressed) => {
        if (buttonPressed == 'X') {
            xButton.classList.remove('inactive');
            xButton.classList.add('active');
            oButton.classList.remove('active');
            oButton.classList.add('inactive');
            gameController.setGamePiece('user','X');
            gameController.setGamePiece('computer', 'O');
        };
        if (buttonPressed == 'O') {
            oButton.classList.remove('inactive');
            oButton.classList.add('active');
            xButton.classList.remove('active');
            xButton.classList.add('inactive');
            gameController.setGamePiece('user','O');
            gameController.setGamePiece('computer', 'X')
            gameController.playRound('first');
        };
    };

    const showWinningMoves = (winningIndexes) => {
        for (let i = 0; i < 3; i++) {
            visualBoard[winningIndexes[i]].classList.add('winning-move');
        };
    };

    const clearWinningMoves = () => {
        for (let i = 0; i < visualBoard.length; i++) {
            visualBoard[i].classList.remove('winning-move')
        };
    };

    const lockButtons = () => {
        for (let i = 0; i < visualBoard.length; i++) {
            visualBoard[i].disabled = true;
        };
    }

    const unlockButtons = () => {
        for (let i = 0; i < visualBoard.length; i++) {
            visualBoard[i].disabled = false;
        };
    }

    const _init = (() => {
        for (let i = 0; i < visualBoard.length; i++) {
            space = visualBoard[i];
            space.addEventListener('click', gameController.playRound.bind(space, i));
        };

        // event listener to change computer difficulty

        xButton.addEventListener('click', () => updateButtons('X'))
        oButton.addEventListener('click', () => updateButtons('O'))

    })();

    return {
        updateScore,
        updateSpaces,
        updateButtons,
        showWinningMoves,
        clearWinningMoves,
        lockButtons, 
        unlockButtons
    };
})();
