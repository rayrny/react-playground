import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); // props로 errorFallback을 받을 수 있음
    this.state = {
      error: null,
    };
  }

  // static getDerivedStateFromError(error) {
  //   console.log("getDerivedStateFromError");
  //   return { error };
  // }

  componentDidCatch(err, info) {
    console.log("componentDidCatch", err, info);
    this.setState({
      error: err,
    });
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? <h3>에러가 발생했습니다 :(</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
