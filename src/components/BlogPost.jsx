import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useInView, useScroll, AnimatePresence } from 'motion/react';
import MatrixRain from './MatrixRain';
import { DataContext } from '../context/DataContext';
import '../assets/css/blog-post.css';
import '../assets/css/blog-animations.css'; // Importando as animações CSS
import '../assets/css/blog-post-fixes.css'; // Correções de visibilidade e animações adicionais

function BlogPost() {
  const { id } = useParams();
  const { blog, siteInfo } = useContext(DataContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs para scroll animations
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const sidebarInView = useInView(sidebarRef, { once: true, amount: 0.3 });

  // Progress da página para o indicador de leitura
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Encontrar o post no data store
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

  // Estado de carregamento
  if (loading) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <motion.nav 
              className="navbar"
              layoutId="navbar-container"
            >
              <motion.ul 
                className="navbar-list"
                layoutId="navbar-list"
              >
                <NavLinks />
              </motion.ul>
            </motion.nav>
            <div className="blog-post-loading">
              <div style={{ display: 'inline-block', marginRight: '10px', animation: 'spin 1s linear infinite' }}>
                <ion-icon name="sync-outline" size="large"></ion-icon>
              </div>
              Loading blog post...
            </div>
          </div>
        </main>
      </>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <motion.nav 
              className="navbar"
              layoutId="navbar-container"
            >
              <motion.ul 
                className="navbar-list"
                layoutId="navbar-list"
              >
                <NavLinks />
              </motion.ul>
            </motion.nav>
            <div className="blog-post-error">
              <div style={{ display: 'inline-block', marginRight: '10px', color: '#ff5555' }}>
                <ion-icon name="alert-circle-outline" size="large"></ion-icon>
              </div>
              Error: {error}
            </div>
          </div>
        </main>
      </>
    );
  }

  // Se post não for encontrado
  if (!post) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <motion.nav 
              className="navbar"
              layoutId="navbar-container"
            >
              <motion.ul 
                className="navbar-list"
                layoutId="navbar-list"
              >
                <NavLinks />
              </motion.ul>
            </motion.nav>
            <div className="blog-post-not-found">
              <div style={{ display: 'inline-block', marginRight: '10px' }}>
                <ion-icon name="search-outline" size="large"></ion-icon>
              </div>
              Blog post not found
            </div>
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
          {/* Indicador de progresso de leitura */}
          <motion.div 
            className="reading-progress-bar"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--matrix-green)',
              transformOrigin: '0%',
              zIndex: 1000
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollYProgress }}
          />
          
          <motion.nav 
            className="blog-navbar"
            layoutId="navbar-container"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 25,
              delay: 0.2
            }}
          >
            <motion.ul 
              className="navbar-list"
              layoutId="navbar-list"
            >
              <NavLinks />
            </motion.ul>
          </motion.nav>

          <motion.article 
            className="blog-post active"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
          >
            <header className="blog-post-header">
              <h2 className="h2 article-title">{post.title}</h2>
              
              <div className="blog-meta">
                <p className="blog-category">{post.category}</p>
                <span className="dot"></span>
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            <figure className="blog-banner">
              <img 
                src={post.coverImage.url} 
                alt={post.coverImage.alt} 
                loading="lazy"
              />
            </figure>

            <div className="blog-content-wrapper">
              <motion.div 
                className="blog-content"
                ref={contentRef}
                style={{ display: 'block', width: '100%' }}
                initial={{ opacity: 0, x: -20 }}
                animate={contentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
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
                initial={{ opacity: 0, x: 20 }}
                animate={sidebarInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="author-box">
                  <figure className="author-avatar">
                    <img 
                      src={siteInfo.owner.avatar} 
                      alt={siteInfo.owner.name} 
                      width="80"
                    />
                  </figure>
                  <h3 className="h3 author-name">{siteInfo.owner.name}</h3>
                  <p className="author-title">{siteInfo.owner.role}</p>
                </div>

                <div className="recent-posts">
                  <h3 className="h3">Recent Posts</h3>
                  <ul className="recent-posts-list">
                    {blog.recentPosts.map(recentPost => (
                      <li className="recent-post-item" key={recentPost.id}>
                        <Link to={`/blog/${recentPost.id}`}>
                          {recentPost.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tags">
                  <h3 className="h3">Tags</h3>
                  <ul className="tags-list">
                    {post.tags.map((tag, index) => (
                      <li key={index}>
                        <a href="#" className="tag-link">{tag}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.article>
          
          {/* Elemento de decoração de fundo */}
          <motion.div
            className="background-decoration"
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
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </main>
    </>
  );
}

// Componente NavLinks para evitar repetição
function NavLinks() {
  return (
    <>
      <motion.li className="navbar-item">
        <Link to="/" className="navbar-link">About</Link>
      </motion.li>
      <motion.li className="navbar-item">
        <Link to="/resume" className="navbar-link">Resume</Link>
      </motion.li>
      <motion.li className="navbar-item">
        <Link to="/portfolio" className="navbar-link">Portfolio</Link>
      </motion.li>
      <motion.li className="navbar-item">
        <Link to="/blog" className="navbar-link active">
          <motion.span layoutId="nav-text-blog">Blog</motion.span>
        </Link>
      </motion.li>
      <motion.li className="navbar-item">
        <Link to="/contact" className="navbar-link">Contact</Link>
      </motion.li>
    </>
  );
}

export default BlogPost;