class Validation {
  validated = {
    validatedInputs: false,
    errorObj: {
      inputName: null,
      error: false,
    },
  };

  _setValidationError(input) {
    this.validated.errorObj.inputName = input;
    this.validated.errorObj.error = true;
  }

  validateEmail(input) {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (input.match(emailFormat)) {
      return true;
    } else {
      return false;
    }
  }

  validatePassword(input) {
    const passwordCorrectFormat = /^[A-Za-z0-9]*$/;
    const passwordHasNum = /\d/;
    const passwordHasAlpha = /[A-Z]/i;

    let passwordValid = true;

    if (passwordValid && input.length < 7) {
      passwordValid = false;
    } else if (passwordValid && !input.match(passwordCorrectFormat)) {
      passwordValid = false;
    } else if (passwordValid && !input.match(passwordHasNum)) {
      passwordValid = false;
    } else if (passwordValid && !input.match(passwordHasAlpha)) {
      passwordValid = false;
    }

    return passwordValid;
  }
}

class SignInValidation extends Validation {
  inputs = {
    signInEmail: 'signin-email',
    signInPassword: 'signin-password',
  };

  validateInputHandler(...inputs) {
    for (let i = 0; i < inputs.length; i++) {
      const currentInputId = inputs[i].current.id;
      const currentInputValue = inputs[i].current.value;

      switch (currentInputId) {
        case this.inputs.signInEmail:
          this.validated.validatedInputs =
            this.validateEmail(currentInputValue);
          break;
        case this.inputs.signInPassword:
          this.validated.validatedInputs =
            this.validatePassword(currentInputValue);
          break;
        default:
          this.validated.validatedInputs = false;
      }

      if (this.validated.validatedInputs === false) {
        this._setValidationError(inputs[i].current.name);
        break;
      }
    }

    return this.validated;
  }
}

class SignUpValidation extends Validation {
  inputs = {
    registerEmail: 'register-email',
    registerPassword: 'register-password',
    registerPasswordConfirm: 'register-password-confirm',
    registerClientId: 'register-client-id',
    registerClientSecret: 'register-client-secret',
    registerAccessToken: 'register-access-token',
  };

  validatePasswordConfirm(input1, input2) {
    if (input1 === input2) {
      return true;
    } else {
      return false;
    }
  }

  validateStravaAppKeys(input) {
    const stravaAppKeyFormat = /^[a-z0-9]*$/;

    if (input.match(stravaAppKeyFormat)) {
      console.log('KEY MATCH');
      return true;
    } else {
      console.log('key DONT MATC');
      return false;
    }
  }

  validateStravaClientId(input) {
    const stravaClientIdFormat = /^[0-9]*$/;

    if (input.match(stravaClientIdFormat)) {
      return true;
    } else {
      return false;
    }
  }

  validateInputHandler(...inputs) {
    let passwordRef = null;
    for (let i = 0; i < inputs.length; i++) {
      if (
        passwordRef === null &&
        inputs[i].current.id === this.inputs.registerPassword
      ) {
        passwordRef = inputs[i];
      }
      const currentInputId = inputs[i].current.id;
      const currentInputValue = inputs[i].current.value;
      console.log(currentInputId);
      switch (currentInputId) {
        case this.inputs.registerEmail:
          this.validated.validatedInputs =
            this.validateEmail(currentInputValue);
          break;
        case this.inputs.registerPassword:
          this.validated.validatedInputs =
            this.validatePassword(currentInputValue);
          break;
        case this.inputs.registerPasswordConfirm:
          this.validated.validatedInputs = this.validatePasswordConfirm(
            passwordRef.current.value,
            currentInputValue
          );
          break;
        case this.inputs.registerClientSecret:
        case this.inputs.registerAccessToken:
          this.validated.validatedInputs =
            this.validateStravaAppKeys(currentInputValue);
          break;
        case this.inputs.registerClientId:
          this.validated.validatedInputs =
            this.validateStravaClientId(currentInputValue);
          break;
        default:
          this.validated.validatedInputs = false;
      }

      if (this.validated.validatedInputs === false) {
        this._setValidationError(inputs[i].current.name);
        break;
      }
    }

    return this.validated;
  }
}

export { SignInValidation, SignUpValidation };
