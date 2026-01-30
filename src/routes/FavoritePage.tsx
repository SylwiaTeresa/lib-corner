import { useFavorites } from "../context/FavoritesContext";
import { BookCard } from "../components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (!favorites.length) {
    return <p>No favorite books yet</p>;
  }

  return (
    <>
      <h1>My favorite books</h1>

      <section className="book-grid">
        {favorites.map(book => (
          <BookCard 
            key={book.key} 
            book={book} 
            onClick={() => {
              const bookID = book.key.replace(/^\/?works\//, "");
              navigate(`/favorites/works/${bookID}`);
            }}
          />
        ))}
      </section>
    </>
  );
}