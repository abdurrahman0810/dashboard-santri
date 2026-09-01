import { Link, useParams } from "react-router";

function DetailSantri() {
  const { id } = useParams();

  const santri = [
    {
      id: 1,
      nama: "Aimandd",
      kelas: "XI",
    },
    {
      id: 2,
      nama: "شاسا",
      kelas: "X",
    },
    {
      id: 3,
      nama: "لب",
      kelas: "XII",
    },
  ];

  const dataSantri = santri.find((item) => item.id === Number(id));

  return (
    <div>
      <h1>Detail Santri</h1>

      <p>ID: {dataSantri.id}</p>
      <p>Nama: {dataSantri.nama}</p>
      <p>Kelas: {dataSantri.kelas}</p>

      <Link to="/santri">
        <button>Kembali</button>
      </Link>
    </div>
  );
}

export default DetailSantri;
