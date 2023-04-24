import express from "express";
import dotenv from "dotenv";

import routes from "./routes/routes.js";

const app = express();
dotenv.config();

app.use(routes);
app.use(express.json());


app.set("port", process.env.PORT_SERVER || 3000);

app.listen(app.set("port"), () => {
  console.log("✔️✔️   Server on port", app.set("port"), "❗");
});

export default app;
