import React from "react";

const TextInfo = ({ textInfo }) => (
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
      <div className="waiting-message">No info available yet... Waiting...</div>
    )}
  </div>
);

export default TextInfo;
