import Student from "../models/StudentModel.js";
import StudentViolation from "../models/StudentViolationModel.js";
import { Sequelize } from "sequelize";

export const getStudent = async (req, res) => {
  try {
    const response = Student.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.col("student_violations.studentId")
            ),
            "violation",
          ],
        ],
      },
      include: [
        {
          model: StudentViolation,
          attributes: [],
        },
      ],
      group: ["student.id"],
    });
    res.status(200).json(await response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getStudentById = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Student.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const getStudentByNISN = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Student.findOne({
        where: {
          nisn: req.params.id,
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const createStudent = async (req, res) => {
  const { nisn, name, kelas, gender } = req.body;
  try {
    await Student.create({
      nisn,
      name,
      kelas,
      gender,
    });
    res.status(201).json({ msg: "Siswa Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateStudent = async (req, res) => {
  if (req.role === "admin") {
    try {
      const student = await Student.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!student)
        return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });

      const { nisn, name, kelas, gender } = req.body;
      await Student.update(
        { nisn, name, kelas, gender },
        {
          where: {
            id: student.id,
          },
        }
      );
      res.status(200).json({ msg: "Siswa Berhasil Diubah" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const deleteStudent = async (req, res) => {
  if (req.role === "admin") {
    const student = await Student.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!student) return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });

    try {
      await Student.destroy({
        where: {
          id: student.id,
        },
      });
      res.status(200).json({ msg: "Hapus Siswa Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};
