import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { debounce, isEmpty } from "lodash";

const FormAddSiswaPelanggar = ({ goBack, role }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nisn, setNisn] = useState("");
  const [kelas, setKelas] = useState("");
  const [gender, setGender] = useState("");
  const [subCriteria, setSubCriteria] = useState("");
  const [listStudent, setListStudent] = useState([]);
  const [listCriteria, setListCriteria] = useState([]);
  const [listSubCriteria, setListSubCriteria] = useState([]);
  const [message, setMessage] = useState("");
  const [hasGetDataByNisn, setHasGetDataByNisn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const nisnList = await axios.get(`http://localhost:5000/student`);
      setListStudent(nisnList?.data?.map((e) => e.nisn));

      const criteriaList = await axios.get(`http://localhost:5000/criteria`);
      setListCriteria(criteriaList?.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataStudentByNisn = await axios.get(
          `http://localhost:5000/student/nisn/${nisn}`
        );
        setHasGetDataByNisn(true);
        setName(dataStudentByNisn?.data?.name);
        setKelas(dataStudentByNisn?.data?.kelas);
        setGender(dataStudentByNisn?.data?.gender);
      } catch (error) {
        setHasGetDataByNisn(false);
        setName("");
        setKelas("");
        setGender("");
      }
    };
    getData();
  }, [nisn]);

  const changeSubCriteria = async (val) => {
    const response = await axios.get(
      `http://localhost:5000/get-criteria/${val}`
    );
    setListSubCriteria(response?.data);
  };

  const onChangeNisn = debounce(async (value) => {
    setNisn(value);
  }, 1000);

  const AddData = async (e) => {
    e.preventDefault();
    if (name === "" || kelas === "" || gender === "" || subCriteria === "") {
      setMessage("Semua Data Wajib Diisi");
    } else {
      try {
        await axios.post(`http://localhost:5000/student-violation`, {
          nisn: nisn,
          studentName: name,
          studentKelas: kelas,
          studentGender: gender,
          subCriteria: subCriteria,
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
          <label htmlFor="kelas" className={styles.inputLabel}>
            NISN
          </label>
          <input
            type="text"
            list="nisnList"
            id="nisn"
            autoComplete="off"
            className={styles.inputValue}
            onChange={(e) => onChangeNisn(e.target.value)}
            required
            placeholder="Masukan NISN"
          />
          <datalist id="nisnList">
            {listStudent &&
              listStudent.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
          </datalist>
        </div>
        <div className="flex flex-col mt-8 flex-1">
          <label htmlFor="siswa" className={styles.inputLabel}>
            Nama Siswa Pelanggar
          </label>
          <input
            list="students"
            name="siswa"
            id="siswa"
            autoComplete="off"
            value={name}
            disabled={hasGetDataByNisn}
            className={styles.inputValue}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukan Nama Siswa"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-5 px-3 lg:px-10">
        <div className="flex flex-col mt-8 flex-1">
          <label htmlFor="kelas" className={styles.inputLabel}>
            Kelas Siswa
          </label>
          <input
            type="text"
            id="kelas"
            autoComplete="off"
            className={styles.inputValue}
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            required
            placeholder="Masukan Kelas Siswa"
          />
        </div>
        <div className="flex flex-col mt-8 flex-1">
          <label htmlFor="gender" className={styles.inputLabel}>
            Jenis Kelamin
          </label>
          <select
            name="gender"
            id="gender"
            className={styles.inputValue}
            onChange={(e) => setGender(e.target.value)}
            disabled={hasGetDataByNisn}
            value={gender}
            required
          >
            <option hidden>Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
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
