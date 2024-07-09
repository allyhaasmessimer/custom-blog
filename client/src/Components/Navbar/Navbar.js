import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import typewriterIcon from "../../images/icons8-typewriter-50.png";

export default function Navbar() {
    const { setUserInfo, userInfo } = useContext(UserContext);
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
        setIsMenuOpen(!isMenuOpen);
    };

    const username = userInfo?.username;

    return (
        <header className="header">
            <a href="/" className="logo">
                <img src={typewriterIcon} alt="Typewriter Icon" />
                WONDERING WORDS
            </a>
            {/* <button className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button> */}
            <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
                {username ? (
                    <>
                        <Link to="/create">NEW POST</Link>
                        <a href="#" onClick={logout}>
                            LOGOUT
                        </a>
                    </>
                ) : (
                    <>
                        <Link to="/login">LOGIN</Link>
                    </>
                )}
                <a href="/home">HOME</a>
                <Link to="/about">ABOUT</Link>
                <a href="/">PORTFOLIO</a>
                <a href="/">BLOG</a>
                <a href="/">CONTACT</a>
            </nav>
        </header>
    );
}
