import { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import type { ReadBook } from "../types/ReadBook";

type ReadBooksState = ReadBook[];

type ReadBookAction =
  | { type: "ADD_READ_BOOK"; book: ReadBook }
  | { type: "REMOVE_READ_BOOK"; key: string };

type ReadBooksContextType = {
  readBooks: ReadBooksState;
  totalPages: number;
  totalBooks: number;
  dispatch: Dispatch<ReadBookAction>;
};

const ReadBooksContext = createContext<ReadBooksContextType | null>(null);

function reducer(state: ReadBooksState, action: ReadBookAction): ReadBooksState {
  switch (action.type) {
    case "ADD_READ_BOOK":
      if (state.some(b => b.key === action.book.key)) return state;
      return [...state, action.book];

    case "REMOVE_READ_BOOK":
      return state.filter(b => b.key !== action.key);

    default:
      return state;
  }
}

export function ReadBooksProvider({ children }: { children: ReactNode }) {
  const [readBooks, dispatch] = useReducer(reducer, [], () => {
    const stored = localStorage.getItem("readBooks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks]);

  const totalPages = readBooks.reduce((sum, b) => sum + b.pages, 0);
  const totalBooks = readBooks.length;

  return (
    <ReadBooksContext.Provider
      value={{ readBooks, totalPages, totalBooks, dispatch }}
    >
      {children}
    </ReadBooksContext.Provider>
  );
}

export function useReadBooks() {
  const context = useContext(ReadBooksContext);
  if (!context) throw new Error("useReadBooks must be used within ReadBooksProvider");
  return context;
}