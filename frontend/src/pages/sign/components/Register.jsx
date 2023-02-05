import React from "react";
import { useEffect, useState } from "react";
import { styles } from "../screen/style";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    confPassword: "",
    role: "user",
    message: "",
  });

  const [valid, setValid] = useState({
    validName: 1,
    validUname: 1,
    validPassword: 1,
    validConfPassword: 1,
  });
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (
      valid.validName === true &&
      valid.validUname === true &&
      valid.validPassword === true &&
      valid.validConfPassword === true
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [valid]);

  const checkName = (val) => {
    if (val.trim().length >= 1) {
      setValid({ ...valid, validName: true });
      let value = val.trim();
      setData({ ...data, name: value });
    } else {
      setValid({ ...valid, validName: false });
    }
  };
  const checkUsername = (val) => {
    if (val.trim().length >= 1) {
      setValid({ ...valid, validUname: true });
      let value = val.trim();
      setData({ ...data, username: value });
    } else {
      setValid({ ...valid, validUname: false });
    }
  };
  const checkPassword = (val) => {
    if (val.trim().length >= 8) {
      setValid({ ...valid, validPassword: true });
      let value = val.trim();
      setData({ ...data, password: value });
    } else {
      setValid({ ...valid, validPassword: false });
    }
  };
  const checkConfPassword = (val) => {
    if (val.trim().length >= 8) {
      setValid({ ...valid, validConfPassword: true });
      let value = val.trim();
      setData({ ...data, confPassword: value });
    } else {
      setValid({ ...valid, validConfPassword: false });
    }
  };

  const auth = async (e) => {
    setData({ ...data, message: "" });
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/account", {
        name: data.name,
        username: data.username,
        password: data.password,
        confPassword: data.confPassword,
        role: data.role,
      });
      setData({ ...data, message: response.data.msg });
    } catch (error) {
      setData({ ...data, message: error.response.data.msg });
    }
  };

  return (
    <form onSubmit={auth} className={styles.formWrap}>
      {data.message && (
        <p
          className={
            data.message === "Registrasi Berhasil"
              ? "text-sm text-green-500 mb-8 font-semibold"
              : "text-sm text-red-500 mb-8 font-semibold"
          }
        >
          {data.message}
        </p>
      )}
      <div className={styles.regMdWrap}>
        <div className={styles.regInputWrap}>
          <label htmlFor="name" className={styles.labelInput}>
            Name
          </label>
          <input
            type="text"
            className={styles.inputBox}
            id="name"
            placeholder="Masukan Nama Lengkap"
            onChange={(e) => checkName(e.target.value)}
            autoComplete="off"
            required
          />
          {valid.validName ? null : (
            <p className={styles.warning}>Nama Tidak Valid</p>
          )}
        </div>
        <div className={styles.regInputWrap}>
          <label htmlFor="username" className={styles.labelInput}>
            Username
          </label>
          <input
            type="text"
            className={styles.inputBox}
            id="username"
            placeholder="Masukan Username"
            onChange={(e) => checkUsername(e.target.value)}
            autoComplete="off"
            required
          />
          {valid.validUname ? null : (
            <p className={styles.warning}>Username Tidak Valid</p>
          )}
        </div>
      </div>
      <div className={styles.regMdWrap}>
        <div className={styles.regInputWrap}>
          <label htmlFor="password" className={styles.labelInput}>
            Password
          </label>
          <input
            type="password"
            className={styles.inputBox}
            id="password"
            placeholder="Masukan Password"
            onChange={(e) => checkPassword(e.target.value)}
            required
          />
          {valid.validPassword ? null : (
            <p className={styles.warning}>Minimal 8 Karakter</p>
          )}
        </div>
        <div className={styles.regInputWrap}>
          <label htmlFor="confPassword" className={styles.labelInput}>
            Confirm Password
          </label>
          <input
            type="password"
            className={styles.inputBox}
            id="confPassword"
            placeholder="Masukan Confirm Password"
            onChange={(e) => checkConfPassword(e.target.value)}
            required
          />
          {valid.validConfPassword ? null : (
            <p className={styles.warning}>Minimal 8 Karakter</p>
          )}
        </div>
      </div>
      {button ? (
        <button className={styles.button}>REGISTRASI</button>
      ) : (
        <button type="submit" className={styles.buttonDisable} disabled>
          Data Belum Valid
        </button>
      )}
    </form>
  );
};

export default Register;
