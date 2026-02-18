import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import { useReadBooks } from "../../context/ReadBooksContext";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

export function NavBar() {
  const { totalReadBooks, totalReadPages } = useReadBooks();

  return (
    <nav className="navbar">
      <div className="nav-stats">
        <span>Total books read: <strong>{totalReadBooks}</strong> 📚</span>
        <span>Total pages read: <strong>{totalReadPages}</strong> 📄</span>                 
      </div>

      <div className="nav-home">
        <NavLink to="/">
          <IoHome />
        </NavLink>
      </div>

      <div className="nav-icons">
        <NavLink to="/favorites">
          <FaHeart />
        </NavLink>

        <NavLink to="/read-books">
          <FaCheckCircle />
        </NavLink>
      </div>
    </nav>
  );
}