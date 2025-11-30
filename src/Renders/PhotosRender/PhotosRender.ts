import { Photo } from '../../Types/api.js';
import ModalManager from '../../ModalManager/ModalManager.js';

export function renderPhotos(photos: Photo[], container: HTMLElement, modalManager: ModalManager): void {
  container.innerHTML = '';

  photos.forEach((photo: Photo) => {
    const photoCard: string = `
      <div class="col-md-3 col-sm-6 mb-4 animate-on-scroll">
        <div class="card gallery-item" style="cursor: pointer;">
          <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}" data-full="${photo.url}">
          <div class="card-body">
            <p class="card-text small">${photo.title.substring(0, 30)}...</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += photoCard;
  });

  // Додати слухачі після рендерингу
  const galleryItems: NodeListOf<HTMLElement> = container.querySelectorAll('.gallery-item');
  galleryItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', () => {
      const img: HTMLImageElement | null = item.querySelector('img');
      if (img) {
        const fullUrl: string | null = img.getAttribute('data-full');
        if (fullUrl) {
          modalManager.showImageModal(fullUrl, img.alt);
        }
      }
    });
  });
}
