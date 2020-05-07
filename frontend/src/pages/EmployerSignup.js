import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../components/utilComponents/Input';
import { validateForm } from '../utilFunctions/formUtil';
import Textarea from '../components/utilComponents/Textarea';
import { register } from '../apiCalls/employers';
import { toast } from 'react-toastify';

const EmployerSignup = () => {
  const [formData, setFormData] = useState({
    empCompanyName: '',
    empCompanyWeb: '',
    empCompanyEmail: '',
    empCompanyDesc: '',
    empPassword: '',
    empPasswordConfirm: '',
  });
  const {
    empCompanyName,
    empCompanyWeb,
    empCompanyEmail,
    empCompanyDesc,
    empPassword,
    empPasswordConfirm,
  } = formData;
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  //handlechange
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const history = useHistory();

  // //sendForm
  // const sendForm = async data => {
  //   try {
  //     let res = await register(data);
  //     if (!res.data) {
  //       setServerError(res);
  //     } else {
  //       setServerError(null);
  //       window.location = '/login';
  //     }
  //   } catch (err) {}
  // };

  //handleSubmit
  const handleSubmit = e => {
    e.preventDefault();
    const error = validateForm(formData, []);
    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else if (empPassword !== empPasswordConfirm) {
      setErrors(err => ({
        ...err,
        empPasswordConfirm: 'Passwords did not match',
      }));
    } else {
      register(formData)
        .then(err => {
          if (err) {
            setServerError(err);
          } else {
            toast('Account successfully created');
            history.push('/login');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container px-5">
      <div className="row">
        <div className="col col-md-9">
          <form onSubmit={handleSubmit}>
            <h4 className="py-4">Employer Sign Up</h4>
            {serverError &&
              serverError.map((err, index) => (
                <div className="alert alert-danger" key={index}>
                  {err.msg}
                </div>
              ))}

            <Input
              label="Company Name"
              name="empCompanyName"
              type="text"
              value={empCompanyName}
              handleChange={handleChange}
              error={errors.empCompanyName && 'Company Name is required'}
              required={true}
            />
            <Input
              label="Company Website"
              name="empCompanyWeb"
              type="text"
              value={empCompanyWeb}
              handleChange={handleChange}
              error={errors.empCompanyWeb && 'Company Website is required'}
              required={true}
            />
            <Input
              label="Email Address"
              name="empCompanyEmail"
              type="text"
              value={empCompanyEmail}
              handleChange={handleChange}
              error={errors.empCompanyEmail && 'Email is required'}
              hintBottom="We'll never share your email with anyone else"
              required={true}
            />
            <Textarea
              label="Company Description"
              name="empCompanyDesc"
              type="text"
              value={empCompanyDesc}
              handleChange={handleChange}
              error={
                errors.empCompanyDesc &&
                'Please write something about your company'
              }
              required={true}
            />
            <Input
              label="Password"
              name="empPassword"
              type="password"
              value={empPassword}
              handleChange={handleChange}
              error={errors.empPassword && 'Password is required'}
              required={true}
            />

            <Input
              label="Confirm Password"
              name="empPasswordConfirm"
              type="password"
              value={empPasswordConfirm}
              handleChange={handleChange}
              error={errors.empPasswordConfirm && 'Password is required'}
              required={true}
              error2={
                errors.empPasswordConfirm === 'Passwords did not match'
                  ? 'Passwords did not match'
                  : ''
              }
            />

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>

          <p className="mt-5">
            Aready has an acount?{' '}
            <Link to={'/login'} className="text-info">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;
