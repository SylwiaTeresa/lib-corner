import { useState } from "react";
import { BookCard } from "../components/BookCard/BookCard";
import { useReadBooks } from "../context/ReadBooksContext";
import { ReadBook } from "../types/ReadBook";
import { BookDetailsModal } from "../components/BookDetailsModal/BookDetailsModal";

export default function ReadBooksPage() {
  const { readBooks } = useReadBooks();
  const [selectedBook, setSelectedBook] = useState<ReadBook | null>(null);

  
  return (
    <div className="read-books-page">
      <h1>My read books</h1>

      {readBooks.length === 0 ? (
        <p className="empty">
          No read books yet. <br /> 
          ⋆⋅˚ 。Fill it with wonders 。˚⋅⋆
        </p>
      ) : (
        <div className="book-grid">
          {readBooks.map(book => (
            <BookCard 
              key={book.key}
              book={book}
              showActions={true}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      )}
      
      {selectedBook && (
        <BookDetailsModal 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}