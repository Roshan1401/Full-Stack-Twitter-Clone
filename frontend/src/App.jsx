import "./App.css";
import LeftBar from "./components/Layout/LeftBar/LeftBar";
import RightBar from "./components/Layout/RightBar/RightBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-black p-6 text-center text-white lg:hidden">
        <div>
          <h1 className="mb-4 text-2xl font-semibold">
            Use desktop for the best experience
          </h1>
          <p className="text-gray-400">
            This site is not developed for mobile devices. Please open it on a
            laptop or desktop.
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
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
      </div>
    </>
  );
}

export default App;
