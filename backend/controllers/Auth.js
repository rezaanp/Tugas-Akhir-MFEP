import Account from "../models/AccountModels.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  const account = await Account.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!account) return res.status(404).json({ msg: "Akun Tidak Ditemukan" });

  const match = await argon2.verify(account.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });

  req.session.accountId = account.uuid;
  const uuid = account.uuid;
  const name = account.name;
  const username = account.username;
  const role = account.role;

  res.status(200).json({ uuid, name, username, role });
};

export const me = async (req, res) => {
  if (!req.session.accountId)
    return res.status(401).json({ msg: "Mohon Login Ke Akun Anda" });
  const account = await Account.findOne({
    attributes: ["uuid", "name", "username", "role"],
    where: {
      uuid: req.session.accountId,
    },
  });
  if (!account) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  res.status(200).json(account);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak Dapat Log Out" });
    res.status(200).json({ msg: "Anda Telah Log Out" });
  });
};
