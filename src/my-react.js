import { h } from "snabbdom";

const createElement = (type, props = {}, ...children) => {
  if (type.prototype && type.prototype.isMyReactClassComponent) {
    const componentInstance = new type(props);

    // 存储当前的 vNode实例
    componentInstance.__vNode = componentInstance.render();
    return componentInstance.__vNode;
  }
  // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
  if (typeof type == "function") {
    return type(props);
  }
  return h(type, { props }, children);
};

class Component {
  constructor() {}

  componentDidMount() {}

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState
    };
    // 通知到 MyReactDOM
    MyReact.__updater(this);
  }

  render() {}
}

Component.prototype.isMyReactClassComponent = true;

// to be exported like React.createElement
const MyReact = {
  createElement,
  Component
};

console.log(MyReact);

export default MyReact;
