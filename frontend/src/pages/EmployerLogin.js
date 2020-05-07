import React, { useState, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Input from '../components/utilComponents/Input';
import { validateForm } from '../utilFunctions/formUtil';
import { login } from '../apiCalls/employers';
import { StoreContext, ActionContext } from '../store';

const EmployerLogin = () => {
  const { isAuthenticated } = useContext(StoreContext);
  const { loadUser } = useContext(ActionContext);

  const [formData, setFormData] = useState({
    empCompanyEmail: '',
    empPassword: '',
  });
  const { empCompanyEmail, empPassword } = formData;
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState([]);

  //handlechange
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handleSubmit
  const handleSubmit = e => {
    e.preventDefault();
    const error = validateForm(formData, []);
    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      login(empCompanyEmail, empPassword, loadUser).then(err => {
        if (err) {
          setServerError(err);
        } else {
          setServerError([]);
        }
      });
    }
  };

  // Redirect if logged in
  const location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: '/' } };

  if (isAuthenticated) {
    history.push(from);
  }

  return (
    <div className="container admin-page px-5">
      <form onSubmit={handleSubmit}>
        <h4 className="py-4">Login</h4>
        {serverError.map((err, index) => (
          <p className="text-center text-danger" key={index}>
            {err.msg}
          </p>
        ))}
        <Input
          label="Email Address"
          name="empCompanyEmail"
          type="text"
          value={empCompanyEmail}
          handleChange={handleChange}
          error={errors.empCompanyEmail && 'Email is required'}
        />

        <Input
          label="Password"
          name="empPassword"
          type="password"
          value={empPassword}
          handleChange={handleChange}
          error={errors.empPassword && 'Password is required'}
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <p className="mt-5">
        Don't have an acount?{' '}
        <Link to={'/sign-up'} className="text-info">
          Register
        </Link>
      </p>
    </div>
  );
};

export default EmployerLogin;
