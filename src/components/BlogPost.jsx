import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../assets/css/blog-post.css';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // In a real application, we would fetch this from an API
    // For this demo, we'll fetch directly from our JSON files
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/posts/${id}.json`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const data = await response.json();
        setPost(data);
        
        // Load recent posts (in a real app, this would be a separate API call)
        // For this demo, we'll just hardcode a few posts
        setRecentPosts([
          {
            id: 'design-conferences-2024',
            title: 'Design conferences in 2024'
          },
          {
            id: 'ux-design-trends-2024',
            title: 'UX Design Trends to Watch in 2024'
          },
          {
            id: 'design-digest-80',
            title: 'Design digest #80'
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadBlogPost();
  }, [id]);

  if (loading) {
    return <div className="blog-post-loading">Loading blog post...</div>;
  }

  if (error) {
    return <div className="blog-post-error">Error: {error}</div>;
  }

  if (!post) {
    return <div className="blog-post-not-found">Blog post not found</div>;
  }

  return (
    <main className="blog-main">
      <article className="blog-post">
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

        <div className="blog-banner">
          <img src={post.coverImage.url} alt={post.coverImage.alt} />
        </div>

        <div className="blog-content-wrapper">
          <div className="blog-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="blog-sidebar">
            <div className="author-box">
              <figure className="author-avatar">
                <img src="https://i.postimg.cc/JzBWVhW4/my-avatar.png" alt="Fred K." width="80" />
              </figure>
              <h4 className="h4 author-name">Fred K.</h4>
              <p className="author-title">UX Designer & Developer</p>
            </div>

            <div className="recent-posts">
              <h3 className="h3">Recent Posts</h3>
              <ul className="recent-posts-list">
                {recentPosts.map(recentPost => (
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
    </main>
  );
}

export default BlogPost;