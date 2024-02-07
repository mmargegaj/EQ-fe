import React, { useEffect, useState } from "react";
import socket from "./socket";

const TextInfo = () => {
  const [textInfo, setTextInfo] = useState([]);

  const handlePredictionInfo = (successfulPrediction) => {
    setTextInfo((prevState) => {
      if (
        !prevState.includes(successfulPrediction.prediction.text) &&
        !prevState.includes(successfulPrediction.earthquake.text)
      ) {
        return prevState.length < 20
          ? [
              ...prevState,
              successfulPrediction.prediction.text,
              // Add a delayed entry for successfulPrediction.earthquake.text
            ]
          : [
              ...prevState.slice(2),
              successfulPrediction.prediction.text,
              // Add a delayed entry for successfulPrediction.earthquake.text
        ];
      }
      return prevState;
    });

    // Set a timeout for 5 seconds to add successfulPrediction.earthquake.text
    setTimeout(() => {
      setTextInfo((prevState) => {
        return [
          ...prevState,
          successfulPrediction.earthquake.text,
          ];
      });
      }, 5000);
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
