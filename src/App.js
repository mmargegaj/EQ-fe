import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Earth from "./Earth";

const App = () => {
  const socket = io("http://localhost:3002");
  const [predictions, setPredictions] = useState([]);
  const [textInfo, setTextInfo] = useState([
    "Earthquake: Cantwell, Alaska 20:55:33 at 62.9971, -149.7862 Magnitude: 1.1 \
     Predicted: Cantwell, Alaska, 21:00:13 at 62.7631, -148.7466. Created at 20:49:39",
    "Earthquake: Cantwell, Alaska 20:55:33 at 62.9971, -149.7862 Magnitude: 1.1 \
     Predicted: Cantwell, Alaska, 21:00:13 at 62.7631, -148.7466. Created at 20:49:39",
  ]);

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
          "No info available yet... Waiting..."
        )}
      </div>
    </div>
    // </div>
  );
};

export default App;
