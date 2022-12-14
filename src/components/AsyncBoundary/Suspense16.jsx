import React from "react";

class Suspense16 extends React.Component {
  mounted = false;
  state = {
    pending: false,
  };
  constructor({ props }) {
    super(props);
  }

  componentDidMount() {
    console.log("mounted");
    this.mounted = true;
  }

  componentWillUnmount() {
    console.log("will unmount");
    this.mounted = false;
  }

  componentDidCatch(err) {
    console.log(this.mounted);
    if (!this.mounted) return;
    console.log(err);
    if (err.suspender instanceof Promise) {
      this.setState({ pending: true });
      if (err.status === "pending") {
        err.suspender
          .then(() => {
            // fullfilled
            this.state.pending && this.setState({ pending: false });
          })
          .catch((e) => {
            // rejected
            this.setState({ pending: false });
            throw e || new Error("Suspense Error");
          });
      }
    } else {
      throw err;
    }
  }

  render() {
    // console.log("pending: ", this.state.pending);
    if (this.state === "pending") {
      return this.props.fallback ?? <h3>로딩중입니다!</h3>;
    } else {
      return this.props.children;
    }
  }
}

export default Suspense16;
