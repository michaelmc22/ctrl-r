import React from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import { useRef } from "react";
import "../Styles/nav.css"

function Navbar() {
    const navRef = useRef();

    const showNav = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    return(
        <header>
            <a href="/home">⌨️⌨️⌨️</a>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/games">Games</a>
                <a href="/forum">Forum</a>
                <a href="/support">Support</a>
                <a href="/aboutus">About Us</a>
                <a href="/account">Account</a>
                <button className="nav-btn nav-close-btn" onClick={showNav}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNav}>
                    <FaBars/>
                </button>

        </header>
    );
}

export default Navbar;