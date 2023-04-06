import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = ({
  inputTypeProps,
  inputIdProps,
  inputAriaLabelProps,
  inputNameProps,
  inputRefProps,
  inputPlaceholderProps,
}) => {
  const [inputState, setInputState] = useState('');

  return (
    <div className={classes.inputContainer} data-input={inputNameProps}>
      <input
        className={classes.inputContainer_input}
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
