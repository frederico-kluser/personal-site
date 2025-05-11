import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

function Blog({ isActive }) {
  const { blog } = useContext(DataContext);

  return (
    <article className={`blog ${isActive ? 'active' : ''}`} data-page="blog">
      <header>
        <h2 className="h2 article-title">{blog.title}</h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {blog.posts.map(post => (
            <li className="blog-posts-item" key={post.id}>
              <Link to={`/blog/${post.id}`} className="content-card blog-card">
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

                  <div className="blog-read-more">
                    <span>Read More</span>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
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