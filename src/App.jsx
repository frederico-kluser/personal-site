import { useState, useEffect, Suspense, lazy } from 'react';
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
import FadeTransition from './components/FadeTransition';
import { DataProvider } from './context/DataContext';
import './assets/css/style.css';
import './assets/css/sidebar-fixes.css';
import './assets/css/animated-components.css';
import './assets/css/page-transitions.css';
import './assets/css/transition-fixes.css';
import './assets/css/layout-fixes.css';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [nextPage, setNextPage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'project' or 'testimonial'
    data: null
  });
  const location = useLocation();

  // Update active page based on URL path
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

    // Set next page first, then trigger transition
    if (newPage !== activePage) {
      setNextPage(newPage);
      setIsTransitioning(true);

      // Small delay before changing the active page to ensure smooth transition
      const timer = setTimeout(() => {
        setActivePage(newPage);
        setIsTransitioning(false);
      }, 300); // Match this with your CSS transition time

      return () => clearTimeout(timer);
    }
  }, [location, activePage]);

  const handlePageChange = (page) => {
    if (page !== activePage) {
      setNextPage(page);
      setIsTransitioning(true);

      // Small delay to ensure smooth transition
      setTimeout(() => {
        setActivePage(page);
        setIsTransitioning(false);
      }, 300);
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

          {/* Container principal para páginas com largura fixa e altura dinâmica */}
          <motion.div
            className="pages-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
            layoutId="main-container"
          >
            <AnimatePresence mode="sync" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <FadeTransition isVisible={!isTransitioning || activePage === 'about'}>
                    <About isActive={activePage === 'about'} openTestimonialModal={openTestimonialModal} />
                  </FadeTransition>
                } />
                <Route path="/about" element={
                  <FadeTransition isVisible={!isTransitioning || activePage === 'about'}>
                    <About isActive={activePage === 'about'} openTestimonialModal={openTestimonialModal} />
                  </FadeTransition>
                } />
                <Route path="/resume" element={
                  <FadeTransition isVisible={!isTransitioning || activePage === 'resume'}>
                    <Resume isActive={activePage === 'resume'} />
                  </FadeTransition>
                } />
                <Route path="/portfolio" element={
                  <FadeTransition isVisible={!isTransitioning || activePage === 'portfolio'}>
                    <Portfolio
                      isActive={activePage === 'portfolio'}
                      openProjectModal={openProjectModal}
                    />
                  </FadeTransition>
                } />
                <Route path="/blog" element={
                  <FadeTransition isVisible={!isTransitioning || activePage === 'blog'}>
                    <Blog isActive={activePage === 'blog'} />
                  </FadeTransition>
                } />
                <Route path="/contact" element={
                  <FadeTransition isVisible={!isTransitioning || activePage === 'contact'}>
                    <Contact isActive={activePage === 'contact'} />
                  </FadeTransition>
                } />
              </Routes>
            </AnimatePresence>
          </motion.div>
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