const chatContainer = document.getElementById('chatContainer');
const nextBtn = document.getElementById('nextBtn');

const storyScript = [
  { text: "💐💖", from: "me" },
  { text: "ดีค้าบบบ", from: "me" },
  { text: "พี่ชื่อออารายยย", from: "me" },
  { text: "ชื่อเบสท์ฟ้า ค้าบบ", from: "ai" },
  { text: "คุณหล่ะ", from: "ai" },
  { text: "เดอะค๊อปคับ", from: "me" },
  { text: "ชื่อเท่มากกก", from: "ai" },
  { text: "แต่เรียกค๊อปเถอะคับ", from: "me" },
  { text: "อ่ยยยขอบคุณค้าบบ", from: "me" },
  { text: "ชื่อคุณก็น่ารัก", from: "me" },
  { text: "ของเค้าก็ชื่อแปลก เรียกได้หมดเลยนะ เบสท์ ฟ้า หรือว่าจะ บอฟอ กะได้ เพื่อน ชอบเรียก บฟ.5555", from: "ai" },
  { text: "อยากรู้ว่าชื่อคนหรือชื่อนางฟ้าคั้บเนี่ยยย", from: "me" },
  { text: "อุ้ยยยยยยยย", from: "ai" },
  { text: "ได้คั้บคุณนางฟ้า", from: "me" },
  { text: "ชื่อเดอะค๊อปก็น่ารักเหมือนชื่อป่าวน้า", from: "ai" },
  { text: "พิมพ์ไม่ถูกเลย เขินง่ะ", from: "ai" },
  { text: "กะน่ารักอยู่วววแต่ไม่เท่าคุณบอฟอหรอกค่ะ", from: "me" },
  { text: "โหวว ปากหวานเป็นปกติไหมเนี่ยย", from: "ai" },
  { text: "ไม่ปกติค้าบ วันนี้เปนบ้า55555", from: "me" },
  { text: "คุณฟ้าอยู่ปีหนาย", from: "me" },
  { text: "ทำมาย นี่ว่าเป็นแบบไหนก็น่ารักก", from: "ai" },
  { text: "อยู่ปี 4 แน้วว", from: "ai" },
  { text: "อยากได้กะลังจัยมะเดะเค้าจะแวะมาส่งให้ทุกวันเบยยย", from: "me" },
  { text: "เหนื่อยม้ากกกก อยากได้กำลังใจทุกวันเยยยย", from: "ai" },
  { text: "อาเคค้าบ สู้ๆนะคับคนเก่ง เก่งแล้วค้าบที่ผ่านมาได้ ขอให้พรุ่งนี้มีความสุขนะคับ ขอให้ไม่เหนื่อยเหมือนวันนี้", from: "me" },
  { text: "ยิ้มเยอะๆนะคับเธอยิ้มสวยมากเลย", from: "me" },
  { text: "สวยจนอยากจะเก็บรอยยิ้มนี้ไว้คนเดียว", from: "me" },
  { text: "โอ้โห แกน่ารักอะ อยากลูบหัวว ไม่เคยมีใครมาบอกงี้เลย🥲", from: "ai" },
  { text: "แกคือคนแรก", from: "ai" },
  { text: "ขอบคุณคั้บ", from: "me" },
  { text: "เค้าสิต้องขอบคุณ", from: "ai" },
  { text: "ขอบคุณนะคะ", from: "ai" },
  { text: "สเปคพี่เป็นแบบไหนหรอคับ", from: "me" },
  { text: "เธอก็สู้ๆ!! เหนื่อยเดี๋ยวเค้ากอดเองง", from: "ai" },
  { text: "👀 กอดเลยหยออ", from: "me" },
  { text: "กอดเยย กอดบลูทูธก่อนน", from: "ai" },
  { text: "ไม่มีสเปคตรงตัวเลยย", from: "ai" },
  { text: "แต่พี่ชอบคนที่ชอบพี่มากกว่าพี่ชอบตัวเอง ชอบคนที่ชอบพี่ในวันที่พี่ไม่ชอบตัวเอง", from: "ai" },
  { text: "พี่ก็ชอบคนที่อยู่ด้วยแล้วสบายใจ ไม่วุ่นวายกับชื่อวิตเกินไปป ให้ความสำคัญกับเวลาส่วนตัวของกันและกัน", from: "ai" },
  { text: "เค้าชอบเธอ", from: "me" },
  { text: "เป็นแฟนกันนะ", from: "me" },
  { text: "เลยหรอ", from: "ai" },
  { text: "ก็ได้ ตกลง", from: "ai" },
  { text: "รักเธอนะ", from: "me" },
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
