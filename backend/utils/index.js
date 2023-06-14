import { Op } from "sequelize";

const Pagination = async (req, Model, columnSearch, CustomQuery = {}) => {
  const pageIndex = parseInt(req.query.pageIndex) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = limit * pageIndex;

  const total = await Model.count({
    // eslint-disable-next-line no-prototype-builtins
    where: CustomQuery.hasOwnProperty("where")
      ? {
          [Op.and]: [
            {
              [columnSearch]: {
                [Op.like]: "%" + search + "%",
              },
            },
            { ...CustomQuery.where },
          ],
        }
      : {
          [columnSearch]: {
            [Op.like]: "%" + search + "%",
          },
        },
  });

  const numberOfPages = Math.ceil(total / limit);
  const data = await Model.findAll({
    ...CustomQuery,
    // eslint-disable-next-line no-prototype-builtins
    where: CustomQuery.hasOwnProperty("where")
      ? {
          [Op.and]: [
            {
              [columnSearch]: {
                [Op.like]: "%" + search + "%",
              },
            },
            { ...CustomQuery.where },
          ],
        }
      : {
          [columnSearch]: {
            [Op.like]: "%" + search + "%",
          },
        },
    offset: offset,
    limit: limit,
  });

  return {
    total,
    pageIndex,
    numberOfPages,
    data,
  };
};

export { Pagination };
