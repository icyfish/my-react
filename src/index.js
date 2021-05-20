// MyReact needs to be in scope for JSX to work
import MyReact from "./my-react";
import MyReactDom from "./my-react-dom";


const container = document.getElementById("root")
const Greeting = ({ name }) => <p>Welcome {name}!</p>;

const updateValue = e => {
  rerender(e.target.value)
}

const rerender = value => {
  const App = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
      <Greeting name="hahaha" />
    </div>
  )
  MyReactDom.render(App, container)
}

rerender("World")