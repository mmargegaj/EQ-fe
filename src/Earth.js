import Globe from "globe.gl";
import { useEffect } from "react";
import io from "socket.io-client";
// import image from "./e.jpg";

const Earth = () => {
  const socket = io("http://localhost:3002");

  const imageUrl = "//unpkg.com/three-globe/example/img/earth-day.jpg";
  const colorInterpolator = (t) => `rgba(255,255,255,${1 - t})`;

  useEffect(() => {
    let predictions = [];

    const myDomElement = document.querySelector(".left-side");

    // Event listeners
    socket.on("predictionInfo", (newPrediction) => {
      predictions.push({
        ...newPrediction.prediction,
        maxR: 4,
        propagationSpeed: 1,
        repeatPeriod: 3000,
      });
      console.log(newPrediction.text);
      globe.ringsData(predictions);
    });

    socket.on("eqInfo", (earthquakeInfo) => {
      console.log(earthquakeInfo.text);
    });

    const globe = Globe(myDomElement);
    globe(myDomElement)
      .globeImageUrl(imageUrl)
      .ringColor(() => colorInterpolator)
      .ringMaxRadius("maxR")
      .ringPropagationSpeed("propagationSpeed")
      .ringRepeatPeriod("repeatPeriod");
  }, [socket]);
};

export default Earth;
