import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Erro from './routes/Erro'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
      path: '/',
      element: <App in={false}/>,
      errorElement: <Erro />,
  },
  {
      path: '/add',
      element: <App in={true}/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
