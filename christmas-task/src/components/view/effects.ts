import './snowflakes.css';

class Effects {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio('audio/audio.mp3');
  }

  private toggleSnow(): void {
    (document.getElementById('snow-container') as HTMLElement).classList.toggle('hide');
    (document.getElementById('snow-button') as HTMLElement).classList.toggle('clicked');
  }

  private toggleMusic(): void {
    (document.getElementById('music-button') as HTMLElement).classList.toggle('clicked');
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  private initMusicButton(): void {
    (document.getElementById('music-button') as HTMLElement).addEventListener('click', () => { this.toggleMusic(); });
  }

  private initSnowButton(): void {
    (document.getElementById('snow-button') as HTMLElement).addEventListener('click', this.toggleSnow);
  }

  public initEffectsButtons() {
    this.initMusicButton();
    this.initSnowButton();
  }
}

export default Effects;
