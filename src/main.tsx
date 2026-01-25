import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx'
import { ReadBooksProvider } from './context/ReadBooksContext.tsx'
import { BookProvider } from './context/BookContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <ReadBooksProvider>
        <BookProvider>
          <App />
        </BookProvider>
      </ReadBooksProvider>
    </FavoritesProvider>
  </StrictMode>,
)