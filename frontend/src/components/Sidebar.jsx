import React from "react";
import {
  MdOutlineDashboard,
  MdOutlineSupervisorAccount,
  MdHistory,
} from "react-icons/md";
import { GoBook } from "react-icons/go";
import { ImHammer2, ImList2 } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reset } from "../bootstrap/actions";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(reset());
    navigate("/");
  };
  const { tab } = useSelector((state) => state.activeTabReducers);
  const { user } = useSelector((state) => state.authReducers);

  return (
    <div>
      {user?.role === "admin" ? (
        <>
          <NavLink
            to={"/dashboard"}
            className={
              tab === "Dashboard" ? styles.sidebarActive : styles.sidebar
            }
          >
            <MdOutlineDashboard size={26} color="#fde047" />
            Dashboard
          </NavLink>
          <NavLink
            to={"/pelanggaran-siswa"}
            className={
              tab === "Pelanggaran Siswa"
                ? styles.sidebarActive
                : styles.sidebar
            }
          >
            <MdOutlineSupervisorAccount size={26} color="#fde047" />
            Pelanggaran Siswa
          </NavLink>
          <NavLink
            to={"/kriteria"}
            className={
              tab === "Kriteria" ? styles.sidebarActive : styles.sidebar
            }
          >
            <ImList2 size={20} color="#fde047" />
            Kriteria
          </NavLink>
          <NavLink
            to={"/tata-tertib"}
            className={
              tab === "Tata Tertib" ? styles.sidebarActive : styles.sidebar
            }
          >
            <GoBook size={26} color="#fde047" />
            Tata Tertib
          </NavLink>
          <NavLink
            to={"/sanksi"}
            className={tab === "Sanksi" ? styles.sidebarActive : styles.sidebar}
          >
            <ImHammer2 size={23} color="#fde047" />
            Sanksi
          </NavLink>
          <NavLink
            to={"/akun"}
            className={tab === "Akun" ? styles.sidebarActive : styles.sidebar}
          >
            <FaRegUser size={20} color="#fde047" />
            Akun
          </NavLink>
          <div onClick={logOut} className={styles.sidebar}>
            <RiLogoutBoxLine size={24} color="#fde047" />
            Logout
          </div>
        </>
      ) : user?.role === "user" ? (
        <>
          <NavLink
            to={"/pelanggaran-siswa/tambah"}
            className={
              tab === "Pelanggaran Siswa"
                ? styles.sidebarActive
                : styles.sidebar
            }
          >
            <MdOutlineSupervisorAccount size={26} color="#fde047" />
            Laporkan Siswa
          </NavLink>
          <NavLink
            to={"/riwayat"}
            className={
              tab === "Riwayat" ? styles.sidebarActive : styles.sidebar
            }
          >
            <MdHistory size={26} color="#fde047" />
            Riwayat Laporan
          </NavLink>
          <div onClick={logOut} className={styles.sidebar}>
            <RiLogoutBoxLine size={24} color="#fde047" />
            Logout
          </div>
        </>
      ) : null}
    </div>
  );
};

const styles = {
  sidebar:
    "pl-5 py-3 font-bold cursor-pointer text-sky-50 flex items-center gap-3 hover:text-yellow-300 border-l-4 border-transparent",
  sidebarActive:
    "pl-5 py-3 font-bold cursor-pointer text-sky-50 flex items-center gap-3 text-yellow-300 border-l-4 border-yellow-300",
  sidebarCat:
    "pl-6 py-3 font-bold cursor-pointer text-sky-50 flex items-center gap-3 hover:text-yellow-300 border-l-4 border-transparent",
};

export default Sidebar;
