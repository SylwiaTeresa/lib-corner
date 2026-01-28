import { useReadBooks } from "../context/ReadBooksContext";

export default function ReadBooksPage() {
  const { readBooks, totalBooks, totalPages } = useReadBooks();

  if (!readBooks.length) {
    return <p>You haven’t read any books yet 📖</p>;
  }

  return (
    <div>
      <h1>Read books</h1>

      <p>
        📚 Books read: <strong>{totalBooks}</strong><br />
        📖 Pages read: <strong>{totalPages}</strong>
      </p>

      <ul>
        {readBooks.map(book => (
          <li key={book.key}>
            <h3>{book.title}</h3>
            <p>Rating: ⭐ {book.rating}</p>
            <p>Pages: {book.pages}</p>
            {book.review && <p>“{book.review}”</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}