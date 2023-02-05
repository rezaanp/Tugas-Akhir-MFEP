import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";
import ListSiswa from "../components/ListSiswa";

const PelanggaranSiswa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Pelanggaran Siswa"));
    dispatch(pageActive("Pelanggaran Siswa"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <ListSiswa />
    </Layout>
  );
};

export default PelanggaranSiswa;
