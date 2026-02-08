import "./BookCard.scss";
import type { Book } from "../../types/Book"; 
import { useFavorites } from "../../context/FavoritesContext";
import { BookDetailsModal } from "../BookDetailsModal/BookDetailsModal";
import { useState } from "react";
import { TbBooksOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

type BookCardProps = {
    book: Book;
    showActions?: boolean;
    basePath?: string;
    onClick?: () => void;
};

export const BookCard = ({ book, showActions = false, basePath, onClick }: BookCardProps) => {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useFavorites();
    //const { readBooks, toggleRead } = useRead();
    const [isOpen, setIsOpen] = useState(false);

    const isFavorite = favorites.some(fav => fav.key === book.key);
    //const isRead = readBooks.some(r => r.key === book.key);

    // const toggleFavorite = () => {
    //     if (isFavorite) {
    //     dispatch({ type: "REMOVE_FAVORITE", key: book.key });
    //     } else {
    //     dispatch({ type: "ADD_FAVORITE", book });
    //     }
    // }; 

    return (
        <>
            <div 
                className="book-card" 
                onClick={() => {
                    if (onClick) onClick();
                    else navigate(`${basePath || "books"}/${book.key.replace("/works/", "")}`);
                }}
            >

                {book.cover_i ? (
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} 
                    alt={book.title} 
                />
                ): (
                    <div className="fallback-icon"><TbBooksOff size={64} /></div>
                )}

                <h3>{book.title}</h3>
                <p>{book.author_name ? book.author_name.join(", ") : "Unknown author"}</p>

                {showActions && (
                    <div>
                        <span
                            onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(book);
                            }}
                            style={{ fontSize: "1.3rem" }}
                        >
                            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                        </span>

                        <span
                            onClick={(e) => {
                            e.stopPropagation();
                            toggleRead(book);
                            }}
                            style={{ fontSize: "1.3rem" }}
                        >
                            {isRead ? <FaCheckCircle color="green" /> : <FaRegCheckCircle />}
                        </span>
                    </div>
                )}
            </div>

            {isOpen && (
                <BookDetailsModal book={book} onClose={() => setIsOpen(false)} />
            )}
        </>
    );
};