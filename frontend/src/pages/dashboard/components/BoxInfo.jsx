import React from "react";
import { FaUserFriends, FaFileSignature } from "react-icons/fa";
import { styles } from "../screen/style";

const BoxInfo = ({ perbarui, siswa }) => {
  return (
    <div className={styles.boxWrap}>
      <div className={styles.boxContentWrapYlw}>
        <h1 className={styles.boxTitle}>Jumlah Siswa Pelanggar</h1>
        <div className={styles.boxCountWrap}>
          <FaUserFriends className={styles.boxLogo} color="#4b5563" />
          <h1 className={styles.boxCount}>{siswa}</h1>
        </div>
      </div>
      <div className={styles.boxContentWrapPrp}>
        <h1 className={styles.boxTitle}>Laporan Yang Harus Diperbarui</h1>
        <div className={styles.boxCountWrap}>
          <FaFileSignature className={styles.boxLogo} color="#4b5563" />
          <h1 className={styles.boxCount}>{perbarui}</h1>
        </div>
      </div>
    </div>
  );
};

export default BoxInfo;
