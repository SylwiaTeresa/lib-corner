import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Book } from "../types/Book";

type BookContextType = {
  books: Book[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const BookContext = createContext<BookContextType | null>(null);

type BookProviderProps = {
  children: ReactNode;
};

export function BookProvider({ children }: Readonly<BookProviderProps>) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem("searchTerm") || "");

  useEffect(() => {
    if (!searchTerm.trim()) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setBooks(data.docs);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Could not fetch books");
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
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within a BookProvider");
  return context;
}