// ฟังก์ชันแชร์ข้อความผ่าน Web Share API
function shareMessage() {
  const textToShare = `สุขสันต์วันครบรอบ 1 ปีนะที่รัก! รักเธอมากที่สุดในโลก 💖`;
  if (navigator.share) {
    navigator.share({
      title: 'Happy Anniversary',
      text: textToShare,
    }).catch(err => alert('ไม่สามารถแชร์ได้ ' + err));
  } else {
    alert('เบราว์เซอร์นี้ไม่รองรับฟีเจอร์แชร์ค่ะ');
  }
}
