const songs = [
  {
    title: "Die with a Smile",
    artist: "Lady Gaga, Bruno Mars",
    albumArt: "https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png",
    audioSrc: "s1.mp3",
  },
  {
    title: "Lost Jigsaw",
    artist: "guncharlie feat. Upim LANDOKMAI",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/1b/6c/d3/1b6cd316-fae0-fdb1-22ef-31f4d3ae83fb/cover.jpg/1200x630bb.jpg",
    audioSrc: "s2.mp3",
  },
  {
    title: "ได้รึเปล่า?",
    artist: "mute.",
    albumArt: "https://i.ytimg.com/vi/6psmkd62oD0/maxresdefault.jpg",
    audioSrc: "s3.mp3",
  },
  {
    title: "Melatonin",
    artist: "mute.",
    albumArt: "https://i.ytimg.com/vi/ni326FjAV6Q/maxresdefault.jpg",
    audioSrc: "s4.mp3",
  },
  {
    title: "จากกันโดยสมบูรณ์",
    artist: "guncharlie",
    albumArt: "https://i.ytimg.com/vi/Jdzs-qcURQE/maxresdefault.jpg",
    audioSrc: "s5.mp3",
  },
  {
    title: "เพื่อนแบบใด ( I See It )",
    artist: "JMNK ( JustmineNika )",
    albumArt: "https://www.dochord.com/wp-content/uploads/2025/03/%E0%B8%A9%E0%B8%A9%E0%B8%A9%E0%B9%80%E0%B8%B3%E0%B9%80%E0%B9%80%E0%B9%80%E0%B9%80%E0%B8%B3.webp",
    audioSrc: "s6.mp3",
  },
];

const albumArt = document.querySelector(".album-art");
const songTitle = document.querySelector(".song-title-display");
const artistName = document.querySelector(".artist-name");
const btnRandom = document.querySelector(".btn-random");
const audioPlayer = document.querySelector("audio");
const songListDiv = document.getElementById('songList');

let currentSongIndex = 0;

function showSong(index) {
  const song = songs[index];
  albumArt.src = song.albumArt;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  audioPlayer.src = song.audioSrc;
  audioPlayer.play();
  currentSongIndex = index;
}

function randomSong() {
  let randIndex;
  do {
    randIndex = Math.floor(Math.random() * songs.length);
  } while (randIndex === currentSongIndex);
  showSong(randIndex);
}

btnRandom.addEventListener("click", randomSong);
showSong(0);

// สร้างรายการเพลงด้านล่าง
let currentAudio = null;
songs.forEach(song => {
  const songDiv = document.createElement('div');
  songDiv.className = 'song-item';

  const title = document.createElement('div');
  title.className = 'song-title';
  title.textContent = song.title;

  const audio = document.createElement('audio');
  audio.controls = true;
  audio.src = song.audioSrc;
  audio.addEventListener('play', () => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = audio;
  });

  songDiv.appendChild(title);
  songDiv.appendChild(audio);
  songListDiv.appendChild(songDiv);
});
