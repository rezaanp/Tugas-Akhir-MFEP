import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { page } = useSelector((state) => state.activeTabReducers);
  const { user } = useSelector((state) => state.authReducers);
  return (
    <div className={styles.headerWrap}>
      <h1 className={styles.titlPage}>{page}</h1>
      <h1 className={styles.user}>Hi, {user?.name} ❤️</h1>
    </div>
  );
};

const styles = {
  headerWrap:
    "h-110 w-full bg-sky-50 rounded-t-3xl flex flex-col lg:flex-row justify-center lg:justify-between lg:items-center px-5 sm:px-10",
  titlPage:
    "font-normal sm:font-bold text-xl sm:text-2xl sm:tracking-wide sm:leading-none order-2 lg:order-1 select-none",
  user: "font-light sm:font-semibold text-base sm:text-xl sm:tracking-wide order-1 lg:order-2 select-none",
};

export default Header;
