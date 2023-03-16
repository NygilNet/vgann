import React from 'react';
import './index.css'

export default function Footer() {
	return (
        <footer>
        <div className="footer-top">
            <div className="footer-column">
            <h3>About</h3>
            <ul>
                <li><a href="">About VGAN</a></li>
            </ul>
            </div>
            <div className="footer-column">
            <h3>Discover</h3>
            <ul>
                <li><a href="">Sign up!</a></li>
            </ul>
            </div>
            <div className="footer-column">
            <h3>VGAN for Business</h3>
            <ul>
                <li><a href="">Business Owner Login</a></li>
            </ul>
            </div>
        </div>
        <div className='footer-bottom'>Copyright © 2004–2023 VGAN Inc. VGAN, VGAN logo, VGAN burst and related marks are registered trademarks of VGAN.</div>
        </footer>

	);
}
