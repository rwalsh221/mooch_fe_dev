/* eslint-disable no-underscore-dangle, class-methods-use-this */

import Validation from './Validation';

class SignUpValidation extends Validation {
  constructor() {
    super();

    this.inputs = {
      registerEmail: 'register-email',
      registerPassword: 'register-password',
      registerPasswordConfirm: 'register-password-confirm',
      registerClientId: 'register-client-id',
      registerClientSecret: 'register-client-secret',
      registerAccessToken: 'register-access-token',
      registerRefreshToken: 'register-refresh-token',
    };

    this.regExp = {
      ...this.regExp,
      stravaAppKeyFormat: /^[a-z0-9]*$/,
      stravaClientIdFormat: /^[0-9]*$/,
    };
  }

  validatePasswordConfirm(input1, input2) {
    if (input1 === input2) {
      return true;
    }
    return false;
  }

  validateStravaAppKeys(input) {
    // const stravaAppKeyFormat = /^[a-z0-9]*$/;

    if (input.match(this.regExp.stravaAppKeyFormat)) {
      return true;
    }

    return false;
  }

  validateStravaClientId(input) {
    // const stravaClientIdFormat = /^[0-9]*$/;

    if (input.match(this.regExp.stravaClientIdFormat)) {
      return true;
    }
    return false;
  }

  validateInputHandler(...inputs) {
    let passwordRef = null;
    for (let i = 0; i < inputs.length; i += 1) {
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
        case this.inputs.registerRefreshToken:
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

export default SignUpValidation;
