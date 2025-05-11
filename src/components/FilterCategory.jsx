import { memo } from 'react';
import { motion } from 'motion/react';
import { fadeInUpItem } from '../animations/pageTransitions';

const FilterCategory = memo(({ category, index, filterCategory, handleFilterClick }) => {
  return (
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
  );
}, (prevProps, nextProps) => {
  // Only re-render if the category changed or it became active/inactive
  return prevProps.category === nextProps.category && 
         (prevProps.filterCategory === prevProps.category) === (nextProps.filterCategory === nextProps.category);
});

export default FilterCategory;