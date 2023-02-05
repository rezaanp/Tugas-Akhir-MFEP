import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe, pageActive } from "../../../bootstrap/actions";
import FormEditSanksi from "../components/FormEditSanksi";

const EditSanksi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(pageActive("Edit Sanksi"));
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
      <FormEditSanksi goBack={goBack} />
    </Layout>
  );
};

export default EditSanksi;
