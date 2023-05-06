import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormEditSiswa = ({ goBack }) => {
  const [data, setData] = useState({
    nisn: "",
    name: "",
    kelas: "",
    gender: "",
    message: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://localhost:5000/student/${id}`);
      setData({
        nisn: response?.data?.nisn,
        name: response?.data?.name,
        kelas: response?.data?.kelas,
        gender: response?.data?.gender,
      });
    };
    getData();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/student/${id}`, {
        nisn: data.nisn,
        name: data.name,
        kelas: data.kelas,
        gender: data.gender,
      });
      goBack();
    } catch (error) {
      setData({ ...data, message: error?.response?.data?.msg });
    }
  };

  return (
    <div className="overflow-auto h-full">
      <div className={styles.inputWrap}>
        <label htmlFor="name" className={styles.inputLabel}>
          NISN
        </label>
        <input
          type="text"
          id="nisn"
          autoComplete="off"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, nisn: e.target.value })}
          placeholder="Masukan NISN Siswa"
          value={data?.nisn && data?.nisn}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="name" className={styles.inputLabel}>
          Nama Siswa
        </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Masukan Nama Siswa"
          value={data?.name && data?.name}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="kelas" className={styles.inputLabel}>
          Kelas
        </label>
        <input
          type="text"
          id="kelas"
          autoComplete="off"
          placeholder="Masukan Nama Kelas"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, kelas: e.target.value })}
          value={data?.kelas && data?.kelas}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="gender" className={styles.inputLabel}>
          Jenis Kelamin
        </label>
        <select
          name="gender"
          id="gender"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          value={data?.gender}
        >
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <div className={styles.inputButtonWrap}>
        <button onClick={goBack} className={styles.buttonCancel}>
          Batal
        </button>
        <button onClick={updateData} className={styles.buttonUpdate}>
          Perbarui
        </button>
      </div>
      {data.message ? (
        <h1 className="px-3 lg:px-10 font-bold text-red-500">{data.message}</h1>
      ) : null}
    </div>
  );
};

const styles = {
  inputWrap: "flex flex-col px-3 lg:px-10 mt-8",
  inputLabel: "select-none mb-4",
  inputValue:
    "rounded-xl h-11 focus:ring-sky-400 ring-4 focus:outline-none px-4 bg-white ring-slate-300",
  inputButtonWrap: "flex items-center gap-3 justify-end mt-14 px-3 lg:px-10",
  buttonCancel:
    "bg-white hover:border-sky-300 border-sky-500 border-2 py-2 px-4 rounded-md cursor-pointer",
  buttonUpdate:
    "bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md text-white cursor-pointer",
};

export default FormEditSiswa;
