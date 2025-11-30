// Клас для управління модальними вікнами
export default class ModalManager {
  private modalContainer: HTMLElement | null = null;

  constructor() {
    this.createModalContainer();
  }

  private createModalContainer(): void {
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

  private addModalListeners(): void {
    const closeBtn: HTMLElement | null = this.modalContainer?.querySelector('.btn-close') || null;
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideModal());
    }

    this.modalContainer?.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.modalContainer) {
        this.hideModal();
      }
    });
  }

  public showModal(title: string, content: string): void {
    const titleEl: HTMLElement | null = document.getElementById('modal-title');
    const bodyEl: HTMLElement | null = document.getElementById('modal-body');

    if (titleEl && bodyEl) {
      titleEl.textContent = title;
      bodyEl.innerHTML = content;
    }

    this.modalContainer?.classList.add('show');
    if (this.modalContainer) {
      this.modalContainer.style.display = 'block';
    }
  }

  public hideModal(): void {
    this.modalContainer?.classList.remove('show');
    if (this.modalContainer) {
      this.modalContainer.style.display = 'none';
    }
  }

  public showImageModal(imageUrl: string, title: string): void {
    const content: string = `<img src="${imageUrl}" alt="${title}" class="img-fluid">`;
    this.showModal(title, content);
  }
}
