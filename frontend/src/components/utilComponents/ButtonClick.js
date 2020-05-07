import React from 'react';

const ButtonClick = ({ name, handleClick, className = 'btn mr-2' }) => {
  return (
    <button className={className} onClick={handleClick}>
      {name}
    </button>
  );
};
export default ButtonClick;
