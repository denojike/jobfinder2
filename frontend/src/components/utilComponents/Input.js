import React from 'react';
// import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  name,
  min,
  value,
  hintTop,
  hintBottom,
  placeholder,
  label,
  handleChange,
  error,
  error2,
  required,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
        {hintTop && (
          <span>
            <small>({hintTop})</small>
          </span>
        )}
      </label>
      {error && !value && (
        <small className="form-text text-danger">{error}</small>
      )}
      {error2 && <small className="form-text text-danger">{error2}</small>}
      <input
        label={label}
        placeholder={placeholder}
        className={
          error && !value ? 'form-control border border-danger' : 'form-control'
        }
        min={min && min}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {hintBottom && (
        <small id="emailHelp" className="form-text text-muted">
          {hintBottom}
        </small>
      )}
    </div>
  );
};

// Input.propTypes = {};

export default Input;
