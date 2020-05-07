import React from 'react';

const ButtonSubmit = ({ name, className = 'btn ml-2' }) => {
  return (
    <button className={className} type="submit">
      {name}
    </button>
  );
};

export default ButtonSubmit;
