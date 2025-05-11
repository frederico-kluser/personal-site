import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import MatrixRain from './MatrixRain';
import { DataContext } from '../context/DataContext';
import '../assets/css/blog-post.css';

function BlogPost() {
  const { id } = useParams();
  const { blog, siteInfo } = useContext(DataContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <nav className="navbar">
              <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">About</Link></li>
                <li className="navbar-item"><Link to="/resume" className="navbar-link">Resume</Link></li>
                <li className="navbar-item"><Link to="/portfolio" className="navbar-link">Portfolio</Link></li>
                <li className="navbar-item"><Link to="/blog" className="navbar-link active">Blog</Link></li>
                <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
              </ul>
            </nav>
            <div className="blog-post-loading">Loading blog post...</div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <nav className="navbar">
              <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">About</Link></li>
                <li className="navbar-item"><Link to="/resume" className="navbar-link">Resume</Link></li>
                <li className="navbar-item"><Link to="/portfolio" className="navbar-link">Portfolio</Link></li>
                <li className="navbar-item"><Link to="/blog" className="navbar-link active">Blog</Link></li>
                <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
              </ul>
            </nav>
            <div className="blog-post-error">Error: {error}</div>
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <MatrixRain />
        <main className="blog-main">
          <div className="main-content blog-full-width">
            <nav className="navbar">
              <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">About</Link></li>
                <li className="navbar-item"><Link to="/resume" className="navbar-link">Resume</Link></li>
                <li className="navbar-item"><Link to="/portfolio" className="navbar-link">Portfolio</Link></li>
                <li className="navbar-item"><Link to="/blog" className="navbar-link active">Blog</Link></li>
                <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
              </ul>
            </nav>
            <div className="blog-post-not-found">Blog post not found</div>
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
          <nav className="blog-navbar">
            <ul className="navbar-list">
              <li className="navbar-item"><Link to="/" className="navbar-link">About</Link></li>
              <li className="navbar-item"><Link to="/resume" className="navbar-link">Resume</Link></li>
              <li className="navbar-item"><Link to="/portfolio" className="navbar-link">Portfolio</Link></li>
              <li className="navbar-item"><Link to="/blog" className="navbar-link active">Blog</Link></li>
              <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
            </ul>
          </nav>

          <article className="blog-post active">
            <header>
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
              <img src={post.coverImage.url} alt={post.coverImage.alt} loading="lazy" />
            </figure>

            <div className="blog-content-wrapper">
              <div className="blog-content">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              <div className="blog-sidebar">
                <div className="author-box">
                  <figure className="author-avatar">
                    <img src={siteInfo.owner.avatar} alt={siteInfo.owner.name} width="80" />
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
      </main>
    </>
  );
}

export default BlogPost;