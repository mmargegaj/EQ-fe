import React, { useEffect, useState } from "react";
import socket from "./socket";

const TextInfo = () => {
  const [textInfo, setTextInfo] = useState([]);

  const handlePredictionInfo = (successfulPrediction) => {
    setTextInfo((prevState) => {
      if (
        !prevState.includes(successfulPrediction.earthquake.text) &&
        !prevState.includes(successfulPrediction.prediction.text)
      ) {
        return prevState.length < 20
          ? [
              ...prevState,
              successfulPrediction.earthquake.text,
              successfulPrediction.prediction.text,
            ]
          : [
              ...prevState.slice(2),
              successfulPrediction.earthquake.text,
              successfulPrediction.prediction.text,
            ];
      }
      return prevState;
    });
  };

  useEffect(() => {
    socket.addEventListener("successful_prediction", (successfulPrediction) =>
      handlePredictionInfo(successfulPrediction)
    );
  }, []);

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
