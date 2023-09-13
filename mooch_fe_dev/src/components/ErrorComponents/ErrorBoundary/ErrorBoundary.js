/* eslint-disable */
// https://stackoverflow.com/questions/60198108/react-router-stops-working-when-error-boundary-catches-an-error-in-route
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.prevPath = null;
  }

  static getDerivedStateFromError(error) {
    console.log('hello');
    return { hasError: true };
  }

  componentDidMount() {
    this.prevPath = window.location.pathname;
    console.log(this.prevPath);
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  componentDidUpdate() {
    console.log('hehehehehhehehehhehee');
    if (window.location.pathname !== this.prevPath) {
      this.setState({ error: null, errorInfo: null });
      this.prevPath = window.location.pathname;
    }
  }

  render() {
    // const { hasError } = this.state;
    console.log(this.state);
    if (this.state.hasError) {
      console.log('ifi iifif', this.props);
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
