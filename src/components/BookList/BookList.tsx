import "./BookList.scss";
import { BookCard } from "../BookCard/BookCard";
import { useBooks } from "../../context/BookContext";
import { useNavigate } from "react-router-dom";

export const BookList = () => {
  const { books } = useBooks();
  const navigate = useNavigate();

  if (!books.length) return <p>No books found</p>;

  return (
    <div className="book-grid">
      {books.map(book => {
        const bookID = book.key.replace(/^\/?works\//, "");

        return (
          <BookCard 
            key={book.key} 
            book={book} 
            onClick={() => navigate(`/books/${bookID}`)}
          />
        )
      })}
    </div>
  );
};