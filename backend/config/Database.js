import { Sequelize } from "sequelize";

const db = new Sequelize("mfep_db", "root", "true", {
  host: "mysql",
  dialect: "mysql",
});

export default db;
