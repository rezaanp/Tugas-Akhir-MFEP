import React, { useState } from "react";
import Wave from "../../../assets/wave.png";
import SMP from "../../../assets/smp23.png";
import Login from "../components/Login";
import Register from "../components/Register";
import { styles } from "./style";

const Sign = () => {
  const [tab, setTab] = useState("login");
  const [hide, setHide] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.bg1}></div>
      <img src={Wave} alt="wave" className={styles.bgWave1} />
      {/* layer2 */}
      <div className={styles.wrapper1}>
        <div className={styles.bg2}></div>
        <img src={Wave} alt="wave" className={styles.bgWave2} />
        {/* layer3 */}
        <div className={styles.wrapper2}>
          <img src={SMP} alt="logo" className={styles.logo} />
          <div className="flex">
            <h1
              className={
                tab === "login" ? styles.tablabelActive : styles.tabLabel
              }
              onClick={() => setTab("login")}
            >
              Login
            </h1>
            <h1
              className={
                tab === "register" ? styles.tablabelActive : styles.tabLabel
              }
              onClick={() => setTab("register")}
            >
              Registrasi
            </h1>
          </div>
          {tab === "login" ? (
            <Login hide={hide} setHide={setHide} />
          ) : (
            <Register />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sign;
