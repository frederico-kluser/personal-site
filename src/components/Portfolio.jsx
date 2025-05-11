import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { motion, AnimatePresence, useAnimationControls, LayoutGroup } from 'motion/react';
import { staggerContainer, fadeInUpItem, portfolioTransitions, buttonHover } from '../animations/pageTransitions';

function Portfolio({ isActive, openProjectModal }) {
  const { portfolio } = useContext(DataContext);
  const controls = useAnimationControls();

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
    <motion.article
      className={`portfolio ${isActive ? 'active' : ''}`}
      data-page="portfolio"
      initial="initial"
      animate={isActive ? "animate" : "initial"}
      exit="exit"
      variants={portfolioTransitions}
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="h2 article-title">{portfolio.title}</h2>
      </motion.header>

      <section className="projects">
        <motion.ul
          className="filter-list"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {portfolio.categories.map((category, index) => (
            <motion.li
              className="filter-item"
              key={index}
              variants={fadeInUpItem}
              custom={index}
              transition={{ delay: index * 0.05 }}
            >
              <motion.button
                className={filterCategory === category ? 'active' : ''}
                onClick={() => handleFilterClick(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {category}
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="filter-select-box">
          <motion.button
            className="filter-select"
            onClick={toggleSelect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="select-value">
              {filterCategory}
            </div>
            <motion.div
              className="select-icon"
              animate={{ rotate: selectOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ion-icon name="chevron-down"></ion-icon>
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {selectOpen && (
              <motion.ul
                className={`select-list ${selectOpen ? 'active' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {portfolio.categories.map((category, index) => (
                  <motion.li
                    className="select-item"
                    key={index}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.button
                      onClick={() => handleSelectItemClick(category)}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {category}
                    </motion.button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <LayoutGroup>
          <motion.ul
            className="project-list"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.li
                  className="project-item active"
                  key={project.id}
                  data-filter-item
                  data-category={project.category.toLowerCase().replace(' ', '-')}
                  data-project-item
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleProjectClick(project);
                  }}>
                    <figure className="project-img">
                      <motion.div
                        className="project-item-icon-box"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ion-icon name="eye-outline"></ion-icon>
                        </motion.div>
                      </motion.div>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        layoutId={`project-image-${project.id}`}
                        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                      />
                    </figure>
                    <motion.h3
                      className="project-title"
                      data-project-title
                      layoutId={`project-title-${project.id}`}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="project-category"
                      layoutId={`project-category-${project.id}`}
                    >
                      {project.category}
                    </motion.p>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </section>
    </motion.article>
  );
}

export default Portfolio;