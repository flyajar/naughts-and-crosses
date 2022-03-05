let player = "X"
let board = Array(9).fill(null)
let roundWon = false

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]

function handleClick(i) {
  let activeElement = this.event.target
  let nextPlayer = document.getElementById('nextPlayer')

  if (boxHaveValue(i)) {
    return
  }

  board[i] = player
  activeElement.innerHTML = player

  checkWinner(nextPlayer)

  player = player === 'X' ? '0' : 'X'
  nextPlayer.innerHTML = 'Current player: ' + player
}

function checkWinner(nextPlayer) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [firstIndex, secondIndex, thirdIndex] = winningCombinations[i]
    let winnerCondition = (board[firstIndex] && board[firstIndex] === board[secondIndex]) &&
      (board[firstIndex] === board[thirdIndex]);
    //determine winner
    if (winnerCondition) {
      roundWon = !roundWon
      document.querySelectorAll('.box').forEach(box => box.style.pointerEvents = 'none')
      document.getElementById('gameResult').innerHTML = 'Player won: ' + player
      nextPlayer.style.display = "none"
    } else if (winnerCondition && board.every(item => item !== null)) { //determine draw
      document.getElementById('gameResult').innerHTML = 'Game result: draw'
      nextPlayer.style.display = "none"
    }
  }
  return null
}

function restartGame() {
  let nextPlayer = document.getElementById('nextPlayer')
  player = 'X'
  board = Array(9).fill(null)
  document.querySelectorAll('.box').forEach(box => {
    box.style.pointerEvents = 'auto'
    box.innerHTML = ''
  })
  document.getElementById('gameResult').innerHTML = ''
  nextPlayer.style.display = 'block'
  nextPlayer.innerHTML = "Current player: X"
}

function boxHaveValue(i) {
  return board[i] !== null
}
