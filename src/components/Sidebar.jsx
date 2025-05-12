import { useContext } from 'react';
import { motion } from 'motion/react';
import { DataContext } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

function Sidebar() {
  const { siteInfo } = useContext(DataContext);

  return (
    <motion.aside
      className="sidebar active"
      data-sidebar
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }}
    >
      <motion.div
        className="sidebar-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.figure
          className="avatar-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { type: 'spring', stiffness: 300, damping: 10 }
          }}
        >
          <motion.img
            src={siteInfo.owner.avatar}
            alt={siteInfo.owner.name}
            width="80"
            initial={{ filter: 'grayscale(100%)' }}
            animate={{ filter: 'grayscale(0%)' }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.figure>

        <motion.div
          className="info-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.h1
            className="name"
            title={siteInfo.owner.name}
            whileHover={{
              color: 'var(--matrix-green)',
              x: 3,
              transition: { duration: 0.2 }
            }}
          >
            {siteInfo.owner.name}
          </motion.h1>
          <motion.p
            className="title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {siteInfo.owner.role}
          </motion.p>
        </motion.div>

      </motion.div>

      <motion.div
            className="sidebar-info-more"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity: 1, visibility: 'visible' }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSelector />

            <div className="separator"></div>

            <motion.ul
              className="contacts-list"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <ContactItem
                icon="mail-outline"
                title="Email"
                link={`mailto:${siteInfo.owner.email}`}
                text={siteInfo.owner.email}
                delay={0.1}
              />

              <ContactItem
                icon="phone-portrait-outline"
                title="Phone"
                link={`tel:${siteInfo.owner.phone.replace(/[^0-9+]/g, '')}`}
                text={siteInfo.owner.phone}
                delay={0.2}
              />

              <ContactItem
                icon="location-outline"
                title="Location"
                link="#"
                text={siteInfo.owner.location}
                isAddress={true}
                delay={0.3}
              />
            </motion.ul>

            <div className="separator"></div>

            <motion.ul
              className="social-list"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.3 }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {siteInfo.social.github && (
                <SocialItem network="github" url={siteInfo.social.github} />
              )}
              {siteInfo.social.twitter && (
                <SocialItem network="twitter" url={siteInfo.social.twitter} />
              )}
              {siteInfo.social.instagram && (
                <SocialItem network="instagram" url={siteInfo.social.instagram} />
              )}
              {siteInfo.social.linkedin && (
                <SocialItem network="linkedin" url={siteInfo.social.linkedin} />
              )}
              {siteInfo.social.facebook && (
                <SocialItem network="facebook" url={siteInfo.social.facebook} />
              )}
            </motion.ul>
          </motion.div>
    </motion.aside>
  );
}

// Componente para item de contato com animação
function ContactItem({ icon, title, link, text, isAddress = false, delay }) {
  const { t } = useTranslation();
  const translatedTitle = t(`sidebar.${title.toLowerCase()}`);

  return (
    <motion.li
      className="contact-item"
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay
          }
        }
      }}
      whileHover={{
        x: 5,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      <motion.a
        href={link}
        className="icon-box"
        whileHover={{
          rotate: 10,
          scale: 1.1,
          color: 'var(--matrix-green)',
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        style={{ textDecoration: 'none' }}
      >
        <ion-icon name={icon}></ion-icon>
      </motion.a>

      <div className="contact-info">
        <motion.p
          className="contact-title"
          whileHover={{
            color: 'var(--matrix-green)',
            transition: { duration: 0.2 }
          }}
        >
          {translatedTitle}
        </motion.p>

        {isAddress ? (
          <address>
            <motion.a
              href={link}
              className="contact-link"
              whileHover={{
                color: 'var(--matrix-green)',
                transition: { duration: 0.2 }
              }}
            >
              {text}
            </motion.a>
          </address>
        ) : (
          <motion.a
            href={link}
            className="contact-link"
            whileHover={{
              color: 'var(--matrix-green)',
              transition: { duration: 0.2 }
            }}
          >
            {text}
          </motion.a>
        )}
      </div>
    </motion.li>
  );
}

// Componente para redes sociais com animação
function SocialItem({ network, url }) {
  return (
    <motion.li
      className="social-item"
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20
          }
        }
      }}
    >
      <motion.a
        href={url}
        className="social-link"
        target="_blank"
        rel="noreferrer"
        whileHover={{
          scale: 1.2,
          color: 'var(--matrix-green)',
          backgroundColor: 'rgba(3, 160, 98, 0.2)',
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ion-icon name={`logo-${network}`}></ion-icon>
      </motion.a>
    </motion.li>
  );
}

export default Sidebar;