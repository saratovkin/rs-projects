class GameSettings {
  constructor() {
    this.timeLimit = +localStorage.getItem('timeLimit') || 25;
    this.timeMode = JSON.parse(localStorage.getItem('timeMode')) || false;
    this.timeBar = document.getElementById('time-bar');
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

  saveGameSettings() {
    localStorage.setItem('timeLimit', this.timeLimit);
    localStorage.setItem('timeMode', this.timeMode);
  }

  initGameSettings() {
    this.timeBar.value = this.timeLimit / 5 - 1;
    this.displayTimeInterval();
    document.getElementById('time-checkbox').checked = this.timeMode;
    this.showTimeMode();
    this.timeBar.addEventListener('input', () => { this.setTimeInterval(); });
  }

  setDefault() {
    this.timeBar.value = 3;
    this.timeMode = false;
    this.initGameSettings();
  }
}

export default GameSettings;
