import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importação do FontAwesome
import App from './pages/App';
import reportWebVitals from './components/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
