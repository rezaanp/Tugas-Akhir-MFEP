import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormEditSIswaPelanggar = ({ goBack }) => {
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [gender, setGender] = useState("");
  const [criteria, setCriteria] = useState("");
  const [subCriteria, setSubCriteria] = useState("");
  const [listStudent, setListStudent] = useState([]);
  const [listCriteria, setListCriteria] = useState([]);
  const [listSubCriteria, setListSubCriteria] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:5000/student-violation/${id}`
      );
      setName(response?.data?.student?.name);
      setKelas(response?.data?.student?.kelas);
      setGender(response?.data?.student?.gender);
      setSubCriteria(
        response?.data?.sub_criterium?.name
          ? response?.data?.sub_criterium?.name
          : response?.data?.newViolation
      );

      if (response?.data?.sub_criterium?.criteriaId) {
        const id = response?.data?.sub_criterium?.criteriaId;
        const getCriteria = await axios.get(
          `http://localhost:5000/criteria-id/${id}`
        );
        setCriteria(getCriteria?.data?.name);

        const getSubList = await axios.get(
          `http://localhost:5000/get-criteria/${getCriteria?.data?.name}`
        );
        setListSubCriteria(getSubList?.data);
      }

      const criteriaList = await axios.get(`http://localhost:5000/criteria`);
      setListCriteria(criteriaList?.data);

      const studentList = await axios.get(`http://localhost:5000/student`);
      setListStudent(studentList?.data);
    };

    getData();
  }, [id]);

  const changeSubCriteria = async (val) => {
    const response = await axios.get(
      `http://localhost:5000/get-criteria/${val}`
    );
    setCriteria(val);
    setSubCriteria("");
    setListSubCriteria(response?.data);
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/student-violation/${id}`, {
        studentName: name,
        studentKelas: kelas,
        studentGender: gender,
        subCriteria: subCriteria,
      });
      goBack();
    } catch (error) {
      setMessage(error?.response?.data?.msg);
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
            className={styles.inputValue}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukan Nama Siswa"
            autoComplete="off"
            value={name && name}
          />
          <datalist id="students">
            {listStudent &&
              listStudent.map((e) => (
                <option key={e.uuid} value={e.name}>
                  {e.name}
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
            value={kelas && kelas}
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
          value={gender && gender}
        >
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="kriteria pelanggaran" className={styles.inputLabel}>
          Kriteria Pelanggaran
        </label>
        <select
          name="kriteria pelanggaran"
          id="kriteria pelanggaran"
          className={styles.inputValue}
          onChange={(e) => changeSubCriteria(e.target.value)}
          value={criteria && criteria}
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
          list="violations"
          name="pelanggaran"
          id="pelanggaran"
          className={styles.inputValue}
          onChange={(e) => setSubCriteria(e.target.value)}
          placeholder="Pilih Pelanggaran"
          autoComplete="off"
          value={subCriteria && subCriteria}
        />
        <datalist id="violations">
          {listSubCriteria &&
            listSubCriteria.map((e) => (
              <option key={e.uuid} value={e.name}>
                {e.name}
              </option>
            ))}
        </datalist>
      </div>
      <div className={styles.inputButtonWrap}>
        <button onClick={goBack} className={styles.buttonCancel}>
          Batal
        </button>
        <button onClick={updateData} className={styles.buttonUpdate}>
          Perbarui
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

export default FormEditSIswaPelanggar;
