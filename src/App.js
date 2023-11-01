import { useState } from "react";
import "./App.css";
import Earth from "./Earth";
import TextInfo from "./TextInfo";
function App() {
  const [textInfo, setTextInfo] = useState([]);
  const handleTextInfo = (newTextInfo) =>
    setTextInfo((prevState) => [...prevState, newTextInfo]);

  return (
    // <div className="App">
    <div className="container">
      <div className="left-side">
        <Earth handleTextInfo={handleTextInfo} />
      </div>
      <TextInfo textInfo={textInfo} />
    </div>
  );
}

export default App;
