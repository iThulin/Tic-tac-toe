const gameBoard = (() => {
    // controls the board state, adds values when called by the player controller,
    //clears the game board.
    let board = new Array(9).fill(" ");

    function getState() {
        console.log(`Board State: 
            \n${board[0]} | ${board[1]} | ${board[2]}
            \n${board[3]} | ${board[4]} | ${board[5]}
            \n${board[6]} | ${board[7]} | ${board[8]}`)
    };

    function assignValue(index, value) {
        board[index] = value;
        getState()
    };

    function clear() {
        for (let i = 0; i < board.length; i++) {
            board[i] = " ";
        }
        getState()
    };
    
    return {
        getState,
        assignValue,
        clear
    };
})();

const displayController = (() => {

})();

const Player = (computerPlayer, difficulty, gamePiece, score) => {
    const getValues = () => {
        console.log(`Computer: ${computerPlayer}
        \nDifficulty: ${difficulty}
        \nGame Piece: ${gamePiece}
        \nScore: ${score}`)
    };
    const incrementScore = () => {score += 1}
    const getScore = () => {return score}
    
    return {getValues, incrementScore, getScore};
}

let computer = Player(true, "Easy", "Y", 4)
let user = Player(false, "None", "X", 0)
computer.getValues();
user.getValues();
