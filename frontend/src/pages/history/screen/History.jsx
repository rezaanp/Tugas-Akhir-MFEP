import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";

import ListHistory from "../components/ListHistory";

const History = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Riwayat"));
    dispatch(pageActive("Riwayat Laporan Anda"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "user") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <ListHistory />
    </Layout>
  );
};

export default History;
