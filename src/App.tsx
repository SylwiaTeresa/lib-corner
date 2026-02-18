import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import "./styles/_base.scss";
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
      <RouterProvider router={router} />
    </>
  );
}