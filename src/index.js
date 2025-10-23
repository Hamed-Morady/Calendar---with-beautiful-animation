import React from "react";
import ReactDOM from "react-dom/client";
import Calendar from "./Calendar";

function App() {
  const now = new Date();
  return <Calendar/>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
