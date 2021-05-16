// my-react-dom.js

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };

  nextUnitOfWork = wipRoot;
}

// 存储下一个需要被处理的单元

let nextUnitOfWork = null;
let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false; // 暂停当前执行单元的 flag
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

/**
 * 渲染当前的 fiber, 构造下一个 fiber
 */
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  attachChildToFiber(fiber);

  // 搜寻下一个工作单元: 查询顺序: 子节点 -> 兄弟节点 -> 父节点的兄弟节点
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

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

const attachChildToFiber = (fiber) => {
  const childElements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  // 针对每一个子元素, 都创建一个新的 fiber, 根据情况设置为子节点或者是兄弟节点
  while (index < childElements.length) {
    const element = childElements[index];

    const childFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = childFiber;
    } else {
      prevSibling.sibling = childFiber;
    }

    prevSibling = childFiber;
    index++;
  }
};

const MyReactDOM = {
  render,
};

export default MyReactDOM;
