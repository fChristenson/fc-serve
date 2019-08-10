const React = require("react");
const ReactDom = require("react-dom");
const { BrowserRouter, Route } = require("react-router-dom");

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <h1>Hello world!</h1>} />
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
