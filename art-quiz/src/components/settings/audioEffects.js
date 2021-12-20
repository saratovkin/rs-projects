import SoundUrls from './soundUrls';

class AudioEffects {
  constructor() {
    this.audioParams = {
      volume: 0,
      tempVolume: 0,
      musicVolume: 0,
      tempMusicVolume: 0,
      isAudioEnabled: true,
    };
    this.audioParams.volume = localStorage.getItem('volume') || 0.8;
    this.audioParams.musicVolume = localStorage.getItem('music-volume') || 0.2;
    this.audioParams.isAudioEnabled = true;
    this.volumeBar = document.getElementById('volume-bar');
    this.musicBar = document.getElementById('music-bar');
    this.volumeBar.value = this.audioParams.volume * 100;
    this.musicBar.value = this.audioParams.musicVolume * 100;
  }

  displayVolume() {
    document.getElementById('volume-sub').style.width = `${this.volumeBar.value}%`;
  }

  getVolume() {
    this.audioParams.volume = this.volumeBar.value / 100;
    if (this.audioParams.volume === 0) {
      document.querySelector('.mute-icon').style.backgroundImage = 'url("assets/svg/settings/mute.svg")';
    } else {
      document.querySelector('.mute-icon').style.backgroundImage = 'url("assets/svg/settings/unmute.svg")';
    }
    this.displayVolume();
  }

  playAudio(url) {
    this.soundEffect = new Audio(url);
    this.soundEffect.volume = this.audioParams.volume;
    this.soundEffect.play();
  }

  changeVolume() {
    this.getVolume();
    if (this.audioParams.isAudioEnabled) {
      this.audioParams.isAudioEnabled = false;
      this.playAudio(SoundUrls.rightSoundUrl);
      setTimeout(() => { (this.audioParams.isAudioEnabled = true); }, 600);
    }
  }

  muteEffects() {
    if (this.audioParams.volume === 0) {
      this.volumeBar.value = this.audioParams.tempVolume;
    } else {
      this.audioParams.tempVolume = this.volumeBar.value;
      this.volumeBar.value = 0;
    }
    this.changeVolume();
  }

  playBgMusic() {
    if (!this.bgMusic) {
      this.bgMusic = new Audio(SoundUrls.bgMusicUrl);
      this.bgMusic.volume = this.audioParams.musicVolume;
    }
    this.bgMusic.play();
  }

  displayMusicVolume() {
    if (this.bgMusic) {
      this.bgMusic.volume = this.audioParams.musicVolume;
      this.bgMusic.addEventListener('ended', this.playBgMusic);
      this.bgMusic.play();
    }
    document.getElementById('music-sub').style.width = `${this.musicBar.value}%`;
  }

  getMusicVolume() {
    this.audioParams.musicVolume = this.musicBar.value / 100;
    if (this.audioParams.musicVolume === 0) {
      document.querySelector('.note-icon').style.backgroundImage = 'url("assets/svg/settings/music-mute-icon.svg")';
    } else {
      document.querySelector('.note-icon').style.backgroundImage = 'url("assets/svg/settings/music-icon.svg")';
    }
    this.displayMusicVolume();
  }

  muteMusic() {
    if (this.audioParams.musicVolume === 0) {
      this.musicBar.value = this.audioParams.tempMusicVolume;
    } else {
      this.audioParams.tempMusicVolume = this.musicBar.value;
      this.musicBar.value = 0;
    }
    this.getMusicVolume();
  }

  setDefault() {
    this.audioParams.volume = 0.8;
    this.audioParams.musicVolume = 0.2;
    this.volumeBar.value = 80;
    this.musicBar.value = 20;
  }

  saveAudioSettings() {
    localStorage.setItem('volume', this.volumeBar.value / 100);
    localStorage.setItem('music-volume', this.musicBar.value / 100);
  }

  initAudioSettings() {
    this.getVolume();
    this.getMusicVolume();
  }

  initAudioListeners() {
    this.musicBar.addEventListener('input', () => { this.getMusicVolume(); });
    this.volumeBar.addEventListener('input', () => { this.changeVolume(); });
    document.querySelector('.mute-icon').addEventListener('click', () => { this.muteEffects(); });
    document.querySelector('.note-icon').addEventListener('click', () => { this.muteMusic(); });
    document.addEventListener('click', () => { this.playBgMusic(); });
  }
}

export default AudioEffects;
