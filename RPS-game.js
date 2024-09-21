
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0, ties: 0
};

updatescore();

let isAutoplaying = false;
let intervalId;
function autoplay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playermove = pickcomputermove();
      playgame(playermove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }

}


function changeAutostop() {
  const buttonElement = document.querySelector('.js-autoplay');

  if (buttonElement.innerText === 'Auto Play') {
    buttonElement.innerHTML = 'Stop Play';
    //classllist.add or remove function work on onclick after event
    buttonElement.classList.add('stop-play')
  } else {
    buttonElement.innerHTML = 'Auto Play';
    buttonElement.classList.remove('stop-play');
  }
}

document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playgame('rock')
  })

document.querySelector('.js-paper-btn')
  .addEventListener('click', () => {
    playgame('paper')
  })

document.querySelector('.js-scissors-btn')
  .addEventListener('click', () => {
    playgame('scissors')
  })

document.querySelector('.js-reset-btn')
  .addEventListener('click', () => {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score')
    updatescore();

    window.location.reload();

  })


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playgame('rock');
  } else if (event.key === 'p') {
    playgame('paper');
  } else if (event.key === 's') {
    playgame('scissors');
  }
})

function playgame(playermove) {
  const computermove = pickcomputermove();
  let result = '';

  if (playermove === 'scissors') {

    if (computermove == 'rock') {
      result = 'Tie, try again..';
    } else if (computermove == 'paper') {
      result = 'You Lose it, Sorry !'
    } else if (computermove == 'scissors') {
      result = 'You WON!'
    }

  } else if (playermove === 'paper') {

    if (computermove == 'rock') {
      result = 'You WON!';
    } else if (computermove == 'paper') {
      result = 'Tie, try again..'
    } else if (computermove == 'scissors') {
      result = 'You Lose it, Sorry !'
    }

  } else if (playermove === 'rock') {

    if (computermove == 'rock') {
      result = 'Tie, try again..';
    } else if (computermove == 'paper') {
      result = 'You Lose it, Sorry !'
    } else if (computermove == 'scissors') {
      result = 'You WON!'
    }

  }

  if (result === 'You WON!') {
    score.wins++;
  } else if (result === 'You Lose it, Sorry !') {
    score.losses += 1;
  } else if (result === 'Tie, try again..') {
    score.ties += 1;
  }

  // localstorage only support string so using json

  localStorage.setItem('score', JSON.stringify(score));
  const totals = 3;

  console.log(totals)
  if (score.wins >= totals) {
    removeBox()
    document.querySelector('.js-choosemove').innerHTML = `Player Won`;

  } else if (score.losses >= totals) {
    document.querySelector('.js-choosemove').innerHTML = "Computer Won"
    removeBox()
  } else if (score.ties >= totals) {
    document.querySelector('.js-choosemove').innerHTML = "Draw the Match"
    removeBox()
  }

  updatescore();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =
    ` You
      <img src="rps-src/${playermove}.jpg" alt="playermove" class="move-icon1">
      <img src="rps-src/${computermove}.jpg" alt="computermove" class="move-icon1">
      Computer`;
}

function updatescore() {
  document.querySelector('.js-score').innerHTML =
    `Player: ${score.wins} 
        Computer: ${score.losses} 
        Draw: ${score.ties}`;

  document.querySelector('.js-total-match').innerHTML = `Total Match = ${score.wins + score.losses + score.ties}`
}

function removeBox() {
  document.querySelector('.js-result').style.display = "none";
  document.querySelector('.js-moves').style.display = "none";
  document.querySelector('.js-autoplay').style.display = "none";

  document.querySelector('.js-score').style.display = "none";
  document.querySelector('.js-total-match').style.display = "none";

}

function pickcomputermove() {
  const randnum = Math.random();
  let computermove = '';
  if (randnum >= 0 && randnum < 1 / 3) {
    computermove = 'rock';
  } else if (randnum >= 1 / 3 && randnum < 2 / 3) {
    computermove = 'paper';
  } else if (randnum >= 2 / 3 && randnum < 1) {
    computermove = 'scissors';
  }

  return computermove;

}


