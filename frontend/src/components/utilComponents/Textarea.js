import React from 'react';

const Textarea = ({ name, value, label, handleChange, error, required }) => {
  return (
    <div className="form-group">
      <label htmlFor="jobDesc">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {error && !value && (
        <small className="form-text text-danger">{error}</small>
      )}
      <textarea
        className={
          error && !value ? 'form-control border border-danger' : 'form-control'
        }
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Textarea;
