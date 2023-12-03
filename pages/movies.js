import { useState } from "react";
import Link from "next/link";

export default function Movies({ initialData }) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(
      `http://www.omdbapi.com/?apikey=67b600f&s=${searchTerm}&y=${searchYear}`
    );
    const newData = await res.json();

    setData(newData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do filme"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ano"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>{data.Search && data.Search.map(mapping)}</div>
    </div>
  );
}

function mapping(element) {
  return (
    <div key={element.imdbID}>
      <Link href={`/movies/${element.imdbID}`}>
        <img src={element.Poster} alt={element.Title} />
        <p>
          {element.Title} --- {element.Year}
        </p>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=67b600f&s=batman`);

  const initialData = await res.json();

  return {
    props: {
      initialData,
    },
  };
}
