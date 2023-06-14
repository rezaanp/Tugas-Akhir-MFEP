import Account from "../models/AccountModels.js";
import * as Utils from "../utils/index.js";
import argon2 from "argon2";

export const getAccount = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Utils.Pagination(req, Account, "$name$", {
        attributes: ["id", "uuid", "name", "username", "role"],
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const getAccountById = async (req, res) => {
  if (req.role === "admin") {
    try {
      const response = await Account.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!response)
        return res.status(404).json({ msg: "Akun Tidak Ditemukan" });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const createAccount = async (req, res) => {
  const { name, username, password, confPassword, role } = req.body;
  const checkName = await Account.findOne({
    where: {
      name: name,
    },
  });
  if (checkName) {
    return res.status(409).json({ msg: "Nama Telah Terdaftar Sebelumnya" });
  }
  const checkUsername = await Account.findOne({
    where: {
      username: username,
    },
  });
  if (checkUsername) {
    return res.status(409).json({ msg: "Username Telah Terdaftar Sebelumnya" });
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password Berbeda" });
  const hashPassword = await argon2.hash(password);
  try {
    await Account.create({
      name: name,
      username: username,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAccount = async (req, res) => {
  if (req.role === "admin") {
    const account = await Account.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!account) return res.status(404).json({ msg: "Akun Tidak Ditemukan" });
    const { name, username, password, confPassword, role } = req.body;
    const checkName = await Account.findOne({
      where: {
        name: name,
      },
    });
    if (checkName) {
      if (checkName.id !== account.id) {
        return res.status(409).json({ msg: "Nama Telah Terdaftar Sebelumnya" });
      }
    }
    const checkUsername = await Account.findOne({
      where: {
        username: username,
      },
    });
    if (checkUsername) {
      if (checkUsername.id !== account.id) {
        return res
          .status(409)
          .json({ msg: "Username Telah Terdaftar Sebelumnya" });
      }
    }
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = account.password;
    } else {
      hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password Berbeda" });

    try {
      await Account.update(
        {
          name: name,
          username: username,
          password: hashPassword,
          role: role,
        },
        {
          where: {
            id: account.id,
          },
        }
      );
      res.status(200).json({ msg: "Perubahan Data Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};

export const deleteAccount = async (req, res) => {
  if (req.role === "admin") {
    const account = await Account.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!account) return res.status(404).json({ msg: "Akun Tidak Ditemukan" });

    try {
      await Account.destroy({
        where: {
          id: account.id,
        },
      });
      res.status(200).json({ msg: "Hapus Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    return res.status(500).json({ msg: "akses ditolak" });
  }
};
