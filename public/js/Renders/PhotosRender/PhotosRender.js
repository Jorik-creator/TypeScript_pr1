export function renderPhotos(photos, container, modalManager) {
    container.innerHTML = '';
    photos.forEach((photo) => {
        const photoCard = `
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
    const galleryItems = container.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                const fullUrl = img.getAttribute('data-full');
                if (fullUrl) {
                    modalManager.showImageModal(fullUrl, img.alt);
                }
            }
        });
    });
}
