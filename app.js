// Import necessary External modules
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';

// Import necessary Core modules
import path from 'path';

// Import necessary Internal modules
import homeRouter from './src/routers/home.routes.js';
import habitsRouter from './src/routers/habit.routes.js';
import handleInvalidRoute from './src/middlewares/handleInvalidRoute.middleware.js';
import handleApplicationLevelErrors from './src/middlewares/handleApplicationLevelErrors.middleware.js';

// Initialize the Express application
const app = express();

app.set('view engine', 'ejs'); // Set EJS as view-engine
app.set('views', path.join(path.resolve(), 'src', 'views')); // Set views path
app.set('layout', './layouts/main'); // Set the default layout for the application

app.use(ejsLayouts); // Use EJS layouts for redering views with layouts
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json()); // Parse incomming json requests

// Mount Home Router to handle home related requests
app.use('/', homeRouter);

// Mount Habits Router to handle habits related requests
app.use('/habits', habitsRouter);

// Handle invalid routes
app.use(handleInvalidRoute);

// Handle all application errors
app.use(handleApplicationLevelErrors);

export default app;
