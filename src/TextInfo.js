import React, { useState } from "react";
import socket from "./socket";

const TextInfo = () => {
  const [textInfo, setTextInfo] = useState([]);

  // Event listeners
  socket.on("predictionInfo", (newPrediction) =>
    setTextInfo((prevState) => [...prevState, newPrediction.text])
  );

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
