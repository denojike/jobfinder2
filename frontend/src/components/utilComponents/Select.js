import React from 'react';

const Select = ({
  label,
  name,
  value,
  options,
  handleChange,
  error,
  required,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {error && !value && (
        <small className="form-text text-danger">{error}</small>
      )}
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={
          error && !value ? 'form-control border border-danger' : 'form-control'
        }
        test-id="form-select"
      >
        <option></option>
        {options &&
          options.map((item, index) => <option key={index}>{item}</option>)}
      </select>
    </div>
  );
};

export default Select;
