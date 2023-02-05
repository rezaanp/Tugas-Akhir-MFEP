import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";

import ListAkun from "../components/ListAkun";

const Akun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Akun"));
    dispatch(pageActive("Akun"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <ListAkun />
    </Layout>
  );
};

export default Akun;
