// MyReact needs to be in scope for JSX to work
import MyReact from "./my-react";
import MyReactDom from "./my-react-dom";

const Greeting = ({ name }) => <p>Welcome {name}!</p>;

const App = (
  <div>
    <h1 className="primary">MyReact</h1>
    <p>It is about building my own React</p>
    <Greeting name="aaa" />
  </div>
);

MyReactDom.render(App, document.getElementById("root"));
