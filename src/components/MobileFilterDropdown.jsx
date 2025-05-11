import React from 'react';

/**
 * A simple dropdown component for mobile portfolio filtering
 * This component uses simple HTML/CSS without animation libraries to ensure reliability
 */
const MobileFilterDropdown = ({ 
  categories,
  selectedCategory,
  onChange,
  isOpen,
  onToggle
}) => {
  return (
    <div className="mobile-filter-dropdown">
      <button 
        className="mobile-filter-button"
        onClick={onToggle}
      >
        <span>{selectedCategory}</span>
        <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
          <ion-icon name="chevron-down"></ion-icon>
        </span>
      </button>
      
      {isOpen && (
        <ul className="mobile-dropdown-list">
          {categories.map((category) => (
            <li key={category} className="mobile-dropdown-item">
              <button 
                className={category === selectedCategory ? 'active' : ''}
                onClick={() => {
                  onChange(category);
                  onToggle();
                }}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileFilterDropdown;