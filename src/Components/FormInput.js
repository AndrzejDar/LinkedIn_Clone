import React, { useState } from "react";
import "./FormInput.scss";

const FormInput = (props) => {
  //separating input parameters from aux
  const { label, onChange, errorMsg, ...inputProps } = props;

  //state for displaying error msg (if incorrect) after loosing focus of input field
  const [wasFocused, setWasFocused] = useState(false);

  const handleWasFocused = () => {
    setWasFocused(true);
  };

  return (
    <div className="form-input__record">
      <label for={inputProps.name}>{label}</label>
      <div className="form-input__field">
        <input
          className="form-input__input"
          {...inputProps} //inserting all input parameters here
          onChange={onChange}
          onBlur={handleWasFocused}
          wasfocused={wasFocused.toString()}
        ></input>
      <span className="errorMsg">{errorMsg}</span>
      </div>
    </div>
  );
};

export default FormInput;
