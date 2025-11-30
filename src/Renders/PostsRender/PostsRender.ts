import { Post } from '../../Types/api.js';

export function renderPosts(posts: Post[], container: HTMLElement): void {
  container.innerHTML = '';

  posts.forEach((post: Post) => {
    const postCard: string = `
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
