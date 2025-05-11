import { useState } from 'react';

function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="https://i.postimg.cc/JzBWVhW4/my-avatar.png" alt="avatar" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Fred K.">Fred K.</h1>
          <p className="title">MCP | LLM | React Developer</p>
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
              <a href="mailto:fkluser@icloud.com" className="contact-link">fkluser@icloud.com</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+5513992032756" className="contact-link">+55 13 99203-2756</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="logo-linkedin"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">LinkedIn</p>
              <a href="https://www.linkedin.com/in/fredericokluser" className="contact-link">fredericokluser</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address><a href="#" className="contact-link">Digital Nomad</a></address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a href="https://github.com/frederico-kluser?tab=repositories" className="social-link" target="_blank" rel="noreferrer">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://x.com/fredericokluser" className="social-link" target="_blank" rel="noreferrer">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://www.instagram.com/kluserhuu/" className="social-link" target="_blank" rel="noreferrer">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;