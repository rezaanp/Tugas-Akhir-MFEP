import { Sequelize } from "sequelize";


const db = new Sequelize('mfep_db', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db;