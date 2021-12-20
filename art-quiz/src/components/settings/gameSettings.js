import MiscFunctions from '../misc';

class GameSettings {
  constructor() {
    this.timeLimit = +localStorage.getItem('timeLimit') || 25;
    this.timeMode = JSON.parse(localStorage.getItem('timeMode')) || false;
    this.timeBar = document.getElementById('time-bar');
    this.settingsBtn = document.getElementById('settings-btn');
    this.saveBtn = document.getElementById('save-btn');
    this.timerInfo = document.querySelector('.pagination-timer');
  }

  showTimeMode() {
    if (this.timeMode === true) {
      document.querySelector('.time-range').classList.remove('blocked');
    } else {
      document.querySelector('.time-range').classList.add('blocked');
    }
  }

  toggleTimeMode() {
    this.timeMode = !this.timeMode;
    this.showTimeMode();
  }

  displayTimeInterval() {
    document.getElementById('time-sub').style.width = `${this.timeBar.value * 20}%`;
    document.getElementById('time-selected').textContent = this.timeLimit;
  }

  setTimeInterval() {
    this.timeLimit = (+this.timeBar.value + 1) * 5;
    this.displayTimeInterval();
  }

  saveSettings(elem) {
    this.saveGameSettings();
    // audioEffects.saveSettings();
    document.querySelectorAll('.main-field').forEach((item) => {
      item.classList.remove('flip');
    });
    this.settingsBtn.classList.remove('slide-bottom');
    MiscFunctions.toggleBlock(elem);
  }

  saveGameSettings() {
    localStorage.setItem('timeLimit', this.timeLimit);
    localStorage.setItem('timeMode', this.timeMode);
  }

  initGameSettings() {
    document.getElementById('time-checkbox').checked = this.timeMode;
    this.setTimeInterval();
    this.showTimeMode();
    this.timeBar.value = this.timeLimit / 5 - 1;
  }

  animateSettings(elem) {
    document.querySelectorAll('.main-field').forEach((item) => {
      item.classList.add('flip');
    });
    MiscFunctions.toggleBlock(elem);
  }

  initGameListeners() {
    this.initGameSettings();
    this.settingsBtn.show = ['.settings-field', '.button-container'];
    this.settingsBtn.hide = ['.settings-btn.main'];
    this.settingsBtn.addEventListener('click', (e) => { this.animateSettings(e); });
    this.saveBtn.show = ['.settings-btn.main'];
    this.saveBtn.hide = ['.button-container'];
    this.saveBtn.addEventListener('click', (e) => { this.saveSettings(e); });
    this.timeBar.addEventListener('input', () => { this.setTimeInterval(); });
  }

  setDefault() {
    this.timeBar.value = 3;
    this.timeMode = false;
    this.initGameSettings();
  }
}

export default GameSettings;
