import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";
import FormEditSiswaPelanggar from "../components/FormEditSiswaPelanggar";

const EditPelanggaranSiswa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Pelanggaran Siswa"));
    dispatch(pageActive("Edit Pelanggaran Siswa"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <FormEditSiswaPelanggar goBack={goBack} />
    </Layout>
  );
};

export default EditPelanggaranSiswa;
