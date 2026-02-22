import "./SearchBar.scss";
import { useEffect, useRef, useState } from "react";
import { useBooks } from "../../context/BookContext";
import { useDebounce } from "../../utils/useDebounce";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, loading, error } = useBooks();
  const [inputValue, setInputValue] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect (() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };    

  return (
    <>
      <h3 className="search-label">✦° 。Search for your next adventure 。°✦</h3>
      
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <input
          name="search"
          ref={inputRef}
          className="searchbar"
          type="text"
          placeholder="Search för books..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search for books"
        />
        <button type="submit" className="search-icon">
          <FaSearch aria-hidden="true" />
        </button>
      </form>

      {loading && <p className="search-loading">Loading...</p>}
      {error && <p className="search-error">{error}</p>}
    </>
  );
}