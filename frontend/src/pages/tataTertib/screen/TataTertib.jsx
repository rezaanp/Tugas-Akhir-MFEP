import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";
import ListTataTertib from "../components/ListTataTertib";

const TataTertib = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Tata Tertib"));
    dispatch(pageActive("Tata Tertib"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <ListTataTertib />
    </Layout>
  );
};

export default TataTertib;
