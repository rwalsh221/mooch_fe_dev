/* eslint-disable no-underscore-dangle */

import Validation from './Validation';

class SignInValidation extends Validation {
  constructor() {
    super();

    this.inputs = {
      signInEmail: 'signin-email',
      signInPassword: 'signin-password',
    };
  }

  validateInputHandler(...inputs) {
    for (let i = 0; i < inputs.length; i += 1) {
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

export default SignInValidation;
