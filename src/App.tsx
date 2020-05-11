import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

export const App = () => {
  return (
    <div className="b2c-container">
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
