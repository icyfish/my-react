import MyReact from "./my-react";
import * as snabbdom from "snabbdom";
import propsModule from "snabbdom/modules/props";

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule]);

// 缓存VDOM
let rootVNode = null;

const render = (el, rootDomElement) => {
  if (rootVNode === null) {
    // 首次渲染
    rootVNode = rootDomElement;
  }
  rootVNode = reconcile(rootVNode, el);
};

console.log(MyReact);

// MyReactDOM 告知React 如何更新DOM
MyReact.__updater = componentInstance => {
  // logic on how to update the DOM when you call this.setState

  // get the oldVNode stored in __vNode
  const oldVNode = componentInstance.__vNode;
  // find the updated DOM node by calling the render method
  const newVNode = componentInstance.render();

  // update the __vNode property with updated __vNode
  componentInstance.__vNode = reconcile(oldVNode, newVNode);
};
const MyReactDOM = {
  render
};

export default MyReactDOM;
