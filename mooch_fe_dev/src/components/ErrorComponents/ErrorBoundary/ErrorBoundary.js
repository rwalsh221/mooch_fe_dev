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
    return { hasError: true };
  }

  componentDidMount() {
    this.prevPath = window.location.pathname;
  }

  componentDidCatch(error, info) {}

  componentDidUpdate() {
    if (window.location.pathname !== this.prevPath) {
      this.setState({ error: null, errorInfo: null });
      this.prevPath = window.location.pathname;
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
