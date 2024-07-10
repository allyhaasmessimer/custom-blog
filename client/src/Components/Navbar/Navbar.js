import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import typewriterIcon from "../../images/icons8-typewriter-50.png";

export default function Navbar() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout(event) {
        event.preventDefault();
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST",
        }).then(() => {
            setUserInfo(null);
        });
    }

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const username = userInfo?.username;

    return (
        <header className="header">
            <a href="/" className="logo">
                <img src={typewriterIcon} alt="Typewriter Icon" />
                <h4 className="site_title">WONDERING WORDS</h4>
            </a>
            <button className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
                <div className="nav-items">
                    {username ? (
                        <>
                            <Link to="/create" onClick={closeMenu}>
                                NEW POST
                            </Link>
                            <a href="#" onClick={logout}>
                                LOGOUT
                            </a>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeMenu}>
                                LOGIN
                            </Link>
                        </>
                    )}
                    <Link to="/home" onClick={closeMenu}>
                        HOME
                    </Link>
                    <Link to="/about" onClick={closeMenu}>
                        ABOUT
                    </Link>
                    <Link to="/portfolio" onClick={closeMenu}>
                        PORTFOLIO
                    </Link>
                    <Link to="/" onClick={closeMenu}>
                        BLOG
                    </Link>
                    <Link to="/contact" onClick={closeMenu}>
                        CONTACT
                    </Link>
                </div>
            </nav>
        </header>
    );
}
