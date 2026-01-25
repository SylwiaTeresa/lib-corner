import { useFavorites } from "../context/FavoritesContext";
import { BookCard } from "../components/BookCard/BookCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return <p>No favorite books yet</p>;
  }

  return (
    <>
      <h1>My favorite books</h1>

      <section className="book-grid">
        {favorites.map(book => (
          <BookCard key={book.key} book={book} />
        ))}
      </section>
    </>
  );
}