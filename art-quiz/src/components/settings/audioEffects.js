import SoundUrls from './soundUrls';

const defaultVolume = 0.8;
const defaultMusicVolume = 0.2;
const rangeLength = 100;

class AudioEffects {
  constructor() {
    this.audioParams = {
      volume: 0,
      tempVolume: 0,
      musicVolume: 0,
      tempMusicVolume: 0,
      isAudioEnabled: true,
    };
    this.audioParams.volume = localStorage.getItem('volume') || defaultVolume;
    this.audioParams.musicVolume = localStorage.getItem('music-volume') || defaultMusicVolume;
    this.audioParams.isAudioEnabled = true;
    this.volumeBar = document.getElementById('volume-bar');
    this.musicBar = document.getElementById('music-bar');
    this.volumeBar.value = this.audioParams.volume * rangeLength;
    this.musicBar.value = this.audioParams.musicVolume * rangeLength;
  }

  displayVolume() {
    document.getElementById('volume-sub').style.width = `${this.volumeBar.value}%`;
  }

  displayMusicVolume() {
    if (this.bgMusic) {
      this.bgMusic.volume = this.audioParams.musicVolume;
      this.bgMusic.addEventListener('ended', this.playBgMusic);
      this.bgMusic.play();
    }
    document.getElementById('music-sub').style.width = `${this.musicBar.value}%`;
  }

  getVolume() {
    this.audioParams.volume = this.volumeBar.value / rangeLength;
    if (this.audioParams.volume === 0) {
      document.querySelector('.mute-icon').classList.add('mute');
    } else {
      document.querySelector('.mute-icon').classList.remove('mute');
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

  getMusicVolume() {
    this.audioParams.musicVolume = this.musicBar.value / rangeLength;
    if (this.audioParams.musicVolume === 0) {
      document.querySelector('.note-icon').classList.add('mute');
    } else {
      document.querySelector('.note-icon').classList.remove('mute');
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

  saveAudioSettings() {
    localStorage.setItem('volume', this.volumeBar.value / rangeLength);
    localStorage.setItem('music-volume', this.musicBar.value / rangeLength);
  }

  initAudioSettings() {
    this.getVolume();
    this.getMusicVolume();
    this.musicBar.addEventListener('input', () => { this.getMusicVolume(); });
    this.volumeBar.addEventListener('input', () => { this.changeVolume(); });
    document.querySelector('.mute-icon').addEventListener('click', () => { this.muteEffects(); });
    document.querySelector('.note-icon').addEventListener('click', () => { this.muteMusic(); });
    document.addEventListener('click', () => { this.playBgMusic(); });
  }

  setDefault() {
    this.audioParams.volume = defaultVolume;
    this.audioParams.musicVolume = defaultMusicVolume;
    this.volumeBar.value = defaultVolume * rangeLength;
    this.musicBar.value = defaultMusicVolume * rangeLength;
    this.initAudioSettings();
  }
}

export default AudioEffects;
