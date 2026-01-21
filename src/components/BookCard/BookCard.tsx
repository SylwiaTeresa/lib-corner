import "./BookCard.scss";
import type { Book } from "../../types/Book"; 
import { useFavorites } from "../../context/FavoritesContext";

type BookCardProps = {
    book: Book;
};

export default function BookCard({ book }: BookCardProps) {
    const { favorites, dispatch } = useFavorites();

    const isFavorite = favorites.some(fav => fav.key === book.key);

    const toggleFavorite = () => {
        if (isFavorite) {
        dispatch({ type: "REMOVE_FAVORITE", key: book.key });
        } else {
        dispatch({ type: "ADD_FAVORITE", book });
        }
    };

    const coverURL = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
    : "https://placehold.co/600x400?text=No+Cover"; 

    return (
        <div className="Card">
            <img src={coverURL} alt={`Cover for ${book.title}`} className="CardImage" />
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown author"}</p>
            <p>{book.first_publish_year ?? "Unknown year"}</p>
            <button onClick={toggleFavorite}>{isFavorite ? "♡" : "♥"}</button>
        </div>
    );
};