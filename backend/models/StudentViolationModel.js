import db from "../config/Database.js";
import { DataTypes, Sequelize } from "sequelize";
import SubCriteria from "./SubCriteriaModel.js";
import Student from "./StudentModel.js";
import Account from "./AccountModels.js";

const StudentViolation = db.define(
  "student_violation",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    violationId: {
      type: DataTypes.INTEGER,
    },
    newViolation: {
      type: DataTypes.STRING,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

SubCriteria.hasMany(StudentViolation, { foreignKey: "violationId" });
StudentViolation.belongsTo(SubCriteria, { foreignKey: "violationId" });

Student.hasMany(StudentViolation, { foreignKey: "studentId" });
StudentViolation.belongsTo(Student, { foreignKey: "studentId" });

Account.hasMany(StudentViolation, { foreignKey: "accountId" });
StudentViolation.belongsTo(Account, { foreignKey: "accountId" });

export default StudentViolation;
