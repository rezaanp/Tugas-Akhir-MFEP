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

(async () => {
  await db.sync();
})();
store.sync();

app.use(cors({ credentials: true, origin: "http://localhost" }));
app.use(express.json());

app.use(AccountRoute);
app.use(AuthRoute);
app.use(CriteriaRoute);
app.use(PunishmentRoute);
app.use(StudentRoute);
app.use(SubCriteriaRoute);
app.use(StudentViolation);

app.listen(process.env.APP_PORT, () => console.log("server up and running"));
