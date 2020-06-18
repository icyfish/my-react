import MyReact from "./my-react";
import MyReactDOM from "./my-react-dom";
import Counter from "./Counter";

const Greeting = ({ name }) => <p>Welcome {name}!</p>;

const list = ["joe", "jane", "jack"];
const App = (
  <div>
    <h1 className="primary">My React</h1>
    <p>It is about building your own React in 90 lines of JavaScript</p>
    {list.map((item, index) => {
      return <Greeting name={item} />;
    })}
    <Greeting name="aaa" />
    <Greeting name="bbb" />
    <Greeting name="ccc" />
    <Counter />
  </div>
);

// const App = <Greeting name="aaa" />;

MyReactDOM.render(App, document.getElementById("root"));
