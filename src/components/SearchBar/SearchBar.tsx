import "./SearchBar.scss";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useBooks } from "../../context/BookContext";
import { useDebounce } from "../../utils/useDebounce";

export const SearchBar = () => {
    const { searchTerm, setSearchTerm, loading, error } = useBooks();
    const [inputValue, setInputValue] = useState(searchTerm);

    const debouncedSearchTerm = useDebounce(inputValue, 500);

    useEffect (() => {
       setSearchTerm(debouncedSearchTerm);
    }, [debouncedSearchTerm, setSearchTerm]);

    return (
        <>
            <h3 className="search-label">Search for your next adventure</h3>
            <div className="input-wrapper">
                 <input 
                    className="searchbar"
                    type="text" 
                    placeholder="Search för books..."
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />
                
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}

                <button>
                    <FaMagnifyingGlass id="FaMagnifyingGlass-icon"/>
                </button>
            </div>
        </>
    );
}