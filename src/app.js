import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { corsOptions } from "./config/cors/cors.js";

const app = express();
//

app.use(cors("*"));

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
/* 
  4. APPLICATION ERROR HANDLING 🚔
*/
app.use("/api/categories", categoryRoute);
app.use("/api/product", productRoute);
// Handle unregistered route for all HTTP Methods
app.all("*", function (req, res, next) {
  next();
});

export { app };
