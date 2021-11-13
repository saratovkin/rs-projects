function toggleElem(selector) {
  document.querySelectorAll(selector).forEach(item => {
    item.classList.toggle('hide');
  });
}

function toggleBlock(e) {
  e.currentTarget.path.forEach(item => {
    toggleElem(item);
  });
}


function showMainMenu() {

}

function changeVolume() {
  
}

function toggleTimeMode() {
  
}

function setTimeInterval(){

}

function saveSettings() {

}

function setDefault() {

}

const settingsBtn = document.querySelector('.settings-btn');
settingsBtn.path = ['.settings-field', '.select-type', '.button-container','.main'];
settingsBtn.addEventListener('click', toggleBlock);