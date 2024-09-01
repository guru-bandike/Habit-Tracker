const spinner = document.getElementById('spinner');

document.addEventListener('DOMContentLoaded', function () {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

const showSpinner = () => {
  spinner.classList.remove('d-none');
};

const hideSpinner = () => {
  spinner.classList.add('d-none');
};

// Helper function to show alert
const showAlert = (message, type) => {
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
};
