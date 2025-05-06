function toggleRightMenu() {
  const rightMenu = document.getElementById('rightMenu');
  rightMenu.classList.toggle('open');
}

function toggleCommandList(categoryId) {
  const commandList = document.getElementById(categoryId + '-commands');
  commandList.classList.toggle('active');
  const infoContent = document.getElementById('help-content');
  if (infoContent && commandList.classList.contains('active')) {
    infoContent.classList.remove('active');
  } else if (infoContent && !commandList.classList.contains('active')) {
    infoContent.classList.add('active');
  }
  hideCommandDescription();
}

function showDescription(command) {
  const descriptionDiv = document.getElementById('commandDescription');
  const commandDescriptions = {
    'ping': '... 핑? 흥, 네놈의 상태나 확인해보겠다! ... 딱히 걱정하는 건 아니니까!',
    'serverinfo': '
