import "./BookCard.scss";
import type { Book } from "../../types/Book"; 
import { useFavorites } from "../../context/FavoritesContext";
import { useReadBooks } from "../../context/ReadBooksContext";
import { TbBooksOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHeart, FaRegCheckCircle, FaRegHeart } from "react-icons/fa";

type BookCardProps = {
    book: Book;
    showActions?: boolean;
    basePath?: string;
    onClick?: () => void;
};

export const BookCard = ({ book, showActions = false, basePath, onClick }: BookCardProps) => {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useFavorites();
    const { readBooks, toggleRead } = useReadBooks();

    const isFavorite = favorites.some(fav => fav.key === book.key);
    const isRead = readBooks.some(read => read.key === book.key);

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
                    <div className="book-card-actions">
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
        </>
    );
};