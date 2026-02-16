import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { Book } from "../types/Book";

export type FavoriteBook = Book & {
  notes?: string;
};

type FavoritesState = FavoriteBook[];

type FavoritesAction =
  | { type: "ADD_FAVORITE"; book: FavoriteBook }
  | { type: "REMOVE_FAVORITE"; key: string }
  | { type: "UPDATE_FAVORITE_NOTES"; key: string; notes: string }
;

type FavoritesContextType = {
  favorites: FavoritesState;
  toggleFavorite: (book: FavoriteBook) => void;  
  addFavorite: (book: FavoriteBook) => void;
  removeFavorite: (key: string) => void;
  updateFavoriteNotes: (key: string, notes: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.find(b => b.key === action.book.key)) return state;
      return [...state, action.book];
    case "REMOVE_FAVORITE":
      return state.filter(b => b.key !== action.key);
    case "UPDATE_FAVORITE_NOTES":
      return state.map(b => b.key === action.key ? { ...b, notes: action.notes } : b);
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

    const addFavorite = (book: FavoriteBook) => dispatch({ type: "ADD_FAVORITE", book });
    const removeFavorite = (key: string) => dispatch({ type: "REMOVE_FAVORITE", key });
    const updateFavoriteNotes = (key: string, notes: string) => dispatch({ type: "UPDATE_FAVORITE_NOTES", key, notes });

    const toggleFavorite = (book: FavoriteBook) => {
      const isFavorite = favorites.some(b => b.key === book.key);
      if (isFavorite) {
        removeFavorite(book.key);
      } else {
        addFavorite(book);
      }
    };  

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, addFavorite, removeFavorite, updateFavoriteNotes }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}