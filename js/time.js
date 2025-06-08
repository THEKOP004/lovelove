// Counter
const startDate = new Date("2024-11-03T21:30:00");
const counterDiv = document.getElementById("counter");

function updateCounter() {
  const now = new Date();
  let diff = now - startDate;

  const sec = Math.floor(diff / 1000) % 60;
  const min = Math.floor(diff / 1000 / 60) % 60;
  const hour = Math.floor(diff / 1000 / 60 / 60) % 24;
  const day = Math.floor(diff / 1000 / 60 / 60 / 24) % 30;
  const month = Math.floor(diff / 1000 / 60 / 60 / 24 / 30) % 12;
  const year = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);

  counterDiv.innerText = `${year} Year: ${month} Month: ${day} Day: ${hour} Hour ${min} Min ${sec} Sec`;
}

setInterval(updateCounter, 1000);
updateCounter();

// Passcode
const correctCode = "0311";
let enteredCode = "";

const inputDisplay = document.getElementById("inputDisplay");
const errorMsg = document.getElementById("error");

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    const value = key.innerText;
    if (value === "ลบทั้งหมด") {
      enteredCode = "";
      errorMsg.innerText = "";
    } else if (enteredCode.length < 4) {
      enteredCode += value;
    }

    inputDisplay.innerText = enteredCode.padEnd(4, "_");

    if (enteredCode.length === 4) {
      if (enteredCode === correctCode) {
        window.location.href = "menu.html";
      } else {
        errorMsg.innerText = "ง่า...ลองใหม่อีกทีนะ~ 😅";
        setTimeout(() => {
          enteredCode = "";
          inputDisplay.innerText = "____";
          errorMsg.innerText = "";
        }, 1500);
      }
    }
  });
});
