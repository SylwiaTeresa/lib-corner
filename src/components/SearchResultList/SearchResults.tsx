import "./SearchResult.scss";
import BookCard from "../BookCard/BookCard";
import { useBooks } from "../../context/context";

export default function Card() {
    const { books, loading, error } = useBooks();

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <>
           {/* <h3>Shows {} results for {" "} </h3>
            <h2>Your search result for {" "} </h2> */}
            <div className="List">
                {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </>
    );
};