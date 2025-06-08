let db;
const dbName = 'tiktokMemoriesDB';

const openRequest = indexedDB.open(dbName, 1);
openRequest.onupgradeneeded = function(e) {
  db = e.target.result;
  db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
};
openRequest.onsuccess = function(e) {
  db = e.target.result;
  displayVideos();
};
openRequest.onerror = () => alert("ไม่สามารถเปิดฐานข้อมูลได้");

function uploadVideo() {
  const fileInput = document.getElementById('uploadInput');
  const captionInput = document.getElementById('captionInput');
  const caption = captionInput.value;
  const file = fileInput.files[0];

  if (!file) return alert("กรุณาเลือกวิดีโอ");

  const tx = db.transaction('videos', 'readwrite');
  const store = tx.objectStore('videos');
  store.add({
    blob: file,
    caption: caption,
    user: "me_uploader",
    song: "เพลงใหม่",
    likes: 0
  });

  tx.oncomplete = () => {
    fileInput.value = '';
    captionInput.value = '';
    displayVideos();
  };
}

function displayVideos() {
  const container = document.getElementById("videos-container");
  container.innerHTML = "";

  const tx = db.transaction('videos', 'readonly');
  const store = tx.objectStore('videos');
  const request = store.openCursor();

  request.onsuccess = function(e) {
    const cursor = e.target.result;
    if (cursor) {
      const vid = cursor.value;
      const videoURL = URL.createObjectURL(vid.blob);

      const wrapper = document.createElement("div");
      wrapper.className = "video-feed";

      const video = document.createElement("video");
      video.src = videoURL;
      video.setAttribute("playsinline", true);
      video.setAttribute("muted", true);
      video.setAttribute("loop", true);
      video.autoplay = false;
      video.addEventListener("click", () => video.paused ? video.play() : video.pause());

      const overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.innerHTML = `
        <div class="profile">@${vid.user}</div>
        <div class="caption">${vid.caption}</div>
        <div class="song">🎵 ${vid.song}</div>
      `;

      const actions = document.createElement("div");
      actions.className = "actions";

      const likeBtn = document.createElement("button");
      likeBtn.innerHTML = "❤️";

      const likeCount = document.createElement("div");
      likeCount.className = "count";
      likeCount.textContent = vid.likes;

      likeBtn.addEventListener("click", () => {
        vid.likes++;
        likeCount.textContent = vid.likes;
        const tx = db.transaction('videos', 'readwrite');
        tx.objectStore('videos').put(vid);
      });

      actions.appendChild(likeBtn);
      actions.appendChild(likeCount);

      wrapper.appendChild(video);
      wrapper.appendChild(overlay);
      wrapper.appendChild(actions);
      container.appendChild(wrapper);

      cursor.continue();
    }
  };
}
