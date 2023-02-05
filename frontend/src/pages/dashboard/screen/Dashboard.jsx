import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BoxInfo from "../components/BoxInfo";
import LaporanTerbaru from "../components/LaporanTerbaru";
import PerluDiperbarui from "../components/PerluDiperbarui";
import axios from "axios";
import { styles } from "./style";

const Dashboard = () => {
  const [tab, setTab] = useState("Data Terbaru");
  const [notif, setNotif] = useState(0);
  const [siswa, setSiswa] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Dashboard"));
    dispatch(pageActive("Dashboard"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const getNotif = async () => {
    const response = await axios.get("http://localhost:5000/dashboard");
    let newArr = [];
    for (const element of response?.data) {
      if (element?.newViolation !== null) {
        newArr.push(element);
      }
    }
    if (newArr.length <= 0) {
      setNotif(0);
    } else {
      setNotif(newArr.length);
    }
    setNotif(newArr.length);
  };

  useEffect(() => {
    getNotif();
    const getSiswa = async () => {
      const response = await axios.get("http://localhost:5000/student");
      if (response?.data.length <= 0) {
        setSiswa(0);
      } else {
        setSiswa(response?.data.length);
      }
    };
    getSiswa();
  }, []);

  return (
    <Layout>
      <div className="overflow-auto h-full">
        <BoxInfo perbarui={notif} siswa={siswa} />
        <div className="flex pt-10 pb-3">
          <div
            className={
              tab === "Data Terbaru" ? styles.tabLabelActive : styles.tabLabel
            }
            onClick={() => setTab("Data Terbaru")}
          >
            <h1>Laporan Terbaru</h1>
          </div>
          <div
            className={
              tab === "Perlu Diperbarui"
                ? styles.tabLabelActive
                : styles.tabLabel
            }
            onClick={() => setTab("Perlu Diperbarui")}
          >
            <h1 className={notif > 0 ? styles.notif : null}>
              Perlu Diperbarui
            </h1>
          </div>
        </div>
        {tab === "Data Terbaru" ? (
          <LaporanTerbaru />
        ) : (
          <PerluDiperbarui getNotif={getNotif} />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
