/* eslint-disable no-underscore-dangle */

class Validation {
  constructor() {
    this.validated = {
      validatedInputs: false,
      errorObj: {
        inputName: null,
        error: false,
      },
    };

    this.regExp = {
      emailFormat: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      passwordFormat: /^[A-Za-z0-9]*$/,
      passwordHasNum: /\d/,
      passwordHasAlpha: /[A-Z]/i,
    };
  }

  _setValidationError(input) {
    this.validated.errorObj.inputName = input;
    this.validated.errorObj.error = true;
  }

  validateEmail(input) {
    // const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (input.match(this.regExp.emailFormat)) {
      return true;
    }
    return false;
  }

  validatePassword(input) {
    // const passwordCorrectFormat = /^[A-Za-z0-9]*$/;
    // const passwordHasNum = /\d/;
    // const passwordHasAlpha = /[A-Z]/i;

    let passwordValid = true;

    if (passwordValid && input.length < 7) {
      passwordValid = false;
    } else if (passwordValid && !input.match(this.regExp.passwordFormat)) {
      passwordValid = false;
    } else if (passwordValid && !input.match(this.regExp.passwordHasNum)) {
      passwordValid = false;
    } else if (passwordValid && !input.match(this.regExp.passwordHasAlpha)) {
      passwordValid = false;
    }

    return passwordValid;
  }
}

export default Validation;
