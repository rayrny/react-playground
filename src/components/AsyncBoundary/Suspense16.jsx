import React from "react";

class Suspense16 extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      mounted: false,
      pending: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  componentDidCatch(err) {
    console.log(err);
    console.log(this.state.mounted);
    if (!this.mounted) return;
    if (err.suspender instanceof Promise) {
      this.setState({ pending: true });
      err.suspender
        .then(() => {
          // fullfilled
          this.setState({ pending: false });
        })
        .catch((e) => {
          // rejected
          this.setState({ pending: false });
          throw e || new Error("Suspense Error");
        });
    } else {
      throw err;
    }
  }

  render() {
    console.log("pending: ", this.state.pending);
    if (this.state === "pending") {
      return this.props.fallback ?? <h3>로딩중입니다!</h3>;
    } else {
      return this.props.children;
    }
  }
}

export default Suspense16;
