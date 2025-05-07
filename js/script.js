document.addEventListener('DOMContentLoaded', () => {
  // 웹 페이지에 필요한 여러 요소들을 자바스크립트가 찾을 수 있게 변수에 저장해둬!
  const music = document.getElementById('backgroundMusic'); // 배경 음악 오디오 태그
  const musicButton = document.getElementById('playMusicButton'); // 음악 재생/일시정지 버튼
  const menuButton = document.getElementById('menuToggleButton'); // 메뉴 열고 닫는 버튼 (☰)
  const rightMenu = document.getElementById('rightMenu'); // 오른쪽에서 나오는 메뉴 전체 영역
  const fullScreenOverlay = document.getElementById('fullScreenOverlay'); // 명령어 설명 뜨는 검은색 전체 화면 오버레이
  const fullScreenKoreanCommand = document.getElementById('fullScreenKoreanCommand'); // 오버레이에 표시될 한글 명령어 이름
  const fullScreenText = document.getElementById('fullScreenText'); // 오버레이에 표시될 명령어 설명 내용
  const fullScreenCloseButton = document.getElementById('closeFullScreen'); // 오버레이 닫기 버튼

  // ✨ 카테고리 토글 기능 시작! ✨
  // HTML에서 class가 'command-category-button'인 모든 버튼들을 찾아와! (일반, 관리자, 개발자 버튼들!)
  const categoryButtons = document.querySelectorAll('.command-category-button');
  // HTML에서 class가 'command-list'인 모든 div들을 찾아와! (각 카테고리 아래 명령어 목록 div들!)
  const commandLists = document.querySelectorAll('.command-list');

  // 찾아온 카테고리 버튼들 각각에 대해 '클릭' 이벤트가 발생했을 때 할 일을 정해줘!
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 지금 클릭된 버튼의 'data-target' 속성 값을 가져와! (HTML에서 이 버튼이 어떤 목록을 열지 정해놨지?)
      const targetListId = button.getAttribute('data-target');
      // 그 'data-target' 값(ID)을 가지고 HTML 문서에서 해당하는 목록 요소 (div)를 찾아와!
      const targetList = document.getElementById(targetListId);

      // ✨ 이제 마법 시작! 모든 명령어 목록들을 한번 싹~ 돌면서... ✨
      commandLists.forEach(list => {
          // 만약 지금 보고 있는 목록(list)이 클릭된 버튼이 목표로 하는 목록(targetList)이 아니라면?!
          if (list !== targetList) {
              // 그 목록에서는 'active' 클래스를 떼어내! (CSS에서 active 없으면 display: none; 이라 숨겨질 거야!)
              list.classList.remove('active');
          }
      });

      // ✨ 그리고 클릭된 버튼이 목표로 하는 목록(targetList)만 보이게 (active 클래스 붙였다 뗐다) 해줘! ✨
      if (targetList) { // 혹시 targetList를 못 찾았을 수도 있으니 확인!
        targetList.classList.toggle('active'); // active 클래스를 붙여 있으면 떼고, 없으면 붙이고!
      }
    });
  });
  // ✨ 카테고리 토글 기능 끝! ✨


  let isPlaying = false; // 음악이 지금 재생 중인지 아닌지 상태를 저장하는 변수

  // 배경 음악을 자동으로 재생 시도하는 함수
  function tryAutoPlay() {
    if (!music) return; // music 요소가 없으면 그냥 끝내!

    music.muted = false; // 소리 끄기 해제
    // play() 함수는 Promise를 반환해서 음악 재생 성공/실패를 알 수 있어!
    music.play().then(() => {
      // 재생 성공하면!
      isPlaying = true; // 상태를 재생 중으로 바꾸고
      if (musicButton) musicButton.classList.add('playing'); // 음악 버튼에 'playing' 클래스를 붙여줘 (CSS에서 모양 바꿀 때 쓸 수 있지!)
    }).catch((error) => {
      // 재생 실패하면 (브라우저 설정 때문에 자동 재생 막혔을 때 등)
      console.warn("자동 재생 실패:", error); // 콘솔에 경고 메시지 띄우고
      if (music) music.muted = true; // 다시 소리 끄기 (혹시 소리 나갈까봐)
    });
  }

  // 음악 재생/일시정지 버튼 클릭 이벤트 처리
  if (music && musicButton) { // music 요소랑 musicButton 요소 둘 다 있을 때만 이벤트 추가!
    musicButton.addEventListener('click', () => {
      if (isPlaying) { // 만약 재생 중이었다면?
        music.pause(); // 음악 멈춰!
        musicButton.classList.remove('playing'); // 버튼에서 'playing' 클래스 떼고
        isPlaying = false; // 상태를 멈춤으로 바꿔!
      } else { // 만약 멈춰 있었다면?
        music.muted = false; // 다시 소리 켜고
        music.play().then(() => { // 음악 재생 시도!
          musicButton.classList.add('playing'); // 재생 성공하면 버튼에 'playing' 클래스 붙이고
          isPlaying = true; // 상태를 재생 중으로 바꿔!
        }).catch((err) => {
          // 재생 실패하면
          console.error("음악 재생 실패:", err); // 콘솔에 에러 메시지 띄우고
          // 사용자한테 왜 안되는지 알려주는 알림 메시지 띄워줘!
          alert("브라우저에서 자동 재생이 차단되어 있어요! 사용자의 직접적인 동작(클릭 등)이 필요할 수 있습니다.");
        });
      }
    });

    // 웹 페이지가 로드되면 바로 자동 재생 시도해봐!
    tryAutoPlay();
  } else {
      // 음악 관련 요소가 없으면 콘솔에 경고 메시지 띄워줘!
      console.warn("음악 재생 요소(backgroundMusic 또는 playMusicButton)를 찾을 수 없습니다.");
  }


  // 메뉴 열고 닫기 버튼 클릭 이벤트 처리
  if (menuButton && rightMenu) { // 메뉴 버튼과 메뉴 영역 둘 다 있을 때만 이벤트 추가!
    menuButton.addEventListener('click', () => {
      // rightMenu에 'open' 클래스를 붙였다 뗐다 해서 메뉴를 보이거나 숨겨! (CSS에서 'open' 클래스에 대한 스타일이 필요해!)
      rightMenu.classList.toggle('open');

      // ✨ 메뉴가 닫힐 때 (open 클래스가 떼어질 때) 열려있던 모든 명령어 목록들을 숨기자! ✨
      if (!rightMenu.classList.contains('open')) { // 만약 rightMenu에 'open' 클래스가 없다면 (메뉴가 닫혔다면)
          commandLists.forEach(list => { // 모든 명령어 목록들을 돌면서
              list.classList.remove('active'); // 'active' 클래스를 떼어내! (깔끔하게 다 숨겨버려!)
          });
      }
      // ✨ 추가 끝! ✨

    });
  } else {
      // 메뉴 관련 요소가 없으면 콘솔에 경고 메시지 띄워줘!
      console.warn("메뉴 요소(menuToggleButton 또는 rightMenu)를 찾을 수 없습니다.");
  }

  // 전체 화면 오버레이 닫기 버튼 클릭 이벤트 처리
  if (fullScreenCloseButton && fullScreenOverlay) { // 닫기 버튼과 오버레이 둘 다 있을 때만 이벤트 추가!
    fullScreenCloseButton.addEventListener('click', () => {
      // fullScreenOverlay에서 'active' 클래스를 떼어내서 오버레이를 숨겨!
      fullScreenOverlay.classList.remove('active');
    });
  } else {
       // 오버레이 관련 요소가 없으면 콘솔에 경고 메시지 띄워줘!
       console.warn("오버레이 요소(closeFullScreen 또는 fullScreenOverlay)를 찾을 수 없습니다.");
  }


  // 명령어 설명 표시 함수 (HTML에서 각 명령어 버튼의 onclick으로 호출될 함수!)
  window.showDescription = function(command) {
    // 명령어 영어 키값에 대한 설명들을 모아놓은 객체 (하루키가 보내준 내용 그대로!)
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
      'givemoney': '... 네놈에게 돈을 주라고? ... 흥, 생색내는 건 아니야!' // '돈주기' 예시 설명
    };

    // 명령어 영어 키값에 대한 한글 이름들을 모아놓은 객체 (하루키가 보내준 내용 그대로!)
    const koreanCommandMap = {
      'ping': '/핑', 'serverinfo': '/서버정보', 'userinfo': '/유저정보',
      'attendance': '/출석', 'balance': '/잔액', 'help': '/도움말',
      'natsumi': '/나츠미', 'slotmachine': '/슬롯머신', 'translate': '/번역',
      'rank': '/도박랭킹', 'money': '/머니', 'sfw': '/sfw', 'nsfw': '/nsfw',
      'intro': '/소개', 'prefix': '/호출어', 'stealsticker': '/스티커 훔치기',
      'stealemote': '/이모지 훔치기', 'ban': '/밴', 'unban': '/언밴',
      'mute': '/뮤트', 'unmute': '/언뮤트', 'kick': '/킥', 'clear': '/청소',
      'nsfwgen': '/nsfw생성', 'vote': '/투표', 'learn': '/학습', 'reload': '/리로드',
      'givemoney': '/돈주기', // '돈주기' 예시 한글 이름
    };

    // 오버레이, 한글 명령어 표시될 곳, 설명 표시될 곳 요소들이 다 있고, 해당 명령어에 대한 설명도 있다면!
    if (
      fullScreenOverlay &&
      fullScreenKoreanCommand &&
      fullScreenText &&
      commandDescriptions[command] // showDescription('ping') 이렇게 넘어온 'ping' 이라는 키가 commandDescriptions 객체에 있는지 확인!
    ) {
      // 오버레이에 한글 명령어 이름 표시 (koreanCommandMap에 없으면 그냥 영어 키값 그대로 표시)
      fullScreenKoreanCommand.textContent = koreanCommandMap[command] || `/${command}`;
      // 오버레이에 명령어 설명 내용 표시
      fullScreenText.textContent = commandDescriptions[command];
      // 오버레이에 'active' 클래스 붙여서 보이게 해! (CSS에서 active에 대한 스타일이 필요해!)
      fullScreenOverlay.classList.add('active');
    } else {
      // 만약 위에 조건 중에 하나라도 만족 못하면 콘솔에 에러 메시지 띄워줘!
      console.error(`명령어 설명 표시 오류 또는 요소 누락: ${command}`);
      // 혹시 어떤 요소가 문제인지 더 자세히 알려주기!
      if (!fullScreenOverlay) console.warn("fullScreenOverlay 요소를 찾을 수 없습니다.");
      if (!fullScreenKoreanCommand) console.warn("fullScreenKoreanCommand 요소를 찾을 수 없습니다.");
      if (!fullScreenText) console.warn("fullScreenText 요소를 찾을 수 없습니다.");
      if (!commandDescriptions[command]) console.warn(`명령어 '${command}'에 대한 설명이 없습니다.`);
    }
  };
});