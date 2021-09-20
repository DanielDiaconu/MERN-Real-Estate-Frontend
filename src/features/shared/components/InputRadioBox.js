import React, { useState } from "react";

function InputRadioBox({ id, name, value, onInputChange, checked, labelText }) {
  const [isToggled, setIsToggled] = useState(false);

  const onInputChangeInteract = () => {
    setIsToggled((prev) => !prev);
    onInputChange({
      value,
      checked: !isToggled,
    });
  };

  return (
    <div className="custom-input-radio">
      <input
        className="btn-check"
        type="radio"
        id={id}
        name={name}
        checked={checked}
        value={value}
        onChange={onInputChangeInteract}
      />
      <label
        className={`btn btn-outline-secondary ${
          isToggled ? "is-checked" : ""
        } fw-normal`}
        htmlFor={id}
      >
        {labelText}
      </label>
    </div>
  );
}

export default InputRadioBox;
