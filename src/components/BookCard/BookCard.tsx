import "./BookCard.scss";
import type { Book } from "../../types/Book"; 
import { useFavorites } from "../../context/FavoritesContext";
import { BookDetailsModal } from "../BookDetailsModal/BookDetailsModal";
import { useState } from "react";
import { TbBooksOff } from "react-icons/tb";

type BookCardProps = {
    book: Book;
    onClick?: () => void;
};

export const BookCard = ({ book, onClick }: BookCardProps) => {
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

    return (
        <>
            <div className="book-card" onClick={onClick}>
                {book.cover_i ? (
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} 
                    alt={book.title} 
                />
                ): (
                    <div className="fallback-icon"><TbBooksOff size={64} /></div>
                )}

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