/* eslint-disable */
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log('hello');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
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
