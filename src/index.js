import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

app.set("port", process.env.PORT_SERVER || 3300);

app.listen(app.set("port"), () => {
  console.log("✔️✔️   Server on port", app.set("port"), "❗");
});