const noteBox = document.getElementById('noteBox');
const noteDate = document.getElementById('noteDate');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const newNoteInput = document.getElementById('newNote');
const addNoteBtn = document.getElementById('addNoteBtn');
const addNoteSection = document.getElementById('addNoteSection');
const mainTitle = document.getElementById('mainTitle');

const homeBtn = document.getElementById('homeBtn');
const todayBtn = document.getElementById('todayBtn');
const memoryBtn = document.getElementById('memoryBtn');

let today = new Date().toISOString().slice(0, 10);
let currentDate = today;
let notes = JSON.parse(localStorage.getItem('todayNotes') || '[]');

function getNoteByDate(dateStr) {
  return notes.find(note => note.date === dateStr);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("th-TH", {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function showNote(dateStr) {
  const note = getNoteByDate(dateStr);
  noteDate.textContent = formatDate(dateStr);
  noteBox.textContent = note ? note.text : "ยังไม่มีโน้ตสำหรับวันนี้ ลองเขียนอะไรดูนะ 😊";
}

prevBtn.addEventListener('click', () => {
  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 1);
  currentDate = prevDate.toISOString().slice(0, 10);
  showNote(currentDate);
});

nextBtn.addEventListener('click', () => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextStr = nextDate.toISOString().slice(0, 10);
  if (nextStr <= today) {
    currentDate = nextStr;
    showNote(currentDate);
  }
});

addNoteBtn.addEventListener('click', () => {
  const text = newNoteInput.value.trim();
  if (!text) {
    alert("กรุณาพิมพ์โน้ตก่อนเพิ่ม!");
    return;
  }
  const index = notes.findIndex(n => n.date === currentDate);
  if (index >= 0) {
    notes[index].text = text;
  } else {
    notes.push({ date: currentDate, text });
  }
  localStorage.setItem("todayNotes", JSON.stringify(notes));
  newNoteInput.value = "";
  showNote(currentDate);
  alert("เพิ่มโน้ตสำเร็จ! 💌");
});

homeBtn.addEventListener('click', () => {
  currentDate = today;
  mainTitle.textContent = "Today Note";
  addNoteSection.style.display = "block";
  showNote(currentDate);
});

todayBtn.addEventListener('click', () => {
  currentDate = today;
  mainTitle.textContent = "Today Note";
  addNoteSection.style.display = "block";
  showNote(currentDate);
});

memoryBtn.addEventListener('click', () => {
  mainTitle.textContent = "❤️ ความทรงจำ";
  noteDate.textContent = "เร็ว ๆ นี้";
  noteBox.textContent = "ฟีเจอร์นี้กำลังพัฒนา อย่าลืมกลับมาดูนะ 😉";
  addNoteSection.style.display = "none";
});

showNote(currentDate);
