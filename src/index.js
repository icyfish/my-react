// MyReact needs to be in scope for JSX to work
import MyReact from "./my-react";

function Counter() {
  const [state, setState] = MyReact.useState(1);
  return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
}

const posts = ["post1", "post2", "post3"];
const App = (
  <div>
    <div>
      {posts.map((post) => (
        <p>{post}</p>
      ))}
    </div>
    <Counter />
  </div>
);

const container = document.getElementById("root");

MyReact.render(App, container);
