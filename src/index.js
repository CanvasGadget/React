import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
// import Landing from "./Landing";
//import ReactCalendarBase from "./ReactCalendarBase";
import { BrowserRouter } from "react-router-dom";

//ReactDOM.render(<ReactCalendarBase />, document.querySelector("#root"));



ReactDOM.render(
    <BrowserRouter>
      {/* Below will be the landing page to sign in/up  */}
      {/* <Landing/> */}
      {/*  For now, the Main App will be where we start until the Landing Page is finalized   */}
      <App />

    </BrowserRouter>
  
  ,
  document.querySelector("#root")
);
