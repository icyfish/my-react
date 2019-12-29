## React 如何区分 class 和 function 

[Tell A Class from a function](https://overreacted.io/how-does-react-tell-a-class-from-a-function/)

Start: First, we need to understand why it’s important to treat functions and classes differently. Note how we use the new operator when calling a class:


```js
// 如果 Greeting 是函数式组件, 在react内部会被这样调用
const result = Greeting(props); // <p>Hello</p>

// 如果 Greeting 是 class 件, 在react内部会被这样调用
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

过去 JavaScript 中没有类的概念. 但是我们可以在函数调用时加上`new`关键字, 这样就能实现和类差不多的效果

```js
// 只是一个函数
function Person(name) {
  this.name = name;
}

var fred = new Person('Fred'); // ✅ Person {name: 'Fred'}
var george = Person('George'); // 🔴 不会起作用, 
// 如果将代码在控制台执行, 会发现 this 指向全局 window.name 是 George
```

**使用 `new` 调用函数时函数做了些什么**

在调用函数时添加`new`, 相当于告诉JS, `Person`虽然只是个函数, 但是我们可以把它看做类构造器. 此时JS就会创建一个`{}`对象然后`Person`中的`this`值指向该对象, 同时将`name`作为该对象的属性, 并且`return`出该对象.

同时, 对象`fred`还可以获取到`Person.prototype`关联的属性.

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log('Hi, I am ' + this.name);
}

var fred = new Person('Fred');
fred.sayHi();
```

在JS不原生支持`class`之前, 开发者就是通过这种方式模拟类的.

`new` 关键字存在已久, 而`class`的支持是近段时间的事了. 现在我们使用`class`改写先前的代码.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert('Hi, I am ' + this.name);
  }
}

let fred = new Person('Fred');
fred.sayHi();
```

在设计编程语言和API时, 抓住用户的痛点是十分重要的.

开发者在编写函数时, JavaScript 无法猜测到函数是单纯被调用还是在之前加关键词`new`调用. 
因此开发者在调用类似`Person`这样的构造函数时, 务必记得在前面添加`new`关键字, 否则就会
给程序引入一些令人疑惑的bug.

有了**Class 语法**之后, 当我们用Class语法声明一个构造函数却不使用`new`来调用时, JavaScript
就会抛出错误.

```js
let fred = new Person('Fred');
// ✅  If Person is a function: works fine
// ✅  If Person is a class: works fine too

let george = Person('George'); // We forgot `new`
// 😳 If Person is a constructor-like function: confusing behavior
// 🔴 If Person is a class: fails immediately
```

这样一来, 我们就避免写出造成许多隐藏bug的代码. 

不过同时也由于这个原因, React 在调用任何class component 的时候, 就必须在之前加上`new`关键字, 否则的话 JavaScript 就会抛出异常.

```js
class Counter extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// 🔴 React 无法这样做
const instance = Counter(props);
```

那么 React 是如何解决这个问题的呢? 大多数开发者在使用React时会同时使用`Babel`来编译最新语法的代码以兼容旧版本的浏览器. 因此我们把解决方案的头绪放在了编译器上.

在前几个版本的`Babel`中, classes 可以不需要声明`new`关键字直接调用, 但是这个问题很快被`Babel`团队修复了, 我们来看一下他们的修复方式:

```js
function Person(name) {
  // A bit simplified from Babel output:
  if (!(this instanceof Person)) {
    throw new TypeError("Cannot call a class as a function");
  }
  // Our code:
  this.name = name;
}

new Person('Fred'); // ✅ Okay
Person('George');   // 🔴 Cannot call a class as a function
```

这个函数可能对你来说似曾相识, 这个就是`_classCallCheck`方法做的事情.(You can reduce the bundle size by opting into the “loose mode” with no checks but this might complicate your eventual transition to real native classes.)

至此, 我们明白了调用函数时加`new`与不加`new`的区别, 这就是为什么, 在React中, 正确调用组件是多么重要. 如果组件被定义为class组件, React必须在前添加`new`关键字进行调用.

那么React是否可以不依赖任何其他信息区分出组件是函数式组件还是class组件呢?

并不简单. 虽然我们[在 JavaScript 中可以区分出 class 函数和普通函数](https://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function), 但是被`Babel`处理过的代码, 就很难区分了. 对于浏览器来说, 他们都是普通的函数. 

那么 React 是否可以针对每一次调用都加上`new`关键字呢? 答案是否定的.


// TODO: 
With regular functions, calling them with new would give them an object instance as this. It’s desirable for functions written as constructor (like our Person above), but it would be confusing for function components:

对于普通的函数来说

https://overreacted.io/how-does-react-tell-a-class-from-a-function/