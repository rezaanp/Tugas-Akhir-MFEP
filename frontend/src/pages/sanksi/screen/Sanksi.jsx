import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tabActive, pageActive, getMe } from "../../../bootstrap/actions";
import ListSanksi from "../components/ListSanksi";

const Sanksi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducers);

  useEffect(() => {
    dispatch(tabActive("Sanksi"));
    dispatch(pageActive("Sanksi"));
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <ListSanksi />
    </Layout>
  );
};

export default Sanksi;
