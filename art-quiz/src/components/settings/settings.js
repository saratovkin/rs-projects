import MiscFunctions from '../misc';

class Settings {
  constructor(audioEffects, gameSettings) {
    this.audioEffects = audioEffects;
    this.gameSettings = gameSettings;
    this.settingsBtn = document.getElementById('settings-btn');
    this.saveBtn = document.getElementById('save-btn');
  }

  setDefault() {
    this.gameSettings.setDefault();
    this.audioEffects.setDefault();
  }

  saveSettings(elem) {
    this.gameSettings.saveGameSettings();
    this.audioEffects.saveAudioSettings();
    this.closeSettingsWindow(elem);
  }

  closeSettingsWindow(elem) {
    document.querySelectorAll('.main-field').forEach((item) => {
      item.classList.remove('flip');
    });
    this.settingsBtn.classList.remove('slide-bottom');
    MiscFunctions.toggleBlock(elem);
  }

  static animateSettings(elem) {
    document.querySelectorAll('.main-field').forEach((item) => {
      item.classList.add('flip');
    });
    MiscFunctions.toggleBlock(elem);
  }

  initGameListeners() {
    this.gameSettings.initGameSettings();
    this.audioEffects.initAudioSettings();
    document.getElementById('time-mode').addEventListener('click', () => { this.gameSettings.toggleTimeMode(); });
    document.getElementById('default-btn').addEventListener('click', () => { this.setDefault(); });
    this.settingsBtn.show = ['.settings-field', '.button-container'];
    this.settingsBtn.hide = ['.settings-btn.main'];
    this.settingsBtn.addEventListener('click', (e) => { Settings.animateSettings(e); });
    this.saveBtn.show = ['.settings-btn.main'];
    this.saveBtn.hide = ['.button-container'];
    this.saveBtn.addEventListener('click', (e) => { this.saveSettings(e); });
  }
}

export default Settings;
