import * as snabbdom from "snabbdom";
import propsModule from "snabbdom/modules/props";

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule]);

// 缓存真实DOM
let rootVNode = null;

const render = (el, rootDomElement) => {
  if (rootVNode === null) {
    // 首次渲染
    rootVNode = rootDomElement;
  }
  rootVNode = reconcile(rootVNode, el);
};

const MyReactDOM = {
  render
};

export default MyReactDOM;
