// Perform initial tasks once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Show today on screen
  const todayProgressColElem = document.querySelector('[data-is-today="true"]');
  if (todayProgressColElem)
    todayProgressColElem.scrollIntoView({ behavior: 'smooth', inline: 'center' });

  // Initialize Bootstrap tooltips for all Toggle progress buttons
  document.querySelectorAll('.progress-toggle-btn').forEach((toggleBtn) => {
    new bootstrap.Tooltip(toggleBtn);
  });
});

// Use event delegation to listen for clicks on document
document.addEventListener('click', (e) => {
  const target = e.target;

  // If the click element is progress toggle button, call respective function
  if (target.classList.contains('progress-toggle-btn')) return toggleProgress(target);
});

// Function to handle the toggle progress action
const toggleProgress = async (target) => {
  // Extract habitId and date from the target element's data attributes
  const habitId = target.getAttribute('data-habitId');
  const date = target.getAttribute('data-date');

  // Disable the button and show a loading spinner
  target.setAttribute('disabled', true);
  target.innerHTML = `
    <div class="spinner-border" id="spinner" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

  try {
    // Send a POST request to toggle the progress status
    const response = await fetch(`/progress/${habitId}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    });

    // Parse the JSON response
    const result = await response.json();

    // Clear the loading spinner and re-enable the button
    target.innerHTML = '';
    target.removeAttribute('disabled');

    // Handle the case where the request was not successful
    if (!result.success) {
      return showAlert(result.message, 'danger');
    }

    // Get the current and toggled status
    const currentStatus = target.getAttribute('data-status');
    const toggledStatus = result.toggledProgress.status;

    // Update the button's classes and data attributes to reflect the new status
    target.classList.remove(currentStatus);
    target.classList.add(toggledStatus);
    target.setAttribute('data-status', toggledStatus);
    target.setAttribute('data-bs-title', toggledStatus);

    // Update the tooltip content with the new status
    bootstrap.Tooltip.getInstance(target).setContent({
      '.tooltip-inner': toggledStatus,
    });
  } catch (error) {
    console.error('Error toggling progress:', error);
  }
};
