import Globe from "globe.gl";
import { useEffect } from "react";
import io from "socket.io-client";
// import image from "./e.jpg";

const socket = io("http://localhost:3002");

const manipulateDom = () => {
  const div1 = document.querySelector(".scene-container");
  if (div1) {
    // Check if the element has a style property
    if (div1.style) {
      // Remove the 'position' property from the inline styles
      div1.style.removeProperty("position");
      console.log("sdfa");
    }
  }
  // Define the XPath expression
  const xpathExpression = "//div[@class='left-side']/div";

  // Use document.evaluate to find the element
  const result = document.evaluate(
    xpathExpression,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  // Check if a matching element was found
  if (result.singleNodeValue) {
    // Access the element and remove the 'position' property from its inline styles
    const element = result.singleNodeValue;
    if (element.style) {
      element.style.removeProperty("position");
    }
  }
};

const Earth = ({ handleTextInfo }) => {
  const imageUrl = "//unpkg.com/three-globe/example/img/earth-day.jpg";
  const colorInterpolator = (t) => `rgba(255,255,255,${1 - t})`;

  useEffect(() => {
    let predictions = [];

    setTimeout(() => manipulateDom(), 0);

    const myDomElement = document.querySelector(".left-side");
    const globe = Globe(myDomElement);

    globe(myDomElement)
      .globeImageUrl(imageUrl)
      .ringColor(() => colorInterpolator)
      .ringMaxRadius("maxR")
      .ringPropagationSpeed("propagationSpeed")
      .ringRepeatPeriod("repeatPeriod");
    globe.controls().autoRotate = true;

    // Event listeners
    socket.on("predictionInfo", (newPrediction) => {
      predictions.push({
        ...newPrediction.prediction,
        maxR: 4,
        propagationSpeed: 1,
        repeatPeriod: 3000,
      });
      handleTextInfo(newPrediction.text);
      globe.ringsData(predictions);
    });

    socket.on("eqInfo", (earthquakeInfo) => {
      console.log(earthquakeInfo.text);
    });
  }, [handleTextInfo]);
};

export default Earth;
