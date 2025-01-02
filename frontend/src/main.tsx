import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'

// import { worker } from './api/server'
import {store} from '@/app/store'
// import { fetchUsers } from './features/users/usersSlice'
// import { apiSliceWithUsers } from './features/users/usersSlice'

import './primitiveui.css'
import './index.css'
import { apiSlice } from './api/apiSlice'

import { createTheme, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/app/muiTheme';



declare global {
  interface Window {
    apiSlice: typeof apiSlice;
  }
}

function app() {
  //dispatch the getUsers thunk
  // store.dispatch(apiSliceWithUsers.endpoints.getUsers.initiate())
  window.apiSlice = apiSlice;

  const theme = createTheme(lightTheme);



  const root = createRoot(document.getElementById('root')!)

  root.render(
    <React.StrictMode>

      {/* redux store context provider */}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  )
}

app()
