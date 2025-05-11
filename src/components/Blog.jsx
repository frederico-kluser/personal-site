import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog({ isActive }) {
  const [blogPosts, setBlogPosts] = useState([]);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For this example, we'll use data similar to the HTML structure
    const posts = [
      {
        id: "ux-design-trends-2024",
        title: "UX Design Trends to Watch in 2024",
        category: "Design",
        date: "March 15, 2024",
        dateTime: "2024-03-15",
        image: "https://i.postimg.cc/s2mKLQJQ/blog-1.jpg",
        summary: "Explore the emerging UX design trends that will shape digital experiences in 2024, from AI-assisted design to immersive interfaces and ethical considerations."
      },
      {
        id: "design-conferences-2024",
        title: "Must-Attend Design Conferences in 2024",
        category: "Events",
        date: "February 20, 2024",
        dateTime: "2024-02-20",
        image: "https://i.postimg.cc/zvj7DXjC/blog-2.jpg",
        summary: "A curated list of the most valuable design conferences happening globally in 2024, featuring insights on speakers, topics, and networking opportunities."
      }
    ];
    
    setBlogPosts(posts);
  }, []);

  return (
    <article className={`blog ${isActive ? 'active' : ''}`} data-page="blog">
      <header>
        <h2 className="h2 article-title">Blog</h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {blogPosts.map(post => (
            <li className="blog-posts-item" key={post.id}>
              <Link to={`/blog/${post.id}`}>
                <figure className="blog-banner-box">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy" 
                  />
                </figure>

                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.dateTime}>{post.date}</time>
                  </div>

                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default Blog;