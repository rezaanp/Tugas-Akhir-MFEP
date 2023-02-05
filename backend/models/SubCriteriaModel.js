import db from "../config/Database.js";
import { DataTypes } from "sequelize";
import Criteria from "./CriteriaModel.js";

const SubCriteria = db.define(
  "sub_criteria",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 10],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    criteriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Criteria.hasMany(SubCriteria, { foreignKey: "criteriaId" });
SubCriteria.belongsTo(Criteria, { foreignKey: "criteriaId" });

export default SubCriteria;
