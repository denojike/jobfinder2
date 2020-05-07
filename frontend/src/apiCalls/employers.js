import axios from 'axios';
import { endPoint } from './endPoint';

//Employer Register
export const register = async formData => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify(formData);
  try {
    await axios.post(`${endPoint}/employers`, body, config);
    // return res;
  } catch (err) {
    console.log(err.response);
    return err.response.data.errors;
  }
};

//Get all Employers
export const getAllEmployers = async () => {
  try {
    const res = await axios.get(`${endPoint}/employers`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//Employer Login
export const login = async (empCompanyEmail, empPassword, cb) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify({ empCompanyEmail, empPassword });
  try {
    const res = await axios.post(`${endPoint}/empLogin`, body, config);
    //Save Token in localstorage
    localStorage.setItem('token', JSON.stringify(res.data.token));

    //Load authenticated
    cb();
  } catch (err) {
    // console.log(err.response);
    return err.response.data.errors;
  }
};
