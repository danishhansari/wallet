import express, { json } from "express";
import { connectDB } from "./db/index.js";
import cors from "cors";
import userRoute from "./route/user.route.js";
import accountRoute from "./route/account.route.js";

const app: express.Application = express();
app.use(cors());
app.use(json());

const PORT: string | number = process.env.PORT || 8080;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/account", accountRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is started running on ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err.message);
  });
