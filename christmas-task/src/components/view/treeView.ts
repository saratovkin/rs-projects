import './tree-decoration.css';
import './tree-parameters.css';

class TreeView {
  private static createOption(type: string, index: number, ext: string): void {
    const btn = document.createElement('div');
    btn.classList.add(`${type}-option`);
    btn.style.backgroundImage = `url('./assets/${type}/${index}.${ext}')`;
    if (type === 'tree') {
      btn.addEventListener('click', (e) => { TreeView.changeBg(e, type); });
    }
    if (type === 'bg') {
      btn.addEventListener('click', (e) => { TreeView.changeBg(e, type); });
    }
    document.querySelector(`.${type}-picker`)!.appendChild(btn);
  }

  private static changeBg(e: Event, type: string) {
    const url = (e.target as HTMLElement).style.backgroundImage;
    (document.querySelector(`.${type}-image`) as HTMLElement).style.backgroundImage = url;
  }

  private static createBgBtns(): void {
    for (let i = 1; i <= 10; i += 1) {
      TreeView.createOption('bg', i, 'jpg');
    }
  }

  private static createTreeBtns(): void {
    for (let i = 1; i <= 6; i += 1) {
      TreeView.createOption('tree', i, 'png');
    }
  }

  public static initBtns() {
    TreeView.createBgBtns();
    TreeView.createTreeBtns();
  }
}

export default TreeView;
