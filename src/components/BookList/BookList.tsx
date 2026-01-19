import "./BookList.scss";
import BookCard from "../BookCard/BookCard";
import { useBooks } from "../../context/BookContext";

export const BookList = () => {
  const { books } = useBooks();

  if (!books.length) return <p>No books found</p>;

  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};