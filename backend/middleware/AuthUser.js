import Account from "../models/AccountModels.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.accountId)
    return res.status(401).json({ msg: "Mohon Login Ke Akun Anda" });
  const account = await Account.findOne({
    where: {
      uuid: req.session.accountId,
    },
  });
  if (!account) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  req.accountId = account.id;
  req.role = account.role;
  next();
};
