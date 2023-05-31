import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = ({
  inputTypeProps,
  inputIdProps,
  inputAriaLabelProps,
  inputNameProps,
  inputRefProps,
  inputPlaceholderProps,
  validationErrorProps,
}) => {
  const [inputState, setInputState] = useState('');

  const classNameInputContainer =
    validationErrorProps?.error &&
    validationErrorProps?.inputName === inputNameProps
      ? classes.inputContainer_input__error
      : classes.inputContainer_input;

  const placeHolderSmallContent = () => {
    if (
      validationErrorProps?.error &&
      validationErrorProps?.inputName === inputNameProps
    ) {
      let content;
      switch (inputNameProps) {
        case 'register-password':
          content = 'at least 7 - letters & numbers';
          break;
        default:
          content = 'error please confirm';
      }
      return content;
    }
    return inputPlaceholderProps;
  };

  return (
    <div className={classes.inputContainer} data-input={inputNameProps}>
      <input
        className={classNameInputContainer}
        type={inputTypeProps}
        id={inputIdProps}
        aria-label={inputAriaLabelProps}
        name={inputNameProps}
        required
        ref={inputRefProps}
        value={inputState}
        autoComplete="new-password"
        onChange={(e) => setInputState(e.target.value)}
      />
      <div className={classes.inputContainer_placeholder}>
        {inputState ? '' : inputPlaceholderProps}
      </div>
      <div className={classes.inputContainer_placeholder__small}>
        {placeHolderSmallContent()}
      </div>
    </div>
  );
};

export default Input;
