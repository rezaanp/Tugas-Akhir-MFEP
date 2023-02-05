import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { styles } from "../screen/style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../bootstrap/actions";

const Login = ({ hide, setHide }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    message: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: data.username,
        password: data.password,
      });
      if (response?.data?.role === "admin") {
        dispatch(login(response?.data));
        navigate("/dashboard");
      } else if (response?.data?.role === "user") {
        dispatch(login(response?.data));
        navigate("/pelanggaran-siswa/tambah");
      } else {
        setData({ ...data, message: "Akses Ditolak" });
      }
    } catch (error) {
      setData({ ...data, message: error.response.data.msg });
    }
  };

  return (
    <form onSubmit={auth} className={styles.formWrap}>
      {data.message && <p className={styles.warning}>{data.message}</p>}
      <div className={styles.inputWrap}>
        <label htmlFor="username" className={styles.labelInput}>
          Username
        </label>
        <input
          type="text"
          className={styles.inputBox}
          id="username"
          placeholder="Masukan Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="password" className={styles.labelInput}>
          Password
        </label>
        <input
          type={hide ? "password" : "text"}
          className={styles.inputBox}
          id="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="off"
          required
        />
        <div className={styles.eye} onClick={() => setHide(!hide)}>
          {hide ? <AiFillEye size={28} /> : <AiFillEyeInvisible size={28} />}
        </div>
      </div>
      <button type="submit" className={styles.button}>
        LOGIN
      </button>
    </form>
  );
};

export default Login;
