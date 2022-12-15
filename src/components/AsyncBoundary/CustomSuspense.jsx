import React from "react";

class CustomSuspense extends React.Component {
  mounted = false;
  constructor({ props }) {
    super(props);
    this.state = {
      pending: false,
    };
  }

  componentDidMount() {
    console.log("---- mounted ----");
    this.mounted = true;
  }

  componentWillUnmount() {
    console.log("---- will unmount ----");
    this.mounted = false;
  }

  componentDidCatch(err) {
    if (!this.mounted) return;
    if (err.suspender instanceof Promise) {
      this.setState({ pending: true });
      console.log(err);
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
    const { fallback, children } = this.props;
    const { pending } = this.state;
    if (pending) {
      return fallback ?? <h3>로딩중입니다!</h3>;
    } else {
      return children;
    }
  }
}

export default CustomSuspense;
