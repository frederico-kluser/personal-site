import { useState } from 'react';

function Portfolio({ isActive, openProjectModal }) {
  const [projects] = useState([
    {
      id: 1,
      title: 'Peloton',
      category: 'React, TypeScript, Jest',
      image: 'images/portfolio/portfolio-08.jpeg',
      role: 'Squad Leader for SEO, Senior Software Engineer',
      description: 'Led SEO efforts, developed code generating millions in user acquisition',
      technologies: 'React, TypeScript, JavaScript, Jest, Redux.js, HTML5, CSS',
      methodologies: 'Scrum, Kanban, Agile',
      tools: 'GitHub, Git'
    },
    {
      id: 2,
      title: 'Editora Abril',
      category: 'JavaScript, PHP, CSS',
      image: 'images/portfolio/portfolio-01.jpeg',
      role: 'UI Specialist, Senior Software Engineer',
      description: 'Created front-end architecture standards for major Brazilian magazines including Veja, Claudia, Superinteressante, Capricho, Elastica and Guia do Estudante',
      technologies: 'JavaScript, PHP, HTML5, CSS',
      methodologies: 'Scrum, Kanban, Agile',
      tools: 'GitHub, Git'
    },
    {
      id: 3,
      title: 'Minha Claro Móvel',
      category: 'React Native, TypeScript',
      image: 'images/portfolio/portfolio-04.jpeg',
      role: 'Senior Software Engineer, Tech Lead',
      description: 'Led the development of new mobile application with over 50 million downloads',
      technologies: 'React Native, TypeScript, JavaScript, Jest, Redux.js',
      methodologies: 'Scrum, Kanban, Agile',
      tools: 'GitHub, Git',
      downloads: '50+ million'
    },
    {
      id: 4,
      title: 'Pão de Açúcar',
      category: 'React, TypeScript, Redux',
      image: 'images/portfolio/portfolio-07.jpeg',
      role: 'Senior Software Engineer, Senior React Developer',
      description: 'Maintained e-commerce sites for largest Latin American retail group',
      technologies: 'React, TypeScript, JavaScript, Jest, Redux.js',
      methodologies: 'Scrum, Kanban, Agile',
      tools: 'GitHub, Git'
    },
    {
      id: 5,
      title: 'Ben Visa Vale',
      category: 'React, React Native',
      image: 'images/portfolio/portfolio-03.jpeg',
      role: 'Senior Software Engineer, Task Force Member',
      description: 'Worked to finalize Banco Santander application with over 500,000 downloads',
      technologies: 'React, React Native, TypeScript, JavaScript, Jest, Redux.js, HTML5',
      methodologies: 'Scrum, Kanban, Agile',
      tools: 'GitHub, Git',
      downloads: '500,000+'
    },
    {
      id: 6,
      title: 'Livelo',
      category: 'React Native',
      image: 'images/portfolio/portfolio-05.jpeg',
      role: 'Technical Leader',
      description: 'Converted app from native technology to React Native and streamlined development processes. Over 5 million downloads',
      technologies: 'React Native, JavaScript',
      methodologies: 'Scrum',
      tools: 'GitHub',
      downloads: '5+ million'
    },
    {
      id: 7,
      title: 'Avianca Airlines',
      category: 'Ionic, JavaScript, AngularJS',
      image: 'images/portfolio/portfolio-02.jpeg',
      role: 'Maintenance and Development',
      description: 'Maintained production app and created new version with over 1 million downloads',
      technologies: 'Ionic Framework, JavaScript, AngularJS',
      methodologies: 'Agile, Scrum',
      tools: 'GitHub',
      downloads: '1+ million'
    },
    {
      id: 8,
      title: 'Mundo Gamer',
      category: 'JavaScript, PHP, Bootstrap',
      image: 'images/portfolio/portfolio-06.jpeg',
      role: 'Creator',
      description: 'Created a reverse engineering tool to capture and catalog databases',
      technologies: 'JavaScript, PHP, Bootstrap',
      tools: 'Git'
    }
  ]);

  // Open project modal when clicked
  const handleProjectClick = (project) => {
    openProjectModal(project);
  };

  return (
    <article className={`portfolio ${isActive ? 'active' : ''}`} data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        <ul className="project-list">
          {projects.map(project => (
            <li className="project-item active" key={project.id} data-project-item>
              <a href="#" className="project-link" onClick={(e) => {
                e.preventDefault();
                handleProjectClick(project);
              }}>
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>

                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>

                <h3 className="project-title">{project.title}</h3>
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