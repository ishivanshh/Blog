import express from 'express';
import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config ({
    path : "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// only listen to port when database is connected.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
