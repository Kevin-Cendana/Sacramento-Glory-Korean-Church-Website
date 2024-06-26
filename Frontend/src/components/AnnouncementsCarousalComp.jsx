import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchRecentAnnouncements } from './Javascript/announcementsAdd.js';
import './AnnouncementsCarousalComp.css';

import TempImage1 from '../images/dayview_church.jpg';
import TempImage2 from '../images/nightview_church.jpg';
import TempImage3 from '../images/dayview2_church.jpg';

const MaxDisplayed = 3;

const AnnouncementsCarouselComp = () => {
    const [index, setIndex] = useState(0);
    const [announcements, setAnnouncements] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await fetchRecentAnnouncements();
                setAnnouncements(data || []);
            } catch (error) {
                console.error('Error getting announcements:', error);
            }
        };

        fetchAnnouncements();

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === announcements.length - 1 ? 0 : prevIndex + 1));
        }, 12500); // Change slide every 20 seconds

        return () => clearInterval(interval);
    }, [announcements.length]); // Depend on announcements.length for updates

    const displayedAnnouncements = announcements.slice(0, MaxDisplayed);

    const previousSlide = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? announcements.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex === announcements.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="carouselContainer">
            <div className="announcementCarousal" style={{ transform: `translateX(-${index * 100}%)` }}>
            {displayedAnnouncements.map((announcement, idx) => {
                if (idx === index) {
                    return (
                        <div key={idx} className="announcement">
                            <div className="announcementContent" style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${idx === 0 ? TempImage1 : idx === 1 ? TempImage2 : TempImage3})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <h1>{announcement.title}</h1>
                                <h3>{announcement.description}</h3>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={idx} className="announcement" style={{ opacity: 0 }}>
                            <div className="announcementContent" style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${idx === 0 ? TempImage1 : idx === 1 ? TempImage2 : TempImage3})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <h1>{announcement.title}</h1>
                                <h3>{announcement.description}</h3>
                            </div>
                        </div>
                    );
                }
            })}
            </div>
            <div className="carousalControls">
                <button onClick={nextSlide}>{t('next')}</button>
                <button onClick={previousSlide}>{t('previous')}</button>
            </div>
        </div>
    );
};

export default AnnouncementsCarouselComp;
