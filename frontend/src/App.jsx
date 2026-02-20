import "./App.css";
import LeftBar from "./components/Layout/LeftBar/LeftBar";
import RightBar from "./components/Layout/RIghtBar/RightBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="main-container">
        <div className="component-container">
          <div className="leftBar">
            <LeftBar />
          </div>
          <main>
            <Outlet />
          </main>
          <div className="rightBar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
