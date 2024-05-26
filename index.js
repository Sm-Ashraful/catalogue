import dotenv from "dotenv";
import connectDB from "./src/config/db/mongodb.js";
import { app } from "./src/app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(`Server Crashed due to ${err.message}`);
    });
    app.listen(process.env.PORT || 3085, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo db connection Failed ${err.message}`);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});
