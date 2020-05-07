import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form1 from '../forms/Form1';
import Form2 from '../forms/Form2';
import FormConfirm from '../forms/FormConfirm';
import { validateForm } from '../utilFunctions/formUtil';
import { Locations } from '../apiCalls/Locations';
import { addJob } from '../apiCalls/jobs';
import { endPoint } from '../apiCalls/endPoint';
import { toast } from 'react-toastify';
import { ActionContext } from '../store';
import axios from 'axios';

const EditJob = ({ match }) => {
  const { isLoggedIn, loadJobs } = useContext(ActionContext);
  const history = useHistory();
  const { id } = match.params;

  //Manage form page change
  const [step, setStep] = useState(1);

  //formData state
  const [formData, setFormData] = useState({
    _id: '',
    jobTitle: '',
    jobDesc: '',
    //Convert to array
    jobEdu: '',
    //Convert to array
    jobSkills: '',
    jobType: 'Full Time',
    jobCategory: '',
    jobNumVac: 1,
    jobCity: '',
    jobState: '',
    jobCountry: '',
  });

  //Form Error data
  const [errors, setErrors] = useState({});
  //Locations Data
  const [countryArr, setCountryArr] = useState();

  useEffect(() => {
    //set course to edit
    const getJobToEdit = async () => {
      try {
        if (id) {
          let res = await axios.get(`${endPoint}/jobs/${id}`);
          //pre fill form fields
          setFormData(prev => ({
            _id: res.data._id,
            jobTitle: res.data.jobTitle,
            jobDesc: res.data.jobDesc,
            jobEdu: res.data.jobEdu,
            jobSkills: res.data.jobSkills,
            jobType: res.data.jobType,
            jobNumVac: res.data.jobNumVac,
            jobCategory: res.data.jobCategory,
            jobCity: res.data.jobCity,
            jobState: res.data.jobState,
            jobCountry: res.data.jobCountry,
          }));
        }
      } catch (err) {}
    };
    getJobToEdit();

    //Get location data
    const countryStates = Locations.getFormatedLocation();
    setCountryArr(countryStates);
  }, [id]);

  //common variabe for getStates and getCities function
  const { jobCountry, jobState } = formData;
  const countryData = countryArr && countryArr.filter(item => item.name);

  // getting states for given country
  const getStates = () => {
    try {
      const states =
        jobCountry &&
        countryData
          .filter(c => c.name === jobCountry)[0]
          .stateCities.map(s => s.state);
      return states;
    } catch (err) {
      console.log(err);
    }
  };

  //getting cities for given state
  const getCities = () => {
    try {
      const cities =
        jobCountry &&
        jobState &&
        countryData
          .filter(c => c.name === jobCountry)[0]
          .stateCities.filter(s => s.state === jobState)[0].cities;

      return cities;
    } catch (err) {
      console.log(err);
    }
  };

  //handlechange
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'jobCountry') {
      setFormData({
        ...formData,
        [name]: value,
        jobState: '',
        jobCity: '',
      });
    } else if (name === 'jobState') {
      setFormData({
        ...formData,
        [name]: value,
        jobCity: '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //handleSubmit

  const handleSubmit = e => {
    e.preventDefault();
    if (!isLoggedIn()) {
      toast.error('Failed. Please login');
      // history.push('/login');
      window.location = '/login';
    } else {
      addJob(formData)
        .then(err => {
          if (!err) {
            toast('Job successfully updated');
            loadJobs();
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  //Handle form page navigation
  const handlePageChange = (data, fieldsToSkip) => {
    const errors = validateForm(data, fieldsToSkip, setErrors);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setStep(step => step + 1);
    }
  };

  if (!formData._id) {
    return (
      <div className="job-post-company" style={{ height: '70vh' }}>
        <div className="container">
          <h4 className="text-center">This job does not exist</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mx-auto w-75">
      {step === 1 ? (
        <Form1
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handlePageChange={handlePageChange}
          countries={countryArr && countryArr.map(c => c.name)}
          states={getStates()}
          cities={getCities()}
        />
      ) : step === 2 ? (
        <Form2
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handlePageChange={handlePageChange}
          setStep={setStep}
        />
      ) : (
        <FormConfirm
          formData={formData}
          handleSubmit={handleSubmit}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default EditJob;
