import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { Book } from "../types/Book";

// Typ för favoritboken (kan utökas med egna fält)
export type FavoriteBook = Book & {
  note?: string; // egen info
};

// State och actions
type FavoritesState = FavoriteBook[];

type FavoritesAction =
  | { type: "ADD_FAVORITE"; book: FavoriteBook }
  | { type: "REMOVE_FAVORITE"; key: string }
  | { type: "UPDATE_FAVORITE"; key: string; updatedBook: FavoriteBook };

type FavoritesContextType = {
  favorites: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
};

// Skapa context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Reducer
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      // undvik dubbletter
      if (state.find(b => b.key === action.book.key)) return state;
      return [...state, action.book];

    case "REMOVE_FAVORITE":
      return state.filter(b => b.key !== action.key);

    case "UPDATE_FAVORITE":
      return state.map(b => (b.key === action.key ? action.updatedBook : b));

    default:
      return state;
  }
}

// Provider
type FavoritesProviderProps = { children: ReactNode };

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    // Initiera från localStorage
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Spara favorites i localStorage vid ändring
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}