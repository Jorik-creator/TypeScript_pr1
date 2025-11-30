export function renderPosts(posts, container) {
    container.innerHTML = '';
    posts.forEach((post) => {
        const postCard = `
      <div class="col-md-4 mb-4 animate-on-scroll">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body.substring(0, 100)}...</p>
            <button class="btn btn-primary btn-sm" onclick="alert('Post ID: ${post.id}')">
              Read More
            </button>
          </div>
        </div>
      </div>
    `;
        container.innerHTML += postCard;
    });
}
