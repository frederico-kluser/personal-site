import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import SimpleBlogPost from './components/SimpleBlogPost';
import Contact from './components/Contact';
import Modal from './components/Modal';
import ProjectModalContent from './components/ProjectModalContent';
import TestimonialModalContent from './components/TestimonialModalContent';
import MatrixRain from './components/MatrixRain';
import SimpleFade from './components/SimpleFade';
import { DataProvider } from './context/DataContext';
import './assets/css/style.css';
import './assets/css/sidebar-fixes.css';
import './assets/css/animated-components.css';
import './assets/css/page-transitions.css';
import './assets/css/transition-fixes.css';
import './assets/css/layout-fixes.css';
import './assets/css/simple-fade.css';
import './assets/css/simple-fade-fixes.css'; // Add this new file for scroll fixes
import './assets/css/mobile-sidebar-fixes.css'; // Add mobile sidebar fixes
import './assets/css/blog-mobile-fixes.css'; // Add blog mobile padding fixes
import './assets/css/portfolio-mobile-fixes.css'; // Fix portfolio mobile category selector
import './assets/css/mobile-dropdown.css'; // Simple mobile dropdown styles
import './assets/css/transition-overflow-fix.css'; // Temporarily hide overflow during transitions
import './assets/css/root-position-fix.css'; // Fix root element starting position
import './assets/css/blog-transition-fixes.css';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'project' or 'testimonial'
    data: null
  });
  const location = useLocation();

  // Update active page based on URL path - simplified for direct transition
  useEffect(() => {
    const path = location.pathname;
    let newPage;

    if (path === '/' || path === '/about') {
      newPage = 'about';
    } else if (path.startsWith('/blog/')) {
      newPage = 'blog';
    } else if (path.startsWith('/resume')) {
      newPage = 'resume';
    } else if (path.startsWith('/portfolio')) {
      newPage = 'portfolio';
    } else if (path.startsWith('/contact')) {
      newPage = 'contact';
    } else if (path.startsWith('/blog')) {
      newPage = 'blog';
    }

    if (newPage && newPage !== activePage) {
      // Set transition state to true briefly
      setIsTransitioning(true);

      // Change the page
      setActivePage(newPage);

      // After transition duration, set back to false
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your transition duration
    }
  }, [location, activePage]);

  const handlePageChange = (page) => {
    if (page !== activePage) {
      // Set transition state to true briefly
      setIsTransitioning(true);

      // Change the page
      setActivePage(page);

      // After transition duration, set back to false
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your transition duration
    }
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
          <Route path="/blog/:id" element={<SimpleBlogPost />} />
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

          {/* Container principal para páginas com largura fixa e altura dinâmica */}
          <div
            className={`pages-container ${isTransitioning ? 'transition-in-progress' : ''}`}
            style={{ overflow: isTransitioning ? 'hidden' : 'visible', height: 'auto', minHeight: '100vh' }}
          >
            {/* Remover AnimatePresence e key causadores de renderização dupla */}
            <Routes>
                <Route path="/" element={
                  <SimpleFade isVisible={activePage === 'about'}>
                    <About isActive={activePage === 'about'} openTestimonialModal={openTestimonialModal} />
                  </SimpleFade>
                } />
                <Route path="/about" element={
                  <SimpleFade isVisible={activePage === 'about'}>
                    <About isActive={activePage === 'about'} openTestimonialModal={openTestimonialModal} />
                  </SimpleFade>
                } />
                <Route path="/resume" element={
                  <SimpleFade isVisible={activePage === 'resume'}>
                    <Resume isActive={activePage === 'resume'} />
                  </SimpleFade>
                } />
                <Route path="/portfolio" element={
                  <SimpleFade isVisible={activePage === 'portfolio'}>
                    <Portfolio
                      isActive={activePage === 'portfolio'}
                      openProjectModal={openProjectModal}
                    />
                  </SimpleFade>
                } />
                <Route path="/blog" element={
                  <SimpleFade isVisible={activePage === 'blog'}>
                    <Blog isActive={activePage === 'blog'} />
                  </SimpleFade>
                } />
                <Route path="/contact" element={
                  <SimpleFade isVisible={activePage === 'contact'}>
                    <Contact isActive={activePage === 'contact'} />
                  </SimpleFade>
                } />
              </Routes>
          </div>
        </div>
      </main>

      <AnimatePresence mode="wait">
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