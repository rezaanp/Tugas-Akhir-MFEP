import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiEditBoxFill, RiDeleteBin2Fill, RiAlertFill } from "react-icons/ri";
import { styles } from "../screen/style";

const PerluDiperbarui = ({ getNotif }) => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [uuid, setUuid] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard");
      let newArr = [];
      for (const element of response?.data) {
        if (element?.newViolation !== null) {
          newArr.push(element);
        }
      }
      setData(newArr);
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = (uuid) => {
    setAlert(true);
    setUuid(uuid);
  };
  const deleteAgree = async () => {
    await axios.delete(`http://localhost:5000/student-violation/${uuid}`);
    setAlert(!alert);
    getData();
    getNotif();
  };

  return (
    <div className={styles.tableContainer}>
      <div className={alert ? styles.alertOn : styles.alertOff}>
        <div className={styles.alertWrap}>
          <div className={styles.verifWrap}>
            <RiAlertFill size={60} color="#FF1E1E" />
            <h1 className={styles.alertVerif}>Apakah Anda Yakin ?</h1>
          </div>
          <div className={styles.alertButtonWrap}>
            <button
              onClick={() => setAlert(!alert)}
              className={styles.alertCancel}
            >
              Batal
            </button>
            <button onClick={deleteAgree} className={styles.alertDelete}>
              Hapus
            </button>
          </div>
        </div>
      </div>
      <table className={styles.tableWrap}>
        <thead>
          <tr>
            <th className={styles.tableTitle}>Nama Siswa</th>
            <th className={styles.tableTitle}>Pelanggaran Baru</th>
            <th className={styles.tableTitle}>Pelapor</th>
            <th className={styles.tableTitle}>Tanggal Laporan</th>
            <th className={styles.tableTitle}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => (
              <tr key={data?.uuid}>
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
                  {data?.newViolation}
                </td>
                <td
                  className={
                    index % 2 === 0 ? styles.tableEven : styles.tableOdd
                  }
                >
                  {data?.account?.name}
                </td>
                <td
                  className={
                    index % 2 === 0 ? styles.tableEven : styles.tableOdd
                  }
                >
                  {data?.createdAt.substring(0, 10)}
                </td>
                <td
                  className={
                    index % 2 === 0 ? styles.tableEven : styles.tableOdd
                  }
                >
                  <div className="flex gap-2">
                    <Link to={`/pelanggaran-siswa/edit/${data.uuid}`}>
                      <RiEditBoxFill color="#354259 " className="w-7 h-7" />
                    </Link>
                    <button onClick={() => deleteData(data.uuid)}>
                      <RiDeleteBin2Fill color="#FF1E1E" className="w-7 h-7" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerluDiperbarui;
