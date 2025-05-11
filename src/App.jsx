import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import MatrixRain from './components/MatrixRain';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalData, setProjectModalData] = useState(null);
  const location = useLocation();

  // Update active page based on URL path
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/' || path === '/about') {
      setActivePage('about');
    } else if (path.startsWith('/blog/')) {
      setActivePage('blog');
    } else if (path.startsWith('/resume')) {
      setActivePage('resume');
    } else if (path.startsWith('/portfolio')) {
      setActivePage('portfolio');
    } else if (path.startsWith('/contact')) {
      setActivePage('contact');
    } else if (path.startsWith('/blog')) {
      setActivePage('blog');
    }
  }, [location]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const openProjectModal = (projectData) => {
    setProjectModalData(projectData);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  // Check if we're on the blog post page
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/';

  if (isBlogPost) {
    return (
      <>
        <MatrixRain />
        <Routes>
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <MatrixRain />
      <main>
        <Sidebar />
        <div className="main-content">
          <Navbar activePage={activePage} onPageChange={handlePageChange} />
          
          <Routes>
            <Route path="/" element={<About isActive={activePage === 'about'} />} />
            <Route path="/about" element={<About isActive={activePage === 'about'} />} />
            <Route path="/resume" element={<Resume isActive={activePage === 'resume'} />} />
            <Route path="/portfolio" element={
              <Portfolio 
                isActive={activePage === 'portfolio'} 
                openProjectModal={openProjectModal} 
              />
            } />
            <Route path="/blog" element={<Blog isActive={activePage === 'blog'} />} />
            <Route path="/contact" element={<Contact isActive={activePage === 'contact'} />} />
          </Routes>
        </div>
      </main>

      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={closeProjectModal}
        project={projectModalData}
      />
    </>
  );
}

export default App;