import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
    const theMenuBar = [
        { to: "/", label: "| Home" },
        { to: "/favorites", label: "||| Favorites" },
    ];

    const getLinkClassName = ({ isActive } : { isActive: boolean }) => {
        return isActive ? "nav-link active" : "nav-link";
    };

    return (
        <header>
            <nav className="nav">
                {theMenuBar.map((item) => (
                    <NavLink key={item.to} to={item.to} className={getLinkClassName}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}