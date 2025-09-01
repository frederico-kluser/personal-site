import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { useLanguageContext } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import MatrixRain from './MatrixRain';
import '../assets/css/blog-post.css';
import '../assets/css/blog-post-fixes.css';
import '../assets/css/simple-fade.css';

/**
 * SimpleBlogPost - A simplified version of the BlogPost component
 * Uses pure CSS transitions and avoids motion/react animations
 * to prevent flickering during navigation
 */
function SimpleBlogPost() {
  const { id } = useParams();
  const { siteInfo } = useContext(DataContext);
  const { t } = useTranslation();
  const { contentData } = useLanguageContext();
  const blog = contentData.blog;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Ref for the progress indicator
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  // Handle scroll for reading progress
  useEffect(() => {
    const updateProgress = () => {
      if (containerRef.current && progressRef.current) {
        const scrollPosition = window.scrollY;
        const maxHeight = 
          document.documentElement.scrollHeight - 
          document.documentElement.clientHeight;
        
        const progress = Math.min(scrollPosition / maxHeight, 1);
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [post]);

  // Preload images
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  };

  // Load post data and preload images
  useEffect(() => {
    const findPostAndPreload = async () => {
      try {
        setLoading(true);
        const foundPost = blog.posts.find(post => post.id === id);

        if (!foundPost) {
          throw new Error('Post not found');
        }

        setPost(foundPost);
        
        // Preload images
        if (foundPost.coverImage && foundPost.coverImage.url) {
          try {
            await preloadImage(foundPost.coverImage.url);
            if (siteInfo.owner && siteInfo.owner.avatar) {
              await preloadImage(siteInfo.owner.avatar);
            }
            setContentLoaded(true);
          } catch (imgErr) {
            console.warn('Failed to preload some images:', imgErr);
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

  // Loading state
  if (loading) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <nav className="blog-navbar">
              <ul className="navbar-list">
                <NavLinks />
              </ul>
            </nav>
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

  // Error state
  if (error) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <nav className="blog-navbar">
              <ul className="navbar-list">
                <NavLinks />
              </ul>
            </nav>
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

  // Post not found state
  if (!post) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <nav className="blog-navbar">
              <ul className="navbar-list">
                <NavLinks />
              </ul>
            </nav>
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
      <main className="blog-main" ref={containerRef}>
        <div className="main-content blog-full-width">
          {/* Reading progress bar */}
          <div 
            ref={progressRef}
            className="reading-progress-bar"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--matrix-green)',
              transformOrigin: '0%',
              zIndex: 1000,
              transform: 'scaleX(0)'
            }}
          />
          
          <nav className="blog-navbar">
            <ul className="navbar-list">
              <NavLinks />
            </ul>
          </nav>

          <div className={`blog-post-fade-container ${contentLoaded ? 'visible' : 'hidden'}`}>
            <article className="blog-post active">
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
                <div className="blog-content">
                  {post.content ? (
                    <div className="markdown-content">
                      <div dangerouslySetInnerHTML={{ 
                        __html: post.content
                          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                          .replace(/- (.*$)/gm, '<li>$1</li>')
                          .replace(/<li>.*<\/li>(\s*)<li>/g, '<li>$1</li><li>')
                          .replace(/(<li>.*<\/li>)(?!\s*<li>)/g, '<ul>$1</ul>')
                          .replace(/\n\n/g, '</p><p>')
                          .replace(/\n/g, '<br />')
                      }} />
                    </div>
                  ) : (
                    <div>Sem conteúdo disponível para este post.</div>
                  )}
                </div>

                <div className="blog-sidebar">
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
                </div>
              </div>
            </article>
          </div>
          
          {/* Background decoration */}
          <div
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
      <li className="navbar-item">
        <Link to="/" className="navbar-link">About</Link>
      </li>
      <li className="navbar-item">
        <Link to="/resume" className="navbar-link">Resume</Link>
      </li>
      <li className="navbar-item">
        <Link to="/portfolio" className="navbar-link">Portfolio</Link>
      </li>
      <li className="navbar-item">
        <Link to="/blog" className="navbar-link active">
          <span>Blog</span>
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/contact" className="navbar-link">Contact</Link>
      </li>
    </>
  );
}

export default SimpleBlogPost;