import express from "express";
import dotenv from "dotenv";

import routes from "./routes/routes.js";

const app = express();
dotenv.config();

app.use(routes);

app.set("port", process.env.portServer || 3000);
app.use(express.json());



app.listen(app.set("port"), () => {
  console.log("Server on port", app.set("port"));
});

// export default myConnectionDataBase;
