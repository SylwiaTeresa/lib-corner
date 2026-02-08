import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../context/BookContext";

export default function BookDetailsPage() {
    const { bookID } = useParams();
    const navigate = useNavigate();
    const { books } = useBooks();

    const book = books.find(b => b.key.replace(/^\/?works\//, "") === bookID);

    if (!book) return <p>No book found 💔</p>;

    return (
        <div>
        <button onClick={() => navigate(-1)}>← Back</button>

        <h1>{book.title}</h1>
        <h2>{book.author_name?.join(", ")}</h2>
        <p>First published: {book.first_publish_year}</p>

        {book.cover_i && (
            <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            alt={book.title}
            />
        )}
        </div>
    );
}