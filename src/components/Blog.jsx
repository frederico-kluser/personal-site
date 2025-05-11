import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { DataContext } from '../context/DataContext';
import { pageTransitions } from '../animations/pageTransitions';

function Blog({ isActive }) {
  const { blog } = useContext(DataContext);

  // Ref for blog posts animation
  const postsRef = useRef(null);
  const postsInView = useInView(postsRef, { once: true, amount: 0.2 });

  return (
    <motion.article
      className={`blog ${isActive ? 'active' : ''}`}
      data-page="blog"
      initial="initial"
      animate={isActive ? "animate" : "initial"}
      exit="exit"
      variants={pageTransitions}
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="h2 article-title">{blog.title}</h2>
      </motion.header>

      <motion.section
        className="blog-posts"
        ref={postsRef}
        initial={{ opacity: 0 }}
        animate={postsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <ul className="blog-posts-list">
          {blog.posts.map((post, index) => (
            <motion.li
              className="blog-posts-item"
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={postsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + (index * 0.1)
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Link to={`/blog/${post.id}`} className="content-card blog-card">
                <motion.figure
                  className="blog-banner-box"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    initial={{ filter: 'brightness(0.9)' }}
                    whileHover={{
                      filter: 'brightness(1.1)',
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.figure>

                <motion.div
                  className="blog-content"
                  initial={{ opacity: 0 }}
                  animate={postsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                >
                  <motion.div
                    className="blog-meta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={postsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                  >
                    <motion.p
                      className="blog-category"
                      whileHover={{ color: 'var(--matrix-green)', scale: 1.05 }}
                    >
                      {post.category}
                    </motion.p>
                    <span className="dot"></span>
                    <motion.time
                      dateTime={post.dateTime}
                      whileHover={{ opacity: 1 }}
                      initial={{ opacity: 0.8 }}
                    >
                      {post.date}
                    </motion.time>
                  </motion.div>

                  <motion.h3
                    className="h3 blog-item-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={postsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                    whileHover={{ color: 'var(--matrix-green)' }}
                  >
                    {post.title}
                  </motion.h3>

                  <motion.p
                    className="blog-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={postsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                  >
                    {post.summary}
                  </motion.p>

                  <motion.div
                    className="blog-read-more"
                    initial={{ opacity: 0, x: -10 }}
                    animate={postsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                    whileHover={{
                      x: 5,
                      color: 'var(--matrix-green)',
                      transition: { type: 'spring', stiffness: 300, damping: 10 }
                    }}
                  >
                    <span>Read More</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut'
                      }}
                    >
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Background decoration */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(3, 160, 98, 0.1) 0%, rgba(3, 160, 98, 0) 70%)',
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.article>
  );
}

export default Blog;