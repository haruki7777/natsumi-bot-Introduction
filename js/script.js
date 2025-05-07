document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('backgroundMusic');
  const musicButton = document.getElementById('playMusicButton');
  const menuButton = document.getElementById('menuToggleButton');
  const rightMenu = document.getElementById('rightMenu');
  const fullScreenOverlay = document.getElementById('fullScreenOverlay');
  const fullScreenKoreanCommand = document.getElementById('fullScreenKoreanCommand');
  const fullScreenText = document.getElementById('fullScreenText');
  const fullScreenCloseButton = document.getElementById('closeFullScreen');

  let isPlaying = false;

  // 자동 재생 시도
  function tryAutoPlay() {
    music.muted = false;
    music.play().then(() => {
      isPlaying = true;
      musicButton.classList.add('playing');
    }).catch((error) => {
      console.warn("자동 재생 실패:", error);
      music.muted = true;
    });
  }

  // 음악 재생/일시정지 토글
  if (music && musicButton) {
    musicButton.addEventListener('click', () => {
      if (isPlaying) {
        music.pause();
        musicButton.classList.remove('playing');
        isPlaying = false;
      } else {
        music.muted = false;
        music.play().then(() => {
          musicButton.classList.add('playing');
          isPlaying = true;
        }).catch((err) => {
          console.error("음악 재생 실패:", err);
          alert("브라우저에서 자동 재생이 차단되어 있어요!");
        });
      }
    });

    tryAutoPlay();
  }

  // 메뉴 열고 닫기
  if (menuButton && rightMenu) {
    menuButton.addEventListener('click', () => {
      rightMenu.classList.toggle('open');
    });
  }

  // 전체 설명 닫기
  if (fullScreenCloseButton && fullScreenOverlay) {
    fullScreenCloseButton.addEventListener('click', () => {
      fullScreenOverlay.classList.remove('active');
    });
  }

  // 명령어 설명 표시 함수 전역화
  window.showDescription = function(command) {
    const commandDescriptions = {
      'ping': '... 핑? 흥, 네놈의 상태나 확인해보겠다! ... 딱히 걱정하는 건 아니니까!',
      'serverinfo': '... 이 서버 정보? ... 뭐, 알고 싶으면 알려주지. 딱히 할 일 없는 건 아니고!',
      'userinfo': '... 네놈의 정보? ... 흥, 별로 궁금하지 않지만... 어쩔 수 없군.',
      'attendance': '... 출석? ... 매일 얼굴이나 비추고 다니는 건가? ... 뭐, 상관 없어.',
      'balance': '... 네놈의 잔액? ... 돈 같은 거나 세고 다니는 한심한 녀석...',
      'help': '... 도움말? ... 혼자서는 아무것도 못 하는 건가? ... 쯧, 귀찮게 하네.',
      'natsumi': '... 나? ... 흥, 네놈 따위가 날 뭘 안다고...!',
      'slotmachine': '... 슬롯머신? ... 어리석은 짓은 혼자 해! ... 딱히 말리진 않겠지만.',
      'translate': '... 번역? ... 네놈 나라 말도 제대로 못 하는 건가? ... 한심군.',
      'rank': '... 도박랭킹? ... 흥, 그런 쓸데없는 거나 신경 쓰다니...',
      'money': '... 돈? ... 흥, 네놈의 돈 따위 알 바 아니야!',
      'sfw': '... 흥, 변태 같은 짓은 하지 마! ... 딱히 걱정하는 건 아니니까!',
      'nsfw': '... 맘대로 해! ... 난 상관 없어.',
      'intro': '... 내 소개? ... 이미 충분히 말했잖아, 바보!',
      'prefix': '... 호출어? ... "나츠미", "나쯔미", "낫쯔미", "츠미짱", "츠미야", "나츠", "나츠짱" 니가 알아서 불러! 흥!',
      'stealsticker': '... 스티커 훔치기? ... 흥, 재미있겠군. ... 딱히 칭찬하는 건 아냐!',
      'stealemote': '... 이모지 훔치기? ... 쓸데없는 짓만 골라서 하는군!',
      'ban': '... 밴? ... 당연한 짓을 했을 뿐이야! ... 불만이라도?',
      'unban': '... 언밴? ... 한 번만 봐주는 거야. ... 착각하지 마!',
      'mute': '... 뮤트? ... 시끄러우니까 조용히 해!',
      'unmute': '... 언뮤트? ... 이제 좀 조용히 할 수 있겠지?',
      'kick': '... 킥? ... 짜증나게 구니까 쫓아낸 거야!',
      'clear': '... 청소? ... 더러운 건 질색이야!',
      'nsfwgen': '... 그런 거나 만들고... 흥, 취미 한번 독특하네.',
      'vote': '... 투표? ... 네놈 생각 따위 아무래도 상관 없어.',
      'learn': '... 학습? ... 흥, 얼마나 똑똑해지려나 보지.',
      'reload': '... 리로드? ... 다시 시작하는 건 네 자유지만... 기대는 안 해.',
    };

    const koreanCommandMap = {
      'ping': '/핑', 'serverinfo': '/서버정보', 'userinfo': '/유저정보',
      'attendance': '/출석', 'balance': '/잔액', 'help': '/도움말',
      'natsumi': '/나츠미', 'slotmachine': '/슬롯머신', 'translate': '/번역',
      'rank': '/도박랭킹', 'money': '/머니', 'sfw': '/sfw', 'nsfw': '/nsfw',
      'intro': '/소개', 'prefix': '/호출어', 'stealsticker': '/스티커 훔치기',
      'stealemote': '/이모지 훔치기', 'ban': '/밴', 'unban': '/언밴',
      'mute': '/뮤트', 'unmute': '/언뮤트', 'kick': '/킥', 'clear': '/청소',
      'nsfwgen': '/nsfw생성', 'vote': '/투표', 'learn': '/학습', 'reload': '/리로드',
    };

    if (
      fullScreenOverlay &&
      fullScreenKoreanCommand &&
      fullScreenText &&
      commandDescriptions[command]
    ) {
      fullScreenKoreanCommand.textContent = koreanCommandMap[command] || `/${command}`;
      fullScreenText.textContent = commandDescriptions[command];
      fullScreenOverlay.classList.add('active');
    } else {
      console.error(`명령어 설명 표시 오류: ${command}`);
    }
  };
});