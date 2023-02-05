import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const ListHistory = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (search) {
      const filtData = data.filter((e) => e?.student?.name.includes(search));
      setNewData(filtData);
    } else {
      setNewData(data);
    }
  }, [search, data]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/violation-reported"
      );
      setData(response?.data);
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-full overflow-auto">
      {/* Search & Button Add */}
      <div className="flex mt-5 h-12">
        <div className="w-4/5 lg:w-1/3 relative">
          <input
            type="text"
            className="border-4 focus:border-sky-500 border-slate-400 outline-none rounded-2xl px-7 h-full w-full"
            placeholder="Cari..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-5 top-4" color="#94a3b8" />
        </div>
      </div>
      {/* Search & Button Add */}

      <div className={styles.tableContainer}>
        <table className={styles.tableWrap}>
          <thead>
            <tr>
              <th className={styles.tableTitle}>No</th>
              <th className={styles.tableTitle}>Nama Siswa</th>
              <th className={styles.tableTitle}>Kelas</th>
              <th className={styles.tableTitle}>Pelanggaran</th>
              <th className={styles.tableTitle}>Tanggal Laporan</th>
            </tr>
          </thead>
          <tbody>
            {newData &&
              newData.map((data, index) => (
                <tr key={data?.uuid}>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.student?.name}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.student?.kelas}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.sub_criterium?.name ?? data?.newViolation}
                  </td>
                  <td
                    className={
                      index % 2 === 0 ? styles.tableEven : styles.tableOdd
                    }
                  >
                    {data?.createdAt.substring(0, 10)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  tableContainer: "h-4/5 overflow-auto border border-slate-300 rounded-md mt-6",
  alertOn:
    "absolute h-full w-full bg-black flex items-center justify-center bg-opacity-40 z-50 top-0 left-0",
  alertOff: "hidden",
  alertWrap: "w-1/3 bg-white rounded-xl py-6 px-6",
  verifWrap: "flex items-center gap-3",
  alertVerif: "font-bold",
  alertButtonWrap: "flex items-center gap-3 justify-end mt-7",
  alertCancel: "bg-sky-500 p-2 rounded-md text-white cursor-pointer",
  alertDelete: "bg-red-500 p-2 rounded-md text-white cursor-pointer",
  tableWrap: "w-full border-collapse table-auto",
  tableTitle:
    "border-b border-sky-500 py-3 px-7 text-start bg-sky-500 text-white",
  tableEven: "py-2 px-7",
  tableOdd: "bg-sky-100 py-2 px-7 brightness-95",
  tableButtonWrap: "flex gap-2",
};

export default ListHistory;
