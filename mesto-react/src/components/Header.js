import React from 'react';
import imageLogo from '../images/Vector.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={imageLogo} alt="Логотип" />
        </header>
    )
}

export default Header;