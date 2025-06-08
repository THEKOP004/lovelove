let lastDeletedImage = null;

const galleryDiv = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

function getUploadedImages() {
  const data = localStorage.getItem('uploadedImages');
  return data ? JSON.parse(data) : [];
}

function saveUploadedImage(base64, caption) {
  const uploaded = getUploadedImages();
  uploaded.push({ file: base64, caption, timestamp: Date.now() });
  localStorage.setItem('uploadedImages', JSON.stringify(uploaded));
  renderGallery();
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function renderGallery() {
  galleryDiv.innerHTML = "";

  const uploaded = getUploadedImages();
  const grouped = {};

  uploaded.forEach(img => {
    const date = formatDate(img.timestamp || Date.now());
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(img);
  });

  Object.entries(grouped).forEach(([date, images]) => {
    images.forEach((image, i) => {
      const card = document.createElement('div');
      card.className = 'photo-card';

      const img = document.createElement('img');
      img.src = image.file;
      img.alt = image.caption;
      img.onclick = () => showLightbox(image);

      const captionDiv = document.createElement('div');
      captionDiv.className = 'photo-caption';
      captionDiv.innerHTML = `<strong>${image.caption}</strong><div class="photo-date">📅 ${date}</div>`;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '🗑️';
      deleteBtn.title = 'ลบรูปนี้';
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        const index = getUploadedImages().indexOf(image);
        deleteUploadedImage(index);
      };

      card.appendChild(img);
      card.appendChild(deleteBtn);
      card.appendChild(captionDiv);
      galleryDiv.appendChild(card);
    });
  });
}

function showLightbox(image) {
  lightboxImg.src = image.file;
  captionText.textContent = image.caption;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function handleUpload() {
  const fileInput = document.getElementById('uploadInput');
  const caption = document.getElementById('captionInput').value;

  const file = fileInput.files[0];
  if (!file) {
    alert("เลือกรูปก่อนน้าา 📷");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result;
    saveUploadedImage(base64, caption || "ไม่มีคำบรรยาย");
    fileInput.value = '';
    document.getElementById('captionInput').value = '';
  };
  reader.readAsDataURL(file);
}

function deleteUploadedImage(index) {
  const uploaded = getUploadedImages();
  const toDelete = uploaded[index];
  const confirmDelete = confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรูปนี้?");
  if (!confirmDelete) return;

  lastDeletedImage = toDelete;
  uploaded.splice(index, 1);
  localStorage.setItem('uploadedImages', JSON.stringify(uploaded));
  renderGallery();
}

function undoDelete() {
  if (!lastDeletedImage) {
    alert("ยังไม่มีรูปที่ลบล่าสุด");
    return;
  }
  const uploaded = getUploadedImages();
  uploaded.push(lastDeletedImage);
  localStorage.setItem('uploadedImages', JSON.stringify(uploaded));
  lastDeletedImage = null;
  renderGallery();
}

renderGallery();
