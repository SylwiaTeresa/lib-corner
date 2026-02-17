import { useState } from "react";
import { BookCard } from "../components/BookCard/BookCard";
import { useReadBooks } from "../context/ReadBooksContext";
import { ReadBook } from "../types/ReadBook";
import { BookDetailsModal } from "../components/BookDetailsModal/BookDetailsModal";

export default function ReadBooksPage() {
  const { readBooks } = useReadBooks();
  const [selectedBook, setSelectedBook] = useState<ReadBook | null>(null);

  if (!readBooks.length) {
    return <p>You haven’t read any books yet 📖</p>;
  }

  return (
    <div className="read-books-page">
      <h1>Read books</h1>

      <div className="book-grid">
        {readBooks.map(book => (
          <BookCard 
            key={book.key}
            book={book}
            showActions={true}
            onClick={() => setSelectedBook}
          />
        ))}
      </div>

      {selectedBook && (
        <BookDetailsModal 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}