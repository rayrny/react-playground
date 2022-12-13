import React from "react";

class Suspense16 extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      pending: false,
    };
  }

  componentDidCatch(err) {
    if (err instanceof Promise) {
      this.setState({ pending: true });
      err
        .then(() => {
          // fullfilled
          this.setState({ pending: false });
        })
        .catch((e) => {
          // rejected
          this.setState({ pending: false });
          throw e;
        });
    } else {
      throw err;
    }
  }

  componentDidUpdate() {}

  render() {
    if (this.state === "pending") {
      return this.props.fallback ?? <h3>로딩중입니다!</h3>;
    } else {
      return this.props.children;
    }
  }
}

export default Suspense16;
