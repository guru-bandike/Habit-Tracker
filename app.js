// Import necessary External modules
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';

// Import necessary Core modules
import path from 'path';

// Initialize the Express application
const app = express();

app.set('view engine', 'ejs'); // Set EJS as view-engine
app.set('views', path.join(path.resolve(), 'src', 'views')); // Set views path
app.set('layout', './layouts/main'); // Set the default layout for the application

app.use(ejsLayouts); // Use EJS layouts for redering views with layouts
app.use(express.static(path.join(path.resolve(), 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

export default app;
