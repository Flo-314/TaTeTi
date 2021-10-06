const factoryPlayers = (player, mark, turn) => {
  return { player, mark, turn };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const domBoard = [];
  const button = document.querySelector("#restartBtn")
  button.addEventListener("click", () =>{
    board.fill("");
    printDom();
  })
  const getDomBoard = () => {
    let allBoard = document.querySelectorAll(".board");
    allBoard.forEach((element, index) => {
      element.addEventListener("click", () => {
        let player;
        if (gameMethods.player1.turn == true) {
          player = gameMethods.player1;
        } else {
          player = gameMethods.player2;
        }

        gameMethods.putMarker(index + 1, player);
      });
      domBoard.push(element);
    });
  };

  const printDom = () => {
    board.forEach((element, index) => {
      domBoard[index].textContent = element;
    });
  };
  return { getDomBoard, printDom, board };
})();





 


const gameMethods = (() => {
  const player1 = factoryPlayers("player1", "X", true);
  const player2 = factoryPlayers("player2", "O", false);
  let drawStatus = true
  const putMarker = (index, player) => {
    let marker = player.mark;
    if (gameBoard.board[index - 1] == "") {
      gameBoard.board[index - 1] = marker;
      gameBoard.printDom();

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

  const checkForWin = () => {
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
      drawStatus = true;
      checkDraw()
      if (
        gameBoard.board[element[0] - 1] == "X" &&
        gameBoard.board[element[1] - 1] == "X" &&
        gameBoard.board[element[2] - 1] == "X"
      ) {
        gameBoard.board.fill("");
        gameBoard.printDom();
      } else if (
        gameBoard.board[element[0] - 1] == "O" &&
        gameBoard.board[element[1] - 1] == "O" &&
        gameBoard.board[element[2] - 1] == "O"
      ) {
        gameBoard.board.fill("");
        gameBoard.printDom();
      } else if (drawStatus === true) {
        gameBoard.board.fill("");
        gameBoard.printDom();
      }
    });
  };
  const checkDraw = () => {
    for (let i = 0; i < 9; i++) {
      const element = gameBoard.board[i];
        if(element == ""){
          drawStatus = false
        }
    }
  }; 


  return { putMarker, checkForWin, checkDraw, player1, player2,drawStatus };
})();
gameBoard.getDomBoard();
