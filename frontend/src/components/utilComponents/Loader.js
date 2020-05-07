import React from 'react';
import logo from '../../img/logo/logo.png';

const Loader = () => {
  return (
    <div className="preloader d-flex align-items-center justify-content-center">
      <div className="preloader-inner position-relative">
        <div className="preloader-circle"></div>
        <div className="preloader-img pere-text">
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
