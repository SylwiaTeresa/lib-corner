import "./BookCard.scss";
import type { Book } from "../../types/Book"; 
import { useFavorites } from "../../context/FavoritesContext";
import { BookDetailsModal } from "../BookDetailsModal/BookDetailsModal";
import { useState } from "react";

type BookCardProps = {
    book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
    const { favorites, dispatch } = useFavorites();
    const [isOpen, setIsOpen] = useState(false);

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
        <>
            <div className="book-card" onClick={() => setIsOpen(true)}>
                <img src={coverURL} alt={`Cover for ${book.title}`} className="CardImage" />
                <h3>{book.title}</h3>
                <p>{book.author_name ? book.author_name.join(", ") : "Unknown author"}</p>
                <button onClick={toggleFavorite}>{isFavorite ? "♥" : "♡"}</button>
            </div>

            {isOpen && (
                <BookDetailsModal book={book} onClose={() => setIsOpen(false)} />
            )}

        </>
    );
};