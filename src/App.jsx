import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Modal from './components/Modal';
import ProjectModalContent from './components/ProjectModalContent';
import TestimonialModalContent from './components/TestimonialModalContent';
import MatrixRain from './components/MatrixRain';
import { DataProvider } from './context/DataContext';
import './assets/css/style.css';
import './assets/css/sidebar-fixes.css';
import './assets/css/animated-components.css';
import './assets/css/page-transitions.css';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'project' or 'testimonial'
    data: null
  });
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

  const openModal = (type, data) => {
    setModalState({
      isOpen: true,
      type,
      data
    });
  };

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false
    });
  };

  // Helper functions to simplify component props
  const openProjectModal = (projectData) => {
    openModal('project', projectData);
  };

  const openTestimonialModal = (testimonialData) => {
    openModal('testimonial', testimonialData);
  };

  // Check if we're on the blog post page
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/';

  if (isBlogPost) {
    return (
      <DataProvider>
        <MatrixRain />
        <Routes>
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </DataProvider>
    );
  }

  return (
    <DataProvider>
      <MatrixRain />
      <main>
        <Sidebar />
        <div className="main-content">
          <Navbar activePage={activePage} onPageChange={handlePageChange} />

          {/* Componente main para conter todas as páginas e evitar que o container desapareça */}
          <motion.div
            className="pages-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layoutId="main-container"
          >
            <AnimatePresence mode="sync" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<About isActive={activePage === 'about'} openTestimonialModal={openTestimonialModal} />} />
                <Route path="/about" element={<About isActive={activePage === 'about'} openTestimonialModal={openTestimonialModal} />} />
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
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {modalState.isOpen && (
          <Modal
            isOpen={modalState.isOpen}
            onClose={closeModal}
            className={modalState.type === 'testimonial' ? 'testimonial-modal' : ''}
          >
            {modalState.type === 'project' && <ProjectModalContent project={modalState.data} />}
            {modalState.type === 'testimonial' && <TestimonialModalContent testimonial={modalState.data} />}
          </Modal>
        )}
      </AnimatePresence>
    </DataProvider>
  );
}

export default App;