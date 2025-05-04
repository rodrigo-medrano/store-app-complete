import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import StoreApp from './StoreApp.jsx'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <StoreApp />
    </Provider>
  </StrictMode>,
)
