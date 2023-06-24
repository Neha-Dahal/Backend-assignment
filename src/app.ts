import express, { RequestHandler } from "express";
import routes from "./routes";
import { errorHandler } from "./errors/index";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);

app.use(cors());

app.use(routes);
app.use(errorHandler); //--

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
