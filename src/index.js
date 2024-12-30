import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Error'
import Header from './components/Header'
import Playlists from './pages/Playlists'
import PlaylistDetails from './pages/PlaylistDetails'
import WebPlayback from './components/WebPlayback'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <WebPlayback />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '/playlists',
        element: <Playlists />,
      },
      {
        path: '/playlist/:playlistId',
        element: <PlaylistDetails />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// Old way (React 17 and earlier)
ReactDOM.render(<App />, document.getElementById('root'))

// New way (React 18+)
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


reportWebVitals()