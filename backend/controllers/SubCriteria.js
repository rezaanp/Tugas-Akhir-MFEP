import SubCriteria from "../models/SubCriteriaModel.js";
import Criteria from "../models/CriteriaModel.js";
import * as Utils from "../utils/index.js";

export const getSubCriteria = async (req, res) => {
  try {
    const response = await Utils.Pagination(
      req,
      SubCriteria,
      "$sub_criteria.name$",
      {
        attributes: ["uuid", "code", "name", "weight", "criteriaId"],
        include: [
          {
            attributes: ["code", "weight"],
            model: Criteria,
          },
        ],
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSubCriteriaById = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await SubCriteria.findOne({
        where: {
          uuid: req.params.id,
        },
        attributes: ["code", "name", "weight"],
        include: [
          {
            attributes: ["name"],
            model: Criteria,
          },
        ],
      });
      if (!response)
        return res.status(404).json({ msg: "Sub Kriteria Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const getSubCriteriaByCriteria = async (req, res) => {
  try {
    const criteria = await Criteria.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    const criteriaId = criteria.id;

    const response = await Utils.Pagination(
      req,
      SubCriteria,
      "$sub_criteria.name$",
      {
        attributes: ["code", "name", "weight"],
        include: [
          {
            attributes: ["name"],
            model: Criteria,
          },
        ],
        where: {
          criteriaId,
        },
      }
    );
    if (!response)
      return res.status(404).json({ msg: "Sub Kriteria Tidak Ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSubCriteria = async (req, res) => {
  if (req.role === "admin") {
    const { code, name, weight, criteria } = req.body;
    const criteriaId = await checkId(criteria);
    try {
      await SubCriteria.create({
        code,
        name,
        weight,
        criteriaId,
      });
      res.status(201).json({ msg: "Sub Kriteria Berhasil Ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const updateSubCriteria = async (req, res) => {
  if (req.role === "admin") {
    try {
      const subCriteria = await SubCriteria.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!subCriteria)
        return res.status(404).json({ msg: "Sub Kriteria Tidak Ditemukan" });

      const { code, name, weight, criteria } = req.body;
      const criteriaId = await checkId(criteria);
      await SubCriteria.update(
        { code, name, weight, criteriaId },
        {
          where: {
            id: subCriteria.id,
          },
        }
      );
      res.status(200).json({ msg: "Sub Kriteria Berhasil Diubah" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const deleteSubCriteria = async (req, res) => {
  if (req.role === "admin") {
    const subCriteria = await SubCriteria.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!subCriteria)
      return res.status(404).json({ msg: "Sub Kriteria Tidak Ditemukan" });

    try {
      await SubCriteria.destroy({
        where: {
          id: subCriteria.id,
        },
      });
      res.status(200).json({ msg: "Hapus Sub Kriteria Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

//Check Criteria Id
const checkId = async (value) => {
  const response = await Criteria.findOne({
    where: {
      name: value,
    },
  });
  return response?.dataValues?.id;
};
