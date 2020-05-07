import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { StoreContext, ActionContext } from '../store';
import ButtonClick from './utilComponents/ButtonClick';

const Header = () => {
  const { isAuthenticated } = useContext(StoreContext);
  const { logout } = useContext(ActionContext);

  const [menu, toggleMenu] = useState(false);
  return (
    <header>
      <div className="container-fluid bg-light p-4">
        <div className="container">
          <span className="drop-menu" onClick={() => toggleMenu(!menu)}>
            {menu ? <FaTimes /> : <FaBars />}
          </span>
          <div className="row">
            <div className="col-4 ">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col-8 main-nav">
              <ul className="nav mt-2 justify-content-end">
                <li className="nav-item">
                  <Link to="/" className="nav-link btn head-btn2">
                    Home
                  </Link>
                </li>

                {isAuthenticated && (
                  <li className="nav-item">
                    <Link to="/addjob" className="nav-link  btn head-btn2">
                      Add Job
                    </Link>
                  </li>
                )}

                {isAuthenticated ? (
                  <li className="nav-item ml-3">
                    <ButtonClick name="logout" handleClick={logout} />
                  </li>
                ) : (
                  <li className="nav-item ml-3">
                    <Link to="/login" className="nav-link  btn head-btn1">
                      Employer Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* mobile-nav */}

      <div
        className="mobile-menu bg-light d-flex justify-content-center"
        style={{ opacity: menu ? 1 : 0, zIndex: menu ? 200 : -200 }}
      >
        <ul className=" d-flex flex-column">
          <li className="nav-item" onClick={() => toggleMenu(!menu)}>
            <Link to="/" className="nav-link" onClick={() => toggleMenu(!menu)}>
              Home
            </Link>
          </li>

          {isAuthenticated && (
            <li className="nav-item">
              <Link
                to="/addjob"
                className="nav-link"
                onClick={() => toggleMenu(!menu)}
              >
                Add Job
              </Link>
            </li>
          )}

          {isAuthenticated ? (
            <li
              className="nav-item nav-link text-danger"
              onClick={logout}
              style={{ cursor: 'pointer' }}
            >
              logout
            </li>
          ) : (
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                onClick={() => toggleMenu(!menu)}
              >
                Employer Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
