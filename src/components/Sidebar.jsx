import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';

function Sidebar() {
  const { siteInfo } = useContext(DataContext);
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={siteInfo.owner.avatar} alt={siteInfo.owner.name} width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title={siteInfo.owner.name}>{siteInfo.owner.name}</h1>
          <p className="title">{siteInfo.owner.role}</p>
        </div>

        <button className="info-more-btn" data-sidebar-btn onClick={toggleSidebar}>
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info-more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href={`mailto:${siteInfo.owner.email}`} className="contact-link">{siteInfo.owner.email}</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href={`tel:${siteInfo.owner.phone.replace(/[^0-9+]/g, '')}`} className="contact-link">{siteInfo.owner.phone}</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address><a href="#" className="contact-link">{siteInfo.owner.location}</a></address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          {siteInfo.social.github && (
            <li className="social-item">
              <a href={siteInfo.social.github} className="social-link" target="_blank" rel="noreferrer">
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
          )}
          {siteInfo.social.twitter && (
            <li className="social-item">
              <a href={siteInfo.social.twitter} className="social-link" target="_blank" rel="noreferrer">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
          )}
          {siteInfo.social.instagram && (
            <li className="social-item">
              <a href={siteInfo.social.instagram} className="social-link" target="_blank" rel="noreferrer">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
          )}
          {siteInfo.social.linkedin && (
            <li className="social-item">
              <a href={siteInfo.social.linkedin} className="social-link" target="_blank" rel="noreferrer">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
          )}
          {siteInfo.social.facebook && (
            <li className="social-item">
              <a href={siteInfo.social.facebook} className="social-link" target="_blank" rel="noreferrer">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;