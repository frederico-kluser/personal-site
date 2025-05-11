import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Blog({ isActive }) {
  const [blogPosts, setBlogPosts] = useState([]);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For this example, we'll simulate loading from our JSON files
    const posts = [
      {
        id: "design-conferences-2024",
        title: "Design conferences in 2024",
        category: "Design",
        date: "Feb 23, 2024",
        dateTime: "2024-02-23",
        image: "https://i.postimg.cc/DysCZrWs/blog-1.jpg",
        summary: "In 2024, several exciting design conferences are set to take place, offering opportunities for professionals and enthusiasts to connect, learn, and share innovative ideas."
      },
      {
        id: "ux-design-trends-2024",
        title: "UX Design Trends to Watch in 2024",
        category: "UX Design",
        date: "Mar 15, 2024",
        dateTime: "2024-03-15",
        image: "https://i.postimg.cc/13FpF7HL/blog-2.jpg",
        summary: "As technology continues to evolve, so do the principles and practices of UX design. Here are the key trends shaping the industry in 2024."
      },
      {
        id: "design-digest-80",
        title: "Design digest #80",
        category: "Design",
        date: "Dec 20, 2023",
        dateTime: "2023-12-20",
        image: "https://i.postimg.cc/W1T71QcL/blog-3.jpg",
        summary: "Hello, my friends. In this Design Digest, I'll show you a curated collection of the latest trends, insights, and innovations in the design world. This edition highlights key themes and discussions that are shaping the future of design."
      },
      {
        id: "ui-interactions-2023",
        title: "2023 UI interactions",
        category: "Design",
        date: "Nov 29, 2023",
        dateTime: "2023-11-29",
        image: "https://i.postimg.cc/2S0n8yxh/blog-4.jpg",
        summary: "As we move into 2024, 2023 was marked by the rapidly evolution of the landscape of UI interactions, driven by advancements in technology and user expectations. Dive with me in this text to see the main areas changed in this year."
      },
      {
        id: "forgotten-art-of-spacing",
        title: "The forgotten art of spacing",
        category: "Design",
        date: "Nov 12, 2023",
        dateTime: "2023-11-12",
        image: "https://i.postimg.cc/YCCmVkw9/blog-5.jpg",
        summary: "In the realm of design, spacing is often an overlooked yet crucial element that can significantly impact the overall aesthetic and functionality of a composition. This post will emphasize the importance of white space, margins, and padding in creating visually appealing and effective designs."
      },
      {
        id: "design-digest-79",
        title: "Design digest #79",
        category: "Design",
        date: "Oct 20, 2023",
        dateTime: "2023-10-20",
        image: "https://i.postimg.cc/zBCBvP16/blog-6.jpg",
        summary: "Hi, my friends. In this Design Digest I'll focus in the tools and resources that we use daily in our projects. Also, I'll include examples of software recommendations, online courses, and design communities that foster collaboration and learning."
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
            <li className="blog-post-item" key={post.id}>
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