const chatContainer = document.getElementById('chatContainer');
const nextBtn = document.getElementById('nextBtn');

const storyScript = [
  { text: "💐💖", from: "me" },
  { text: "ดีค้ายยย", from: "me" },
  { text: "พี่ชื่อออารายยย", from: "me" },
  { text: "ชื่อเบสท์ฟ้า ค้าบบ", from: "ai" },
  { text: "คุณหล่ะ", from: "ai" },
  { text: "เดอะค๊อปคับ", from: "me" },
  { text: "ชื่อเท่มากกก", from: "ai" },
  { text: "แต่เรียกค๊อปเถอะคับ", from: "me" },
  { text: "อ่ยยยขอบคุณค้าบบ", from: "me" },
  { text: "ชื่อคุณก็น่ารัก", from: "me" },
  { text: "ของเค้าก็ชื่อแปลก เรียกได้หมดเลยนะ เบสท์ ฟ้า หรือว่าจะ บอฟอ กะได้ เพื่อน ชอบเรียก บฟ.5555", from: "ai" },
];

let currentIndex = 0;

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

function showNextBubble() {
  if (currentIndex < storyScript.length) {
    const { text, from } = storyScript[currentIndex];
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + (from === 'me' ? 'from-me' : 'from-ai');
    bubble.innerHTML = `
      <div>${text}</div>
      <div class="timestamp">${formatTime()}</div>
    `;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    currentIndex++;
  } else {
    nextBtn.disabled = true;
    nextBtn.innerText = "จบแล้ว 💗";
  }
}

nextBtn.addEventListener('click', showNextBubble);

window.onload = () => {
  chatContainer.innerHTML = "";
  currentIndex = 0;
  nextBtn.disabled = false;
  nextBtn.innerText = "➤ อ่านต่อ";
};
