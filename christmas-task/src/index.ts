import './style.css';
import App from './components/app/decorationsPage';

const app: App = new App();
app.start();

document.querySelector('.name')?.addEventListener('click', () => {
  document.querySelector('.toys-page')?.classList.toggle('hide');
  document.querySelector('.tree-page')?.classList.toggle('hide');
});
