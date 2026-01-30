import { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import type { Book } from "../types/Book";

export type FavoriteBook = Book & {
  notes?: string;
};

type FavoritesState = FavoriteBook[];

type FavoritesAction =
  | { type: "ADD_FAVORITE"; book: FavoriteBook }
  | { type: "REMOVE_FAVORITE"; key: string }
  | { type: "UPDATE_FAVORITE_NOTES"; key: string; notes: string };

type FavoritesContextType = {
  favorites: FavoritesState;
  dispatch: Dispatch<FavoritesAction>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.find(b => b.key === action.book.key)) return state;
      return [...state, action.book];
    case "REMOVE_FAVORITE":
      return state.filter(b => b.key !== action.key);
    case "UPDATE_FAVORITE_NOTES":
      return state.map(book =>
        book.key === action.key ? { ...book, notes: action.notes } : book
      );
    default:
      return state;
  }
}

type FavoritesProviderProps = { children: ReactNode };

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}