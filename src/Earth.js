import Globe from "globe.gl";
import { useEffect } from "react";
import io from "socket.io-client";
// import image from "./e.jpg";

const filterPredictions = (predictions) => {
  const currentDate = new Date();
  const filteredPredictions = predictions.filter((prediction) => {
    const validUntilDate = new Date(prediction.validUntil);
    return validUntilDate > currentDate;
  });
  return filteredPredictions;
};

const Earth = () => {
  const socket = io("http://localhost:3002");

  const imageUrl = "//unpkg.com/three-globe/example/img/earth-day.jpg";
  const colorInterpolator = (t) => `rgba(255,255,255,${1 - t})`;

  useEffect(() => {
    let predictions = [];

    const myDomElement = document.querySelector(".left-side");

    // Event listener on new earthquake predictions
    socket.on("predictions", (newPredictions) => {
      console.log(predictions.length);
      predictions = filterPredictions(predictions);
      console.log(predictions.length);
      predictions.push(newPredictions);
      globe.ringsData(predictions);
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
