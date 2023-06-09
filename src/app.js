import express from "express";
import morgan from "morgan";
import cors from "cors";

import routes from './routes/routes.js'
import './config/dataBase/dataBase.js'

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to my application",
    name: "Flash-Bakend",
    author: "Team_Developer_Flash",
    description: "Proyecto formativo",
    version: "1.0.0",
  });
});

app.use(routes);


export default app;