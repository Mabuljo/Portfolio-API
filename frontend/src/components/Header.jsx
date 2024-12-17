import React, { useState, useEffect } from 'react';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Fonction pour fermer le menu burger lorsqu'un onglet est sélectionné
    const closeMenu = () => {
        setIsOpen(false);
    };

    // Fonction pour l'ajout/retrait de la classe active-menu sur le body (responsive mobile)
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('active-menu');
        } else {
            document.body.classList.remove('active-menu');
        }
    }, [isOpen]);


    return (
        <header>
            <div className='header-content'>
                <h1>"Chaque pixel, chaque ligne de code est une histoire à raconter"</h1>
                <span><a href="#main" aria-label="flèche d'accés au portfolio"><i className="fa-solid fa-arrow-down" aria-hidden="true"></i></a></span>
            </div>
            <nav className={isOpen ? "openMenu" : ""}>
                <img src="logo.webp" alt="logo du portfolio" className='nav_logo' />
                <a href="#presentation" onClick={closeMenu}>Présentation</a>
                <a href="#competences" onClick={closeMenu}>Compétences</a>
                <a href="#projets" onClick={closeMenu}>Projets</a>
                <a href="#contact" onClick={closeMenu}>Contact</a>
                <a href="/assets/cv_marjorie_goudet.pdf"  target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Mon CV</a>
                <a href="/login" onClick={closeMenu}>Login</a>
            </nav>
            <i className={`fa-solid menu ${isOpen ? "fa-xmark" : "fa-bars"}`} onClick={toggleMenu}></i>
        </header>
    );
};

export default Header;