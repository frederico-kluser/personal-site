import { useState, useContext, useCallback, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { motion, AnimatePresence, useAnimationControls, LayoutGroup } from 'motion/react';
import { staggerContainer, fadeInUpItem, portfolioTransitions, buttonHover } from '../animations/pageTransitions';
import ProjectItem from './ProjectItem';
import FilterCategory from './FilterCategory';
import MobileFilterDropdown from './MobileFilterDropdown';

function Portfolio({ isActive, openProjectModal }) {
  const { portfolio } = useContext(DataContext);
  const controls = useAnimationControls();

  const [filterCategory, setFilterCategory] = useState('All');
  const [selectOpen, setSelectOpen] = useState(false);

  // Open project modal when clicked - memoized to prevent recreating on each render
  const handleProjectClick = useCallback((project) => {
    openProjectModal(project);
  }, [openProjectModal]);

  // Filter project categories - memoized to prevent recreating on each render
  const handleFilterClick = useCallback((category) => {
    setFilterCategory(category);
  }, []);

  // Toggle select dropdown - memoized
  const toggleSelect = useCallback(() => {
    setSelectOpen(prev => !prev);
  }, []);

  // Handle select item click - memoized
  const handleSelectItemClick = useCallback((category) => {
    setFilterCategory(category);
    setSelectOpen(false);
  }, []);

  // Filter projects based on selected category - memoized to prevent recalculation on every render
  const filteredProjects = useMemo(() => {
    return filterCategory === 'All'
      ? portfolio.projects
      : portfolio.projects.filter(project => project.category === filterCategory);
  }, [filterCategory, portfolio.projects]);

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
            <FilterCategory
              key={index}
              category={category}
              index={index}
              filterCategory={filterCategory}
              handleFilterClick={handleFilterClick}
            />
          ))}
        </motion.ul>

        {/* Mobile filter dropdown - completely new implementation */}
        <MobileFilterDropdown
          categories={portfolio.categories}
          selectedCategory={filterCategory}
          onChange={handleFilterClick}
          isOpen={selectOpen}
          onToggle={() => setSelectOpen(prev => !prev)}
        />

        <LayoutGroup>
          <motion.ul
            className="project-list"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  handleProjectClick={handleProjectClick}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </section>
    </motion.article>
  );
}

export default Portfolio;