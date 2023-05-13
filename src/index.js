import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

app.set("port", process.env.PORT_SERVER || 3300);

app.listen(app.set("port"), () => {
  console.log("✔️✔️   Server on port", app.set("port"), "❗");
});