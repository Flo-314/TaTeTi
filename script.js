const factoryPlayers = (player, mark, turn) => {
  return { player, mark, turn };
};
const player1 = factoryPlayers("player1", "X", true);
const player2 = factoryPlayers("player2", "O", false);

const Game = () => {};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const domBoard = [];

  const getDomBoard = () => {
    let allBoard = document.querySelectorAll(".board");
    allBoard.forEach((element, index) => {
      element.addEventListener("click", () => {
        let player;
        if (player1.turn == true) {
          player = player1;
        } else {
          player = player2;
        }

        putMarker(index + 1, player);
      });
      domBoard.push(element);
    });
  };

  const printDom = () => {
    board.forEach((element, index) => {
      domBoard[index].textContent = element;
    });
  };

  const putMarker = (index, player) => {
    let marker = player.mark;
    if (board[index - 1] == "") {
      board[index - 1] = marker;
      printDom();

      if (player == player1) {
        player2.turn = true;
        player1.turn = false;
      } else {
        player1.turn = true;
        player2.turn = false;
      }
    }
    checkForWin();
  };

  function checkForWin() {
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7], 
    ];
    winningCombinations.forEach((element) => {
if(board[element[0] -1] == "X" && board[element[1] -1] =="X" && board[element[2] -1] == "X"){
  board.fill("")
  printDom()
}
else if((board[element[0] -1] == "O" && board[element[1] -1] =="O" && board[element[2] -1] == "O")){
board.fill("")
printDom()
}

 })
  }
  return { getDomBoard, printDom, putMarker, checkForWin,board };
})();
gameBoard.getDomBoard();

//Player Factory
//GameBoard
//Play Functions
