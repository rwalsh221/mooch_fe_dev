const errorHandler = (errorState, loadingState, errorStateContent) => {
  errorState(errorStateContent);

  setTimeout(() => {
    loadingState(false);
    errorState(null);
  }, 5000);
};

export default errorHandler;
