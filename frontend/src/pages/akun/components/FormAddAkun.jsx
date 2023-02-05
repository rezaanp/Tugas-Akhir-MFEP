import axios from "axios";
import React, { useState, useEffect } from "react";

const FormEditAkun = ({ goBack }) => {
  const [button, setButton] = useState(false);
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

  const addData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/account`, {
        name: data.name,
        username: data.username,
        password: data.password,
        confPassword: data.confPassword,
        role: data.role,
      });
      goBack();
    } catch (error) {
      setData({ ...data, message: error?.response?.data?.msg });
    }
  };

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col md:flex-row md:gap-5 px-3 lg:px-10">
        <div className={styles.inputWrap}>
          <label htmlFor="name" className={styles.inputLabel}>
            Nama
          </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Masukan Nama"
            className={styles.inputValue}
            onChange={(e) => checkName(e.target.value)}
            required
          />
          {valid.validName ? null : (
            <p className={styles.warning}>Nama Tidak Valid</p>
          )}
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="username" className={styles.inputLabel}>
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Masukan Username"
            className={styles.inputValue}
            onChange={(e) => checkUsername(e.target.value)}
            required
          />
          {valid.validUname ? null : (
            <p className={styles.warning}>Username Tidak Valid</p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-5 px-3 lg:px-10">
        <div className={styles.inputWrap}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Masukan Password"
            className={styles.inputValue}
            onChange={(e) => checkPassword(e.target.value)}
            required
          />
          {valid.validPassword ? null : (
            <p className={styles.warning}>Minimal 8 Karakter</p>
          )}
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="confPassword" className={styles.inputLabel}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confPassword"
            autoComplete="off"
            placeholder="Masukan Confirm Password"
            className={styles.inputValue}
            onChange={(e) => checkConfPassword(e.target.value)}
            required
          />
          {valid.validConfPassword ? null : (
            <p className={styles.warning}>Minimal 8 Karakter</p>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-8 flex-1 px-3 lg:px-10">
        <label htmlFor="role" className={styles.inputLabel}>
          Peran
        </label>
        <select
          name="role"
          id="role"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          value="user"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div className={styles.inputButtonWrap}>
        <button onClick={goBack} className={styles.buttonCancel}>
          Batal
        </button>
        {button ? (
          <button onClick={addData} className={styles.buttonAdd}>
            Perbarui
          </button>
        ) : (
          <button className={styles.buttonAddDisabled} disabled>
            Perbarui
          </button>
        )}
      </div>
      {data.message ? (
        <h1 className="px-3 lg:px-10 font-bold text-red-500">{data.message}</h1>
      ) : null}
    </div>
  );
};

const styles = {
  inputWrap: "flex flex-col mt-8 flex-1",
  inputLabel: "select-none mb-4",
  inputValue:
    "rounded-xl h-11 focus:ring-sky-400 ring-4 focus:outline-none px-4 bg-white ring-slate-300",
  inputButtonWrap:
    "flex items-center gap-3 justify-end mt-14 px-2 lg:px-10 mb-10",
  buttonCancel:
    "bg-white hover:border-sky-300 border-sky-500 border-2 py-2 px-4 rounded-md cursor-pointer",
  buttonAdd:
    "bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md text-white cursor-pointer",
  buttonAddDisabled:
    "bg-green-200 py-[10px] px-4 rounded-md text-white cursor-pointer",
  warning: "text-sm text-red-500 font-semibold",
};

export default FormEditAkun;
