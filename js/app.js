const theButton = document.querySelector('.inter-face span').onclick =
  function () {
    let yourName = prompt('Enter your Name');
    if (yourName === null || yourName === "") {
      document.querySelector(' .theName span').innerHTML = 'Unknown'
      document.querySelector(' .theName span').style.color = 'red'
      // startTimer();
    } else {
      document.querySelector('.theName span').innerHTML = yourName;
      document.querySelector('.theName span').style.color = 'green'
      startTimer();
    }
    document.querySelector('.inter-face').remove();
  }
const memoryBlock = document.querySelector('.memory-block');
let blocks = Array.from(memoryBlock.children); 
console.log(blocks);
let range = Array.from(Array(blocks.length).keys());
console.log(range);
function randomBlock(array) {
  let current = array.length;
  let value;
  let random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    value = array[current];
    array[current] = array[random];
    array[random] = value;
  }
  return array;
}
randomBlock(range);
blocks.forEach((block, index) => {
  block.style.order = range[index];
  block.addEventListener('click', function () {
    flip(block);
  })
});
/* Start Timer */
document.querySelector('.time span').innerHTML =
  001 + " " + " : " + 00;
function startTimer() {
  let presentTime = document.querySelector('.time span').innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
  if (s == 59) {
    m = m - 1;
  }
  if (s == 0) {
    gameOverAudio();
    setTimeout(() => {
      endGame();
    }, 1500);
    clearInterval(startTimer());
  }
  function gameOverAudio() {
    document.getElementById('game-over').play();
  }
  function endGame() {
    const end = document.querySelector('.end-game ');
    const endSpan = document.querySelector('.end-game span');
    end.style.visibility = 'visible';
  }
  document.querySelector('.time span').innerHTML =
    m + "  " + " : " + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) { sec = "0" + sec }; 
  if (sec < 0) { sec = "59" };
  return sec;
}
function flip(selectedBlock) {
  selectedBlock.classList.add('opened');
  let allBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('opened'));
  if (allBlocks.length == 2) {
    stopClick();
    checkRandom(allBlocks[0], allBlocks[1]);
  }
}
function checkRandom(firstElement, secondElement) {
  const wrong = document.querySelector('.try span');
  wrong.style.color = 'red'
  if (firstElement.dataset.animals === secondElement.dataset.animals) {
    firstElement.classList.remove('opened');
    secondElement.classList.remove('opened');
    firstElement.classList.add('test');
    secondElement.classList.add('test');
    document.querySelector('#succsess').play();
  } else {
    wrong.innerHTML = parseInt(wrong.innerHTML) + 1;
    setTimeout(() => {
      firstElement.classList.remove('opened');
      secondElement.classList.remove('opened');
      document.querySelector('#failed').play();
    }, 500)
  }
}
function stopClick() {
  memoryBlock.classList.add('no-click');
  setTimeout(() => {
    memoryBlock.classList.remove('no-click');
  }, 1000);
}
const start = document.querySelector('.start');
start.addEventListener('click', () => {
  startTimer();
  start.remove();
})