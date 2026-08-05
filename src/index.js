import dotenv from "dotenv";

dotenv.config({ path: "./.env", quiet: true });

const [{ default: connectDB }, { default: app }] = await Promise.all([
  import("./db/index.js"),
  import("./app.js"),
]);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });
