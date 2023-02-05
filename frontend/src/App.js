import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/sign/screen/Sign";
import Dashboard from "./pages/dashboard/screen/Dashboard";
import PelanggaranSiswa from "./pages/pelanggaranSiswa/screen/PelanggaranSiswa";
import DetailSiswaPelanggar from "./pages/pelanggaranSiswa/screen/DetailSiswaPelanggar";
import EditSiswa from "./pages/pelanggaranSiswa/screen/EditSiswa";
import EditSiswaPelanggar from "./pages/pelanggaranSiswa/screen/EditSiswaPelanggar";
import AddSiswaPelanggar from "./pages/pelanggaranSiswa/screen/AddSiswaPelanggar";
import Kriteria from "./pages/kriteria/screen/Kriteria";
import EditKriteria from "./pages/kriteria/screen/EditKriteria";
import AddKriteria from "./pages/kriteria/screen/AddKriteria";
import TataTertib from "./pages/tataTertib/screen/TataTertib";
import EditTataTertib from "./pages/tataTertib/screen/EditTataTertib";
import AddTataTertib from "./pages/tataTertib/screen/AddTataTertib";
import Sanksi from "./pages/sanksi/screen/Sanksi";
import EditSanksi from "./pages/sanksi/screen/EditSanksi";
import AddSanksi from "./pages/sanksi/screen/AddSanksi";
import Akun from "./pages/akun/screen/Akun";
import EditAkun from "./pages/akun/screen/EditAkun";
import AddAkun from "./pages/akun/screen/AddAkun";
import History from "./pages/history/screen/History";

const App = () => {
  const routes = [
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/pelanggaran-siswa", element: <PelanggaranSiswa /> },
    { path: "/detail-pelanggaran/:id", element: <DetailSiswaPelanggar /> },
    { path: "/pelanggaran-siswa/edit/:id", element: <EditSiswaPelanggar /> },
    { path: "/pelanggaran-siswa/tambah", element: <AddSiswaPelanggar /> },
    { path: "/siswa/edit/:id", element: <EditSiswa /> },
    { path: "/kriteria", element: <Kriteria /> },
    { path: "/kriteria/edit/:id", element: <EditKriteria /> },
    { path: "/kriteria/tambah", element: <AddKriteria /> },
    { path: "/tata-tertib", element: <TataTertib /> },
    { path: "/tata-tertib/edit/:id", element: <EditTataTertib /> },
    { path: "/tata-tertib/tambah", element: <AddTataTertib /> },
    { path: "/sanksi", element: <Sanksi /> },
    { path: "/sanksi/edit/:id", element: <EditSanksi /> },
    { path: "/sanksi/tambah", element: <AddSanksi /> },
    { path: "/akun", element: <Akun /> },
    { path: "/akun/edit/:id", element: <EditAkun /> },
    { path: "/akun/tambah", element: <AddAkun /> },
    { path: "/riwayat", element: <History /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((e) => (
          <Route path={e.path} element={e.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
