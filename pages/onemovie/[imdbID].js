import useSWR from "swr";
import { useRouter } from "next/router";

import { Button, Descriptions, Spin, Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function MovieDetails({ imdbID }) {
  const router = useRouter();

  const { query } = router;

  const { data, error } = useSWR(
    `http://www.omdbapi.com/?apikey=67b600f&i=${query.imdbID}`,
    fetcher
  );

  const handleBack = () => {
    router.back();
  };

  const BackBtn = ({ onClick }) => (
    <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onClick}>
      Voltar
    </Button>
  );

  <Collapse items={data} defaultActiveKey={["1"]} />;

  if (error) return <div>Falha na requisição...</div>;
  if (!data) return <Spin>Aguarde...</Spin>;

  return (
    <div style={{ padding: 100 }}>
      <BackBtn onClick={handleBack}></BackBtn>
      <h1>{data.Title}</h1>
      <img src={data.Poster} alt={data.Title} style={{ marginBottom: 30 }} />

      <Collapse defaultActiveKey={["2"]}>
        <Panel header="Mostrar sinopse" key="1" style={{ fontSize: 20 }}>
          <p style={{ fontSize: 20 }}>{data.Plot}</p>
        </Panel>
      </Collapse>

      <Descriptions
        title="Informações do filme"
        bordered
        column={1}
        style={{ marginTop: 30 }}
      >
        <Descriptions.Item label="Diretor" style={{ fontSize: 20 }}>
          {data.Director}
        </Descriptions.Item>
        <Descriptions.Item label="Lançamento" style={{ fontSize: 20 }}>
          {data.Released}
        </Descriptions.Item>
        <Descriptions.Item label="Duração" style={{ fontSize: 20 }}>
          {data.Runtime}
        </Descriptions.Item>
        <Descriptions.Item label="Gênero" style={{ fontSize: 20 }}>
          {data.Genre}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

async function fetcher(url) {
  console.log(url);

  const res = await fetch(url);
  const json = await res.json();

  return json;
}
