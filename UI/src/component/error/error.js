import React from "react";
// import './error.css';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div class="wrapper">
            <div class="box">
              <h1>500</h1>
              <p>&#58;&#40;</p>
              <p><a href="/">Go to Home Page</a></p>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}