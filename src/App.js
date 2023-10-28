import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Earth from "./Earth";

const App = () => {
  const socket = io("http://localhost:3002");
  const [predictions, setPredictions] = useState([]);
  const [textInfo, setTextInfo] = useState([]);

  useEffect(() => {
    // Event listeners
    socket.on("predictionInfo", (newPrediction) => {
      setPredictions((prevState) => [
        ...prevState,
        {
          ...newPrediction.prediction,
          maxR: 4,
          propagationSpeed: 1,
          repeatPeriod: 3000,
        },
      ]);

      setTextInfo((prevState) => [...prevState, newPrediction.text]);
    });

    socket.on("eqInfo", (earthquakeInfo) => {
      setTextInfo((prevState) => [...prevState, earthquakeInfo.text]);
    });
  }, [predictions, socket]);

  return (
    // <div className="App">
    <div className="container">
      <div className="left-side">
        <Earth predictions={predictions} />
      </div>
      <div className="right-side">
        {textInfo.length ? (
          <div className="text-info-container">
            {textInfo.map((text, index) => (
              <div key={index} className="text-box">
                {text}
              </div>
            ))}
          </div>
        ) : (
          <div className="waiting-message">
            No info available yet... Waiting...
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default App;
