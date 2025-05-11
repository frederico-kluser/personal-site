import { motion } from 'motion/react';
import { staggerContainer, fadeInUpItem } from '../animations/pageTransitions';

function TestimonialModalContent({ testimonial }) {
  if (!testimonial) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="testimonial-modal-header">
        <figure className="testimonial-modal-avatar">
          <motion.img
            src={testimonial.avatar}
            alt={testimonial.name}
            width="100"
            layoutId={`testimonial-avatar-${testimonial.id}`}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </figure>

        <div className="testimonial-modal-title-wrapper">
          <motion.h3
            className="h3 testimonial-modal-title"
            layoutId={`testimonial-name-${testimonial.id}`}
          >
            {testimonial.name}
          </motion.h3>
          <motion.time
            dateTime="2023-06-14"
            variants={fadeInUpItem}
            transition={{ delay: 0.1 }}
          >
            14 June, 2023
          </motion.time>
        </div>

        <motion.img
          src="https://i.postimg.cc/mZ00RwX7/icon-quote.png"
          alt="quote icon"
          className="testimonial-quote-icon"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      <motion.div
        className="testimonial-modal-content"
        variants={fadeInUpItem}
        transition={{ delay: 0.3 }}
      >
        <motion.p layoutId={`testimonial-text-${testimonial.id}`}>
          {testimonial.text}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default TestimonialModalContent;