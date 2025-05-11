import { motion } from 'motion/react';
import { scaleTransition, fadeTransition } from '../animations/pageTransitions';

function Modal({ isOpen, onClose, className, children }) {
  if (!isOpen) return null;

  return (
    <motion.div
      id="modal-root"
      className={isOpen ? 'active' : ''}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeTransition}
    >
      <motion.div
        className="project-modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="project-modal-wrapper">
        <motion.div
          className={`project-modal ${className || ''}`}
          variants={scaleTransition}
        >
          <motion.button
            className="project-modal-close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ion-icon name="close-outline"></ion-icon>
          </motion.button>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Modal;