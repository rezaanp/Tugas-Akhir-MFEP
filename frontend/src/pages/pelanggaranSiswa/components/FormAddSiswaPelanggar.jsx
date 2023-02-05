import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormAddSiswaPelanggar = ({ goBack, role }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [gender, setGender] = useState("");
  const [subCriteria, setSubCriteria] = useState("");
  const [listStudent, setListStudent] = useState([]);
  const [listCriteria, setListCriteria] = useState([]);
  const [listSubCriteria, setListSubCriteria] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const studentList = await axios.get(`http://localhost:5000/student`);
      let getListName = [];
      for (const key in studentList?.data) {
        getListName.push(studentList?.data?.[key]?.name);
      }
      let uniqueChars = [...new Set(getListName)];
      setListStudent(uniqueChars);

      const response = await axios.get(`http://localhost:5000/criteria`);
      setListCriteria(response?.data);
    };
    getData();
  }, []);

  const changeSubCriteria = async (val) => {
    const response = await axios.get(
      `http://localhost:5000/get-criteria/${val}`
    );
    setListSubCriteria(response?.data);
  };

  const AddData = async (e) => {
    e.preventDefault();
    if (name === "" || kelas === "" || gender === "" || subCriteria === "") {
      setMessage("Semua Data Wajib Diisi");
    } else {
      try {
        await axios.post(`http://localhost:5000/student-violation`, {
          studentName: name,
          studentKelas: kelas,
          studentGender: gender,
          subCriteria: subCriteria,
          newViolation: "",
        });
        if (role === "admin") {
          goBack();
        } else {
          navigate("/riwayat");
        }
      } catch (error) {
        setMessage(error?.response?.data?.msg);
      }
    }
  };

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col md:flex-row md:gap-5 px-3 lg:px-10">
        <div className="flex flex-col mt-8 flex-1">
          <label htmlFor="siswa" className={styles.inputLabel}>
            Nama Siswa Pelanggar
          </label>
          <input
            list="students"
            name="siswa"
            id="siswa"
            autoComplete="off"
            className={styles.inputValue}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukan Nama Siswa"
          />
          <datalist id="students">
            {listStudent &&
              listStudent.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
          </datalist>
        </div>
        <div className="flex flex-col mt-8 flex-1">
          <label htmlFor="kelas" className={styles.inputLabel}>
            Kelas Siswa
          </label>
          <input
            type="text"
            id="kelas"
            autoComplete="off"
            className={styles.inputValue}
            onChange={(e) => setKelas(e.target.value)}
            required
            placeholder="Masukan Kelas Siswa"
          />
        </div>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="gender" className={styles.inputLabel}>
          Jenis Kelamin
        </label>
        <select
          name="gender"
          id="gender"
          className={styles.inputValue}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option hidden>Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="kriteriaPelanggaran" className={styles.inputLabel}>
          Kriteria Pelanggaran
        </label>
        <select
          className={styles.inputValue}
          id="kriteriaPelanggaran"
          onChange={(e) => changeSubCriteria(e.target.value)}
        >
          <option hidden>Pilih Kriteria</option>
          {listCriteria.map((e) => (
            <option key={e.uuid} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="pelanggaran" className={styles.inputLabel}>
          Pelanggaran
        </label>
        <input
          list="subCriterias"
          name="subKriteriaPelanggaran"
          id="subKriteriaPelanggaran"
          className={styles.inputValue}
          autoComplete="off"
          onChange={(e) => setSubCriteria(e.target.value)}
          placeholder="Pilih / Masukan Nama Pelanggaran"
          value={subCriteria && subCriteria}
        />
        <datalist id="subCriterias">
          {listSubCriteria &&
            listSubCriteria.map((e) => (
              <option key={e.uuid} value={e.name}>
                {e.name}
              </option>
            ))}
        </datalist>
      </div>
      <div className={styles.inputButtonWrap}>
        <button
          onClick={goBack}
          className={role === "admin" ? styles.buttonCancel : "hidden"}
        >
          Batal
        </button>
        <button onClick={AddData} className={styles.buttonUpdate}>
          Tambah
        </button>
      </div>
      {message ? (
        <h1 className="px-3 lg:px-10 font-bold text-red-500">{message}</h1>
      ) : null}
    </div>
  );
};

const styles = {
  inputWrap: "flex flex-col mt-8 flex-1 px-3 lg:px-10",
  inputLabel: "select-none mb-4",
  inputValue:
    "rounded-xl h-11 focus:ring-sky-400 ring-4 focus:outline-none px-4 bg-white ring-slate-300",
  inputButtonWrap:
    "flex items-center gap-3 justify-end mt-14 px-3 lg:px-10 mb-10",
  buttonCancel:
    "bg-white hover:border-sky-300 border-sky-500 border-2 py-2 px-4 rounded-md cursor-pointer",
  buttonUpdate:
    "bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md text-white cursor-pointer",
};

export default FormAddSiswaPelanggar;
