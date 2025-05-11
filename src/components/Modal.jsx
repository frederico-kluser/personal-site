function Modal({ isOpen, onClose, className, children }) {
  if (!isOpen) return null;

  return (
    <div id="modal-root" className={isOpen ? 'active' : ''}>
      <div className="project-modal-overlay" onClick={onClose}></div>
      <div className="project-modal-wrapper">
        <div className={`project-modal ${className || ''}`}>
          <button className="project-modal-close-btn" onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;