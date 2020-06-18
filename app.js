document.addEventListener('DOMContentLoaded', () => {
const squares = document.querySelectorAll('.grid div')
const resultDisplay = document.querySelector('#result')
let width = 30;
let currentShooterIndex = 884;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;
const startBt = document.querySelector(".game-start-button");

startBt.addEventListener("click", gameStart);

function gameStart (){
 startBt.classList.add("display-none");

//define the invaders
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
  30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,
  60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
  90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,
  120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,
  150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,
  180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,
  210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,
  240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,
  270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295
]


  //draw the alien invaders
  alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'))

  //draw the shooter
  squares[currentShooterIndex].classList.add('shooter')

  //move the shooter along a line
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.keyCode) {
      case 37:
        if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
        break
      case 39:
        if(currentShooterIndex % width < width - 1) currentShooterIndex += 1
        break
    }
    squares[currentShooterIndex].classList.add('shooter')
  }
  document.addEventListener('keydown', moveShooter)

  //move the alien invaders
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

      if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
        direction = width
      } else if (direction === width) {
      if (leftEdge) direction = 1
      else direction = -1
      }
      for (let i = 0; i <= alienInvaders.length - 1; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
      }
      for (let i = 0; i <= alienInvaders.length - 1; i++) {
        alienInvaders[i] += direction
      }
      for (let i = 0; i <= alienInvaders.length - 1; i++) {
      //ADD IF LATER
        if (!alienInvadersTakenDown.includes(i)){
          squares[alienInvaders[i]].classList.add('invader')
        }
      }

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplay.textContent = 'Game Over'
      squares[currentShooterIndex].classList.add('boom')
      clearInterval(invaderId)
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++){
      if(alienInvaders[i] > (squares.length - (width))){
        resultDisplay.textContent = 'Game Over'
        clearInterval(invaderId)
        
      }
    }

    //ADD LATER
    if(alienInvadersTakenDown.length === alienInvaders.length) {
      console.log(alienInvadersTakenDown.length)
      console.log(alienInvaders.length)
      resultDisplay.textContent = 'You Win'
      clearInterval(invaderId)
    }
  }
  invaderId = setInterval(moveInvaders, 500)

  //shoot at aliens
  function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    //move the laser from the shooter to the alien invader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      if(squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
        clearInterval(laserId)

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
        alienInvadersTakenDown.push(alienTakenDown)
        result++
        resultDisplay.textContent = result
      }

      if(currentLaserIndex < width) {
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
      }
    }

    switch(e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100)
        break
    }
  }

  document.addEventListener('keyup', shoot)
}

})
