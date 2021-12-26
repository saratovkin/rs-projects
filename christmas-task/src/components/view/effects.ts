import { throws } from 'assert';
import './snowflakes.css';

const treeLightStep: number = 10;
const treeLightWidth: number = 10;

class Effects {
  private audio: HTMLAudioElement;

  private snowFlag: boolean;

  private audioFlag: boolean;

  private lightsFlag: boolean;

  constructor() {
    this.snowFlag = JSON.parse(localStorage.getItem('snowFlag') as string) || false;
    this.audioFlag = JSON.parse(localStorage.getItem('audioFlag') as string) || false;
    this.lightsFlag = JSON.parse(localStorage.getItem('lightsFlag') as string) || false;
    this.audio = new Audio('audio/audio.mp3');
  }

  private toggleSnow(): void {
    localStorage.setItem('snowFlag', JSON.stringify(!this.snowFlag));
    (document.getElementById('snow-container') as HTMLElement).classList.toggle('hide');
    (document.getElementById('snow-button') as HTMLElement).classList.toggle('clicked');
  }

  private toggleMusic(): void {
    (document.getElementById('music-button') as HTMLElement).classList.toggle('clicked');
    if (this.audio.paused) {
      this.audio.play();
      localStorage.setItem('audioFlag', JSON.stringify(true));
    } else {
      this.audio.pause();
      localStorage.setItem('audioFlag', JSON.stringify(false));
      this.audio.currentTime = 0;
    }
  }

  private initMusicButton(): void {
    (document.getElementById('music-button') as HTMLElement).addEventListener('click', () => { this.toggleMusic(); });
  }

  private initSnowButton(): void {
    (document.getElementById('snow-button') as HTMLElement).addEventListener('click', () => { this.toggleSnow(); });
  }

  public initEffectsButtons() {
    this.initMusicButton();
    this.initSnowButton();
    this.setDefaultSettings();
  }

  private setDefaultSettings() {
    if (this.audioFlag) {
      (document.getElementById('music-button') as HTMLElement).classList.add('clicked');
      document.addEventListener('click', () => { this.audio.play(); }, { once: true });
    }
    if (this.snowFlag) {
      (document.getElementById('snow-container') as HTMLElement).classList.remove('hide');
      (document.getElementById('snow-button') as HTMLElement).classList.add('clicked');
    }
    if (this.lightsFlag) {
      this.createLights(localStorage.getItem('lights-color') as string);
    }
  }

  private createLightLine(index: number, color: string): void {
    const lightLine: HTMLDivElement = document.createElement('div');
    localStorage.setItem('lights-color', color);
    lightLine.className = 'light-line';
    lightLine.style.top = `${(treeLightStep * index)}%`;
    lightLine.style.width = `${(treeLightWidth * index)}%`;
    for (let i = 0; i < index + 1; i += 1) {
      const light: HTMLDivElement = this.createSingleLight(color);
      light.style.transform = `translate(0, ${4 * Math.sqrt(i * 10)}px)`;
      lightLine.append(light);
    }
    for (let i = index + 1; i < (index * 2 + 1); i += 1) {
      const light: HTMLDivElement = this.createSingleLight(color);
      light.style.transform = `translate(0, ${4 * Math.sqrt((index * 2 - i) * 10)}px)`;
      lightLine.append(light);
    }
    document.querySelector('.tree-lights')?.appendChild(lightLine);
  }

  private getRandomColor(): string {
    const colors: string[] = ['red', 'green', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private createSingleLight(color: string): HTMLDivElement {
    const light: HTMLDivElement = document.createElement('div');
    light.className = 'light';
    if (color === 'multi') {
      const tempColor = this.getRandomColor();
      light.style.background = tempColor
      light.style.animationName = `flicker${tempColor.charAt(0).toUpperCase() + tempColor.slice(1)}`;
    } else {
      light.style.background = color;
      light.style.animationName = `flicker${color.charAt(0).toUpperCase() + color.slice(1)}`;
    }
    return light;
  }

  public removeLights() {
    localStorage.setItem('lightsFlag', JSON.stringify(false));
    document.querySelector('.garland-button')?.classList.add('hide');
    (document.querySelector('.tree-lights') as HTMLElement).textContent = '';
  }

  private createLights(color: string) {
    this.removeLights();
    document.querySelector('.garland-button')?.addEventListener('click', this.removeLights);
    localStorage.setItem('lightsFlag', JSON.stringify(true));
    document.querySelector('.garland-button')?.classList.remove('hide');
    for (let i = 2; i <= 8; i += 1) {
      this.createLightLine(i, color);
    }
  }

  public initLightLine(e: Event): void {
    const color: string = (e.target as HTMLElement).className.split(' ')[1];
    if (color != 'hide') {
      this.createLights(color);
    }
  }
}

export default Effects;
