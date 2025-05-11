import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import MatrixRain from './MatrixRain';
import { DataContext } from '../context/DataContext';
import '../assets/css/blog-post.css';
import '../assets/css/blog-animations.css'; // Importando as animações CSS

function BlogPost() {
  const { id } = useParams();
  const { blog, siteInfo } = useContext(DataContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for scroll animations
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const bannerRef = useRef(null);
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.3 });

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });

  const sidebarRef = useRef(null);
  const sidebarInView = useInView(sidebarRef, { once: true, amount: 0.3 });

  // Scroll progress for reading indicator
  const { scrollYProgress } = useScroll();
  const readingProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    // Find the post in our centralized data store
    const findPost = () => {
      try {
        setLoading(true);
        const foundPost = blog.posts.find(post => post.id === id);

        if (!foundPost) {
          throw new Error('Post not found');
        }

        setPost(foundPost);
        setLoading(false);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    findPost();
  }, [id, blog.posts]);

  // Loading state with animation
  if (loading) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <motion.nav
              className="navbar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="navbar-list">
                <NavLinks />
              </ul>
            </motion.nav>
            <motion.div
              className="blog-post-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 1, repeat: Infinity, ease: "linear" }
                }}
                style={{ display: 'inline-block', marginRight: '10px' }}
              >
                <ion-icon name="sync-outline" size="large"></ion-icon>
              </motion.div>
              Loading blog post...
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  // Error state with animation
  if (error) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <motion.nav
              className="navbar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="navbar-list">
                <NavLinks />
              </ul>
            </motion.nav>
            <motion.div
              className="blog-post-error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  color: ['#ff5555', '#ff0000', '#ff5555'],
                  transition: { duration: 2, repeat: Infinity }
                }}
                style={{ display: 'inline-block', marginRight: '10px' }}
              >
                <ion-icon name="alert-circle-outline" size="large"></ion-icon>
              </motion.div>
              Error: {error}
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  // Not found state with animation
  if (!post) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <motion.nav
              className="navbar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="navbar-list">
                <NavLinks />
              </ul>
            </motion.nav>
            <motion.div
              className="blog-post-not-found"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
                style={{ display: 'inline-block', marginRight: '10px' }}
              >
                <ion-icon name="search-outline" size="large"></ion-icon>
              </motion.div>
              Blog post not found
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <MatrixRain />
      <main className="blog-main">
        <div className="main-content blog-full-width">
          {/* Reading progress indicator */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--matrix-green)',
              transformOrigin: '0%',
              scaleX: scrollYProgress,
              zIndex: 1000
            }}
          />

          <motion.nav
            className="blog-navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="navbar-list">
              <NavLinks />
            </ul>
          </motion.nav>

          <motion.article
            className="blog-post active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.header
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <motion.h2
                className="h2 article-title"
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {post.title}
              </motion.h2>

              <motion.div
                className="blog-meta"
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.p
                  className="blog-category"
                  whileHover={{
                    color: 'var(--matrix-green)',
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {post.category}
                </motion.p>
                <span className="dot"></span>
                <motion.time
                  dateTime={post.createdAt}
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0.8 }}
                >
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </motion.time>
              </motion.div>
            </motion.header>

            <motion.figure
              className="blog-banner"
              ref={bannerRef}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={bannerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.3
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                loading="lazy"
                initial={{ filter: 'brightness(0.8)' }}
                animate={{ filter: 'brightness(1)' }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </motion.figure>

            <div className="blog-content-wrapper">
              <motion.div
                className="blog-content"
                ref={contentRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'block', width: '100%' }}
              >
                {post.content ? (
                  <div className="markdown-content">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div>Sem conteúdo disponível para este post.</div>
                )}
              </motion.div>

              <motion.div
                className="blog-sidebar"
                ref={sidebarRef}
                initial={{ opacity: 0, x: 40 }}
                animate={sidebarInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.div
                  className="author-box"
                  initial={{ opacity: 0, y: 20 }}
                  animate={sidebarInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  <motion.figure
                    className="author-avatar"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.img
                      src={siteInfo.owner.avatar}
                      alt={siteInfo.owner.name}
                      width="80"
                      initial={{ filter: 'grayscale(50%)' }}
                      whileHover={{
                        filter: 'grayscale(0%)',
                        transition: { duration: 0.3 }
                      }}
                    />
                  </motion.figure>
                  <motion.h3
                    className="h3 author-name"
                    whileHover={{
                      color: 'var(--matrix-green)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {siteInfo.owner.name}
                  </motion.h3>
                  <motion.p
                    className="author-title"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {siteInfo.owner.role}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="recent-posts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={sidebarInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.h3
                    className="h3"
                    whileHover={{
                      color: 'var(--matrix-green)',
                      x: 3,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Recent Posts
                  </motion.h3>
                  <motion.ul
                    className="recent-posts-list"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    initial="hidden"
                    animate={sidebarInView ? "show" : "hidden"}
                  >
                    {blog.recentPosts.map((recentPost, index) => (
                      <motion.li
                        className="recent-post-item"
                        key={recentPost.id}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{
                          x: 5,
                          transition: { type: 'spring', stiffness: 300, damping: 10 }
                        }}
                      >
                        <Link to={`/blog/${recentPost.id}`}>
                          <motion.span
                            whileHover={{
                              color: 'var(--matrix-green)',
                              transition: { duration: 0.2 }
                            }}
                          >
                            {recentPost.title}
                          </motion.span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                <motion.div
                  className="tags"
                  initial={{ opacity: 0, y: 20 }}
                  animate={sidebarInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.h3
                    className="h3"
                    whileHover={{
                      color: 'var(--matrix-green)',
                      x: 3,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Tags
                  </motion.h3>
                  <motion.ul
                    className="tags-list"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 }
                      }
                    }}
                    initial="hidden"
                    animate={sidebarInView ? "show" : "hidden"}
                  >
                    {post.tags.map((tag, index) => (
                      <motion.li
                        key={index}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          show: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { type: 'spring', stiffness: 300, damping: 10 }
                        }}
                      >
                        <motion.a
                          href="#"
                          className="tag-link"
                          whileHover={{
                            backgroundColor: 'var(--matrix-green)',
                            color: '#000',
                            transition: { duration: 0.2 }
                          }}
                        >
                          {tag}
                        </motion.a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.article>

          {/* Background decoration */}
          <motion.div
            style={{
              position: 'fixed',
              top: '40%',
              right: '5%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(3, 160, 98, 0.1) 0%, rgba(3, 160, 98, 0) 70%)',
              borderRadius: '50%',
              zIndex: -1,
              pointerEvents: 'none'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </main>
    </>
  );
}

// NavLinks component to avoid repetition
function NavLinks() {
  return (
    <>
      <motion.li
        className="navbar-item"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ y: -5 }}
      >
        <Link to="/" className="navbar-link">About</Link>
      </motion.li>
      <motion.li
        className="navbar-item"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <Link to="/resume" className="navbar-link">Resume</Link>
      </motion.li>
      <motion.li
        className="navbar-item"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <Link to="/portfolio" className="navbar-link">Portfolio</Link>
      </motion.li>
      <motion.li
        className="navbar-item"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        whileHover={{ y: -5 }}
      >
        <Link to="/blog" className="navbar-link active">Blog</Link>
      </motion.li>
      <motion.li
        className="navbar-item"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <Link to="/contact" className="navbar-link">Contact</Link>
      </motion.li>
    </>
  );
}

// Este componente foi removido pois estamos usando ReactMarkdown diretamente
// A lógica de animação para conteúdos dinâmicos deve ser aplicada de outra forma,
// por exemplo, usando CSS com classes específicas ou animando o container pai

export default BlogPost;