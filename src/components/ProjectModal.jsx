function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <div id="project-modal-root" className={isOpen ? 'active' : ''}>
      <div className="project-modal-overlay" onClick={onClose}></div>
      <div className="project-modal-wrapper">
        <div className="project-modal">
          <button id="project-modal-close-btn" className="project-modal-close-btn" onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          
          <div className="project-modal-img-wrapper">
            <div className="project-modal-img">
              <img id="project-modal-img" src={project.image} alt={project.title} />
            </div>
          </div>
          
          <h3 className="h3 project-modal-title" id="project-modal-title">{project.title}</h3>
          
          <div className="project-modal-role" id="project-modal-role">{project.role}</div>
          
          <div className="project-modal-text" id="project-modal-text">{project.description}</div>
          
          {project.technologies && (
            <div className="project-modal-techs" id="project-modal-techs">
              <h5 className="h5">Technologies:</h5>
              <p>{project.technologies}</p>
            </div>
          )}
          
          {project.methodologies && (
            <div className="project-modal-methodologies" id="project-modal-methodologies">
              <h5 className="h5">Methodologies:</h5>
              <p>{project.methodologies}</p>
            </div>
          )}
          
          {project.tools && (
            <div className="project-modal-tools" id="project-modal-tools">
              <h5 className="h5">Tools:</h5>
              <p>{project.tools}</p>
            </div>
          )}
          
          {project.downloads && (
            <div className="project-modal-downloads" id="project-modal-downloads">
              <h5 className="h5">Downloads:</h5>
              <p>{project.downloads}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;