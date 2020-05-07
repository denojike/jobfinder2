import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const ToggleFilterMobile = ({ toggleMenu, menu }) => {
  return (
    <div className="col-4">
      <div className="  d-md-none">
        {menu ? (
          <button
            className="text-info border-0"
            onClick={() => toggleMenu(!menu)}
          >
            <strong>
              <FaPlus /> Open Filter
            </strong>
          </button>
        ) : (
          <button
            className="text-info border-0"
            onClick={() => toggleMenu(!menu)}
          >
            <FaMinus /> Close Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default ToggleFilterMobile;
