import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useBooks } from "../../context/BookContext";
import "./SearchBar.scss";

export default function SearchBar() {
    const { setSearchTerm } = useBooks();
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") return;
        setSearchTerm(searchQuery);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("Tryckt tangent:", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();    
        }
    };

    return (
        <>
            <div className="SearchBar">
                <label className="search-label">Search for your next adventure {" "} <br />
                    <input 
                        type="text" 
                        name="SearchBar"
                        placeholder=". . ."
                        value={searchQuery}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        required
                    />
                </label>
                <button onClick={handleSearch}>
                    <FaMagnifyingGlass id="FaMagnifyingGlass-icon"/>
                </button>
            </div>
        </>
    );
}