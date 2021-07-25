import { render } from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

render(<App />, document.getElementById('root'));
