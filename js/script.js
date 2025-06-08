const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.getElementById("popupMsg");

let yesSize = 2;
let hasmoved = false;
let noClicks = 0;

const messages = [
  "ใจร้ายจัง ทำไมไม่ตอบตกลงง",
  "งอนแล้วนะ!!",
  "จะให้เขินไปถึงไหนกันนน",
  "ถ้ารักก็อย่ากด No กันสิ",
  "เธอไม่รักเค้าแล้วเหรอ?",
  "ตอบ Yes แล้วจะมีข้าวให้กินทุกวันนะ",
  "No อีกที เดี๋ยวร้องไห้จริงนะ",
  "ความรักของเราไม่พอหรือไงง?"
];

noBtn.addEventListener("click", () => {
  if (!hasmoved) {
    noBtn.style.position = "absolute";
    hasmoved = true;
  }

  const x = Math.floor(Math.random() * (window.innerWidth - 100));
  const y = Math.floor(Math.random() * (window.innerHeight - 100));
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  yesSize += 0.5;
  yesBtn.style.transform = `scale(${yesSize})`;

  noClicks++;
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  popup.innerText = randomMsg;
  popup.style.display = 'block';

  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000);
});

yesBtn.addEventListener("click", () => {
  window.location.href = "time.html";
});
