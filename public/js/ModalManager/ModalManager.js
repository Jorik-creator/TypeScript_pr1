// Клас для управління модальними вікнами
export default class ModalManager {
    constructor() {
        this.modalContainer = null;
        this.createModalContainer();
    }
    createModalContainer() {
        this.modalContainer = document.createElement('div');
        this.modalContainer.id = 'custom-modal';
        this.modalContainer.className = 'modal fade';
        this.modalContainer.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-title">Modal Title</h5>
            <button type="button" class="btn-close" data-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="modal-body">
            <p>Modal content goes here</p>
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(this.modalContainer);
        this.addModalListeners();
    }
    addModalListeners() {
        var _a, _b;
        const closeBtn = ((_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.querySelector('.btn-close')) || null;
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }
        (_b = this.modalContainer) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.hideModal();
            }
        });
    }
    showModal(title, content) {
        var _a;
        const titleEl = document.getElementById('modal-title');
        const bodyEl = document.getElementById('modal-body');
        if (titleEl && bodyEl) {
            titleEl.textContent = title;
            bodyEl.innerHTML = content;
        }
        (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.classList.add('show');
        if (this.modalContainer) {
            this.modalContainer.style.display = 'block';
        }
    }
    hideModal() {
        var _a;
        (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
        if (this.modalContainer) {
            this.modalContainer.style.display = 'none';
        }
    }
    showImageModal(imageUrl, title) {
        const content = `<img src="${imageUrl}" alt="${title}" class="img-fluid">`;
        this.showModal(title, content);
    }
}
