import Globe from "globe.gl";
import { useEffect } from "react";
// import image from "./e.jpg";
import socket from "./socket";

const manipulateDom = () => {
  const div1 = document.querySelector(".scene-container");
  if (div1) {
    // Check if the element has a style property
    if (div1.style) {
      // Remove the 'position' property from the inline styles
      div1.style.removeProperty("position");
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

const Earth = () => {
  const imageUrl = "//unpkg.com/three-globe/example/img/earth-day.jpg";

  useEffect(() => {
    const predictions = [];

    setTimeout(() => manipulateDom(), 0);

    const myDomElement = document.querySelector(".left-side");
    const globe = Globe(myDomElement);
    const colorInterpolator = (t) => `rgba(255,255,255,${1 - t})`;

    globe(myDomElement)
      .globeImageUrl(imageUrl)
      .ringColor(() => colorInterpolator)
      .ringMaxRadius("maxR")
      .ringPropagationSpeed("propagationSpeed")
      .ringRepeatPeriod("repeatPeriod");
    globe.controls().autoRotate = true;
    socket.addEventListener("connect", () => console.log("socket connected"));

    // Event listeners
    socket.addEventListener("successful_prediction", (newPrediction) => {
      predictions.push({
        ...newPrediction.prediction,
        maxR: 4,
        propagationSpeed: 1,
        repeatPeriod: 3000,
      });
      globe.ringsData(predictions);
    });

    // visualize predictions on the globe
    // socket.addEventListener("new_predictions", () => {})
  }, []);
};

export default Earth;
