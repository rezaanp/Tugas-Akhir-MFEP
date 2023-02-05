import Punishment from "../models/PunishmentModel.js";

export const getPunishment = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Punishment.findAll({
        attributes: [
          "id",
          "uuid",
          "name",
          "category",
          "minWeight",
          "maxWeight",
        ],
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const getPunishmentById = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Punishment.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Sanksi Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const createPunishment = async (req, res) => {
  if (req.role === "admin") {
    const { name, category, minWeight, maxWeight } = req.body;
    try {
      await Punishment.create({
        name,
        category,
        minWeight,
        maxWeight,
      });
      res.status(201).json({ msg: "Sanksi Berhasil Ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const updatePunishment = async (req, res) => {
  if (req.role === "admin") {
    try {
      const punishment = await Punishment.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!punishment)
        return res.status(404).json({ msg: "Sanksi Tidak Ditemukan" });

      const { name, category, minWeight, maxWeight } = req.body;
      await Punishment.update(
        { name, category, minWeight, maxWeight },
        {
          where: {
            id: punishment.id,
          },
        }
      );
      res.status(200).json({ msg: "Sanksi Berhasil Diubah" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const deletePunishment = async (req, res) => {
  if (req.role === "admin") {
    const punishment = await Punishment.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!punishment)
      return res.status(404).json({ msg: "Kriteria Tidak Ditemukan" });

    try {
      await Punishment.destroy({
        where: {
          id: punishment.id,
        },
      });
      res.status(200).json({ msg: "Hapus Sanksi Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};
