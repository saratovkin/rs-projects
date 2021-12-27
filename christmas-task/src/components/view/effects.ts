import './snowflakes.css';

const treeLightStep = 10;
const treeLightWidth = 10;

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

  private initDefaultButton(): void {
    (document.getElementById('default-tree') as HTMLElement).addEventListener('click', () => { this.setDefaultSetings(); });
  }

  public initEffectsButtons() {
    this.initMusicButton();
    this.initSnowButton();
    this.initDefaultButton();
    this.setSavedSettings();
  }

  private setSavedSettings() {
    if (this.audioFlag) {
      (document.getElementById('music-button') as HTMLElement).classList.add('clicked');
      document.addEventListener('click', () => { this.audio.play(); }, { once: true });
    }
    if (this.snowFlag) {
      (document.getElementById('snow-container') as HTMLElement).classList.remove('hide');
      (document.getElementById('snow-button') as HTMLElement).classList.add('clicked');
    }
    if (this.lightsFlag) {
      Effects.createLights(localStorage.getItem('lights-color') as string);
    }
  }

  private setDefaultSetings() {
    localStorage.removeItem('snowFlag');
    localStorage.removeItem('audioFlag');
    localStorage.removeItem('lightsFlag');
    localStorage.removeItem('bg-image');
    localStorage.removeItem('tree-image');
    (document.getElementById('music-button') as HTMLElement).classList.remove('clicked');
    (document.getElementById('snow-container') as HTMLElement).classList.add('hide');
    (document.getElementById('snow-button') as HTMLElement).classList.remove('clicked');
    this.audio.pause();
    this.audio.currentTime = 0;
    Effects.removeLights();
    (document.querySelector('.bg-image') as HTMLElement).style.backgroundImage = 'url("bg/1.jpg")';
    (document.querySelector('.tree-image') as HTMLElement).style.backgroundImage = 'url("tree/1.png")';
  }

  private static createLightLine(index: number, color: string): void {
    const lightLine: HTMLDivElement = document.createElement('div');
    localStorage.setItem('lights-color', color);
    lightLine.className = 'light-line';
    lightLine.style.top = `${(treeLightStep * index)}%`;
    lightLine.style.width = `${(treeLightWidth * index)}%`;
    for (let i = 0; i < index + 1; i += 1) {
      const light: HTMLDivElement = Effects.createSingleLight(color);
      light.style.transform = `translate(0, ${4 * Math.sqrt(i * 10)}px)`;
      lightLine.append(light);
    }
    for (let i = index + 1; i < (index * 2 + 1); i += 1) {
      const light: HTMLDivElement = Effects.createSingleLight(color);
      light.style.transform = `translate(0, ${4 * Math.sqrt((index * 2 - i) * 10)}px)`;
      lightLine.append(light);
    }
    document.querySelector('.tree-lights')?.appendChild(lightLine);
  }

  private static getRandomColor(): string {
    const colors: string[] = ['red', 'green', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private static createSingleLight(color: string): HTMLDivElement {
    const light: HTMLDivElement = document.createElement('div');
    light.className = 'light';
    if (color === 'multi') {
      const tempColor = Effects.getRandomColor();
      light.style.background = tempColor;
      light.style.animationName = `flicker${tempColor.charAt(0).toUpperCase() + tempColor.slice(1)}`;
    } else {
      light.style.background = color;
      light.style.animationName = `flicker${color.charAt(0).toUpperCase() + color.slice(1)}`;
    }
    return light;
  }

  public static removeLights() {
    localStorage.setItem('lightsFlag', JSON.stringify(false));
    document.querySelector('.garland-button')?.classList.add('hide');
    (document.querySelector('.tree-lights') as HTMLElement).textContent = '';
  }

  private static createLights(color: string) {
    Effects.removeLights();
    document.querySelector('.garland-button')?.addEventListener('click', Effects.removeLights);
    localStorage.setItem('lightsFlag', JSON.stringify(true));
    document.querySelector('.garland-button')?.classList.remove('hide');
    for (let i = 2; i <= 8; i += 1) {
      Effects.createLightLine(i, color);
    }
  }

  public static initLightLine(e: Event): void {
    const color: string = (e.target as HTMLElement).className.split(' ')[1];
    if (color && color !== 'hide') {
      Effects.createLights(color);
    }
  }
}

export default Effects;
