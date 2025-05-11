import { motion } from 'motion/react';
import { staggerContainer, fadeInUpItem } from '../animations/pageTransitions';

function ProjectModalContent({ project }) {
  if (!project) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="project-modal-img-wrapper">
        <div className="project-modal-img">
          <motion.img
            id="project-modal-img"
            src={project.image}
            alt={project.title}
            layoutId={`project-image-${project.id}`}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
      </div>

      <motion.h3
        className="h3 project-modal-title"
        id="project-modal-title"
        layoutId={`project-title-${project.id}`}
      >
        {project.title}
      </motion.h3>

      <motion.div
        className="project-modal-role"
        id="project-modal-role"
        variants={fadeInUpItem}
        transition={{ delay: 0.1 }}
      >
        {project.role}
      </motion.div>

      <motion.div
        className="project-modal-text"
        id="project-modal-text"
        variants={fadeInUpItem}
        transition={{ delay: 0.2 }}
      >
        {project.description}
      </motion.div>

      {project.technologies && (
        <motion.div
          className="project-modal-techs"
          id="project-modal-techs"
          variants={fadeInUpItem}
          transition={{ delay: 0.3 }}
        >
          <motion.h5
            className="h5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Technologies:
          </motion.h5>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {project.technologies}
          </motion.p>
        </motion.div>
      )}

      {project.methodologies && (
        <motion.div
          className="project-modal-methodologies"
          id="project-modal-methodologies"
          variants={fadeInUpItem}
          transition={{ delay: 0.4 }}
        >
          <motion.h5
            className="h5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Methodologies:
          </motion.h5>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {project.methodologies}
          </motion.p>
        </motion.div>
      )}

      {project.tools && (
        <motion.div
          className="project-modal-tools"
          id="project-modal-tools"
          variants={fadeInUpItem}
          transition={{ delay: 0.5 }}
        >
          <motion.h5
            className="h5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Tools:
          </motion.h5>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            {project.tools}
          </motion.p>
        </motion.div>
      )}

      {project.downloads && (
        <motion.div
          className="project-modal-downloads"
          id="project-modal-downloads"
          variants={fadeInUpItem}
          transition={{ delay: 0.6 }}
        >
          <motion.h5
            className="h5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            Downloads:
          </motion.h5>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            {project.downloads}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ProjectModalContent;