import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

function Navbar({ activePage, onPageChange }) {
  const navItems = [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'resume', label: 'Resume', path: '/resume' },
    { id: 'portfolio', label: 'Portfolio', path: '/portfolio' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (item) => {
    onPageChange(item.id);
  };

  return (
    <motion.nav
      className="navbar"
      layoutId="navbar-container"
    >
      <motion.ul
        className="navbar-list"
        layoutId="navbar-list"
      >
        {navItems.map(item => (
          <motion.li className="navbar-item" key={item.id}>
            <Link
              to={item.path}
              className={`navbar-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {/* Use layoutId para o item do blog para animar a transição */}
              {item.id === 'blog' ? (
                <motion.span layoutId={`nav-text-${item.id}`}>
                  {item.label}
                </motion.span>
              ) : (
                item.label
              )}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
}

export default Navbar;