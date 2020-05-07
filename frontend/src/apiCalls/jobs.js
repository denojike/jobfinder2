import axios from 'axios';
import { endPoint } from './endPoint';

//Get All Jobs
export const getAllJobs = async () => {
  try {
    let jobs = await axios.get(`${endPoint}/jobs`);
    return jobs.data;
  } catch (err) {
    console.log(err);
  }
};

//Add or Update Job
export const addJob = async formData => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const { _id } = formData;
  const body = JSON.stringify(formData);
  try {
    if (_id) {
      await axios.put(`${endPoint}/updateJob/${_id}`, body, config);
    } else {
      await axios.post(`${endPoint}/jobs`, body, config);
    }
    // return res;
  } catch (err) {
    console.log(err.response);
    return err.response.data.errors;
  }
};
