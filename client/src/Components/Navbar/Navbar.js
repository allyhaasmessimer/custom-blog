import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import typewriterIcon from "./icons8-typewriter-50.png";

export default function Navbar() {
    const { setUserInfo, userInfo } = useContext(UserContext);
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
    const username = userInfo?.username;

    return (
        <header className="header">
            <a href="/" className="logo">
                <img src={typewriterIcon} alt="Typewriter Icon" />
                WONDERING WORDS
            </a>
            <nav className="navbar">
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
                        {/* <Link to="/register">Register</Link> */}
                    </>
                )}
                <a href="/">HOME</a>
                <Link to="/about">ABOUT</Link>
                <a href="/">PORFOLIO</a>
                <a href="/">SERVICES</a>
                <a href="/">CONTACT</a>
            </nav>
        </header>
    );
}
