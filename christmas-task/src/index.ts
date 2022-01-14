import './style.css';
import App from './components/app/app';

const app: App = new App();
app.start();

document.querySelector('.name')?.addEventListener('click', () => {
  document.querySelector('.toys-page')?.classList.toggle('hide');
  document.querySelector('.tree-page')?.classList.toggle('hide');
});

console.log(`

  Самооценка: 200/200
  Все основные пункты задания выполнены.
  Дополнительный функционал 0/20.
  
`);
