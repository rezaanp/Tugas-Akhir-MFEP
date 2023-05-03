import StudentViolation from "../models/StudentViolationModel.js";
import SubCriteria from "../models/SubCriteriaModel.js";
import Student from "../models/StudentModel.js";
import Account from "../models/AccountModels.js";
import Criteria from "../models/CriteriaModel.js";

export const getStudentViolation = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await StudentViolation.findAll({
        attributes: ["uuid", "newViolation", "createdAt"],
        order: [["createdAt", "DESC"]],
        include: [
          {
            attributes: ["nisn", "name", "kelas", "gender"],
            model: Student,
          },
          {
            attributes: ["code", "name", "weight", "criteriaId"],
            model: SubCriteria,
          },
          {
            attributes: ["name"],
            model: Account,
          },
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

export const getViolationByReported = async (req, res) => {
  try {
    const response = await StudentViolation.findAll({
      attributes: ["uuid", "newViolation", "createdAt"],
      where: {
        accountId: req.accountId,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          attributes: ["nisn", "name", "kelas", "gender"],
          model: Student,
        },
        {
          attributes: ["code", "name", "weight", "criteriaId"],
          model: SubCriteria,
        },
        {
          attributes: ["name"],
          model: Account,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getStudentViolationById = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await StudentViolation.findOne({
        include: [
          {
            attributes: ["nisn", "name", "kelas", "gender"],
            model: Student,
          },
          {
            attributes: ["code", "name", "weight", "criteriaId"],
            model: SubCriteria,
          },
        ],
        where: {
          uuid: req.params.id,
        },
      });
      if (!response)
        return res
          .status(404)
          .json({ msg: "Data Pelanggaran Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const getDetailAllViolationByStudentId = async (req, res) => {
  if (req.role === "admin") {
    try {
      const student = await Student.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      let studentId;
      if (!student) {
        return res.status(404).json({ msg: "Data Siswa Tidak Ditemukan" });
      } else {
        studentId = student.id;
      }
      const response = await StudentViolation.findAll({
        attributes: ["uuid", "newViolation", "createdAt"],
        where: {
          studentId,
        },
        include: [
          {
            attributes: ["code", "name", "weight", "criteriaId"],
            model: SubCriteria,
            include: [
              {
                attributes: ["code", "name", "weight"],
                model: Criteria,
              },
            ],
          },
          {
            attributes: ["name"],
            model: Account,
          },
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

export const createStudentViolation = async (req, res) => {
  const { nisn, studentName, studentKelas, studentGender, subCriteria } =
    req.body;

  let violation;
  let mistake;

  violation = await checkCriteria(subCriteria);

  if (Number.isInteger(violation)) {
    mistake = null;
  } else {
    mistake = violation;
    violation = null;
  }

  const studentId = await checkStudent(
    nisn,
    studentName,
    studentKelas,
    studentGender
  );

  try {
    await StudentViolation.create({
      studentId,
      violationId: violation,
      newViolation: mistake,
      accountId: req.accountId,
    });
    res.status(201).json({ msg: "Data Pelanggaran Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateStudentViolation = async (req, res) => {
  const { nisn, studentName, studentKelas, studentGender, subCriteria } =
    req.body;
  if (req.role === "admin") {
    try {
      const response = await StudentViolation.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!response)
        return res
          .status(404)
          .json({ msg: "Data Pelanggaran Tidak Ditemukan" });

      const studentId = await checkStudent(
        nisn,
        studentName,
        studentKelas,
        studentGender
      );
      const violationId = await checkCriteria(subCriteria);

      await StudentViolation.update(
        {
          studentId,
          violationId,
          newViolation: null,
          accountId: response.accountId,
        },
        {
          where: {
            id: response.id,
          },
        }
      );
      res.status(200).json({ msg: "Data Pelanggaran Berhasil Diubah" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const deleteStudentViolation = async (req, res) => {
  if (req.role === "admin") {
    const response = await StudentViolation.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!response)
      return res.status(404).json({ msg: "Data Pelanggaran Tidak Ditemukan" });

    try {
      await StudentViolation.destroy({
        where: {
          id: response.id,
        },
      });
      res.status(200).json({ msg: "Hapus Data Pelanggaran Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

// check student Id
const checkStudent = async (nisn, name, kelas, gender) => {
  const response = await Student.findOne({
    where: {
      nisn,
    },
  });
  if (response) {
    await Student.update(
      { nisn, name, kelas, gender },
      {
        where: {
          id: response.id,
        },
      }
    );
    return response.id;
  } else {
    await Student.create({
      nisn,
      name,
      kelas,
      gender,
    });
    const newStudent = await Student.findOne({
      where: {
        nisn,
      },
    });
    return newStudent.id;
  }
};

// check criteria Id
const checkCriteria = async (value) => {
  const response = await SubCriteria.findOne({
    where: {
      name: value,
    },
  });
  if (response) {
    return response?.id;
  } else {
    return value;
  }
};
