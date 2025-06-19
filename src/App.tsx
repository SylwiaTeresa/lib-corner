//import { createBrowserRouter } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RootLayout from './layouts/RootLayout'
import HomePage from './routes/HomePage'
import FavoritePage from './routes/FavoritePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritePage /> },
    ]
  },
]);

function App() {
  return (
    <>
    <Header />
    <RouterProvider router={router} />
    <Footer />
    </>
  )
}

export default App;
