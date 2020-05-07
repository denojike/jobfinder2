import React from 'react';
// import PropTypes from 'prop-types';

const CheckBox = ({ name, handleChange, value, isChecked }) => {
  return (
    <div className="form-group">
      <input
        label={label}
        className="form-control"
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
};

// CheckBox.propTypes = {};

export default CheckBox;
