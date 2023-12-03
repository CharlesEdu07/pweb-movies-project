import useSWR from "swr";
import { useRouter } from "next/router";

export default function MovieDetails({ imdbID }) {
  const router = useRouter();

  const { query } = router;

  const { data, error } = useSWR(
    `http://www.omdbapi.com/?apikey=67b600f&i=${query.imdbID}`,
    fetcher
  );

  if (error) return <div>Falha na requisição...</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{data.Title}</h1>
      <img src={data.Poster} alt={data.Title} />
      <p>{data.Plot}</p>
    </div>
  );
}

async function fetcher(url) {
  console.log(url);

  const res = await fetch(url);
  const json = await res.json();

  return json;
}
