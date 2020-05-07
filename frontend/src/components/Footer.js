import React, { useContext } from 'react';
import { StoreContext } from '../store';

const Footer = () => {
  const { employers, allJobs } = useContext(StoreContext);

  const empNum = employers ? employers.length : '';

  return (
    <footer>
      <div className="footer-area footer-bg py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="footer-tittle-bottom">
                <span>{allJobs.length}</span>
                <p>JOBS AND GROWING</p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="footer-tittle-bottom">
                <span>{empNum}</span>
                <p>REPUTABLE COMPANIES</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-area footer-bg">
        <div className="footer-border pt-4">
          <div className="footer-copy-right text-center">
            <p>All Rights reserved at jobfinder</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
