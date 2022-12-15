import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); // props로 errorFallback을 받을 수 있음
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(err, info) {
    console.log("componentDidCatch", err, info);
    this.setState({
      error: err,
    });
  }

  // resetErrorBoundary() {
  //   this.setState({ error: null });
  // }

  render() {
    const { fallback, children } = this.props;
    const { error } = this.state;
    if (error) {
      return fallback ?? <h3>에러가 발생했습니다 :(</h3>;
    }
    return children;
  }
}

export default ErrorBoundary;
