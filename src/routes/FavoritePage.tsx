import { useFavorites } from "../context/FavoritesContext";
import { BookCard } from "../components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="favorite-books-page">
      <h1>My favorite books</h1>

      {favorites.length === 0 ? (
        <p id="empty">
          It is emptay right now. <br /> 
          ♡⋅˚ 。Fill it with wonders 。˚⋅♡
        </p>
      ) : (
        <section className="book-grid">
          {favorites.map(book => (
            <BookCard 
              key={book.key} 
              book={book}
              showActions={true} 
              onClick={() => {
                const bookID = book.key.replace(/^\/?works\//, "");
                navigate(`/favorites/works/${bookID}`);
              }}
            />
          ))}
        </section>
      )}
    </div>
  );
}