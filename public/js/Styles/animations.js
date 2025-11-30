export function injectAnimationStyles() {
    // Додати CSS для анімацій
    const style = document.createElement('style');
    style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.fade-in {
      opacity: 1;
      transform: translateY(0);
    }

    .sticky-nav {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .modal {
      display: none;
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      overflow: auto;
    }

    .modal.show {
      display: block;
    }

    .modal-dialog {
      margin: 5% auto;
      max-width: 600px;
    }

    .modal-content {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
    }

    .btn-close:before {
      content: '×';
    }

    .gallery-item:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
  `;
    document.head.appendChild(style);
}
