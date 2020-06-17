// file: src/counter.js
import MyReact from "./my-react";

export default class Counter extends MyReact.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
    // update the count every second
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  render() {
    return <p>Count: {this.state.count}</p>;
  }
}
