import "./BookDetailsModal.scss";
import { useFavorites } from "../../context/FavoritesContext";
import type { Book } from "../../types/Book";
import { useReadBooks } from "../../context/ReadBooksContext";
import { useState } from "react";

type BookDetailsModalProps = {
  book: Book;
  onClose: () => void;
};

export const BookDetailsModal = ({ book, onClose }: BookDetailsModalProps) => {
  const { favorites, dispatch } = useFavorites();
  const { dispatch: readDispatch } = useReadBooks();

  const isFavorite = favorites.some(fav => fav.key === book.key);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [pages, setPages] = useState<number | "">("");

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", key: book.key });
    } else {
      dispatch({ type: "ADD_FAVORITE", book });
    }
  };

  const markAsRead = () => {
    if (!pages) return;

    readDispatch({
      type: "ADD_READ_BOOK",
      book: {
        ...book,
        rating,
        review,
        pages: Number(pages),
        finishedAt: new Date().toISOString(),
      },
    });

    onClose();
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

        <hr />

        <h3>Mark as read</h3>

        <label>
          Rating (0–5):
          <input
            type="number"
            min={0}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </label>

        <label>
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </label>

        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>

        <button onClick={markAsRead}>📚 Mark as read</button>
      </div>
    </div>
  );
};