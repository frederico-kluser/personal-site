import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

// Mock ion-icon for tests
jest.mock('ionicons', () => ({
  defineCustomElements: jest.fn(),
}));

global.customElements = {
  define: jest.fn(),
};

describe('Modal Component', () => {
  test('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} className="test-modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    const modalContent = screen.queryByTestId('modal-content');
    expect(modalContent).not.toBeInTheDocument();
  });

  test('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="test-modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();
  });

  test('should call onClose when overlay is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} className="test-modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    const overlay = document.querySelector('.project-modal-overlay');
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should call onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} className="test-modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    const closeButton = document.querySelector('.project-modal-close-btn');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should apply additional className when provided', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="test-modal">
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    const modalElement = document.querySelector('.project-modal');
    expect(modalElement).toHaveClass('test-modal');
  });
});