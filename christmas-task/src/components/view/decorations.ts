import './decoration.css';

class AppView {
  public draw(data: any): void {
    const decorations: any = data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const decorationCard: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#decorationTemplate');

    decorations.forEach((item: any) => {
      const decorationCardClone: HTMLTemplateElement = <HTMLTemplateElement>decorationCard.content.cloneNode(true);
      (decorationCardClone.querySelector('.decoration-image')as HTMLImageElement).src = `url('../toys/${item.num}.png')`;
      decorationCardClone.querySelector('.decoration-name').textContent = item.name;
      decorationCardClone.querySelector('.decoration-count').textContent = `Количество: ${item.count}`;
      decorationCardClone.querySelector('.decoration-year').textContent = `Год покупки: ${item.year}`;
      decorationCardClone.querySelector('.decoration-shape').textContent = `Форма игрушки: ${item.shape}`;
      decorationCardClone.querySelector('.decoration-color').textContent = `Цвет игрушки: ${item.color}`;
      decorationCardClone.querySelector('.decoration-size').textContent = `Размер игрушки: ${item.size}`;
      decorationCardClone.querySelector('.decoration-is-fav').textContent = item.favorite ? 'Любимая: Да' : 'Любимая: Нет';
      fragment.append(decorationCardClone);
    });
    document.querySelector('.decorations-container').appendChild(fragment);
  }
}

export default AppView;