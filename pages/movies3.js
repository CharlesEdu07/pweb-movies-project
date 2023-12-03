import useSWR from "swr";
import { useState } from "react";
import { Button, Card, Spin, Row, Col, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const { Meta } = Card;

async function theFetcher(url) {
  if (url === null || url === "") return { Search: "" };

  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export function TheMovies({ data, show }) {
  const router = useRouter();

  if (!show) return <div></div>;

  if (data.error) return <div>Falha na requisição</div>;

  if (!data.Search) return <div></div>;

  return (
    <div>
      {data.Search.map((movie) => (
        <Link href={`/onemovie/${movie.imdbID}`} key={movie.imdbID}>
          <Card
            hoverable
            style={{ width: 240, height: 500, float: "left", margin: 8 }}
            cover={<img alt={movie.Title} src={movie.Poster} />}
          >
            <Meta title={movie.Title} description={movie.Year} />
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function TheLink({ url, handler }) {
  return (
    <div>
      <Button onClick={handler}>
        {url === "" ? "Mostrar filmes" : "Ocultar filmes"}
      </Button>
    </div>
  );
}

export default function Movies3() {
  const [url, setUrl] = useState("");
  const { data, error } = useSWR(url, theFetcher);
  const router = useRouter();

  const isShowingMovies = url !== "" && !error;

  const handleSearch = (searchTerm) => {
    router.push(`/searchmovies/${searchTerm}`);
  };

  return (
    <div>
      <h2>Busca de filmes</h2>
      <Row justify="center" style={{ marginTop: 16 }}>
        <Col span={8}>
          <Input.Search
            placeholder="Digite o termo de pesquisa"
            onSearch={handleSearch}
          />
        </Col>
        <Col span={16}>
          {isShowingMovies && (
            <Spin
              spinning={!data}
              tip="Carregando..."
              style={{ marginTop: 24 }}
            >
              <TheMovies
                data={data ? data : { Search: "" }}
                show={url !== ""}
              />
            </Spin>
          )}
          {error && (
            <div style={{ marginTop: 20, color: "blue", fontSize: 16 }}>
              Erro na pesquisa
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
