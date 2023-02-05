import React, { useState } from "react";
import SMP from "../assets/smp23.png";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

const Layout = ({ children }) => {
  const [bar, setBar] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={`bg-sky-400 h-${bar ? "screen" : "full"} w-full sm:w-1/2 ${
          bar ? "translate-x-0" : "-translate-x-[1000px]"
        } z-10 absolute block lg:translate-x-0 top-0 lg:static lg:w-210 2xl:w-2/12 overflow-y-auto overflow-x-hidden transition duration-300 rounded-r-[40px]`}
      >
        <img src={SMP} alt="logo" className={styles.logoSide} />
        <Sidebar />
        <div className={styles.backLogo} onClick={() => setBar(!bar)}>
          <IoIosArrowBack color="#38bdf8" className="w-10 h-10" />
          <IoIosArrowBack color="#38bdf8" className="w-10 h-10" />
        </div>
      </div>
      <div className={styles.mainWrap}>
        <Header />
        <div className={styles.contentWrap}>{children}</div>
        <div className={styles.navLogo} onClick={() => setBar(!bar)}>
          <RiBarChartHorizontalFill color="#f0f9ff" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: "h-screen bg-sky-400 flex py-4 px-2 lg:px-0 lg:pr-4 font-sans",
  sidebarWrap:
    "bg-sky-400 h-full w-full sm:w-1/2 hidden absolute top-0 lg:static lg:block lg:w-210 2xl:w-2/12",
  sidebarWrapOn:
    "bg-sky-400 h-screen w-full sm:w-1/2 block z-10 absolute top-0 lg:static lg:block lg:w-210 2xl:w-2/12 overflow-y-auto overflow-x-hidden",
  logoSide: "h-28 w-28 mx-auto mt-8 mb-7",
  mainWrap: "h-full w-full lg:w-810 2xl:w-10/12 relative lg:static",
  contentWrap:
    "h-910 w-full bg-sky-50 rounded-b-3xl overflow-hidden px-5 sm:px-10",
  backLogo:
    "absolute bottom-20 right-0 translate-x-1/2 sm:hidden p-3 rounded-full bg-sky-50 flex gap-5",
  navLogo:
    "absolute top-5 sm:top-7 right-5 lg:hidden p-2 rounded-full bg-sky-400 cursor-pointer transition bg-sky-500 hover:scale-110 hover:bg-sky-400 duration-300",
};

export default Layout;
