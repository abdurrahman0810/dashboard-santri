import { Link } from "react-router";

function About() {
  return (
    <div>
      <h1>Tentang Pondok</h1>

      <p>Website Dashboard Santri</p>

      <p>
        Website ini dibuat sebagai latihan menggunakan
        React Router.
      </p>

      <Link to="/">
      <button className="">Klik untuk kembali ke dashboard</button>
      </Link>
    </div>
  );
}

export default About;