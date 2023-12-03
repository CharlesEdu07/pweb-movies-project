import { useState } from "react";
import useSWR from "swr";
import { Spin, Row, Col, Button } from "antd";
import { TheMovies } from "../movies3";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

async function fetchMovies(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export default function SearchMovies({ key }) {
  const router = useRouter();
  const { query } = router;

  const [url, setUrl] = useState(
    `http://www.omdbapi.com/?apikey=67b600f&s=${query.key}`
  );

  const { data, error } = useSWR(url, fetchMovies);

  const isShowingMovies = url !== "" && !error;

  const handleBack = () => {
    router.back();
  };

  const BackBtn = ({ onClick }) => (
    <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onClick}>
      Voltar
    </Button>
  );

  return (
    <div>
      <BackBtn onClick={handleBack}></BackBtn>
      <Row justify="center" style={{ marginTop: 16 }}>
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
