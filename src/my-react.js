import { h } from "snabbdom";

const createElement = (type, props = {}, ...children) => {
  if (typeof type === "function") {
		console.log(type);
		// https://overreacted.io/how-does-react-tell-a-class-from-a-function/
    return type(props);
  }
  return h(type, { props }, children);
};

class Component {
  constructor() {}

  componentDidMount() {}

  setState(partialState) {}

  render() {}
}

// to be exported like React.createElement
const MyReact = {
  createElement,
  Component
};

export default MyReact;
