import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';

function Portfolio({ isActive, openProjectModal }) {
  const { portfolio } = useContext(DataContext);

  const [filterCategory, setFilterCategory] = useState('All');
  const [selectOpen, setSelectOpen] = useState(false);

  // Open project modal when clicked
  const handleProjectClick = (project) => {
    openProjectModal(project);
  };

  // Filter project categories
  const handleFilterClick = (category) => {
    setFilterCategory(category);
  };

  // Toggle select dropdown
  const toggleSelect = () => {
    setSelectOpen(!selectOpen);
  };

  // Handle select item click
  const handleSelectItemClick = (category) => {
    setFilterCategory(category);
    setSelectOpen(false);
  };

  // Filter projects based on selected category
  const filteredProjects = filterCategory === 'All'
    ? portfolio.projects
    : portfolio.projects.filter(project => project.category === filterCategory);

  return (
    <article className={`portfolio ${isActive ? 'active' : ''}`} data-page="portfolio">
      <header>
        <h2 className="h2 article-title">{portfolio.title}</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          {portfolio.categories.map((category, index) => (
            <li className="filter-item" key={index}>
              <button
                className={filterCategory === category ? 'active' : ''}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        <div className="filter-select-box">
          <button
            className="filter-select"
            onClick={toggleSelect}
          >
            <div className="select-value">
              {filterCategory}
            </div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className={`select-list ${selectOpen ? 'active' : ''}`}>
            {portfolio.categories.map((category, index) => (
              <li className="select-item" key={index}>
                <button onClick={() => handleSelectItemClick(category)}>{category}</button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="project-list">
          {filteredProjects.map(project => (
            <li 
              className="project-item active" 
              key={project.id} 
              data-filter-item 
              data-category={project.category.toLowerCase().replace(' ', '-')}
              data-project-item
            >
              <a href="#" onClick={(e) => {
                e.preventDefault();
                handleProjectClick(project);
              }}>
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title" data-project-title>{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default Portfolio;