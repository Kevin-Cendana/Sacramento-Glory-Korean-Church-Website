import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import ChurchLogo from '../../images/sgkc.png';
import { useTranslation } from 'react-i18next';
import {Translate} from './translate.jsx'
import { useAdmin } from '../Javascript/adminContext.js';
import starLogo from '../../images/star-icon.png';
import { LoginPage } from '../loginPage.jsx';

// Header component
function Header() {
    const { t } = useTranslation(); // State: Translation
    const location = useLocation(); // State: Current path. Used so we only render Header on certain pages.
    const { isAdmin } = useAdmin(); // Use the useAdmin hook to get isAdmin
    // Conditional: Don't render Header if the current path is '/loginpage'
    if (location.pathname === '/loginpage') {
        return null; // Don't render the Header on the login page
    }

    // Conditional: Increase padding-top by 20px if logged in as admin
    const headerStyle = {
        paddingTop: isAdmin ? '40px' : '0', // Increase padding-top by 20px if admin
    };

    // Render the header
    return (
        <header style={headerStyle}>
            {/* Conditional Div: Only display when the user is an admin. */}
            {isAdmin && (
                <div className="admin-section">
                    <a href={`${window.location.origin}/adminPage`}>You are logged in as Admin</a>
                    <img src={starLogo} className="admin-star" alt="Admin Star"/>
                </div>
            )}                            
            <div className="app-title-logo-wrapper">
                {/* Church Logo */}
                <Link to="/">
                    <div className = "church-logo">
                        <img src={ChurchLogo} alt="Sacramento Glory Church Logo" className='sameLine'/>
                    </div>
                </Link>
                {/* Title*/}
                <div className = "church-title">
                    <h1 className="sameLine" id="sgkc">
                        {t('sgkc')}
                    </h1>
                </div>
            </div>
            {/* Eng/Kor Button*/}
            <Translate />
            <button type="button" className='login-button'>
                <Link to="/loginPage">{t('login')}</Link>
            </button>
            {/* Navigation bar */}
            <ul className="navigation-bar">
                {/* Dropdown menu for Events */}
                <li>
                    <Link to="/">{t('home')}</Link>
                </li>
                <li>
                    <Link to="/aboutUs">{t('aboutUs')}</Link>
                </li>
                <li>
                    <Link to="/sermons">{t('sermons')}</Link>
                </li>
                <li className="dropdown">
                    <div className='dropbtn'>{t('eventsDrop')}</div>
                    <div className="dropdown-content">
                        <Link to="/events">{t('events')}</Link>
                        <Link to="/photoGallery">{t('photos')}</Link>
                    </div>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/adminPage">{t('adminPage')}</Link>
                    </li>
                )}
            </ul>
        </header>
    );
}

export default Header;