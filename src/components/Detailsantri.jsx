import { Link, useParams } from "react-router";

function DetailSantri() {
  const { id } = useParams();

  const santri = [
    {
      id: 1,
      nama: "You",
      kelas: "XI",
    },
    {
      id: 2,
      nama: "and",
      kelas: "X",
    },
    {
      id: 3,
      nama: "Me",
      kelas: "XII",
    },
  ];
}

export default DetailSantri;
