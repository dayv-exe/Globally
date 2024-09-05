import { useSelector } from "react-redux";
import "./App.css";
import Aside from "./Components/Aside";
import Main from "./Components/Main";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  function fitToScreen() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    fitToScreen();
  });

  return (
    <div className={`app ${theme}-background`}>
      <div
        className={`content ${theme}-background flex-start-space-between-row`}
      >
        <div className="left">
          <Main />
        </div>
        <div className="right">
          <Aside />
        </div>
      </div>
    </div>
  );
}

export default App;
