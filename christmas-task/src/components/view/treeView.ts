import './tree-decoration.css';
import './tree-parameters.css';

const bgOptionsAmount = 10;
const treeOptionsAmount = 6;

class TreeView {
  private static createOption(type: string, index: number, ext: string): void {
    const btn = document.createElement('div');
    btn.classList.add(`${type}-option`);
    btn.style.backgroundImage = `url('${type}/${index}.${ext}')`;
    btn.addEventListener('click', (e) => { TreeView.changeBg(e, type); });
    document.querySelector(`.${type}-picker`)!.appendChild(btn);
  }

  private static changeBg(e: Event, type: string) {
    const url = (e.target as HTMLElement).style.backgroundImage;
    localStorage.setItem(`${type}-image`, url);
    (document.querySelector(`.${type}-image`) as HTMLElement).style.backgroundImage = url;
  }

  private static createBgBtns(): void {
    for (let i = 1; i <= bgOptionsAmount; i += 1) {
      TreeView.createOption('bg', i, 'jpg');
    }
  }

  private static createTreeBtns(): void {
    for (let i = 1; i <= treeOptionsAmount; i += 1) {
      TreeView.createOption('tree', i, 'png');
    }
  }

  public static initBtns() {
    TreeView.createBgBtns();
    TreeView.createTreeBtns();
  }
}

export default TreeView;
