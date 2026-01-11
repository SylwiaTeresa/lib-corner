import { createContext, useContext, useEffect, useState } from "react";
import type { Book } from "../types"

type BookContextType = {
    books: Book[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export const BookContext = createContext<BookContextType | null>(null);

type BookContextProviderProps = {
    children: React.ReactNode;
};

export function BookProvider({ children }: Readonly<BookContextProviderProps>) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(() => {
        return localStorage.getItem("searchTerm") || " ";
    });

    useEffect(() => {
        if (!searchTerm) return;

        const fetchBooks = async () => {
            setLoading(true);
            try {
                const respone = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`);
                const data = await respone.json();
                setBooks(data.docs);
                setError(null);
            } catch (err) {
                setError("Could not find books");
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem("searchTerm", searchTerm);
    }, [searchTerm]);

    return (
        <BookContext.Provider value={{ books, loading, error, searchTerm, setSearchTerm }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => {
    const context = useContext(BookContext);
    if (!context) throw new Error("useBooks must be used in BookProvider");
    return context;
};