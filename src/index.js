import express from 'express';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js Starter API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});