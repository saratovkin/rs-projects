import './main-page.css';

class MainPage {
  private mainBtn: HTMLElement;

  private toysBtn: HTMLElement;

  private treeBtn: HTMLElement;

  private startBtn: HTMLElement;

  private searchInput: HTMLInputElement;

  private favCounter: HTMLElement;

  public constructor() {
    this.mainBtn = document.getElementById('main-button') as HTMLElement;
    this.toysBtn = document.getElementById('toys-button') as HTMLElement;
    this.treeBtn = document.getElementById('tree-button') as HTMLElement;
    this.startBtn = document.getElementById('start-button') as HTMLElement;
    this.searchInput = document.querySelector('.search') as HTMLInputElement;
    this.favCounter = document.querySelector('.fav-counter') as HTMLElement;
  }

  private showMainPage(): void {
    document.querySelector('.toys-page')?.classList.add('hide');
    document.querySelector('.tree-page')?.classList.add('hide');
    document.querySelector('.main-page')?.classList.remove('hide');
    document.querySelector('.toys-container')?.classList.add('hide');
    this.mainBtn.classList.add('clicked');
    this.toysBtn.classList.remove('clicked');
    this.treeBtn.classList.remove('clicked');
    this.searchInput.classList.add('hide');
    this.favCounter.classList.add('hide');
  }

  private showToysPage(): void {
    document.querySelector('.toys-page')?.classList.remove('hide');
    document.querySelector('.tree-page')?.classList.add('hide');
    document.querySelector('.main-page')?.classList.add('hide');
    document.querySelector('.toys-container')?.classList.add('hide');
    this.mainBtn.classList.remove('clicked');
    this.toysBtn.classList.add('clicked');
    this.treeBtn.classList.remove('clicked');
    this.searchInput.classList.remove('hide');
    this.searchInput.focus();
    this.favCounter.classList.remove('hide');
  }

  private showTreePage(): void {
    document.querySelector('.toys-page')?.classList.add('hide');
    document.querySelector('.tree-page')?.classList.remove('hide');
    document.querySelector('.main-page')?.classList.add('hide');
    document.querySelector('.toys-container')?.classList.remove('hide');
    this.mainBtn.classList.remove('clicked');
    this.toysBtn.classList.remove('clicked');
    this.treeBtn.classList.add('clicked');
    this.searchInput.classList.add('hide');
    this.favCounter.classList.remove('hide');
  }

  public initNavigation() {
    this.mainBtn.addEventListener('click', () => { this.showMainPage(); });
    this.toysBtn.addEventListener('click', () => { this.showToysPage(); });
    this.treeBtn.addEventListener('click', () => { this.showTreePage(); });
    this.startBtn.addEventListener('click', () => { this.showToysPage(); });
    this.searchInput.addEventListener('input', () => { this.showToysPage(); });
  }
}

export default MainPage;
