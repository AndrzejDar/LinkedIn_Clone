import React from "react";

// import { Counter } from './features/counter/Counter';
import "./App.scss";
import Header from "./Components/Header";
import RightToolbar from "./Components/RightToolbar";
import Feed from "./Components/Feed";
import LeftToolbar from "./Components/LeftToolbar";
import Intro from "./Components/Intro";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";



function App() {
  const user = useSelector(selectUser);

  return (
    <div className="app">

      {user ? (
        <>
      {/* menu - top bar */}
      <div className="app__header">
        <Header user={user}/>
      </div>
        <div className="app__content">
          <LeftToolbar />
          <Feed />
          <RightToolbar />
        </div>
        </>
      ) : (
        <Intro />
      )}
    </div>
  );
}


export default App;
