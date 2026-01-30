import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";
import { BookCard } from "../components/BookCard/BookCard";

export default function FavoriteDetailsPage() {
  const { bookID } = useParams();
  const navigate = useNavigate();
  const { favorites, dispatch } = useFavorites();

  const book = favorites.find(b => b.key.replace(/^\/?works\//, "") === bookID);
  const [notes, setNotes] = useState(book?.notes || "");

  if (!book) return <p>Book not found 💔</p>;

  const handleSave = () => {
    dispatch({ type: "UPDATE_FAVORITE_NOTES", key: book.key, notes });
    alert("Notes saved ✅");
  };  

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove this book from favorites?")) {
      dispatch({ type: "REMOVE_FAVORITE", key: book.key });
      navigate("/favorites");
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <BookCard book={book} />

      {/* <h1>{book.title}</h1>
      <p>{book.author_name?.join(", ")}</p>

      {book.cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
        />
      )} */}

      <h3>My notes</h3>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Write your notes here..."
      />

      <button onClick={handleSave}>💾 Save notes</button>
      <button onClick={handleDelete}>🗑 Remove favorite</button>
    </div>
  );
}