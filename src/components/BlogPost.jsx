import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useInView, useScroll } from 'motion/react';
import MatrixRain from './MatrixRain';
import SimpleFade from './SimpleFade';
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
  const [contentLoaded, setContentLoaded] = useState(false);
  const [showContent, setShowContent] = useState(true); // Ensure content is showing

  // Refs para scroll animations
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const sidebarInView = useInView(sidebarRef, { once: true, amount: 0.3 });

  // Progress da página para o indicador de leitura
  const { scrollYProgress } = useScroll();

  // Force content to be visible when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      // Force content to be visible through direct DOM manipulation as a fallback
      const markdownContent = document.querySelector('.markdown-content');
      if (markdownContent) {
        markdownContent.style.opacity = '1';
        markdownContent.style.visibility = 'visible';
        markdownContent.style.display = 'block';
        markdownContent.style.color = '#ffffff';

        // Force all child elements to be visible
        const contentElements = markdownContent.querySelectorAll('h1, h2, h3, p, li, a, strong, em, ul, pre, code');
        contentElements.forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.color = '#ffffff';
          el.style.display = el.tagName === 'LI' ? 'list-item' : 'block';
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [post]);

  // Preload de imagens para evitar flickering
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  };

  useEffect(() => {
    // Encontrar o post no data store e preload de imagens
    const findPostAndPreload = async () => {
      try {
        setLoading(true);
        const foundPost = blog.posts.find(post => post.id === id);

        if (!foundPost) {
          throw new Error('Post not found');
        }

        setPost(foundPost);

        // Preload da imagem de capa para evitar flickering
        if (foundPost.coverImage && foundPost.coverImage.url) {
          try {
            await preloadImage(foundPost.coverImage.url);
            // Preload de avatar do autor
            if (siteInfo.owner && siteInfo.owner.avatar) {
              await preloadImage(siteInfo.owner.avatar);
            }
            setContentLoaded(true);
          } catch (imgErr) {
            console.warn('Failed to preload some images:', imgErr);
            // Continuar mesmo se o preload falhar
            setContentLoaded(true);
          }
        } else {
          setContentLoaded(true);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    findPostAndPreload();
  }, [id, blog.posts, siteInfo.owner]);

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

          <FadeTransition
            isVisible={contentLoaded && showContent}
            duration={0.3}
            className="blog-post-fade-container"
          >
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
                style={{
                  display: 'block',
                  width: '100%',
                  color: '#ffffff',
                  opacity: 1
                }}
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0 }}
              >
                {post.content ? (
                  <div className="markdown-content" style={{
                      color: '#ffffff',
                      opacity: '1 !important',
                      visibility: 'visible !important',
                      display: 'block !important',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      margin: '0',
                      padding: '0'
                    }}>
                    {/* Rendering blog content directly as HTML with inline styles for visibility */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content
                          .replace(/^# (.*$)/gm, '<h1 style="color:#ffffff;margin:20px 0;font-size:28px;font-weight:bold;">$1</h1>')
                          .replace(/^## (.*$)/gm, '<h2 style="color:#ffffff;margin:16px 0;font-size:24px;font-weight:bold;">$1</h2>')
                          .replace(/^### (.*$)/gm, '<h3 style="color:#ffffff;margin:14px 0;font-size:20px;font-weight:bold;">$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ffffff;font-weight:bold;">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em style="color:#ffffff;font-style:italic;">$1</em>')
                          .replace(/```([\s\S]*?)```/g, '<pre style="background:#222;padding:15px;border-radius:5px;overflow:auto;margin:15px 0;"><code style="color:#03A062;font-family:monospace;">$1</code></pre>')
                          .replace(/- (.*$)/gm, '<li style="color:#ffffff;margin:5px 0;">$1</li>')
                          .replace(/<li style.*<\/li>(\s*)<li style/g, '<li style$1</li><li style')
                          .replace(/(<li style.*<\/li>)(?!\s*<li style)/g, '<ul style="color:#ffffff;margin:15px 0;padding-left:20px;">$1</ul>')
                          .replace(/\n\n/g, '</p><p style="color:#ffffff;margin:10px 0;">')
                          .replace(/\n/g, '<br />')
                          .replace(/^(.+)$/gm, '<p style="color:#ffffff;margin:10px 0;">$1</p>')
                      }}
                      style={{
                        display: 'block',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        lineHeight: '1.6'
                      }}
                    />
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
          </FadeTransition>

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