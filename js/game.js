window.onload = function () {
  const img = document.getElementById('popbestImage');
  const count = document.getElementById("Score");
  let score = 0;
  const audio = new Audio('assets/pop.mp3');

  img.addEventListener('mousedown', function () {
    incrementScore();
    img.src = 'popb222.png';
    audio.play();
  });

  img.addEventListener('mouseup', function () {
    img.src = 'popbest1.jpg';
    audio.play();
  });

  function incrementScore() {
    score++;
    count.innerText = score;
  }
};
