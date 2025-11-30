export function renderUsers(users, container) {
    container.innerHTML = '';
    users.forEach((user) => {
        const userCard = `
      <div class="col-md-4 mb-4 animate-on-scroll">
        <div class="card h-100 text-center">
          <div class="card-body">
            <div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px; font-size: 2rem;">
              ${user.name.charAt(0)}
            </div>
            <h5 class="card-title mt-3">${user.name}</h5>
            <p class="card-text">
              <strong>Email:</strong> ${user.email}<br>
              <strong>Phone:</strong> ${user.phone}<br>
              <strong>Website:</strong> ${user.website}
            </p>
            ${user.company ? `<p class="text-muted">Works at ${user.company.name}</p>` : ''}
          </div>
        </div>
      </div>
    `;
        container.innerHTML += userCard;
    });
}
