import { useState } from "react";

function DashboardSantri() {
  const [Kamu] = useState("Santri Abu Dzar");

  return (
    <div>
      <h1>Dashboard Santri</h1>

      <p>Selamat datang di Dashboard Santri.</p>

   
      <p> Selamat Datang:{Kamu}</p>
    </div>
  );
}

export default DashboardSantri;
