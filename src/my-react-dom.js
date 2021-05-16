// my-react-dom.js

function render(element, container) {
  // createDOM and set props
  const dom = createDOM(element);

  // render children recursively
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

const MyReactDOM = {
  render,
};

export default MyReactDOM;

function createDOM(element) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((propName) => {
      dom[propName] = element.props[propName];
    });
  
  return dom;
}
