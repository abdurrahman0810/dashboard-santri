import { Link } from "react-router";

function DaftarSantri() {
  const santri = [
    {
      id: 1,
      nama: "YOU",
      kelas: "XI",
    },
    {
      id: 2,
      nama: "And",
      kelas: "X",
    },
    {
      id: 3,
      nama: "Me",
      kelas: "XII",
    },
  ];

  return (
    <div>
      <h1>Daftar Santri</h1>

      {santri.map((item) => (
        <div key={item.id}>
          <h2>{item.nama}</h2>

          <p>Kelas: {item.kelas}</p>

          <Link to={'/'}>
            <button>
              Klik untuk Kembali ke Menu Utama
            </button>
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default DaftarSantri;