import Criteria from "../models/CriteriaModel.js";

export const getCriteria = async (req, res) => {
  try {
    const response = await Criteria.findAll({
      attributes: ["id", "uuid", "code", "name", "weight"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCriteriaByUuid = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Criteria.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Kriteria Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const getCriteriaById = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Criteria.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Kriteria Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const createCriteria = async (req, res) => {
  if (req.role === "admin") {
    const { code, name, weight } = req.body;
    try {
      await Criteria.create({
        code: code,
        name: name,
        weight: weight,
      });
      res.status(201).json({ msg: "Kriteria Berhasil Ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const updateCriteria = async (req, res) => {
  if (req.role === "admin") {
    try {
      const criteria = await Criteria.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!criteria)
        return res.status(404).json({ msg: "Kriteria Tidak Ditemukan" });

      const { code, name, weight } = req.body;
      await Criteria.update(
        { code, name, weight },
        {
          where: {
            id: criteria.id,
          },
        }
      );
      res.status(200).json({ msg: "Kriteria Berhasil Diubah" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const deleteCriteria = async (req, res) => {
  if (req.role === "admin") {
    const criteria = await Criteria.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!criteria)
      return res.status(404).json({ msg: "Kriteria Tidak Ditemukan" });

    try {
      await Criteria.destroy({
        where: {
          id: criteria.id,
        },
      });
      res.status(200).json({ msg: "Hapus Kriteria Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};
