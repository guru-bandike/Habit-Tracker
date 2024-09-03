<h1 align="center" style="font-weight: bolder; color: #059d06">Habit Tracker</h1>

<p align="center">
  <a href="https://habit-tracker-8cju.onrender.com/" target="_blank">View Live App</a>
</p>

## Project Description

**Habit Tracker** Application designed to help users build and maintain healthy habits. Users can add, monitor, and track their daily habits, with the application providing a clear visual representation of their progress.

## Key Features

- **Habit Management:** Users can add, view, and track their habits, with visual indicators for completed tasks.
- **Dynamic Emoji Association:** Automatically assigns an appropriate emoji to each habit based on habit name.
- **Monthly Progress View:** Provides users with a detailed overview of their habit progress on a month-by-month basis.
- **Responsive UI:** Ensures an optimal experience across different devices.

## Tech Used

The **Habit Tracker** application utilizes the following technologies and tools:

### Frontend

- **HTML5**: For the structure of the web pages.
- **CSS3**: For styling and layout of the application.
- **JavaScript**: For client-side scripting and interactivity.
- **EJS**: For templating and dynamic content rendering.

### Backend

- **Node.js**: JavaScript runtime used for server-side development.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **MongoDB**: NoSQL database used to store habit data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

### Development Tools

- **npm**: Package manager for JavaScript, used for managing project dependencies.
- **Git**: Version control system for tracking changes and collaboration.

### Deployment

- **Render**: Cloud platform for deploying and hosting the application.

### Other Libraries and Packages

- **dotenv**: For managing environment variables.
- **winston**: For logging.
- **express-ejs-layouts**: For EJS layout management.

## Folder Structure

```
habit-tracker/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   └── logo.png
│   └── js/
│       └── script.js
├── src/
│   ├── controllers/
│   │   └── habit.controller.js
│   ├── errors/
│   │   └── customError.js
│   ├── middlewares/
│   │   └── middleware.js
│   ├── models/
│   │   └── habit.model.js
│   ├── repositories/
│   │   └── habit.repository.js
│   ├── routes/
│   │   └── habit.routes.js
│   ├── utils/
│   │   └── errorLogger.js
│   └── views/
│       ├── layouts/
│       ├── partials/
│       ├── index.ejs
│       └── habits.ejs
├── .gitignore
├── .env.example
├── app.js
├── env.js
├── package-lock.json
├── package.json
├── package.json
├── README.md
└── server.js

```

## Installation

To get started with the **Habit Tracker** project, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- **npm**
- **Node.js**
- **MongoDB** (Ensure you have a MongoDB server running locally or use a cloud MongoDB instance)

### Clone the Repository

```bash
git clone https://github.com/guru-bandike/Habit-Tracker.git
cd Habit-Tracker

```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

- Create a .env file in the root of the project by copying the provided .env.example file:

```bash
cp .env.example .env
```

- Open the **.env** file and replace the placeholder values with your actual environment settings.

### Start the Application

```
npm run dev
```

---

<h3 align="center" style="font-weight: bolder; color: #059d06">Good Luck and Happy Coding!</h3>
