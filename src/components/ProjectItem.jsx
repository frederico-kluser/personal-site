import { memo } from 'react';
import { motion } from 'motion/react';

const ProjectItem = memo(({ project, index, handleProjectClick }) => {
  return (
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
  );
}, (prevProps, nextProps) => {
  // Only re-render if the project or index has changed
  return prevProps.project.id === nextProps.project.id &&
         prevProps.index === nextProps.index;
});

export default ProjectItem;