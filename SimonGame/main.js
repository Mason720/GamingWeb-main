let sequence = [];
let humanSequence = [];
let level = 0; //用來計算遊戲進行了幾輪

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

function humanTurn(level) { //電腦已經完成一輪，換本人親自操作
  tileContainer.classList.remove('unclickable');
  info.textContent = `輪到你了: 還有${level} 下${level > 1 ? '喔' : ''}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = '電腦準備運作';
  heading.textContent = `Level ${level} of 20`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    resetGame('歐歐! 你輸了, 點到錯的磁磚囉');
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      resetGame('恭喜! 你根本是神');
      return
    }

    humanSequence = [];
    info.textContent = '加油! 繼續努力!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `你還需要: ${remainingTaps} 下${
    remainingTaps > 1 ? 's' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = '電腦準備運作';
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});