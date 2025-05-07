const commandData = {
  "기본": [
    { id: "ping", ko: "/핑", desc: "... 핑? 흥, 네놈의 상태나 확인해보겠다! ... 딱히 걱정하는 건 아니니까!" },
    { id: "help", ko: "/도움말", desc: "... 도움말? ... 혼자서는 아무것도 못 하는 건가? ... 쯧, 귀찮게 하네." },
    { id: "intro", ko: "/소개", desc: "... 내 소개? ... 이미 충분히 말했잖아, 바보!" },
    { id: "prefix", ko: "/호출어", desc: "... 호출어? ... '나츠미'라고 부르면 되잖아, 바보!" }
  ],
  "서버 관리": [
    { id: "ban", ko: "/밴", desc: "... 밴? ... 당연한 짓을 했을 뿐이야! ... 불만이라도?" },
    { id: "unban", ko: "/언밴", desc: "... 언밴? ... 한 번만 봐주는 거야. ... 착각하지 마!" },
    { id: "kick", ko: "/킥", desc: "... 킥? ... 짜증나게 구니까 쫓아낸 거야!" },
    { id: "clear", ko: "/청소", desc: "... 청소? ... 더러운 건 질색이야!" }
  ],
  "유저 명령어": [
    { id: "userinfo", ko: "/유저정보", desc: "... 네놈의 정보? ... 흥, 별로 궁금하지 않지만... 어쩔 수 없군." },
    { id: "attendance", ko: "/출석", desc: "... 출석? ... 매일 얼굴이나 비추고 다니는 건가? ... 뭐, 상관 없어." },
    { id: "balance", ko: "/잔액", desc: "... 네놈의 잔액? ... 돈 같은 거나 세고 다니는 한심한 녀석..." }
  ]
};

function generateCommandList() {
  const container = document.getElementById('commandContainer');
  if (!container) return console.error("commandContainer not found");

  Object.entries(commandData).forEach(([category, commands]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'command-category';

    const title = document.createElement('h3');
    title.className = 'category-title';
    title.textContent = category;
    title.onclick = () => commandList.classList.toggle('active');
    categoryDiv.appendChild(title);

    const commandList = document.createElement('ul');
    commandList.className = 'command-list';
    commands.forEach(cmd => {
      const item = document.createElement('li');
      item.className = 'command-item';
      item.textContent = cmd.ko;
      item.onclick = () => showDescription(cmd);
      commandList.appendChild(item);
    });

    categoryDiv.appendChild(commandList);
    container.appendChild(categoryDiv);
  });
}

function showDescription(command) {
  const overlay = document.getElementById('fullScreenOverlay');
  const cmdText = document.getElementById('fullScreenKoreanCommand');
  const descText = document.getElementById('fullScreenText');

  if (overlay && cmdText && descText) {
    cmdText.textContent = command.ko;
    descText.textContent = command.desc;
    overlay.style.display = 'flex';
  }
}

function hideFullScreen() {
  const overlay = document.getElementById('fullScreenOverlay');
  if (overlay) overlay.style.display = 'none';
}

function toggleRightMenu() {
  const rightMenu = document.getElementById('rightMenu');
  if (rightMenu) rightMenu.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  generateCommandList();

  const music = document.getElementById('backgroundMusic');
  const button = document.getElementById('playMusicButton');
  let isPlaying = false;

  if (button && music) {
    button.addEventListener('click', () => {
      if (isPlaying) {
        music.pause();
        button.classList.remove('playing');
        isPlaying = false;
      } else {
        music.muted = false;
        music.play().then(() => {
          button.classList.add('playing');
          isPlaying = true;
        }).catch((err) => {
          console.error("음악 재생 실패:", err);
          alert("브라우저에서 자동 재생이 차단되어 있어요. 설정을 확인해주세요!");
        });
      }
    });

    music.muted = false;
    music.play().then(() => {
      isPlaying = true;
      button.classList.add('playing');
    }).catch(() => {
      music.muted = true;
    });
  }
});