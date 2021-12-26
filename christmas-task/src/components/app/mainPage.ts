import './main-page.css';

class MainPage {
  private mainBtn: HTMLElement;

  private toysBtn: HTMLElement;

  private treeBtn: HTMLElement;

  private startBtn: HTMLElement;

  public constructor() {
    this.mainBtn = document.getElementById('main-button') as HTMLElement;
    this.toysBtn = document.getElementById('toys-button') as HTMLElement;
    this.treeBtn = document.getElementById('tree-button') as HTMLElement;
    this.startBtn = document.getElementById('start-button') as HTMLElement;
  }

  private showMainPage(): void {
    document.querySelector('.toys-page')?.classList.add('hide');
    document.querySelector('.tree-page')?.classList.add('hide');
    document.querySelector('.main-page')?.classList.remove('hide');
    this.mainBtn.classList.add('clicked');
    this.toysBtn.classList.remove('clicked');
    this.treeBtn.classList.remove('clicked');
  }

  private showToysPage(): void {
    document.querySelector('.toys-page')?.classList.remove('hide');
    document.querySelector('.tree-page')?.classList.add('hide');
    document.querySelector('.main-page')?.classList.add('hide');
    this.mainBtn.classList.remove('clicked');
    this.toysBtn.classList.add('clicked');
    this.treeBtn.classList.remove('clicked');
    (document.querySelector('.search') as HTMLInputElement).focus();
  }

  private showTreePage(): void {
    document.querySelector('.toys-page')?.classList.add('hide');
    document.querySelector('.tree-page')?.classList.remove('hide');
    document.querySelector('.main-page')?.classList.add('hide');
    this.mainBtn.classList.remove('clicked');
    this.toysBtn.classList.remove('clicked');
    this.treeBtn.classList.add('clicked');
  }

  public initNavigation() {
    this.mainBtn.addEventListener('click', () => { this.showMainPage(); });
    this.toysBtn.addEventListener('click', () => { this.showToysPage(); });
    this.treeBtn.addEventListener('click', () => { this.showTreePage(); });
    this.startBtn.addEventListener('click', () => { this.showToysPage(); });
  }
}

export default MainPage;
