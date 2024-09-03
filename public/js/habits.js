// Get references to DOM elements
const habitList = document.getElementById('habitList');
const habitErrors = document.getElementById('habitErrors');
const addHabitForm = document.getElementById('addHabitForm');
const alertContainer = document.getElementById('alertContainer');
const habitNameInput = document.getElementById('habitNameInput');
const addHabitModal = document.getElementById('addHabitModal');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitModalCloseBtn = document.getElementById('habitModalCloseBtn');

let addHabitController;

// Display existing habits on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Show spinner
    showSpinner();

    // Fetch habits with today progress
    const result = await (await fetch('/habits/all-with-today-progress')).json();

    // Hide spinner
    hideSpinner();

    // If fetching habits was Not successful, Log failure message
    if (!result.success) return console.log(result.message);

    // If fetching habits was Successful, Display habits
    const habitsWithTodayProgress = result.habitsWithTodayProgress;

    if (habitsWithTodayProgress.length === 0) return;

    habitsWithTodayProgress.forEach((h) => {
      displayHabit(h);
    });
  } catch (error) {
    console.log(error);
  }
});

// Function to add new Habit
const addHabit = async () => {
  const habitName = habitNameInput.value.trim();

  // Return early if habit name is empty
  if (habitName.length === 0) return;

  addHabitBtn.setAttribute('disabled', true);

  addHabitBtn.innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;

  addHabitController = new AbortController();
  const { signal } = addHabitController;

  try {
    // Fetch existing habits
    const result = await (
      await fetch('/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: habitName }),
        signal,
      })
    ).json();

    // If response was not successful, handle validation errors
    if (!result.success) {
      habitErrors.innerHTML = '';

      // Check if response contains validation errors
      const validationErrors = result.validationErrors || ['An unknown error occurred'];

      // Create and append error messages to the error container
      validationErrors.forEach((errorMessage) => {
        const errorMessageElem = document.createElement('li');
        errorMessageElem.innerText = errorMessage;
        habitErrors.appendChild(errorMessageElem);
      });

      // Show the error container
      habitErrors.classList.remove('d-none');
    } else {
      // Close habit modal
      habitModalCloseBtn.click();

      // Handle the successful habit addition, e.g., update the UI
      const addedHabit = result.addedHabit;
      displayHabit(addedHabit);
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.log(error);
    }
  }
};

// Function to delete a scpecific habit
const deleteHabit = async (habitId) => {
  try {
    const deleteHabitBtn = document.querySelector(`.delete-habit-btn[data-habit-id="${habitId}"]`);
    const deleteHabitBtnSpinner = document.querySelector(
      `.delete-habit-btn[data-habit-id="${habitId}"] .spinner-border`
    );
    const deleteHabitBtnImg = document.querySelector(
      `.delete-habit-btn[data-habit-id="${habitId}"] img`
    );

    deleteHabitBtn.setAttribute('disabled', true);
    deleteHabitBtnImg.classList.add('d-none');
    deleteHabitBtnSpinner.classList.remove('d-none');

    const result = await (await fetch(`/habits/${habitId}`, { method: 'DELETE' })).json();

    deleteHabitBtnSpinner.classList.add('d-none');
    deleteHabitBtnImg.classList.remove('d-none');
    deleteHabitBtn.removeAttribute('disabled');

    if (!result.success) return showAlert(`Failed to delete habit: ${result.message}`, 'danger');

    const targetHabitElem = document.querySelector(`.habit-wrapper[data-habit-id="${habitId}"]`);
    if (targetHabitElem) targetHabitElem.remove();
  } catch (error) {
    console.log(error);
  }
};

// Function to toggle habit progress

const toggleProgress = async (habitId) => {
  const todayDate = new Date();
  const toggleProgressElem = document.querySelector(
    `.progress-toggle-btn[data-habit-id="${habitId}"]`
  );
  const toggleProgressSpinner = document.querySelector(
    `.progress-toggle-btn[data-habit-id="${habitId}"] .spinner-border`
  );

  toggleProgressElem.setAttribute('disabled', true);
  toggleProgressSpinner.classList.remove('d-none');

  try {
    // Request
    const result = await (
      await fetch(`/progress/${habitId}/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: todayDate }),
      })
    ).json();

    toggleProgressSpinner.classList.add('d-none');
    toggleProgressElem.removeAttribute('disabled');

    // If request fails, show error
    if (!result.success) return showAlert(`Failed to toggle progress: ${result.message}`, 'danger');

    // Else, Update UI

    toggleProgressElem.className = `progress-toggle-btn ${result.toggledProgress.status}`;
    toggleProgressElem.setAttribute('data-bs-title', `${result.toggledProgress.status}`);

    // Update Tooltip
    bootstrap.Tooltip.getInstance(toggleProgressElem).setContent({
      '.tooltip-inner': result.toggledProgress.status,
    });
  } catch (error) {
    console.log(error);
  }
};

// Handle add habit cancel or close event
addHabitModal.addEventListener('hide.bs.modal', () => {
  if (addHabitController) addHabitController.abort();

  addHabitBtn.innerText = 'Add';
  addHabitBtn.removeAttribute('disabled');

  // Clear the input field and errors on successful submission
  habitNameInput.value = '';
  habitErrors.innerHTML = '';
  habitErrors.classList.add('d-none');
});

// Handle add habit form submition
addHabitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (addHabitBtn.hasAttribute('disabled')) return;

  addHabit();
});

// - - - - - - - - - - - - - - - - Helper Function Section: Start - - - - - - - - - - - - - - - - //

// Helper Function to display habit
const displayHabit = (habit) => {
  const progressStatus = habit.progress?.[0]?.status || 'none';
  habitList.insertAdjacentHTML(
    'afterbegin',
    `
    <li class="habit-wrapper" data-habit-id="${habit._id}">
      <span class="habit-name">${habit.emoji} ${habit.name}</span> 
      <span class="habit-btns-wrapper"> 
        <button class="delete-habit-btn" data-habit-id="${habit._id}" onclick="deleteHabit('${habit._id}')">
          <img src="/images/delete.svg">
          <div class="spinner-border d-none text-primary spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button> 
        <button class="progress-toggle-btn ${progressStatus}" data-habit-id="${habit._id}" data-bs-toggle="tooltip"  data-bs-title="${progressStatus}" onclick="toggleProgress('${habit._id}')">  
          <div class="spinner-border d-none text-primary spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </span>
    </li>
    `
  );

  // Update tooltip
  new bootstrap.Tooltip(
    document.querySelector(`.habit-wrapper .progress-toggle-btn[data-habit-id="${habit._id}"]`)
  );
};

// - - - - - - - - - - - - - - - - Helper Function Section: End - - - - - - - - - - - - - - - - //
