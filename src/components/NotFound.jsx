import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <h1>404</h1>

      <h2>Halaman Tidak Ditemukan</h2>

      <p>
        Halaman yang kamu cari tidak tersedia.
      </p>

      <Link to="/">
        <button>Kembali ke Dashboard</button>
      </Link>
    </div>
  );
}

export default NotFound;