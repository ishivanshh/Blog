import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url), quiet: true });

const [{ default: connectDb }, { default: app }] = await Promise.all([
  import("./db/index.js"),
  import("./app.js"),
]);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Mongo connection error", error);
  });