import MyReact from "./my-react";
import MyReactDOM from "./my-react-dom";
import Counter from './Counter';

const Greeting = ({ name }) => <p>Welcome {name}!</p>;

const App = (
  <div>
    <h1 className="primary"></h1>
    <p>It is about building your own React in 90 lines of JavaScript</p>
    <Greeting name={"sss"}></Greeting>
		<Counter></Counter>
  </div>
);

MyReactDOM.render(App, document.getElementById("root"));
