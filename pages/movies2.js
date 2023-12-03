import Link from "next/link";
import { useState, useEffect } from "react";

export default function Movies() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const apiUrl = `http://www.omdbapi.com/?apikey=67b600f`;

      let queryString = "";
      if (searchTerm) {
        queryString += `&s=${searchTerm}`;
      }
      if (searchYear) {
        queryString += `&y=${searchYear}`;
      }

      const res = await fetch(`${apiUrl}${queryString}`);
      const newData = await res.json();

      setData(newData.Search || []);
      setLoading(false);
    };

    fetchData();
  }, [searchTerm, searchYear]);

  return (
    <div>
      <h1>Pesquise o filme</h1>
      <form>
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
      </form>
      {loading && <p>Loading...</p>}
      <div>
        {data.map((element) => (
          <div key={element.imdbID}>
            <Link href={`/movies/${element.imdbID}`}>
              <img src={element.Poster} alt={element.Title} />
              <p>
                {element.Title} --- {element.Year}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
