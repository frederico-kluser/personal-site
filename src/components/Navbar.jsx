import { Link } from 'react-router-dom';

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
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(item => (
          <li className="navbar-item" key={item.id}>
            <Link 
              to={item.path}
              className={`navbar-link ${activePage === item.id ? 'active' : ''}`} 
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;