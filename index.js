import './env.js';
import app from './app.js';
import connectToDB from './src/utils/connectToDB.util.js';

// Establish a connection to the database
await connectToDB();

// Define the port from environment variables
const port = process.env.PORT;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
