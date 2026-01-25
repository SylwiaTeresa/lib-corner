import "./BookDetailsModal.scss";
import { useFavorites } from "../../context/FavoritesContext";
import type { Book } from "../../types/Book";

type BookDetailsModalProps = {
  book: Book;
  onClose: () => void;
};

export const BookDetailsModal = ({ book, onClose }: BookDetailsModalProps) => {
  const { favorites, dispatch } = useFavorites();

  const isFavorite = favorites.some(fav => fav.key === book.key);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", key: book.key });
    } else {
      dispatch({ type: "ADD_FAVORITE", book });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✖</button>

        <h2>{book.title}</h2>
        <p>{book.author_name?.join(", ")}</p>
        <p>{book.first_publish_year ?? "Unknown year"}</p>

        <button onClick={toggleFavorite}>
          {isFavorite ? "Remove favorite" : "Add to favorites"}
        </button>
      </div>
    </div>
  );
};