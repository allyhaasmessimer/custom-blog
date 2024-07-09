import React from "react";
import TypewriterPic from "../images/pexels-felixmittermeier-2832085.jpg";
import TypewriterPic2 from "../images/pexels-hikaique-682406 (1).jpg";
import TypewriterPic3 from "../images/pexels-olly-3808904 (1).jpg";
import "../HomePage.css";

export default function HomePage() {
    return (
        <div className="container">
            <div className="home_header">
                <h1>I'm a Traveling Writer</h1>
                <h2>Join me on a journey of discovery, one story at a time.</h2>
            </div>
            <div className="image-container">
                <div className="image-wrapper">
                    <img src={TypewriterPic2} alt="Typewriter pic2" />
                </div>
                <div className="image-wrapper">
                    <img src={TypewriterPic3} alt="Typewriter pic" />
                </div>
                <div className="image-wrapper">
                    <img src={TypewriterPic} alt="Typewriter pic" />
                </div>
            </div>
        </div>
    );
}
