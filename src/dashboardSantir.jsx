import React, { useEffect, useState } from "react";

function DashboardSantir() {
  const [nama, setnama] = useState("Ahmad");
  const [angka, setangka] = useState(0);
  const [status, tipestatus] = useState(false);
  useEffect(() => {
    console.log("Dashboard santri berhasil di jalankan");
  }, []);

  useEffect(() => {
    console.log("Jumlah angka yang di hasilkan:", angka);
    document.title = `Angka:  ${angka}`;
  }, [angka]);

 

  const tambahangka = () => {
    setangka(angka + 1);
    tipestatus(true);
  };
  return (  
    <>
      <div className="flex flex-col justify-center items-center bg-[#064E3B]">
        <div className="bg-[#064E3B]">
          <h1 className="text-[#20a481] text-2xl">Dashboard-santri</h1>
        </div>
        <div>
          <input
            value={nama}
            onChange={(event) => setnama(event.target.value)}
            className="w-40 h-10 border border-green-200 mt-10 rounded-2xl pl-14"
          />
        </div>
        <button
          onClick={tambahangka}
          className="bg-white hover:bg-slate-100 text-slate-900 m-2 rounded-2xl px-4 py-2"
        >
          Tambah
        </button>
        <p>Angka: {angka}</p>

        <p>
          status:{""}
          {status ? "angka sudah berubah" : "angka belum berubah"}
        </p>
      </div>
      <h2 className=" text-white font-bold text-4xl">
        {" "}Halo , {nama}
      </h2>
    </>
  );
}

export default DashboardSantir;
