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
  console.log(validationErrorProps);
  const classNameInputContainer =
    validationErrorProps?.errorMessage &&
    validationErrorProps?.inputName === inputNameProps
      ? classes.inputContainer_input__error
      : classes.inputContainer_input;

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
        {inputPlaceholderProps}
      </div>
    </div>
  );
};

export default Input;
