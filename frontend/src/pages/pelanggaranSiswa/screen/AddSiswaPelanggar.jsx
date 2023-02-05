import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, pageActive, tabActive } from "../../../bootstrap/actions";
import FormAddSiswaPelanggar from "../components/FormAddSiswaPelanggar";

const AddSiswaPelanggar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Pelanggaran Siswa"));
    dispatch(pageActive("Form Pelaporan Siswa"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (!user?.role) {
      navigate("/");
    }
  }, [user, navigate]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <FormAddSiswaPelanggar goBack={goBack} role={user?.role} />
    </Layout>
  );
};

export default AddSiswaPelanggar;
