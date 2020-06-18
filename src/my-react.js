import { h } from "snabbdom";

const createElement = (type, props = {}, ...children) => {
  if (type.prototype && type.prototype.isMyReactClassComponent) {
    const componentInstance = new type(props);
    // 存储当前的 vNode实例
    componentInstance.__vNode = componentInstance.render();
    return componentInstance.__vNode;
  }
  props = props || {};
  let dataProps = {};
  let eventProps = {};

  for (let propKey in props) {
    if (propKey.startsWith("on")) {
      const event = propKey.substring(2).toLowerCase();
      eventProps[event] = props[propKey];
    } else {
      dataProps[propKey] = props[propKey];
    }
  }
  // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
  if (typeof type == "function") {
    return type(props);
  }
  // props -> snabbdom's internal text attributes
  // on -> snabbdom's internal event listeners attributes

  // 渲染 List (自己尝试实现的)
  let childrenList = [];
  for (let childrenEle of children) {
    if (Array.isArray(childrenEle)) {
      console.log(childrenEle);
      childrenEle.forEach(item => {
        childrenList.push(item);
      });
    } else {
      childrenList.push(childrenEle);
    }
  }

  return h(type, { props: dataProps, on: eventProps }, childrenList);
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

export default MyReact;
