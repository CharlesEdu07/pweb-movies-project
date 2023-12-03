import React, { useEffect, useState } from "react";

const ExtremeIP = () => {
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    getIpInfo();
  }, []);

  function getIpInfo() {
    var url = "https://extreme-ip-lookup.com/json/?key=demo2";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Houve um erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayInfo(data);
      })
      .catch((error) => {
        console.error(`Houve um erro de rede: ${error.message}`);
      });
  }

  function displayInfo(data) {
    setIpInfo(data);
  }

  return (
    <div>
      <h1>Informações de Localização</h1>
      <div id="info-container">
        {ipInfo ? (
          <>
            {
              <ul>
                <li>
                  <span>País:</span> {ipInfo.country}
                </li>
                <li>
                  <span>Cidade:</span> {ipInfo.city}
                </li>
                <li>
                  <span>Latitude:</span> {ipInfo.lat}
                </li>
                <li>
                  <span>Longitude:</span> {ipInfo.lon}
                </li>
                <li>
                  <span>Endereço IP:</span> {ipInfo.query}
                </li>
              </ul>
            }
          </>
        ) : (
          <span>Aguarde...</span>
        )}
      </div>
    </div>
  );
};

export default ExtremeIP;
