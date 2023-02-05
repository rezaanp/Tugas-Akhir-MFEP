import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPrinterFill } from "react-icons/bs";
import { RiEditBoxFill, RiDeleteBin2Fill, RiAlertFill } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import SMP from "../../../assets/smp23.png";

const ListDetailPelanggaran = () => {
  const { id } = useParams();
  let componentRef = useRef();
  const [criterias, setCriterias] = useState([]);
  const [listPunishments, setListPunishments] = useState([]);
  const [studentPunishment, setStudentPunishment] = useState("");
  const [dataProfile, setDataProfile] = useState({
    name: "",
    kelas: "",
    gender: "",
  });
  const [listViolations, setListViolations] = useState([]);
  const [alert, setAlert] = useState(false);
  const [uuid, setUuid] = useState("");
  const [mfep, setMfep] = useState(0);
  const [date, setDate] = useState("");

  //get Profile Student & get List Criteria
  useEffect(() => {
    const getProfileStudent = async () => {
      const response = await axios.get(`http://localhost:5000/student/${id}`);
      setDataProfile({
        name: response?.data?.name,
        kelas: response?.data?.kelas,
        gender: response?.data?.gender,
      });
    };

    const getDataCriteria = async () => {
      const response = await axios.get(`http://localhost:5000/criteria`);
      setCriterias(response?.data);
    };

    const getDataPunishment = async () => {
      const response = await axios.get(`http://localhost:5000/punishment`);
      setListPunishments(response?.data);
    };
    getProfileStudent();
    getDataCriteria();
    getDataPunishment();
  }, [id]);

  //get list violation student
  const getViolationStudent = async () => {
    const cacheData = [];
    const response = await axios.get(
      `http://localhost:5000/all-violation/${id}`
    );
    for (const key in response?.data) {
      if (response?.data[key]?.sub_criterium !== null) {
        cacheData.push({
          uuid: response?.data[key]?.uuid,
          account: response?.data[key]?.account?.name,
          createAt: response?.data[key]?.createdAt,
          criteriaId: response?.data[key]?.sub_criterium?.criteriaId,
          criteriaCode: response?.data[key]?.sub_criterium?.criterion?.code,
          criteriaName: response?.data[key]?.sub_criterium?.criterion?.name,
          criteriaWeight: response?.data[key]?.sub_criterium?.criterion?.weight,
          subCode: response?.data[key]?.sub_criterium?.code,
          subName: response?.data[key]?.sub_criterium?.name,
          subWeight: response?.data[key]?.sub_criterium?.weight,
        });
      }
    }
    setListViolations(cacheData);
  };

  useEffect(() => {
    getViolationStudent();
  }, []);

  const roundNum = (num) => {
    let x = +(Math.round(num + "e+2") + "e-2");
    return x;
  };

  useEffect(() => {
    let totalMfep = 0;
    if (criterias.length) {
      for (const x in criterias) {
        let totalCriteria = 0;
        if (listViolations.length) {
          for (const y in listViolations) {
            if (criterias[x].id === listViolations[y]?.criteriaId) {
              totalCriteria += listViolations[y]?.subWeight;
            }
          }
          totalMfep += totalCriteria * criterias[x]?.weight;
        }
      }
    }
    setMfep(roundNum(totalMfep));

    let studentPunishment;
    if (listPunishments.length) {
      for (const x in listPunishments) {
        if (
          totalMfep >= listPunishments[x]?.minWeight &&
          totalMfep <= listPunishments[x]?.maxWeight
        ) {
          studentPunishment = listPunishments[x]?.name;
        }
      }
    }
    setStudentPunishment(studentPunishment ?? "Tidak Dapat Menemukan Sanksi");
  }, [criterias, listViolations, listPunishments]);

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    setDate(today);
  }, []);

  const deleteData = (uuid) => {
    setAlert(true);
    setUuid(uuid);
  };

  const deleteAgree = async () => {
    await axios.delete(`http://localhost:5000/student-violation/${uuid}`);
    setAlert(!alert);
    getViolationStudent();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `LAPORAN_${dataProfile?.name.toLocaleUpperCase()}_${dataProfile?.kelas.toLocaleUpperCase()}`,
  });

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="order-2 md:order-1">
          <h1 className="font-medium text-base">
            NAMA<span className="ml-[97px] mr-[39px]">:</span>
            {dataProfile?.name.toUpperCase()}
          </h1>
          <h1 className="font-medium text-base ">
            KELAS<span className="ml-[100px] mr-[39px]">:</span>
            {dataProfile?.kelas.toUpperCase()}
          </h1>
          <h1 className="font-medium text-base ">
            JENIS KELAMIN<span className="ml-[32px] mr-[39px]">:</span>
            {dataProfile?.gender.toUpperCase()}
          </h1>
        </div>
        <div className="flex items-center justify-center w-24 h-24 bg-red-600 rounded-full mr-10 order-1 md:order-2 my-2 md:my-0">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white">
            <h1 className="font-bold text-lg text-gray-900">{mfep}</h1>
          </div>
        </div>
      </div>
      <h1 className="font-semibold text-base  text-red-500 mt-2">
        SANKSI<span className="ml-[90px] mr-[39px]">:</span>
        {studentPunishment.toUpperCase()}
      </h1>
      <div className="flex justify-end mt-2 lg:mr-10 cursor-pointer">
        <div
          className="py-3 px-5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 flex gap-3 items-center"
          onClick={handlePrint}
        >
          <h1>Print</h1>
          <BsFillPrinterFill size={20} />
        </div>
      </div>

      <div className={styles.tableContainer}>
        {/* modlaDelete */}
        <div className={alert ? styles.alertOn : styles.alertOff}>
          <div className={styles.alertWrap}>
            <div className={styles.verifWrap}>
              <RiAlertFill size={60} color="#FF1E1E" />
              <h1 className={styles.alertVerif}>Apakah Anda Yakin ?</h1>
            </div>
            <div className={styles.alertButtonWrap}>
              <button
                onClick={() => setAlert(!alert)}
                className={styles.alertCancel}
              >
                Batal
              </button>
              <button onClick={deleteAgree} className={styles.alertDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
        {/* modlaDelete */}
        {criterias.map((criteria, index) => {
          let total = 0;
          return (
            <div key={criteria?.id}>
              <div className="shadow-md rounded-xl border-2 mb-8 border-slate-500">
                <div className="p-3 bg-amber-200 rounded-t-xl">
                  <h1 className="font-bold text-base">
                    &#40; {criteria?.code} &#41; -{" "}
                    {criteria?.name.toUpperCase()} : {criteria?.weight}
                  </h1>
                </div>
                <table className={styles.tableWrap}>
                  <thead>
                    <tr>
                      <th className="border-b border-sky-500 py-3 text-center bg-sky-500 text-white">
                        Aksi
                      </th>
                      <th className="border-b border-sky-500 py-3 text-center bg-sky-500 text-white">
                        Kode
                      </th>
                      <th className="border-b border-sky-500 py-3 text-start bg-sky-500 text-white md:w-1/2 pr-4">
                        Pelanggaran
                      </th>
                      <th className="border-b border-sky-500 py-3 text-start bg-sky-500 text-white">
                        Pelapor
                      </th>
                      <th className="border-b border-sky-500 py-3 text-start bg-sky-500 text-white">
                        Laporan Dibuat
                      </th>
                      <th className="border-b border-sky-500 py-3 text-center bg-sky-500 text-white">
                        Bobot
                      </th>
                    </tr>
                  </thead>
                  {listViolations.map((violation, index) => {
                    if (criteria?.id === violation?.criteriaId) {
                      total += violation?.subWeight;
                      return (
                        <tbody key={violation?.uuid}>
                          <tr key={violation?.uuid}>
                            <td className="py-4 border-b-2 border-slate-300">
                              <div className={styles.tableButtonWrap}>
                                <Link
                                  to={`/pelanggaran-siswa/edit/${violation.uuid}`}
                                >
                                  <RiEditBoxFill
                                    color="#354259 "
                                    className="w-7 h-7"
                                  />
                                </Link>
                                <button
                                  onClick={() => deleteData(violation.uuid)}
                                >
                                  <RiDeleteBin2Fill
                                    color="#FF1E1E"
                                    className="w-7 h-7"
                                  />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 text-center border-b-2 border-slate-300">
                              {violation.subCode}
                            </td>
                            <td className="py-4 border-b-2 border-slate-300 pr-4">
                              {violation.subName}
                            </td>
                            <td className="py-4 border-b-2 border-slate-300">
                              {violation.account}
                            </td>
                            <td className="py-4 border-b-2 border-slate-300">
                              {violation.createAt.substring(0, 10)}
                            </td>
                            <td className="py-4 text-center border-b-2 border-slate-300">
                              {violation.subWeight}
                            </td>
                          </tr>
                        </tbody>
                      );
                    } else {
                      return null;
                    }
                  })}
                </table>
                <div className="p-3 bg-sky-200 flex justify-end rounded-b-xl">
                  <h1 className="font-bold text-base mr-5">
                    &#40; {criteria?.code} &#41; : {total} * {criteria?.weight}{" "}
                    ={" "}
                    <span className="text-red-500">
                      {" "}
                      {roundNum(total * criteria?.weight)}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PRINT COMPONENT */}
      <div className="hidden">
        <div ref={componentRef} className="p-10">
          <div className="flex justify-between items-center gap-8">
            <img src={SMP} alt="logo" className="h-24 w-24" />
            <div className="flex items-center flex-col font-tmr">
              <h1 className="font-bold text-xl">SMP NEGERI 23 BALIKPAPAN</h1>
              <h1 className="text-center leading-5">
                Jl.Baitul Makmur RT.59 Kel.Manggar Kec.Balikpapan Timur Kota
                Balikpapan, 76116
              </h1>
              <h1>Email: smpn23balikpapan@gmail.com</h1>
            </div>
            <div className="w-24 h-24"></div>
          </div>
          <div className="border-b border-slate-400 h-[1px] w-full mx-auto mt-2"></div>
          <div className="flex flex-col items-center my-6">
            <h1 className="font-semibold text-base font-tmr leading-4">
              LAPORAN PELANGGARAN SISWA
            </h1>
            <span className="border-b border-black w-[260px] leading-4"></span>
            <h1 className="font-semibold font-tmr text-base leading-4">
              TANGGAL {date}
            </h1>
          </div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-normal font-tmr text-sm leading-5">
                NAMA<span className="ml-[110px] mr-[8px]">:</span>
                {dataProfile?.name.toUpperCase()}
              </h1>
              <h1 className="font-normal font-tmr text-sm leading-5">
                KELAS<span className="ml-[108px] mr-[8px]">:</span>
                {dataProfile?.kelas.toUpperCase()}
              </h1>
              <h1 className="font-normal font-tmr text-sm leading-5">
                JENIS KELAMIN<span className="ml-[48px] mr-[8px]">:</span>
                {dataProfile?.gender.toUpperCase()}
              </h1>
              <h1 className="font-normal font-tmr text-sm text-red-500 mt-2">
                SANKSI<span className="ml-[102px] mr-[8px]">:</span>
                {studentPunishment.toUpperCase()}
              </h1>
            </div>
            <div className="flex items-center justify-center w-[96px] h-[96px] bg-black rounded-full">
              <div className="flex items-center justify-center w-[94px] h-[94px] rounded-full bg-white">
                <h1 className="font-bold font-tmr text-2xl text-red-500">
                  {mfep}
                </h1>
              </div>
            </div>
          </div>
          {criterias.map((criteria, index) => {
            let total = 0;
            return (
              <div key={criteria?.id}>
                <div className="mt-5">
                  <div className="pl-2 bg-gray-100 border-x border-t border-black">
                    <h1 className="font-medium font-tmr text-sm">
                      &#40; {criteria?.code} &#41; -{" "}
                      {criteria?.name.toUpperCase()} : {criteria?.weight}
                    </h1>
                  </div>
                  <table className="w-full table-fixed">
                    <thead>
                      <tr>
                        <th className="border border-black text-center text-black font-medium text-sm font-tmr w-12">
                          Kode
                        </th>
                        <th className="border border-black px-2 text-start text-black font-medium text-sm font-tmr">
                          Pelanggaran
                        </th>
                        <th className="border border-black px-2 text-start text-black font-medium text-sm font-tmr w-32">
                          Pelapor
                        </th>
                        <th className="border border-black px-2 text-start text-black font-medium text-sm font-tmr w-32">
                          Laporan Dibuat
                        </th>
                        <th className="border border-black px-2 text-center text-black font-medium text-sm font-tmr w-14">
                          Bobot
                        </th>
                      </tr>
                    </thead>
                    {listViolations.map((violation, _) => {
                      if (criteria?.id === violation?.criteriaId) {
                        total += violation?.subWeight;
                        return (
                          <tbody key={violation?.uuid}>
                            <tr key={violation?.uuid}>
                              <td className="text-center border border-black font-extralight text-sm font-tmr">
                                {violation.subCode}
                              </td>
                              <td className="px-2 border border-black font-extralight text-sm font-tmr">
                                {violation.subName}
                              </td>
                              <td className="px-2 border border-black font-extralight text-sm font-tmr">
                                {violation.account}
                              </td>
                              <td className="px-2 border border-black font-extralight text-sm font-tmr">
                                {violation.createAt.substring(0, 10)}
                              </td>
                              <td className="text-center border border-black font-extralight text-sm font-tmr">
                                {violation.subWeight}
                              </td>
                            </tr>
                          </tbody>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </table>
                  <div className="">
                    <h1 className="pr-5 bg-gray-100 border-x border-b border-black flex justify-end font-semibold text-sm font-tmr">
                      &#40; {criteria?.code} &#41; : {total} *{" "}
                      {criteria?.weight} ={" "}
                      <span className="text-gray-100">.</span>
                      <span className="text-red-500">
                        {roundNum(total * criteria?.weight)}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex font-normal text-sm font-tmr mt-10 justify-between">
            <div>
              <h1 className="leading-4">Mengetahui,</h1>
              <h1 className="leading-4">Kepala Sekolah</h1>
              <h1 className="leading-4 mt-20 font-semibold">
                Drs. Waluyadi, M.M
              </h1>
              <div className="border-b border-black w-[165px] leading-3"></div>
              <h1>NIP. 19670717 199512 1 003</h1>
            </div>
            <div>
              <h1 className="text-white leading-4">Mengetahui,</h1>
              <h1 className="leading-4">Koord. Kesiswaan</h1>
              <h1 className="leading-4 mt-20 font-semibold">Erliana, S.Pd</h1>
              <div className="border-b border-black w-[165px] leading-3"></div>
              <h1>NIP. 19750513 201001 2 010</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  tableContainer: "h-4/6 overflow-auto border border-slate-300 rounded-md mt-4",
  alertOn:
    "absolute h-full w-full bg-black flex items-center justify-center bg-opacity-40 z-50 top-0 left-0",
  alertOff: "hidden",
  alertWrap: "w-5/6 md:w-3/5 lg:w-1/3 bg-white rounded-xl py-6 px-6",
  verifWrap: "flex items-center gap-3",
  alertVerif: "font-bold",
  alertButtonWrap: "flex items-center gap-3 justify-end mt-7",
  alertCancel: "bg-sky-500 p-2 rounded-md text-white cursor-pointer",
  alertDelete: "bg-red-500 p-2 rounded-md text-white cursor-pointer",
  tableWrap: "w-full border-collapse table-fixed",
  tableTitle:
    "border-b border-sky-500 py-3 px-7 text-start bg-sky-500 text-white",
  tableEven: "py-2",
  tableOdd: "py-4 border-b-2 border-slate-300",
  tableButtonWrap: "flex gap-2 justify-center",
};

export default ListDetailPelanggaran;
