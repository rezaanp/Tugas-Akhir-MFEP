import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, pageActive } from "../../../bootstrap/actions";
import FormAddTataTertib from "../components/FormAddTataTertib";

const AddTataTertib = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(pageActive("Tambah Tata Tertib"));
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
      <FormAddTataTertib goBack={goBack} />
    </Layout>
  );
};

export default AddTataTertib;
