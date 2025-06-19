import SearchBar from "../components/SearchBar/SearchBar";
import Card from "../components/SearchResultList/SearchResults";
import { BookProvider } from "../context/context"

export default function HomePage() {
    return (
        <>
            <BookProvider>
                <SearchBar />
                <Card />
            </BookProvider>
        </>
    );
}