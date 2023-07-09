import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/custom.scss';
import './styles/styles.css';
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)