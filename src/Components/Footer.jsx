import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='main-content'>

            <footer className="footer mt-auto py-3 bg-light">
                <div className="container text-center">
                    <span className="text-muted">© 2023 Knila</span>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/KnilaITSolutions/"  target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com/knilaits" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.instagram.com/knila_it_solutions/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;