import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import "./styles/_base.scss";
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RootLayout from './layouts/RootLayout'
import HomePage from './routes/HomePage'
import FavoritePage from './routes/FavoritePage'
import ReadBooksPage from './routes/ReadBooksPage'
import FavoriteDetailsPage from './routes/FavoriteDetailsPage'
import BookDetailsPage from './routes/BookDetailsPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "books/:bookID", element: <BookDetailsPage /> },
      { path: "favorites", element: <FavoritePage /> },
      { path: "favorites/works/:bookID", element: <FavoriteDetailsPage />},
      { path: "read-books", element: <ReadBooksPage /> },
    ]
  },
]);

export default function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}