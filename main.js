const gameBoard = (() => {
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

gameBoard.assignValue(2, "O");
gameBoard.assignValue(4, "X");
gameBoard.assignValue(5, "O");
gameBoard.assignValue(0, "X");
gameBoard.clear();