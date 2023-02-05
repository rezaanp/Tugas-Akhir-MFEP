import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageActive, getMe } from "../../../bootstrap/actions";
import FormAddAkun from "../components/FormAddAkun";

const AddAkun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(pageActive("Tambah Akun"));
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
      <FormAddAkun goBack={goBack} />
    </Layout>
  );
};

export default AddAkun;
