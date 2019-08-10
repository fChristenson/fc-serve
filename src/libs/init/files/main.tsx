import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <h1>Hello world!</h1>} />
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
