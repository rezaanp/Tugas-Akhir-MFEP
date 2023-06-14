import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import AccountRoute from "./routes/AccountRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CriteriaRoute from "./routes/CriteriaRoute.js";
import PunishmentRoute from "./routes/PunishmentRoute.js";
import StudentRoute from "./routes/StudentRoute.js";
import SubCriteriaRoute from "./routes/SubCriteriaRoute.js";
import StudentViolation from "./routes/StudentViolationRoute.js";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  session({
    // eslint-disable-next-line no-undef
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

//SYNC DB
// (async () => {
//   await db.sync();
// })();
// store.sync();

app
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))
  .use(express.json())
  .use(AccountRoute)
  .use(AuthRoute)
  .use(CriteriaRoute)
  .use(PunishmentRoute)
  .use(StudentRoute)
  .use(SubCriteriaRoute)
  .use(StudentViolation);

// eslint-disable-next-line no-undef
app.listen(process.env.APP_PORT, () => console.log("server up and running"));
