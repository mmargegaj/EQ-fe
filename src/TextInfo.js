import React, { useEffect, useState } from "react";
import socket from "./socket";

const TextInfo = () => {
  const [textInfo, setTextInfo] = useState([]);

  const handlePredictionInfo = (newPrediction) => {
    setTextInfo((prevState) => {
      if (!prevState.includes(newPrediction.text)) {
        return prevState.length < 20
          ? [...prevState, newPrediction.text]
          : [...prevState.slice(1), newPrediction.text];
      }
      return prevState;
    });
  };

  useEffect(() => {
    socket.on("predictionInfo", (newPrediction) =>
      handlePredictionInfo(newPrediction)
    );
  }, []);

  socket.on("eqInfo", (earthquakeInfo) => {});

  return (
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
  );
};

export default TextInfo;
