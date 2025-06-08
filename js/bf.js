const memoryGrid = document.getElementById('memoryGrid');
const modal = document.getElementById('memoryModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalImage = document.getElementById('modalImage');

function addMemory() {
  const title = document.getElementById('titleInput').value;
  const text = document.getElementById('textInput').value;
  const file = document.getElementById('imageInput').files[0];

  if (!title || !text) {
    alert('กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;
    const memoryCard = document.createElement('div');
    memoryCard.className = 'memory-card';
    memoryCard.innerHTML = `<div class="memory-title">${title}</div>`;
    memoryCard.onclick = function() {
      showModal(title, text, file ? imageUrl : null);
    }
    memoryGrid.prepend(memoryCard);

    document.getElementById('titleInput').value = '';
    document.getElementById('textInput').value = '';
    document.getElementById('imageInput').value = '';
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload({ target: { result: null } });
  }
}

function showModal(title, text, imageUrl) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  if (imageUrl) {
    modalImage.src = imageUrl;
    modalImage.style.display = 'block';
  } else {
    modalImage.style.display = 'none';
  }
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}
