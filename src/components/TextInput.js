import React from "react";
import PropTypes from "prop-types";
function TextInput(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          name={props.name}
          value={props.value}
          className="form-control"
          onChange={props.onChange}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

TextInput.protoTypes = {
  id: PropTypes.string.isRfuequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  id: "",
  name: "",
  label: "",
  onChange: "",
  value: "",
  error: "",
};

export default TextInput;
