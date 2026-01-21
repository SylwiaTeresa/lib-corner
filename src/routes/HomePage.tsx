import { BookList } from "../components/BookList/BookList";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { BookProvider } from "../context/BookContext";

export default function HomePage() {
    return (
        <>
            <BookProvider>
                <SearchBar />
                <BookList />
            </BookProvider>
        </>
    );
}