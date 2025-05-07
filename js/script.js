// 메뉴 슬라이드
function toggleMenu() {
  document.getElementById('rightMenu').classList.toggle('open');
}

// 전체 화면 오버레이 열기
function openOverlay() {
  document.getElementById('fullScreenOverlay').style.display = 'flex';
}

// 전체 화면 오버레이 닫기
function closeOverlay() {
  document.getElementById('fullScreenOverlay').style.display = 'none';
}

// 음악 재생/일시정지
let music = document.getElementById("backgroundMusic");
let musicButton = document.getElementById("playMusicButton");

musicButton.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    musicButton.textContent = "음악 일시정지";
  } else {
    music.pause();
    musicButton.textContent = "음악 재생";
  }
});

// 명령어 목록 토글
function toggleCommandList(commandId) {
  let commandList = document.getElementById(commandId);
  commandList.classList.toggle('active');
}