import { useState } from 'react';

function Portfolio({ isActive, openProjectModal }) {
  const [projects] = useState([
    {
      id: 1,
      title: 'Peloton Home Screen Redesign',
      category: 'Web Design',
      image: './images/portfolio/portfolio-01.jpeg',
      role: 'UX Designer & Researcher',
      description: 'Redesigned Peloton\'s home screen experience to enhance content discovery and user engagement. The project involved extensive user research, iterative design, and A/B testing that led to a 24% increase in workout completion rates.',
      technologies: 'React, Next.js, GraphQL, Node.js, AWS',
      methodologies: 'Double Diamond, User-Centered Design, Design Thinking',
      tools: 'Figma, Miro, Maze, UserTesting'
    },
    {
      id: 2,
      title: 'Minha Claro App',
      category: 'Mobile Apps',
      image: './images/portfolio/portfolio-02.jpeg',
      role: 'UX Lead',
      description: 'Led the complete redesign of Claro\'s customer service app, serving over 50 million users in Brazil. The app was recognized as the best telecom service app in Latin America, with a 4.5-star rating and a 35% reduction in customer service calls.',
      technologies: 'React Native, Redux, Native Modules',
      methodologies: 'Agile/Scrum, Jobs-to-be-Done, Atomic Design',
      tools: 'Sketch, InVision, Zeplin, Firebase Analytics',
      downloads: 'Android App | iOS App'
    },
    {
      id: 3,
      title: 'Livelo Design System',
      category: 'Design Systems',
      image: './images/portfolio/portfolio-03.jpeg',
      role: 'Design System Lead',
      description: 'Created and implemented Livelo\'s first comprehensive design system, unifying the customer experience across web and mobile platforms. The system reduced design inconsistencies by 90% and decreased development time for new features by 40%.',
      technologies: 'Storybook, TypeScript, Styled Components',
      methodologies: 'Atomic Design, Component-Driven Development',
      tools: 'Figma, GitHub, Chromatic, Notion'
    },
    {
      id: 4,
      title: 'Pão de Açúcar E-commerce',
      category: 'Web Design',
      image: './images/portfolio/portfolio-04.jpeg',
      role: 'Web Designer',
      description: 'Redesigned the checkout experience for one of Brazil\'s largest supermarket chains, resulting in a 18% increase in conversion rate and a 23% decrease in cart abandonment.',
      technologies: 'JavaScript, jQuery, SASS, PHP',
      methodologies: 'Lean UX, A/B Testing',
      tools: 'Photoshop, Illustrator, Balsamiq, Google Analytics'
    },
    {
      id: 5,
      title: 'Abril Digital Magazines',
      category: 'Mobile Apps',
      image: './images/portfolio/portfolio-05.jpeg',
      role: 'UX Designer',
      description: 'Designed a unified reading experience for Abril\'s portfolio of digital magazines on iOS and Android. The redesign improved user ratings by 30% and increased subscriber retention by 25%.',
      technologies: 'Swift, Kotlin, Core Animation',
      methodologies: 'Usability Testing, Contextual Inquiry',
      tools: 'Sketch, Principle, Adobe XD'
    },
    {
      id: 6,
      title: 'Ben Visa Vale Portal',
      category: 'Web Design',
      image: './images/portfolio/portfolio-06.jpeg',
      role: 'UX/UI Designer',
      description: 'Redesigned the corporate portal for Ben Visa Vale, a major Brazilian benefits card provider. The new design improved administrator efficiency by 40% and reduced support tickets by 30%.',
      technologies: 'Angular, Bootstrap, Node.js',
      methodologies: 'Heuristic Evaluation, Card Sorting',
      tools: 'Figma, Optimal Workshop, Hotjar'
    },
    {
      id: 7,
      title: 'Mundo Gamer App',
      category: 'Mobile Apps',
      image: './images/portfolio/portfolio-07.jpeg',
      role: 'Product Designer',
      description: 'Designed a gaming community app for enthusiasts to discover games, connect with other players, and track their gameplay statistics. The app acquired over 100,000 users in the first three months.',
      technologies: 'Flutter, Firebase, Google Cloud',
      methodologies: 'Rapid Prototyping, User Feedback Loops',
      tools: 'Adobe XD, Lottie, Mixpanel'
    },
    {
      id: 8,
      title: 'Avianca Design System',
      category: 'Design Systems',
      image: './images/portfolio/portfolio-08.jpeg',
      role: 'Design System Architect',
      description: 'Created a comprehensive design system for Avianca Airlines that unified the digital experience across web, mobile, and kiosk platforms. The system improved design consistency and reduced development time for new features by 50%.',
      technologies: 'React, Web Components, CSS Variables',
      methodologies: 'Design Tokens, Pattern Library',
      tools: 'Figma, Storybook, Abstract'
    }
  ]);

  const [filterCategory, setFilterCategory] = useState('All');
  const [selectOpen, setSelectOpen] = useState(false);

  // Open project modal when clicked
  const handleProjectClick = (project) => {
    openProjectModal(project);
  };

  // Filter project categories
  const handleFilterClick = (category) => {
    setFilterCategory(category);
  };

  // Toggle select dropdown
  const toggleSelect = () => {
    setSelectOpen(!selectOpen);
  };

  // Handle select item click
  const handleSelectItemClick = (category) => {
    setFilterCategory(category);
    setSelectOpen(false);
  };

  // Filter projects based on selected category
  const filteredProjects = filterCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === filterCategory);

  return (
    <article className={`portfolio ${isActive ? 'active' : ''}`} data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          <li className="filter-item">
            <button 
              className={filterCategory === 'All' ? 'active' : ''} 
              onClick={() => handleFilterClick('All')}
            >
              All
            </button>
          </li>
          <li className="filter-item">
            <button 
              className={filterCategory === 'Mobile Apps' ? 'active' : ''} 
              onClick={() => handleFilterClick('Mobile Apps')}
            >
              Mobile Apps
            </button>
          </li>
          <li className="filter-item">
            <button 
              className={filterCategory === 'Web Design' ? 'active' : ''} 
              onClick={() => handleFilterClick('Web Design')}
            >
              Web Design
            </button>
          </li>
          <li className="filter-item">
            <button 
              className={filterCategory === 'Design Systems' ? 'active' : ''} 
              onClick={() => handleFilterClick('Design Systems')}
            >
              Design Systems
            </button>
          </li>
        </ul>

        <div className="filter-select-box">
          <button 
            className="filter-select" 
            onClick={toggleSelect}
          >
            <div className="select-value">
              {filterCategory}
            </div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className={`select-list ${selectOpen ? 'active' : ''}`}>
            <li className="select-item">
              <button onClick={() => handleSelectItemClick('All')}>All</button>
            </li>
            <li className="select-item">
              <button onClick={() => handleSelectItemClick('Mobile Apps')}>Mobile Apps</button>
            </li>
            <li className="select-item">
              <button onClick={() => handleSelectItemClick('Web Design')}>Web Design</button>
            </li>
            <li className="select-item">
              <button onClick={() => handleSelectItemClick('Design Systems')}>Design Systems</button>
            </li>
          </ul>
        </div>

        <ul className="project-list">
          {filteredProjects.map(project => (
            <li 
              className="project-item active" 
              key={project.id} 
              data-filter-item 
              data-category={project.category.toLowerCase().replace(' ', '-')}
              data-project-item
            >
              <a href="#" onClick={(e) => {
                e.preventDefault();
                handleProjectClick(project);
              }}>
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title" data-project-title>{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default Portfolio;