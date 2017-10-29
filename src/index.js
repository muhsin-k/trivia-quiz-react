import React from "react";
import { render } from "react-dom";
import "./css/style.css";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Home from "./components/Home";
import Category from "./components/Category";
import { BrowserRouter, Match, Miss } from "react-router";

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Login} />
        <Match pattern="/login" component={Login} />
        <Match pattern="/category/:username" component={Category} />
        <Match pattern="/home/:username/:id/:count" component={Home} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
};

render(<Root />, document.querySelector("#main"));
