const cellElement = document.querySelectorAll("[data-cell]");
let circleTurn;
const circleClass = "circle";
const xClass = "x";
let countXwins = 0;
let countYwins = 0;

let nameX = prompt("enter name of player 1");
let nameO = prompt("enter name of player 2");
nameX.toUpperCase();
nameO.toUpperCase();

const winningMessageTextElement = document.querySelector(
  "[ data-winning-mesage-text]"
);
const winningMessageElement = document.getElementById("winningMessage");
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const setBoardHoverClass = () => {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  circleTurn ? board.classList.add(circleClass) : board.classList.add(xClass);
};

const startGame = () => {
  cellElement.forEach((cell) => {
    circleTurn = false;
    cell.classList.remove(xClass);
    document.getElementById("Turns").innerHTML = circleTurn
      ? `${nameO}'s Turn`
      : `${nameX}'s Turn`;
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
  document.getElementById(
    "winningsDisplay"
  ).innerHTML = `<div>${nameO} wins:${countYwins} </div> <div>${nameX} wins:${countXwins}</div>`;
};
restartButton.addEventListener("click", startGame);
startGame();
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  //plackmark
  //check for win
  //check for draw//switch turn
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "draw!";
  } else {
    winningMessageTextElement.innerText = circleTurn
      ? `${nameO} wins!`
      : `${nameX} wins!`;
    circleTurn ? countYwins++ : countXwins++;
  }
  winningMessageElement.classList.add("show");
}
function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  document.getElementById("Turns").innerHTML = circleTurn
    ? `${nameX} Turns`
    : `${nameO} Turns`;
}
const swapTurns = () => (circleTurn = !circleTurn);

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
