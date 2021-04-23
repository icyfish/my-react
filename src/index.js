// MyReact needs to be in scope for JSX to work
import MyReact from "./my-react";
import MyReactDom from "./my-react-dom";

const Greeting = ({ name }) => <p>Welcome {name}!</p>;

const list = ["joe", "jane", "jack"];
const App = (
  <div>
    <h1 className="primary">MyReact is Quick and dirty react</h1>
    <p>It is about building your own React in 90 lines of JavaScript</p>

    {/* {list.map((item, index) => {
      return <Greeting name={item} />;
    })}
    <Greeting name="aaa" />
    <Greeting name="bbb" />
    <Greeting name="ccc" />
    <Counter /> */}
  </div>
);

MyReactDom.render(App, document.getElementById("root"));
