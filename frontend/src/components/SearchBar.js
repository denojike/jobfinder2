import React from 'react';

const SearchBar = ({
  type = 'text',
  handleChange,
  name,
  value,
  placeholder,
}) => {
  return (
    <div>
      <input
        type={type}
        className="form-control  "
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
