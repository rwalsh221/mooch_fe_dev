class Validation {
  validated = {
    validatedInputs: false,
    errorObj: {
      inputName: null,
      errorMessage: null,
    },
  };

  _setValidationError(input) {
    const errorName = input.slice(input.indexOf('-') + 1);

    this.validated.errorObj.inputName = input;
    this.validated.errorObj.errorMessage = `${errorName} error`;
  }

  validateEmail(input) {
    console.log('EMAILsssss', input);
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (input.match(emailFormat)) {
      console.log('matches');
      return true;
    } else {
      console.log('dont match');
      return false;
    }
  }

  validatePassword(input) {
    const passwordFormat = /^[A-Za-z0-9]*$/;

    if (input.length >= 7 && input.match(passwordFormat)) {
      return true;
    } else {
      return false;
    }
  }
}

class SignInValidation extends Validation {
  inputs = {
    signInEmail: 'signin-email',
    signInPassword: 'signin-password',
  };

  validateInputHandler(...inputs) {
    console.log(inputs);
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
      return true;
    } else {
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
    console.log(inputs);
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

        case this.inputs.registerClientSecret ||
          this.inputs.registerAccessToken:
          console.log('STRAVA APP KEU');
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
        console.log(this.validated.validatedInputs);
        this._setValidationError(inputs[i].current.name);
        break;
      }
    }

    return this.validated;
  }
}

export { SignInValidation, SignUpValidation };
