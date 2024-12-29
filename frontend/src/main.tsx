import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'

// import { worker } from './api/server'
import {store} from '@/app/store'
// import { fetchUsers } from './features/users/usersSlice'
import { apiSliceWithUsers } from './features/users/usersSlice'

import './primitiveui.css'
import './index.css'


function app() {
  // Start our mock API server
  store.dispatch(apiSliceWithUsers.endpoints.getUsers.initiate())



  const root = createRoot(document.getElementById('root')!)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
}

app()
