import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormEditSanksi = ({ goBack }) => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    category: "",
    minWeight: "",
    maxWeight: "",
  });

  useEffect(() => {
    const getName = async () => {
      const response = await axios.get(
        `http://localhost:5000/punishment/${id}`
      );
      setData({
        name: response?.data?.name,
        category: response?.data?.category,
        minWeight: response?.data?.minWeight,
        maxWeight: response?.data?.maxWeight,
      });
    };
    getName();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/punishment/${id}`, {
        name: data.name,
        category: data.category,
        minWeight: data.minWeight,
        maxWeight: data.maxWeight,
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
            Nama Sanksi
          </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Masukan Nama Sanksi"
            className={styles.inputValue}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data?.name && data?.name}
            required
          />
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="categoty" className={styles.inputLabel}>
            Kategory
          </label>
          <input
            type="text"
            id="categoty"
            autoComplete="off"
            placeholder="Masukan Kategori Sanksi"
            className={styles.inputValue}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            value={data?.category && data?.category}
            required
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-5 px-3 lg:px-10">
        <div className={styles.inputWrap}>
          <label htmlFor="minWeight" className={styles.inputLabel}>
            Bobot Minimal
          </label>
          <input
            type="text"
            id="minWeight"
            autoComplete="off"
            placeholder="Masukan Bobot Minimal"
            className={styles.inputValue}
            onChange={(e) => setData({ ...data, minWeight: e.target.value })}
            value={data?.minWeight && data?.minWeight}
            required
          />
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="maxWeight" className={styles.inputLabel}>
            Bobot Maksimal
          </label>
          <input
            type="text"
            id="maxWeight"
            autoComplete="off"
            placeholder="Masukan Bobot Maksimal"
            className={styles.inputValue}
            onChange={(e) => setData({ ...data, maxWeight: e.target.value })}
            value={data?.maxWeight && data?.maxWeight}
            required
          />
        </div>
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
  inputWrap: "flex flex-col mt-8 flex-1",
  inputLabel: "select-none mb-4",
  inputValue:
    "rounded-xl h-11 focus:ring-sky-400 ring-4 focus:outline-none px-4 bg-white ring-slate-300",
  inputButtonWrap:
    "flex items-center gap-3 justify-end mt-14 px-3 lg:px-10 mb-10",
  buttonCancel:
    "bg-white hover:border-sky-300 border-sky-500 border-2 py-2 px-4 rounded-md cursor-pointer",
  buttonUpdate:
    "bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md text-white cursor-pointer",
  warning: "text-sm text-red-500 font-semibold",
};
export default FormEditSanksi;
