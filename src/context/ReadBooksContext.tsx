import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { ReadBook } from "../types/ReadBook";
import { Book } from "../types/Book";

type ReadBooksState = ReadBook[];

type ReadBookAction =
  | { type: "ADD_READ_BOOK"; book: ReadBook }
  | { type: "UPDATE_READ_BOOK"; key: string, updates: Partial<ReadBook> }  
  | { type: "REMOVE_READ_BOOK"; key: string };
;

type ReadBooksContextType = {
  readBooks: ReadBooksState;
  toggleRead: (book: Book) =>void;
  addRead: (book: ReadBook) => void;
  updateRead: (key: string, updates: Partial<ReadBook>) => void
  removeRead: (key: string) => void;
  totalReadBooks: number;
  totalReadPages: number;
};

const ReadBooksContext = createContext<ReadBooksContextType | null>(null);

function readBooksReducer(state: ReadBooksState, action: ReadBookAction): ReadBooksState {
  switch (action.type) {
    case "ADD_READ_BOOK":
      if (state.some(b => b.key === action.book.key)) return state;
      return [...state, action.book];
    case "UPDATE_READ_BOOK":
        return state.map(b => b.key === action.key ? {...b, ...action.updates} : b);
    case "REMOVE_READ_BOOK":
      return state.filter(b => b.key !== action.key);
    default:
      return state;
  }
}

type ReadBooksProviderProps = { children: ReactNode };

export function ReadBooksProvider({ children }: ReadBooksProviderProps) {
  const [readBooks, dispatch] = useReducer(readBooksReducer, [], () => {
    const stored = localStorage.getItem("readBooks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks]);

  const totalReadBooks = readBooks.length;
  const totalReadPages = readBooks.reduce((sum, book) => sum + (book.pages ?? 0), 0);

  const addRead = (book: ReadBook) => dispatch({ type: "ADD_READ_BOOK", book });
  const updateRead = (key: string, updates: Partial<ReadBook>) => dispatch({ type: "UPDATE_READ_BOOK", key, updates });
  const removeRead = (key: string) => dispatch({ type: "REMOVE_READ_BOOK", key });
  
  const toggleRead = (book: Book) => {
    const isRead = readBooks.some(r => r.key === book.key);
    if (isRead) {
      removeRead(book.key);
    } else {
      addRead({
        ...book,
        rating: 0,
        review: "",
        pages: 0,
        finishedAt: new Date().toISOString(),
      });
    }
  }; 

  return (
    <ReadBooksContext.Provider value={{ readBooks, toggleRead, addRead, updateRead, removeRead, totalReadBooks, totalReadPages }}>
      {children}
    </ReadBooksContext.Provider>
  );
}

export function useReadBooks() {
  const context = useContext(ReadBooksContext);
  if (!context) throw new Error("useReadBooks must be used within ReadBooksProvider");
  return context;
}