import axios from "axios";
import React, { useState, useEffect } from "react";

const FormAddTataTertib = ({ goBack }) => {
  const [listCriteria, setListCriteria] = useState([]);
  const [data, setData] = useState({
    code: "",
    name: "",
    weight: "",
    criteria: "",
    message: "",
  });

  useEffect(() => {
    const getData = async () => {
      const criteria = await axios.get(`http://localhost:5000/criteria`);
      setListCriteria(criteria?.data);
      setData({
        code: "",
        name: "",
        weight: "",
        criteria: criteria?.data[0]?.name,
      });
    };
    getData();
  }, []);

  const addData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/sub-criteria`, {
        code: data.code,
        name: data.name,
        weight: data.weight,
        criteria: data.criteria,
      });
      goBack();
    } catch (error) {
      setData({ ...data, message: error?.response?.data?.msg });
    }
  };

  return (
    <div className="overflow-auto h-full">
      <div className={styles.inputWrap}>
        <label htmlFor="kode" className={styles.inputLabel}>
          Kode
        </label>
        <input
          type="text"
          id="kode"
          autoComplete="off"
          placeholder="Masukan Kode"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, code: e.target.value })}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="name" className={styles.inputLabel}>
          Nama Kriteria
        </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          placeholder="Masukan Nama Kriteria"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="bobot" className={styles.inputLabel}>
          Bobot
        </label>
        <input
          type="text"
          id="bobot"
          autoComplete="off"
          placeholder="Masukan Bobot"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, weight: e.target.value })}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="kriteria" className={styles.inputLabel}>
          Kriteria
        </label>
        <select
          name="kriteria"
          id="kriteria"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, criteria: e.target.value })}
        >
          {listCriteria &&
            listCriteria.map((e) => (
              <option key={e.uuid} value={e.name}>
                {e.name}
              </option>
            ))}
        </select>
      </div>

      <div className={styles.inputButtonWrap}>
        <button onClick={goBack} className={styles.buttonCancel}>
          Batal
        </button>
        <button onClick={addData} className={styles.buttonAdd}>
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
  inputButtonWrap:
    "flex items-center gap-3 justify-end mt-14 px-3 lg:px-10 mb-10",
  buttonCancel:
    "bg-white hover:border-sky-300 border-sky-500 border-2 py-2 px-4 rounded-md cursor-pointer",
  buttonAdd:
    "bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md text-white cursor-pointer",
};

export default FormAddTataTertib;
